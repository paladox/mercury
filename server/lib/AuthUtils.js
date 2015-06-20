/// <reference path='../../typings/node/node.d.ts' />
/**
 * @description Helper methods for the Auth Flow
 */
var url = require('url');
var querystring = require('querystring');
var wikiaSignupPathname = '/wiki/Special:UserSignup', wikiaLoginPathname = '/wiki/Special:UserLogin', forgotPasswordSearch = '?recover=1';
function getSignupUrlFromRedirect(redirect) {
    var signupUrlObj = url.parse(redirect);
    signupUrlObj.pathname = wikiaSignupPathname;
    return url.format(signupUrlObj);
}
exports.getSignupUrlFromRedirect = getSignupUrlFromRedirect;
function getForgotPasswordUrlFromRedirect(redirect) {
    var forgotPasswordUrlObj = url.parse(redirect);
    forgotPasswordUrlObj.pathname = wikiaLoginPathname;
    forgotPasswordUrlObj.search = forgotPasswordSearch;
    return url.format(forgotPasswordUrlObj);
}
exports.getForgotPasswordUrlFromRedirect = getForgotPasswordUrlFromRedirect;
function getLoginUrlFromRedirect(redirect) {
    var forgotPasswordUrlObj = url.parse(redirect);
    forgotPasswordUrlObj.pathname = wikiaLoginPathname;
    return url.format(forgotPasswordUrlObj);
}
exports.getLoginUrlFromRedirect = getLoginUrlFromRedirect;
function getCacheBusterUrl(redirect) {
    var cacheBustedUrlObj = url.parse(redirect), query = querystring.parse(cacheBustedUrlObj.query);
    query.cb = Math.floor(Math.random() * 10000);
    cacheBustedUrlObj.search = querystring.stringify(query);
    return url.format(cacheBustedUrlObj);
}
exports.getCacheBusterUrl = getCacheBusterUrl;
