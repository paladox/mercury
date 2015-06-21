/**
 * localSettings for application, used by default by testing environment
 */
var baseLocalSettings = require('./localSettings.base');
var Utils = require('../server/lib/Utils');
var localSettings = baseLocalSettings.getSettings({
    devboxDomain: 'kenneth',
    environment: Utils.Environment.Testing,
    loggers: {
        default: 'info'
    }
});
module.exports = localSettings;
