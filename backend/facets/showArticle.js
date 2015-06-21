/// <reference path="../../typings/hapi/hapi.d.ts" />
/// <reference path="../lib/Article.ts" />
var Article = require('../lib/Article');
var Utils = require('../lib/Utils');
var Tracking = require('../lib/Tracking');
var Caching = require('../lib/Caching');
var localSettings = require('../../config/localSettings');
var prepareArticleData = require('./operations/prepareArticleData');
var cachingTimes = {
    enabled: true,
    cachingPolicy: Caching.Policy.Public,
    varnishTTL: Caching.Interval.standard,
    browserTTL: Caching.Interval.disabled
};
function showArticle(request, reply) {
    var path = request.path, wikiDomain = Utils.getCachedWikiDomainName(localSettings, request.headers.host), params = {
        wikiDomain: wikiDomain,
        redirect: request.query.redirect
    }, article, allowCache = true;
    if (request.state.wikicities_session) {
        params.headers = {
            'Cookie': "wikicities_session=" + request.state.wikicities_session
        };
        allowCache = false;
    }
    article = new Article.ArticleRequestHelper(params);
    if (path === '/' || path === '/wiki/') {
        article.getWikiVariables(function (error, wikiVariables) {
            if (error) {
                // TODO check error.statusCode and react accordingly
                reply.redirect(localSettings.redirectUrlOnNoData);
            }
            else {
                article.setTitle(wikiVariables.mainPageTitle);
                article.getArticle(wikiVariables, function (error, result) {
                    if (result === void 0) { result = {}; }
                    onArticleResponse(request, reply, error, result, allowCache);
                });
            }
        });
    }
    else {
        article.setTitle(request.params.title);
        article.getFull(function (error, result) {
            if (result === void 0) { result = {}; }
            onArticleResponse(request, reply, error, result, allowCache);
        });
    }
}
/**
 * Handles article response from API
 *
 * @param {Hapi.Request} request
 * @param reply
 * @param error
 * @param result
 */
function onArticleResponse(request, reply, error, result, allowCache) {
    if (result === void 0) { result = {}; }
    if (allowCache === void 0) { allowCache = true; }
    var code = 200, response;
    if (!result.article.details && !result.wiki.dbName) {
        //if we have nothing to show, redirect to our fallback wiki
        reply.redirect(localSettings.redirectUrlOnNoData);
    }
    else {
        Tracking.handleResponse(result, request);
        if (error) {
            code = error.code || error.statusCode || 500;
            result.error = JSON.stringify(error);
        }
        prepareArticleData(request, result);
        // all the third party scripts we don't want to load on noexternals
        if (!result.queryParams.noexternals) {
            // optimizely
            if (localSettings.optimizely.enabled) {
                result.optimizelyScript = localSettings.optimizely.scriptPath +
                    (localSettings.environment === Utils.Environment.Prod ?
                        localSettings.optimizely.account : localSettings.optimizely.devAccount) + '.js';
            }
            // qualaroo
            if (localSettings.qualaroo.enabled) {
                result.qualarooScript = localSettings.environment === Utils.Environment.Prod ?
                    localSettings.qualaroo.scriptUrlProd : localSettings.qualaroo.scriptUrlDev;
            }
        }
        response = reply.view('application', result);
        response.code(code);
        response.type('text/html; charset=utf-8');
        if (allowCache) {
            return Caching.setResponseCaching(response, cachingTimes);
        }
        return Caching.disableCache(response);
    }
}
module.exports = showArticle;
