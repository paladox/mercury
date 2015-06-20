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
function get(request, reply) {
    var params = {
        wikiDomain: Utils.getCachedWikiDomainName(localSettings, request.headers.host),
        categoryName: request.params.categoryName,
        thumbSize: request.params.thumbSize || {
            width: 300,
            height: 300
        }
    };
    if (params.categoryName === null) {
        reply(Boom.badRequest('Category not provided'));
    }
    else {
        new MW.ArticleRequest(params)
            .category(params.categoryName, params.thumbSize)
            .then(function (response) {
            reply(response);
            Caching.setResponseCaching(response, cachingTimes);
        }, function (error) {
            var preparedResult = wrapResult(error, {});
            reply(preparedResult).code(preparedResult.status);
        });
    }
}
exports.get = get;
