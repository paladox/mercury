/// <reference path="../../typings/hapi/hapi.d.ts" />
/// <reference path="../../typings/boom/boom.d.ts" />
/// <reference path="../lib/Utils.ts" />
var Article = require('../lib/Article');
var Boom = require('boom');
var Utils = require('../lib/Utils');
var localSettings = require('../../config/localSettings');
var verifyMWHash = require('./operations/verifyMWHash');
var prepareArticleData = require('./operations/prepareArticleData');
function editorPreview(request, reply) {
    var wikiDomain = Utils.getCachedWikiDomainName(localSettings, request.headers.host), parserOutput = request.payload.parserOutput, mwHash = request.payload.mwHash, article = new Article.ArticleRequestHelper({ wikiDomain: wikiDomain });
    article.getWikiVariables(function (error, wikiVariables) {
        var article = {}, result = {};
        if (!error) {
            if (verifyMWHash(parserOutput, mwHash)) {
                article = JSON.parse(parserOutput);
            }
            else {
                error = Boom.forbidden('Failed to verify source');
            }
        }
        result = {
            article: {
                article: article,
                adsContext: {},
                details: {
                    id: 0,
                    title: '',
                    revision: {},
                    type: 'article'
                },
                preview: true
            },
            wiki: wikiVariables || {},
            // TODO: copied from Article.ts (move createServerData to prepareArticleData?)
            server: {
                cdnBaseUrl: localSettings.environment === Utils.Environment.Prod ? localSettings.cdnBaseUrl : ''
            },
            error: error
        };
        prepareArticleData(request, result);
        // TODO: why is this needed for the images to load?
        result.tracking = localSettings.tracking;
        reply.view('application', result);
    });
}
module.exports = editorPreview;
