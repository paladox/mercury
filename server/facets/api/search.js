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
    var params = {
        wikiDomain: Utils.getCachedWikiDomainName(localSettings, request.headers.host),
        query: request.params.query
    };
    new MW.SearchRequest({
        wikiDomain: params.wikiDomain
    })
        .searchForQuery(params.query)
        .then(function (result) {
        var error = result.exception || null, wrappedResult = wrapResult(error, result);
        Caching.setResponseCaching(reply(wrappedResult), cachingTimes);
    })
        .catch(function (err) {
        reply(err).code(err.exception.code || 500);
    });
}
exports.get = get;
