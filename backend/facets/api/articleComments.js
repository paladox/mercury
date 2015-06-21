/// <reference path="../../../typings/hapi/hapi.d.ts" />
/// <reference path="../../../typings/boom/boom.d.ts" />
var Boom = require('boom');
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
/**
 * Wrap article comments data response
 *
 * @param commentsData Article comments payload from API
 * @returns Wrapped Article comments object
 */
function transformResponse(commentsData) {
    // TODO: ad hoc response wrapping, normalize across app
    return {
        payload: {
            comments: commentsData.payload.comments,
            users: commentsData.payload.users,
            pagesCount: commentsData.pagesCount,
            basePath: commentsData.basePath
        },
        status: {
            code: 200
        }
    };
}
function get(request, reply) {
    var params = {
        wikiDomain: Utils.getCachedWikiDomainName(localSettings, request.headers.host),
        articleId: parseInt(request.params.articleId, 10) || null,
        page: parseInt(request.params.page, 10) || 0
    };
    if (params.articleId === null) {
        // TODO: ad hoc error handling, use Boom everywhere?
        reply(Boom.badRequest('Invalid articleId'));
    }
    else {
        new MW.ArticleRequest(params).comments(params.articleId, params.page)
            .then(function (response) {
            reply(transformResponse(response));
            Caching.setResponseCaching(response, cachingTimes);
        }, function (error) {
            var wrappedResult = wrapResult(error, {});
            reply(wrappedResult).code(wrappedResult.status);
        });
    }
}
exports.get = get;
