/// <reference path='../../../typings/wreck/wreck.d.ts' />
/// <reference path='../../../config/localSettings.d.ts' />
/// <reference path='../../../typings/hapi/hapi.d.ts' />
/// <reference path='../../../typings/boom/boom.d.ts' />
var Boom = require('boom');
var Wreck = require('wreck');
var localSettings = require('../../../config/localSettings');
var qs = require('querystring');
var authUtils = require('../../lib/AuthUtils');
function getLoginContext(request, redirect) {
    return {
        title: 'auth:login.login-title',
        headerText: 'auth:login.welcome-back',
        footerCallout: 'auth:login.register-callout',
        footerCalloutLink: 'auth:login.register-now',
        language: request.server.methods.i18n.getInstance().lng(),
        exitTo: redirect,
        footerHref: authUtils.getSignupUrlFromRedirect(redirect),
        forgotPasswordHref: authUtils.getForgotPasswordUrlFromRedirect(redirect)
    };
}
function authenticate(username, password, callback) {
    Wreck.get(localSettings.helios.host + '/token?' + qs.stringify({
        'grant_type': 'password',
        'client_id': localSettings.helios.id,
        'client_secret': localSettings.helios.secret,
        'username': username,
        'password': password
    }), function (err, response, payload) {
        var parsed, parseError;
        try {
            parsed = JSON.parse(payload);
        }
        catch (e) {
            parseError = e;
        }
        // Detects an error with the connection
        if (err || parseError) {
            return callback(err || Boom.wrap(parseError));
        }
        // Helios sends back a 200 currently, denoting failure only in payload differences here
        if (parsed.error) {
            /* tslint:disable:no-string-literal */
            return callback(Boom.unauthorized(parsed.error + ': ' + parsed['error_description']));
        }
        callback(null, parsed);
    });
}
/**
 * Obtains i18n key of a proper message to display in Front-End based on Helios response
 */
function getFormErrorKey(statusCode) {
    if (statusCode === 401) {
        return 'auth:login.wrong-credentials';
    }
    return 'auth:common.server-error';
}
function get(request, reply) {
    var redirect = request.query.redirect || '/', context = getLoginContext(request, redirect);
    if (request.auth.isAuthenticated) {
        return reply.redirect(redirect);
    }
    return reply.view('login', context, {
        layout: 'auth'
    });
}
exports.get = get;
function post(request, reply) {
    var credentials = request.payload, requestedWithHeader = request.headers['x-requested-with'], isAJAX = requestedWithHeader && !!requestedWithHeader.match('XMLHttpRequest'), redirect = request.query.redirect || '/', successRedirect, context = getLoginContext(request, redirect), ttl = 1.57785e10; // 6 months
    // add cache buster value to the URL upon successful login
    successRedirect = authUtils.getCacheBusterUrl(redirect);
    authenticate(credentials.username, credentials.password, function (err, response) {
        if (err) {
            context.formErrorKey = getFormErrorKey(err.output.statusCode);
            context.exitTo = redirect;
            if (isAJAX) {
                return reply(context).code(err.output.statusCode);
            }
            return reply.view('login', context, {
                layout: 'auth'
            }).code(err.output.statusCode);
        }
        // set unencrypted cookie that can be read by all apps (i.e. MW and Mercury) HG-631
        reply.state('access_token', response.access_token, { ttl: ttl });
        // set session cookie via hapi-auth-cookie
        request.auth.session.set({
            'sid': response.access_token
        });
        // Set cookie TTL for "remember me" period of 6 months
        // TODO: Helios service should control the length of auth session
        request.auth.session.ttl(ttl);
        reply.state('wikicitiesUserID', response.user_id, { ttl: ttl });
        if (isAJAX) {
            return reply({ redirect: successRedirect });
        }
        return reply.redirect(successRedirect);
    });
}
exports.post = post;
