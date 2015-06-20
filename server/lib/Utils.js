/// <reference path="../../config/localSettings.d.ts" />
/// <reference path="../../typings/hoek/hoek.d.ts" />
var Hoek = require('hoek');
/**
 * Utility functions
 */
/**
 * Environment types
 */
(function (Environment) {
    Environment[Environment["Prod"] = 0] = "Prod";
    Environment[Environment["Verify"] = 1] = "Verify";
    Environment[Environment["Preview"] = 2] = "Preview";
    Environment[Environment["Sandbox"] = 3] = "Sandbox";
    Environment[Environment["Dev"] = 4] = "Dev";
    Environment[Environment["Testing"] = 5] = "Testing";
})(exports.Environment || (exports.Environment = {}));
var Environment = exports.Environment;
/**
 * @desc Get environment from string
 *
 * @param {string} environment Environment name
 * @param {Environment} fallbackEnvironment Fallback environment
 * @returns {Environment}
 */
function getEnvironment(environment, fallbackEnvironment) {
    if (fallbackEnvironment === void 0) { fallbackEnvironment = Environment.Dev; }
    var environments = {
        prod: Environment.Prod,
        verify: Environment.Verify,
        preview: Environment.Preview,
        sandbox: Environment.Sandbox,
        dev: Environment.Dev,
        testing: Environment.Testing
    };
    if (environments.hasOwnProperty(environment)) {
        return environments[environment];
    }
    return fallbackEnvironment;
}
exports.getEnvironment = getEnvironment;
/**
 * @desc Get environment as string
 *
 * @param {Environment} environment
 * @return {string}
 */
function getEnvironmentString(environment) {
    return Environment[environment].toLowerCase();
}
exports.getEnvironmentString = getEnvironmentString;
/**
 * @desc Strip dev- prefix from devbox domain
 *
 * @returns {string}
 */
function stripDevboxDomain(host) {
    if (host && host.substring(0, 4) === 'dev-') {
        host = host.substring(4);
    }
    return host;
}
exports.stripDevboxDomain = stripDevboxDomain;
/**
 * Get domain name for devbox or sandbox
 *
 * @param localSettings
 * @param wikiSubDomain
 * @returns {string}
 */
function getFallbackDomain(localSettings, wikiSubDomain) {
    if (localSettings.environment === Environment.Sandbox) {
        return localSettings.host + '.' + wikiSubDomain + '.wikia.com';
    }
    // This is specific to the devbox setup
    // Curl requests will look like muppet.devname.wikia-dev.com so skip the "devname"
    // Web requests will look like muppet.123.123.123.123.xip.io so add the "devname"
    if (localSettings.devboxDomain && wikiSubDomain.indexOf(localSettings.devboxDomain) === -1) {
        return wikiSubDomain + '.' + localSettings.devboxDomain + '.wikia-dev.com';
    }
    else {
        return wikiSubDomain + '.wikia-dev.com';
    }
}
/**
 * @desc Get fallback domain
 * @returns {string}
 */
function getFallbackWiki(localSettings) {
    return (localSettings.wikiFallback || 'community');
}
var wikiDomainsCache = {};
/**
 * Get cached Media Wiki domain name from the request host
 *
 * @param {string} host Request host name
 * @returns {string} Host name to use for API
 */
function getCachedWikiDomainName(localSettings, host) {
    var wikiDomain;
    host = clearHost(host);
    wikiDomain = wikiDomainsCache[host];
    return wikiDomainsCache[host] = wikiDomain ? wikiDomain : getWikiDomainName(localSettings, host);
}
exports.getCachedWikiDomainName = getCachedWikiDomainName;
/**
 * @desc Generate wiki host name from the request host
 *
 * @param localSettings
 * @param hostName
 * @returns {string}
 */
function getWikiDomainName(localSettings, hostName) {
    if (hostName === void 0) { hostName = ''; }
    var regex, match, environment = localSettings.environment, 
    // For these environments the host name can be passed through
    passThroughEnv = {};
    passThroughEnv[Environment.Prod] = '%s.wikia.com';
    passThroughEnv[Environment.Verify] = 'verify.%s.wikia.com';
    passThroughEnv[Environment.Preview] = 'preview.%s.wikia.com';
    if (passThroughEnv.hasOwnProperty(environment)) {
        if (hostName) {
            return hostName;
        }
        // This fallback is just for mediawikiDomain var in ServerData::createServerData
        return passThroughEnv[environment].replace('%s', getFallbackWiki(localSettings));
    }
    /**
     * Dynamic environments (sandbox or devbox)
     * Capture groups:
     * 0. "sandbox-*" (if it's the beginning of the url)
     * 1. The wiki name, including language code (i.e. it could be lastofus or de.lastofus)
     *    ^ Note: this will match any number of periods in the wiki name, not just one for the language code
     *    ^ Note: on the devbox this will match wikiname.devboxname
     * We just return capture group 1
     */
    regex = /^(?:sandbox\-[^\.]+)?\.?(.+?)\.(wikia.*|(?:[\d]{1,3}\.){3}[\d]{1,3}\.xip)\.(?:com|local|io)$/;
    match = hostName.match(regex);
    return getFallbackDomain(localSettings, match ? match[1] : getFallbackWiki(localSettings));
}
exports.getWikiDomainName = getWikiDomainName;
/**
 * @desc Removes the port from hostname
 *
 * @param {string} host
 * @returns {string}
 */
function clearHost(host) {
    return host.split(':')[0]; //get rid of port
}
exports.clearHost = clearHost;
/**
 * @desc Get vertical color from localSettings
 *
 * @param {LocalSettings} localSettings
 * @param {string} vertical
 * @return {string}
 */
function getVerticalColor(localSettings, vertical) {
    if (localSettings.verticalColors.hasOwnProperty(vertical)) {
        return localSettings.verticalColors[vertical];
    }
    return null;
}
exports.getVerticalColor = getVerticalColor;
function parseQueryParams(obj, allowedKeys) {
    var parsed = {}, key, rawProp, prop;
    if (allowedKeys instanceof Array) {
        allowedKeys.forEach(function (key) {
            if (obj.hasOwnProperty(key)) {
                rawProp = obj[key];
                if (!isNaN(+rawProp)) {
                    prop = +rawProp;
                }
                else if (rawProp.toLowerCase() === 'true') {
                    prop = true;
                }
                else if (rawProp.toLowerCase() === 'false') {
                    prop = false;
                }
                else {
                    prop = Hoek.escapeHtml(rawProp);
                }
                parsed[key] = prop;
            }
        });
    }
    return parsed;
}
exports.parseQueryParams = parseQueryParams;
