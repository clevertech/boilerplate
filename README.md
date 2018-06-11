# Clevertech Boilerplate

Clevertech provides an integrated technology stack that

* 📚 Contains a huge amount of best practices already implemented for you
* 🚀 Provides fast and powerful local application development. Including:
  hot-reloading, local utilities (npm scripts), dev tools (linters, git hooks),
  etc.
* 🛠 Implements a solid workflow for building, testing and deploying applications
* 👤 Secure and complete authentication functionality (including 2FA with either SMS or apps like Google Authenticator)
* 🎨 Supports SASS/SCSS

Some of the best practices include:

* 📦 Caching dependencies for faster builds
* 🚀 Fast track for faster deploys
* 🔒 Properly storage of secrets outside the code
* 💊 Healthcheck implementations
* ✒️ Linters and code prettifiers
* 👤 Complete auth infrastructure based on JWT
* 🏛 Source code architecture that scales

Some of the used technologies are:

* [Node.js](https://nodejs.org/en/) for the backend.
* [React.js](https://reactjs.org/) for the frontend with many other libraries
  already integrated such as redux, react-router, redux-saga, etc.
* [Docker](https://www.docker.com) for containers.
* [Docker Compose](https://docs.docker.com/compose) to run containers locally
  and during the build.
* [Jenkins](https://jenkins.io) to test, build and deploy the application.
* [Kubernetes](https://kubernetes.io) to orchestrate the container deployment.
* [PostgreSQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/)
  (see the `create-boilerplate-app` script) as database engines.

Containers offer big advantages in software development, quality assurance and
software deployment -- namely consistency, reliability and scalability. In
particular, scalability is implemented from the beginning, and the system is
ready to grow as the application gets traction.

# Creating new applications

To create a new application based on the Boilerplate, use this command:

```
npx github:clevertech/boilerplate#create-boilerplate-app my-new-app
```

The application will be initalized in the directory `my-new-app`.

This script can be found in the
[`create-boilerplate-app`](https://github.com/clevertech/boilerplate/tree/create-boilerplate-app)
branch. Follow the link for instructions on how to modify it.

# Table of contents

_generated with [DocToc](https://github.com/thlorenz/doctoc)_

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Local Development](#local-development)
  * [Local development tools](#local-development-tools)
  * [Installation](#installation)
  * [Setting up the environment](#setting-up-the-environment)
  * [Running the application](#running-the-application)
  * [Customizing Style](#customizing-style)
  * [Tests](#tests)
    * [Running the tests](#running-the-tests)
    * [Creating new tests](#creating-new-tests)
  * [Connecting to the database](#connecting-to-the-database)
  * [Under the hood](#under-the-hood)
* [Application Health Check](#application-health-check)
  * [Quick health check](#quick-health-check)
  * [Long health check](#long-health-check)
* [Directory structure](#directory-structure)
  * [Troubleshooting and useful Docker commands](#troubleshooting-and-useful-docker-commands)
  * [Deploy](#deploy)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Local Development

### Local development tools

First of all, run `yarn install` in the root directory. This will install local
development tools such as `eslint` and git precommits to keep the code formatted
and without obvious errors.

### Installation

Local prerequisites are minimal, please follow the
[installation instructions](INSTALL.md) carefully. We support Linux and MacOS;
Windows users should use a Linux VM. Review your Docker Advanced settings and
consider to assign more CPUs and more memory to the Docker process to boost
performance.

### Setting up the environment

Application configuration is done by using environment variables. For local
development, inside each app directory there should be an `.env.example` file.
Simply copy `.env.example` to `.env` and fill in your credentials as needed. The
`.env.` file can be used to store sensitive / personal credentials without the
risk of checking it into source control.

## -By default [CleverAuth](https://github.com/clevertech/cleverauth) is enabled and some env variables are required for it. Take a look to `api/.env.example` and fill the required values.

### Running the application

```
$ docker/run
```

That's it! Your application is available at http://local.cleverbuild.biz:8080
(api) and http://local.cleverbuild.biz:3000 (React frontend). Both api and
frontend support hot reloading.

> On first execution, Docker must download the base container images, which
> might take a while. Subsequent executions will be faster, taking advantage of
> Docker caching and Yarn caching. See [here](CACHING.md) for details about the
> caching mechanisms.

`docker/run` is the local development start script. This allows for changes made
locally to restart the node application in the most efficient and cross-platform
way. To configure the app restart, edit `nodemon.json`. `docker/run` uses
`docker-compose` to start the application and is probably how you will want to
do most of your development.

**NOTE:** Any change to `package.json` will require a full restart of the
container: you should use `CTRL+C` to stop the running Docker instance and
restart it to see your changes. To avoid that when doing simple changes (like
adding a package), you can do something like:

```
docker-compose exec api yarn add $YOUR_PACKAGE$
```

### Customizing Style

The boilerplate supports styling with SASS/SCSS. Just edit `main.scss` on `frontend/src/styles` and the boilerplate will convert it to css on-the-fly so you can take full advantage of all of SASS's features.

### Tests

#### Running the tests

```
$ docker/test
```

#### Creating new tests

**Unit tests**

Just write regular tests using `jest`. Use `describe()` and `it()` to write new
tests and test suites.

**End 2 end tests**

End to end tests are implemented using
[TestCafe](https://devexpress.github.io/testcafe/). You can find an example in
`e2e`. These tests need to be run having the containers up.

```
yarn run e2e
```

### Connecting to the database

You'll find the password in the `docker-compose.yml` file.

_From the command line_

With the containers started just do:

```
yarn run db-client
```

_Using Adminer_

Just go to `http://127.0.0.1:8081/` and fill the connection information based on
what you'll find in `docker-compose.yml`.

### Under the hood

[How it works](docker/README.md).

## Application Health Check

Each application should expose two health checks.

### Quick health check

The quick health checks is called by Kubernetes to assess the
[Liveness and Readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)
of an application; it is called approximately every 10-30 seconds, so it can not
involve any computation or resource access (database, cache, etc.) to not stress
the infrastructure. For a web application, an endpoint returning HTTP 200 is
usually the right choice.

URL: `/healthz`

### Long health check

The long health checks is called by an external service to assess the status of
the entire application stack. It is called approximately every 1 minute, so it
can involve computation and light access to external resources. The long health
check should verify the liveness of every dependent service and:

* Return HTTP 200 if everything is good.
* Return HTTP 500 and a human-readable error message if something is wrong.

Examples of controlled services:

* Simple query to assess database liveness and connectivity (`SELECT 1;`)
* Simple query to assess Redis connectivity
* Simple API call to assess external REST API liveness and connectivity

A module should also check for a consistent internal state. For example: a
email-sending worker should check for the sending queue to be less than a
certain thresholds; a workerd consuming events in a queue should check for queue
size, etc.

The long health check should be authenticated to avoid a potential DoS attack.
The secret for the long health check is passed as an environment variable to the
process (`HEALTH_CHECK_SECRET`).

URL: `/healthz/long/${process.env.HEALTH_CHECK_SECRET}`

## Directory structure

This project is setup to have multiple services in the same repository, as such
the structure of this is quite important. Each directory of this project is
intended to be for a different service and as such, those child folders should
contain all necessary components to build that service entirely.

It is important that each new service has a `Dockerfile`.

```
project
├─ docker-compose.yml
├─ README.md
├─ INSTALL.md
├─ api
│  ├─ Dockerfile
|  ├─ package.json
│  └─ src
│     ├─ file1.js
│     └─ file2.js
└─ frontend
   ├─ Dockerfile
   ├─ package.json
   └─ src
      ├─ file1.js
      └─ file2.js
```

### Troubleshooting and useful Docker commands

[Common issues](TROUBLESHOOTING.md) that developers may encounter when executing
this project and useful Docker commands.

### Deploy

Branches `development`, `staging` and `master` are deployed after build to their
server environments.

The deploy uses a `fast-path` mechanism. When a given application version is
tested on the development site, the same container image is deployed on the
staging/production site, avoiding to repeat the build and testing process when
promoting a new version to staging/production. This allows to put a new version
on production in 30 seconds and to avoid build inconsistencies.

The mechanism is triggered when a build is started for a branch which is
identical to another branch that has already been built and deployed. So, for
example, when you merge `development` to `staging` (without code modifications)
the build phase is skipped, and the existing image is deployed. To take
advantage of the fast path, do not merge `development` to `staging` while
development is still building: it's faster and safer to wait for development
build completion before merging.

As also Pull Requests are built, this mechanism works in some cases also for
PRs. For example, if you merge a **rebased** PR to `development`, the fast path
is used.

Implementation is in `docker/fast_track` script.
