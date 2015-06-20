/// <reference path="../../typings/bluebird/bluebird.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/wreck/wreck.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * @description Mediawiki API functions
 */
var localSettings = require('../../config/localSettings');
var Logger = require('./Logger');
var Wreck = require('wreck');
var Promise = require('bluebird');
var BaseRequest = (function () {
    /**
     * Search request constructor
     *
     * @param params
     */
    function BaseRequest(params) {
        this.wikiDomain = params.wikiDomain;
        this.headers = params.headers;
    }
    BaseRequest.prototype.fetch = function (url) {
        return fetch(url, this.wikiDomain, this.redirects, this.headers);
    };
    return BaseRequest;
})();
/**
 * Wrapper class for making API search requests
 */
var SearchRequest = (function (_super) {
    __extends(SearchRequest, _super);
    function SearchRequest() {
        _super.apply(this, arguments);
    }
    /**
     * Default parameters to make the request url clean -- we may
     * want to customize later
     * @param query Search query
     * @return {Promise<any>}
     */
    SearchRequest.prototype.searchForQuery = function (query) {
        var url = createUrl(this.wikiDomain, 'wikia.php', {
            controller: 'MercuryApi',
            method: 'getSearchSuggestions',
            query: query
        });
        return this.fetch(url);
    };
    return SearchRequest;
})(BaseRequest);
exports.SearchRequest = SearchRequest;
/**
 * @desc a wrapper for making API requests for info about the wiki
 *
 */
var WikiRequest = (function (_super) {
    __extends(WikiRequest, _super);
    function WikiRequest() {
        _super.apply(this, arguments);
    }
    /**
     * Gets general wiki information
     *
     * @return {Promise<any>}
     */
    WikiRequest.prototype.getWikiVariables = function () {
        var url = createUrl(this.wikiDomain, 'wikia.php', {
            controller: 'MercuryApi',
            method: 'getWikiVariables'
        });
        return this.fetch(url);
    };
    return WikiRequest;
})(BaseRequest);
exports.WikiRequest = WikiRequest;
/**
 * Gets article data
 */
var ArticleRequest = (function (_super) {
    __extends(ArticleRequest, _super);
    function ArticleRequest() {
        _super.apply(this, arguments);
    }
    /**
     * Fetch article data
     *
     * @param title
     * @param redirect
     * @return {Promise<any>}
     */
    ArticleRequest.prototype.article = function (title, redirect) {
        var urlParams = {
            controller: 'MercuryApi',
            method: 'getArticle',
            title: title
        }, url;
        if (redirect) {
            urlParams.redirect = redirect;
        }
        url = createUrl(this.wikiDomain, 'wikia.php', urlParams);
        return this.fetch(url);
    };
    ArticleRequest.prototype.comments = function (articleId, page) {
        if (page === void 0) { page = 0; }
        var url = createUrl(this.wikiDomain, 'wikia.php', {
            controller: 'MercuryApi',
            method: 'getArticleComments',
            id: articleId,
            page: page
        });
        return this.fetch(url);
    };
    ArticleRequest.prototype.curatedContentSection = function (sectionName) {
        var url = createUrl(this.wikiDomain, 'wikia.php', {
            controller: 'MercuryApi',
            method: 'getCuratedContentSection',
            section: sectionName
        });
        return this.fetch(url);
    };
    ArticleRequest.prototype.category = function (categoryName, thumbSize) {
        var url = createUrl(this.wikiDomain, 'wikia.php', {
            controller: 'ArticlesApi',
            method: 'getList',
            expand: 'true',
            // Articles and subcategories
            namespaces: '0,14',
            abstract: 0,
            width: thumbSize.width,
            height: thumbSize.height,
            category: categoryName
        });
        return this.fetch(url);
    };
    /**
     * Get random article title
     *
     * @return {Promise<any>}
     */
    ArticleRequest.prototype.randomTitle = function () {
        var url = createUrl(this.wikiDomain, 'api.php', {
            action: 'query',
            generator: 'random',
            grnnamespace: 0,
            cb: Date.now(),
            format: 'json'
        });
        return this.fetch(url);
    };
    return ArticleRequest;
})(BaseRequest);
exports.ArticleRequest = ArticleRequest;
/**
 * Fetch http resource
 *
 * @param url the url to fetch
 * @param redirects the number of redirects to follow, default 1
 * @return {Promise<any>}
 */
function fetch(url, host, redirects, headers) {
    if (host === void 0) { host = ''; }
    if (redirects === void 0) { redirects = 1; }
    if (headers === void 0) { headers = {}; }
    headers.Host = host;
    return new Promise(function (resolve, reject) {
        Wreck.get(url, {
            redirects: redirects,
            headers: headers,
            timeout: localSettings.backendRequestTimeout,
            json: true
        }, function (err, response, payload) {
            if (err) {
                Logger.error({
                    url: url,
                    error: err
                }, 'Error fetching url');
                reject(err);
            }
            else if (response.statusCode === 200) {
                resolve(payload);
            }
            else {
                // When an empty response comes (for example 503 from Varnish) make it look same as the MediaWiki one
                if (payload === null) {
                    payload = {
                        exception: {
                            message: 'Empty response',
                            code: response.statusCode,
                            details: null
                        }
                    };
                }
                Logger.error({
                    url: url,
                    headers: response.headers,
                    statusCode: response.statusCode
                }, 'Bad HTTP response');
                reject(payload);
            }
        });
    });
}
exports.fetch = fetch;
/**
 * Create request URL
 *
 * @param wikiDomain
 * @param path
 * @param params
 * @return {string} url
 */
function createUrl(wikiDomain, path, params) {
    if (params === void 0) { params = {}; }
    var qsAggregator = [], queryParam;
    Object.keys(params).forEach(function (key) {
        queryParam = (typeof params[key] !== 'undefined') ?
            key + '=' + encodeURIComponent(params[key]) :
            key;
        qsAggregator.push(queryParam);
    });
    // if mediawikiDomain is defined, override the wikiDomain
    if (localSettings.mediawikiDomain) {
        wikiDomain = localSettings.mediawikiDomain;
    }
    return 'http://' + wikiDomain + '/' + path + (qsAggregator.length > 0 ? '?' + qsAggregator.join('&') : '');
}
exports.createUrl = createUrl;
