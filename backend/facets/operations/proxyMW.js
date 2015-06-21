/// <reference path="../../../typings/hapi/hapi.d.ts" />
var MW = require('../../lib/MediaWiki');
var localSettings = require('../../../config/localSettings');
var Utils = require('../../lib/Utils');
function proxyMW(request, reply) {
    var path = request.path.substr(1), url = MW.createUrl(Utils.getCachedWikiDomainName(localSettings, request.headers.host), path);
    reply.proxy({
        uri: url,
        redirects: localSettings.proxyMaxRedirects
    });
}
;
module.exports = proxyMW;
