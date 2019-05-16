const withSass = require('@zeit/next-sass')
module.exports = withSass({
  sassLoaderOptions: {
    includePaths: ["theme", "node_modules/bulma/sass"]
  }
})
