var dateSettings = require('../../config/dateSettings');
var defaultDateConfig = dateSettings['en'];
function getDateConfigFromLang(lang) {
    return dateSettings[lang] || defaultDateConfig;
}
/**
 * Getter for DateConfig properties like endianness or M/D/Y formats
 * @param {string} property
 * @param {string} lang
 * @returns {string}
 */
function get(property, lang) {
    var dateConfig = getDateConfigFromLang(lang);
    return dateConfig[property] || defaultDateConfig[property];
}
exports.get = get;
