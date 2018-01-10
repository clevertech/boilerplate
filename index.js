#!/usr/bin/env node
const path = require('path')
const yaml = require('yamljs')
const nanoid = require('nanoid')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const dashify = require('dashify')
const uppercamelcase = require('uppercamelcase')
const child_process = require('child_process')
const chalk = require('chalk')
const generate = require('nanoid/generate')

const repoURL = (protocol, project) =>
  protocol === 'ssh'
    ? `git@github.com:clevertech/${project}.git`
    : `https://github.com/clevertech/${project}.git`

const dirName = process.argv[2]

if (!dirName) {
  console.log(chalk.red('You must specify a directory name'))
  process.exit(1)
}

const basedir = path.resolve(process.cwd(), dirName)

const exec = (command, options) => {
  console.log(chalk.blue(command))
  return new Promise((resolve, reject) => {
    const opts = Object.assign({ shell: true }, options)
    child_process.exec(command, opts, (err, stdout, stderr) => {
      stderr && console.error(chalk.red(stderr))
      stdout && console.log(stdout)
      if (err) return reject(err)
      resolve(stdout)
    })
  })
}

const databases = {
  postgres: {
    port: 5432,
    deps: {
      knex: '^0.13.0',
      pg: '^7.3.0'
    }
  },
  mysql: {
    port: 3306,
    deps: {
      knex: '^0.13.0',
      mysql: '^2.15.0'
    }
  }
}

const databaseNames = Object.keys(databases)
const defaultDeatabase = databaseNames[0]

console.log('Creating a new Clevertech project in', basedir)

const cloneRepo = async (projectName, basedir) => {
  console.log('Cloning repository')
  try {
    await exec(`git clone ${repoURL('ssh', projectName)} ${basedir} --depth 1`)
    return 'ssh'
  } catch (err) {
    if (err.message.indexOf('Permission denied (publickey)') === -1) throw err
    console.log('Cloning using SSH failed. Trying with SSH')
    await exec(
      `git clone ${repoURL('https', projectName)} ${basedir} --depth 1`
    )
    return 'https'
  }
}

const deleteGitDir = () => {
  console.log('Deleting .git dir')
  return fs.remove(path.join(basedir, '.git'))
}

const deleteLicense = () => {
  return fs.remove(path.join(basedir, 'LICENSE'))
}

const updateDockerCompose = async (answers, dbPassword) => {
  const dockerComposePath = path.join(basedir, 'docker-compose.yml')
  const dokerComposeSource = await fs.readFile(dockerComposePath, 'utf8')
  const dockerCompose = yaml.parse(dokerComposeSource)
  const dbPort = databases[answers.databaseEngine].port
  const db = dockerCompose.services.db
  db.image = answers.databaseEngine
  db.ports = [`${dbPort}:${dbPort}`]
  if (answers.databaseEngine === 'postgres') {
    db.environment = {
      POSTGRES_PASSWORD: dbPassword,
      POSTGRES_DB: dashify(answers.projectName + '-local'),
      POSTGRES_USER: dashify(answers.projectName)
    }
  } else if (answers.databaseEngine === 'mysql') {
    db.environment = {
      MYSQL_ROOT_PASSWORD: nanoid(),
      MYSQL_PASSWORD: dbPassword,
      MYSQL_DATABASE: dashify(answers.projectName + '-local'),
      MYSQL_USER: dashify(answers.projectName)
    }
  }
  await fs.writeFile(dockerComposePath, yaml.stringify(dockerCompose, 4, 2))
}

const updateEnvFile = async (answers, dbPassword) => {
  const envPath = path.join(basedir, 'api/.env.example')
  const envSource = await fs.readFile(envPath, 'utf8')
  const changes = {
    DB_DATABASE: dashify(answers.projectName + '-local'),
    DB_USER: dashify(answers.projectName),
    DB_PASSWORD: dbPassword,
    DB_ENGINE: answers.databaseEngine,
    DB_PORT: databases[answers.databaseEngine].port,
    HEALTH_CHECK_SECRET: nanoid(),
    SESSION_SECRET: nanoid()
  }
  const envNewSource = envSource
    .split('\n')
    .map(line => {
      for (const key of Object.keys(changes)) {
        if (line.startsWith(key + '=')) {
          return `${key}=${changes[key]}`
        }
      }
      return line
    })
    .join('\n')
  await fs.writeFile(envPath, envNewSource)

  // copy to .env
  await fs.copy(
    path.join(basedir, 'api/.env.example'),
    path.join(basedir, 'api/.env')
  )
}

const updateAPIPackageJSON = async answers => {
  const packageJSONPath = path.join(basedir, 'api/package.json')
  const packageJSON = require(packageJSONPath)
  const description = `${answers.projectName} API`
  packageJSON.name = dashify(description)
  packageJSON.description = description

  // remove dependencies
  Object.keys(databases).forEach(database => {
    if (database === answers.databaseEngine) return
    const deps = databases[database].deps
    Object.keys(deps).forEach(dep => {
      delete packageJSON.dependencies[dep]
    })
  })

  // add dependencies for selected db
  const deps = databases[answers.databaseEngine].deps
  Object.keys(deps).forEach(dep => {
    packageJSON.dependencies[dep] = deps[dep]
  })

  await fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2))
}

const updateFrontendPackageJSON = async answers => {
  const packageJSONPath = path.join(basedir, 'frontend/package.json')
  const packageJSON = require(packageJSONPath)
  const description = `${answers.projectName} Frontend`
  packageJSON.name = dashify(description)
  packageJSON.description = description
  await fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2))
}

const generateRandom = () => {
  return generate('abcdefghijklmnopqrstuvwxyz', 6)
}

const SUMOLOGIC_BASE = 'https://service.us2.sumologic.com/ui/index.html'

const sumologicSearch = sourcecategory =>
  `${SUMOLOGIC_BASE}#section/search/@0,0@_sourcecategory="${sourcecategory}"`

const sumologicLink = (name, env, component) =>
  sumologicSearch(`kubernetes/${name}/${env}/${name}/${component}`)

const updateRootPackageJSON = async answers => {
  const randomDev = generateRandom()
  const randomStaging = generateRandom()
  const packageJSONPath = path.join(basedir, 'package.json')
  const packageJSON = require(packageJSONPath)
  const name = dashify(answers.projectName)
  packageJSON.name = name
  packageJSON.description = answers.projectName
  packageJSON.scripts.browse = 'browse'
  packageJSON.devDependencies['@clevertech.biz/browse'] = '^0.1.2'
  packageJSON.browse = {
    sentry: `https://sentry.cleverbuild.biz/clevertech/${name}-sentry/`,
    development: {
      servers: {
        api: `https://${name}-api-dev-${randomDev}.cleverbuild.biz/`,
        frontend: `https://${name}-dev-${randomDev}.cleverbuild.biz/`
      },
      logs: {
        api: sumologicLink(name, 'development', 'api'),
        frontend: sumologicLink(name, 'development', 'frontend')
      }
    },
    staging: {
      servers: {
        api: `https://${name}-api-staging-${randomStaging}.cleverbuild.biz/`,
        frontend: `https://${name}-staging-${randomStaging}.cleverbuild.biz/`
      },
      logs: {
        api: sumologicLink(name, 'staging', 'api'),
        frontend: sumologicLink(name, 'staging', 'frontend')
      }
    },
    production: {
      servers: {
        api: `https://api.example.com`,
        frontend: `https://example.com/`
      },
      logs: {
        api: sumologicLink(name, 'production', 'api'),
        frontend: sumologicLink(name, 'production', 'frontend')
      }
    }
  }

  if (answers.databaseEngine === 'mysql') {
    packageJSON.betterScripts['db-client'] =
      'mysql -h 127.0.0.1 -u $DB_USER -p$DB_PASSWORD $DB_DATABASE'
  }

  await fs.writeFile(packageJSONPath, JSON.stringify(packageJSON, null, 2))
}

const updatePrettierConfiguration = async answers => {
  const filePath = path.join(basedir, '.prettierrc.json')
  const config = JSON.parse(await fs.readFile(filePath, 'utf8'))
  config.semi = answers.semi
  await fs.writeFile(filePath, JSON.stringify(config, null, 2))
}

const useProjectName = async answers => {
  const files = [
    'Jenkinsfile',
    'api/Makefile',
    'frontend/Makefile',
    'docker/run',
    'terraform/ecr.tf',
    'terraform/main.tf',
    'terraform/terraform.backend.development',
    'terraform/terraform.backend.staging',
    'terraform/terraform.backend.production'
  ]
  for (const file of files) {
    const filePath = path.join(basedir, file)
    const source = await fs.readFile(filePath, 'utf8')
    const sourceNew = source
      .replace(/boilerplate/g, dashify(answers.projectName))
      .replace(/Boilerplate/g, uppercamelcase(answers.projectName))
    await fs.writeFile(filePath, sourceNew)
  }
}

const generateHelmFrontend = async (answers, randomValue) => {
  const helmFile = path.join(__dirname, 'helm/frontend.yml')
  const helmFileSource = await fs.readFile(helmFile, 'utf8')
  const helm = yaml.parse(helmFileSource)
  helm.deployment.image.repository = helm.deployment.image.repository.replace(
    /boilerplate/g,
    dashify(answers.projectName)
  )
  helm.ingress.hosts[0].rules[0].subdomain = helm.ingress.hosts[0].rules[0].subdomain
    .replace(/boilerplate/g, dashify(answers.projectName))
    .replace(/randomvalue/g, randomValue)

  const destFile = path.join(basedir, 'helm-frontend-development.yml')
  fs.writeFile(destFile, yaml.stringify(helm, 4, 2))
}

const generateHelmAPI = async (answers, randomValue) => {
  const helmFile = path.join(__dirname, 'helm/api.yml')
  const helmFileSource = await fs.readFile(helmFile, 'utf8')
  const helm = yaml.parse(helmFileSource)
  const dbPort = databases[answers.databaseEngine].port
  helm.deployment.image.repository = helm.deployment.image.repository.replace(
    /boilerplate/g,
    dashify(answers.projectName)
  )
  helm.ingress.hosts[0].rules[0].subdomain = helm.ingress.hosts[0].rules[0].subdomain
    .replace(/boilerplate/g, dashify(answers.projectName))
    .replace(/randomvalue/g, randomValue)
  helm.secrets[0].data = {
    DB_ENGINE: answers.databaseEngine,
    DB_PORT: dbPort,
    DB_DATABASE: dashify(answers.projectName) + '-development',
    DB_POOL_MIN: 2,
    DB_POOL_MAX: 10,
    DB_HOST: answers.dbhost,
    DB_USER: answers.dbuser,
    DB_PASSWORD: answers.dbpassword,
    REDIS_HOST: answers.redishost,
    REDIS_PORT: '6379',
    REDIS_PREFIX: dashify(answers.projectName) + '-development',
    SESSION_SECRET: nanoid(),
    HEALTH_CHECK_SECRET: nanoid()
  }
  const destFile = path.join(basedir, 'helm-api-development.yml')
  await fs.writeFile(destFile, yaml.stringify(helm, 4, 2))
}

const initGit = async answers => {
  const options = { cwd: basedir }
  await exec('git init', options)
  await exec(`git remote add origin ${answers.gitRemote}`, options)
}

const commit = async answers => {
  const options = { cwd: basedir }
  await exec('git add -A', options)
  await exec('git commit -m "Boilerplate initialization"', options)
}

const runYarn = async answers => {
  const options = { cwd: basedir }
  await exec('yarn', options)
}

const makeAdminQuestions = async initialAnswers => {
  if (!initialAnswers.admin) return

  console.log(
    `Creating ${chalk.cyan('helm')} files for ${chalk.cyan(
      'development'
    )}. Use values from ${chalk.cyan('terraform')}`
  )
  const answers = await inquirer.prompt([
    {
      name: 'dbhost',
      type: 'string',
      message: "What's the DB host?",
      validate: Boolean
    },
    {
      name: 'dbuser',
      type: 'string',
      message: "What's the DB user?",
      validate: Boolean
    },
    {
      name: 'dbpassword',
      type: 'string',
      message: "What's the DB password?",
      validate: Boolean
    },
    {
      name: 'redishost',
      type: 'string',
      message: "What's the redis host?",
      validate: Boolean
    }
  ])

  const randomValue = generate('abcdefghijklmnopqrstuvwxyz', 6)
  const allAnswers = Object.assign({}, initialAnswers, answers)
  await Promise.all([
    generateHelmFrontend(allAnswers, randomValue),
    generateHelmAPI(allAnswers, randomValue)
  ])
}

const addExtras = async () => {
  const dir = path.join(basedir, 'extras')
  await cloneRepo('boilerplate-extras', dir)

  const files = ['api/Makefile', 'frontend/Makefile', 'Jenkinsfile']

  // move files
  await Promise.all(
    files.map(filename =>
      fs.move(path.join(dir, filename), path.join(basedir, filename))
    )
  )

  // add extra information to README
  const readme = path.join(basedir, 'README.md')
  const readmeExtra = path.join(dir, 'README-extra.md')
  let source = await fs.readFile(readme)
  source += '\n\n' + (await fs.readFile(readmeExtra))
  await fs.writeFile(readme, source)

  // Remove cloned extras repo
  await fs.remove(dir)
}

const run = async () => {
  try {
    const protocol = await cloneRepo('boilerplate', basedir)
    const answers = await inquirer.prompt([
      {
        name: 'projectName',
        type: 'string',
        message:
          "What's the official name of the project? (e.g. The New York Times)",
        default: path.basename(dirName)
      },
      {
        name: 'databaseEngine',
        type: 'list',
        message: 'Which database engine are you going to use?',
        choices: databaseNames,
        default: defaultDeatabase
      },
      {
        name: 'gitRemote',
        type: 'string',
        message: "What's the Git remote URI?",
        default: answers => repoURL(protocol, dashify(answers.projectName))
      },
      {
        name: 'semi',
        type: 'confirm',
        message: 'Do like semicolons in code?',
        default: true
      },
      {
        name: 'employee',
        type: 'confirm',
        message: 'Are you a Clevertech employee?',
        default: false
      },
      {
        name: 'admin',
        type: 'confirm',
        message: 'Are you a Clevertech admin?',
        default: false,
        when: answers => answers.employee
      }
    ])

    if (answers.employee) {
      await addExtras()
    }

    const dbPassword = nanoid()
    console.log()
    await Promise.all([
      updateDockerCompose(answers, dbPassword),
      updateEnvFile(answers, dbPassword),
      updateAPIPackageJSON(answers),
      updateFrontendPackageJSON(answers),
      updateRootPackageJSON(answers),
      updatePrettierConfiguration(answers),
      useProjectName(answers),
      deleteGitDir(answers),
      deleteLicense()
    ])
    await initGit(answers)
    await makeAdminQuestions(answers)
    await runYarn()
    await commit()

    console.log()
    console.log('You are almost all set! Run the application with')
    console.log(chalk.cyan('🚀  docker/run'))
    console.log()
    console.log('Check the logs, issues and more with')
    console.log(chalk.cyan('🗄  yarn run browse'))
    console.log()
    console.log(
      'More information on https://github.com/clevertech/boilerplate#local-development'
    )

    if (answers.admin) {
      console.log()
      console.log('Use the following helm files:')
      console.log(chalk.cyan(path.join(dirName, 'helm-api-development.yml')))
      console.log(
        chalk.cyan(path.join(dirName, 'helm-frontend-development.yml'))
      )
      console.log()
    }
  } catch (err) {
    console.error(err)
  }
}

run()
