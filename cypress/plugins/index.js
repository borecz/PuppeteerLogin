// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const webpack = require('@cypress/webpack-preprocessor')
const { PuppeteerLogin } = require('./login.plugin')

module.exports = (on, config) => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require('../../webpack.config'),
    watchOptions: {}
  }
  // this will work with any version under 3.5, for > you need another approach
  on('before:browser:launch', (browser = { headless: true }, args) => {
    if (browser.name === 'chrome' || browser.name === 'chromium') {
      args.push('--remote-debugging-port=9222');
    }
    return args;
  });
  on('file:preprocessor', webpack(options))
  on('task', {
    'Login': PuppeteerLogin
  })
}