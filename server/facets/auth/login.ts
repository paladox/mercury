/// <reference path='../../../typings/wreck/wreck.d.ts' />
/// <reference path='../../../config/localSettings.d.ts' />
/// <reference path='../../../typings/hapi/hapi.d.ts' />
/// <reference path='../../../typings/boom/boom.d.ts' />
import Boom = require('boom');
import Wreck = require('wreck');
import localSettings = require('../../../config/localSettings');
import qs = require('querystring');
import authUtils = require('../../lib/AuthUtils');
import authView = require('./authView');
var deepExtend = require('deep-extend');

interface AuthParams {
	'user_id': string;
	'access_token': string;
	'refresh_token': string;
	'redirect'?: string;
}

interface AuthCallbackFn {
	(error: Boom.BoomError, response?: any): Function;
}

interface HeliosResponse {
	'user_id': string;
	'access_token': string;
	'refresh_token': string;
	'token_type': string;
	'expires_in': string;
	'error'?: string;
	'error_description'?: string;
}

interface LoginViewContext extends authView.AuthViewContext {
	headerText: string;
	forgotPasswordHref?: string;
	formErrorKey?: string;
}

function authenticate (username: string, password: string, callback: AuthCallbackFn): void {
	Wreck.get(localSettings.helios.host + '/token?' + qs.stringify({
		'grant_type'    : 'password',
		'client_id'     : localSettings.helios.id,
		'client_secret' : localSettings.helios.secret,
		'username'      : username,
		'password'      : password
	}), (err: any, response: any, payload: string) => {
		var parsed: HeliosResponse,
			parseError: Error;

		try {
			parsed = JSON.parse(payload);
		} catch (e) {
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
			/* tslint:enable:no-string-literal */
		}
		callback(null, parsed);
	});
}

/**
 * Obtains i18n key of a proper message to display in Front-End based on Helios response
 */
function getFormErrorKey (statusCode: number): string {
	if (statusCode === 401) {
		return 'auth:login.wrong-credentials';
	}
	return 'auth:common.server-error';
}

function getLoginViewContext (request: Hapi.Request, redirect: string): LoginViewContext {
	return deepExtend(
		authView.getDefaultContext(request),
		{
			title: 'auth:login.login-title',
			headerText: 'auth:login.welcome-back',
			footerCallout: 'auth:login.register-callout',
			footerCalloutLink: 'auth:login.register-now',
			footerHref: authUtils.getSignupUrlFromRedirect(redirect),
			forgotPasswordHref: authUtils.getForgotPasswordUrlFromRedirect(redirect),
			bodyClasses: 'login-page'
		}
	);
}

export function get (request: Hapi.Request, reply: any): Hapi.Response {
	var redirect: string = authView.getRedirectUrl(request),
		context: LoginViewContext = getLoginViewContext(request, redirect);

	if (request.auth.isAuthenticated) {
		return reply.redirect(redirect);
	}

	return authView.view('login', context, request, reply);
}

export function post (request: Hapi.Request, reply: any): void {
	var credentials: any = request.payload,
		requestedWithHeader: string = request.headers['x-requested-with'],
		isAJAX: boolean = requestedWithHeader && !!requestedWithHeader.match('XMLHttpRequest'),
		redirect: string = authView.getRedirectUrl(request),
		successRedirect: string,
		context: LoginViewContext = getLoginViewContext(request, redirect),
		ttl = 1.57785e10; // 6 months

	// add cache buster value to the URL upon successful login
	successRedirect = authUtils.getCacheBusterUrl(redirect);

	authenticate(credentials.username, credentials.password, (err: Boom.BoomError, response: HeliosResponse) => {
		if (err) {
			context.formErrorKey = getFormErrorKey(err.output.statusCode);
			context.exitTo = redirect;

			if (isAJAX) {
				return reply(context).code(err.output.statusCode);
			}

			return reply.view('login', context, {
				layout: 'auth'
			// Always set the correct status code
			}).code(err.output.statusCode);
		}

		// set unencrypted cookie that can be read by all apps (i.e. MW and Mercury) HG-631
		reply.state('access_token', response.access_token, {ttl: ttl});

		reply.state('wikicitiesUserID', response.user_id, {ttl: ttl});

		if (isAJAX) {
			return reply({redirect: successRedirect});
		}

		return reply.redirect(successRedirect);
	});
}