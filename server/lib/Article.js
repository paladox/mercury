/// <reference path="../../typings/hapi/hapi.d.ts" />
/// <reference path="../../typings/bluebird/bluebird.d.ts" />
/// <reference path="../../typings/mercury/mercury-server.d.ts" />
/// <reference path="../lib/Utils.ts" />
var Promise = require('bluebird');
var MediaWiki = require('./MediaWiki');
var Utils = require('./Utils');
var logger = require('./Logger');
var localSettings = require('../../config/localSettings');
var ArticleRequestHelper = (function () {
    function ArticleRequestHelper(params) {
        this.params = params;
    }
    ArticleRequestHelper.prototype.setTitle = function (title) {
        this.params.title = title;
    };
    /**
     * Create server data
     *
     * @returns ServerData
     */
    ArticleRequestHelper.prototype.createServerData = function (wikiDomain) {
        if (wikiDomain === void 0) { wikiDomain = ''; }
        return {
            mediawikiDomain: Utils.getWikiDomainName(localSettings, wikiDomain),
            apiBase: localSettings.apiBase,
            environment: Utils.getEnvironmentString(localSettings.environment),
            cdnBaseUrl: localSettings.environment === Utils.Environment.Prod ? localSettings.cdnBaseUrl : ''
        };
    };
    /**
     * Handler for /article/{wiki}/{articleId} -- Currently calls to Wikia public JSON api for article:
     * http://www.wikia.com/api/v1/#!/Articles
     * This API is really not sufficient for semantic routes, so we'll need some what of retrieving articles by using the
     * article slug name
     *
     * @param {Function} callback
     * @param {boolean} getWikiVariables whether or not to make a WikiRequest to get information about the wiki
     */
    ArticleRequestHelper.prototype.getData = function (callback, getWikiVariables) {
        if (getWikiVariables === void 0) { getWikiVariables = false; }
        var requests = [
            new MediaWiki.ArticleRequest(this.params).article(this.params.title, this.params.redirect)
        ];
        logger.debug(this.params, 'Fetching article');
        if (getWikiVariables) {
            logger.debug({ wiki: this.params.wikiDomain }, 'Fetching wiki variables');
            requests.push(new MediaWiki.WikiRequest({
                wikiDomain: this.params.wikiDomain
            }).getWikiVariables());
        }
        /**
         * @see https://github.com/petkaantonov/bluebird/blob/master/API.md#settle---promise
         *
         * From Promise.settle documentation:
         * Given an array, or a promise of an array, which contains promises (or a mix of promises and values)
         * return a promise that is fulfilled when all the items in the array are either fulfilled or rejected.
         * The fulfillment value is an array of PromiseInspection instances at respective positions in relation
         * to the input array. This method is useful for when you have an array of promises and you'd like to know
         * when all of them resolve - either by fulfilling of rejecting.
         */
        Promise.settle(requests)
            .then(function (results) {
            var articlePromise = results[0], wikiPromise = results[1], article, wikiVariables = {};
            // if promise is fulfilled - use resolved value, if it's not - use rejection reason
            article = articlePromise.isFulfilled() ?
                articlePromise.value() :
                articlePromise.reason();
            if (getWikiVariables) {
                wikiVariables = wikiPromise.isFulfilled() ?
                    wikiPromise.value() :
                    wikiPromise.reason();
            }
            callback(article.exception, article.data, wikiVariables.data);
        });
    };
    /**
     * Handle full page data generation
     * @param {Function} next
     */
    ArticleRequestHelper.prototype.getFull = function (next) {
        var _this = this;
        this.getData(function (error, article, wikiVariables) {
            next(error, {
                server: _this.createServerData(_this.params.wikiDomain),
                wiki: wikiVariables || {},
                article: article || {}
            });
        }, true);
    };
    /**
     * Get WikiVariables
     * @param {Function} next
     */
    ArticleRequestHelper.prototype.getWikiVariables = function (next) {
        var wikiRequest = new MediaWiki.WikiRequest(this.params);
        logger.debug(this.params, 'Fetching wiki variables');
        wikiRequest
            .getWikiVariables()
            .then(function (wikiVariables) {
            next(null, wikiVariables.data);
        }, function (error) {
            next(error, null);
        });
    };
    /**
     * Handle article page data generation, no need for WikiVariables
     * @param {*} wikiVariables
     * @param {Function} next
     */
    ArticleRequestHelper.prototype.getArticle = function (wikiVariables, next) {
        var _this = this;
        this.getData(function (error, article) {
            next(error, {
                server: _this.createServerData(_this.params.wikiDomain),
                wiki: wikiVariables || {},
                article: article || {}
            });
        }, false);
    };
    ArticleRequestHelper.prototype.getArticleRandomTitle = function (next) {
        var articleRequest = new MediaWiki.ArticleRequest(this.params);
        articleRequest
            .randomTitle()
            .then(function (result) {
            var articleId, pageData;
            if (result.query && result.query.pages) {
                articleId = Object.keys(result.query.pages)[0];
                pageData = result.query.pages[articleId];
                next(null, {
                    title: pageData.title
                });
            }
            else {
                next(result.error, null);
            }
        }, function (error) {
            next(error, null);
        });
    };
    return ArticleRequestHelper;
})();
exports.ArticleRequestHelper = ArticleRequestHelper;
