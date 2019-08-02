const merge = require('webpack-merge')
const projectSettings = require('./aggressive-koala.project.settings')
const userSettings = require('./aggressive-koala.user.settings')

const settings = merge(projectSettings, userSettings)

module.exports = settings
