var Article = require('../../lib/Article');
var Caching = require('../../lib/Caching');
var Utils = require('../../lib/Utils');
var localSettings = require('../../../config/localSettings');
var wrapResult = require('./presenters/wrapResult');
var cachingTimes = {
    enabled: true,
    cachingPolicy: Caching.Policy.Public,
    varnishTTL: Caching.Interval.standard,
    browserTTL: Caching.Interval.disabled
}, randomTitleCachingTimes = {
    enabled: false,
    cachingPolicy: Caching.Policy.Private,
    varnishTTL: Caching.Interval.disabled,
    browserTTL: Caching.Interval.disabled
};
function isRequestForRandomTitle(query) {
    return (typeof query.random !== 'undefined' && typeof query.titleOnly !== 'undefined');
}
/**
 * get
 * @description Entry point method for getting article API data, a HapiRouteHandler
 * @param {Hapi.Request} request
 * @param reply
 * @param error
 * @param result
 */
function get(request, reply) {
    var wikiDomain = Utils.getCachedWikiDomainName(localSettings, request.headers.host), params = {
        wikiDomain: wikiDomain,
        title: request.params.articleTitle,
        redirect: request.params.redirect
    }, article, allowCache = true;
    if (request.state.wikicities_session) {
        params.headers = {
            'Cookie': "wikicities_session=" + request.state.wikicities_session
        };
        allowCache = false;
    }
    article = new Article.ArticleRequestHelper(params);
    if (isRequestForRandomTitle(request.query)) {
        article.getArticleRandomTitle(function (error, result) {
            var wrappedResult = wrapResult(error, result);
            Caching.disableCache(reply(wrappedResult));
        });
        return;
    }
    article.getData(function (error, result) {
        // TODO: Consider normalizing all error handling to Boom
        var wrappedResult = wrapResult(error, result), response = reply(wrappedResult).code(wrappedResult.status);
        if (allowCache) {
            return Caching.setResponseCaching(response, cachingTimes);
        }
        Caching.disableCache(response);
    });
}
exports.get = get;
