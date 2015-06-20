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
        sectionName: request.params.sectionName || null
    };
    if (params.sectionName === null) {
        // TODO: ad hoc error handling, use Boom everywhere?
        reply(Boom.badRequest('Section not provided'));
    }
    else {
        new MW.ArticleRequest(params).curatedContentSection(params.sectionName)
            .then(function (response) {
            reply(response);
            Caching.setResponseCaching(response, cachingTimes);
        }, function (error) {
            var wrappedResult = wrapResult(error, {});
            reply(wrappedResult).code(wrappedResult.status);
        });
    }
}
exports.get = get;
