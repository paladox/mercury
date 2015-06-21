var Caching = require('../../lib/Caching');
var MW = require('../../lib/MediaWiki');
var Utils = require('../../lib/Utils');
var localSettings = require('../../../config/localSettings');
var wrapResult = require('./presenters/wrapResult');
var cachingTimes = {
    enabled: false,
    cachingPolicy: Caching.Policy.Private,
    varnishTTL: Caching.Interval.disabled,
    browserTTL: Caching.Interval.disabled
};
function get(request, reply) {
    var wikiDomain = Utils.getCachedWikiDomainName(localSettings, request.headers.host), url = MW.createUrl(wikiDomain, 'api/v1/User/Details', request.query);
    MW.fetch(url, wikiDomain)
        .then(function (result) {
        var error = result.exception || null;
        Caching.setResponseCaching(reply(wrapResult(error, result)), cachingTimes);
    })
        .catch(function (err) {
        var errorCode = (err && err.exception && err.exception.code) ?
            err.exception.code : 500;
        reply(err).code(errorCode);
    });
}
exports.get = get;
