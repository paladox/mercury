/// <reference path='../../../typings/hapi/hapi.d.ts' />
var authUtils = require('../../lib/AuthUtils');
var caching = require('../../lib/Caching');
function get(request, reply) {
    var context, redirectUrl = request.query.redirect || '/', response;
    if (request.auth.isAuthenticated) {
        return reply.redirect(redirectUrl);
    }
    context = {
        title: 'auth:join.title',
        facebookConnectHref: authUtils.getLoginUrlFromRedirect(redirectUrl),
        loginRoute: '/login?redirect=' + encodeURIComponent(redirectUrl),
        hideHeader: true,
        hideFooter: true,
        exitTo: redirectUrl,
        bodyClasses: 'splash auth-landing-page',
        noScripts: true,
        signupHref: authUtils.getSignupUrlFromRedirect(redirectUrl)
    };
    response = reply.view('auth-landing-page', context, {
        layout: 'auth'
    });
    caching.disableCache(response);
    return response;
}
module.exports = get;
