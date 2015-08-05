/// <reference path='../../../typings/hapi/hapi.d.ts' />
import authUtils = require('../../lib/AuthUtils');
import localSettings = require('../../../config/localSettings');
import authView = require('./authView');
var deepExtend = require('deep-extend');


interface SignInViewContext extends authView.AuthViewContext {
	headerText: string;
	forgotPasswordHref?: string;
	heliosLoginURL: string;
	heliosFacebookURL: string;
}

function getSignInViewContext (request: Hapi.Request, redirect: string): SignInViewContext {
	var viewType: string = authView.getViewType(request);

	return deepExtend(
		authView.getDefaultContext(request),
		{
			title: 'auth:signin.signin-title',
			headerText: 'auth:signin.welcome-back',
			footerCallout: 'auth:signin.register-callout',
			footerCalloutLink: 'auth:signin.register-now',
			footerHref: authUtils.getRegisterUrl(request),
			forgotPasswordHref: authUtils.getForgotPasswordUrlFromRedirect(redirect),
			bodyClasses: 'signin-page',
			heliosLoginURL: localSettings.helios.host + '/token',
			heliosFacebookURL: localSettings.helios.host + '/facebook/token',
			facebookAppId: localSettings.facebook.appId
		}
	);
}

function getFBSignInViewContext (request: Hapi.Request, redirect: string): SignInViewContext {
	return deepExtend(
		authView.getDefaultContext(request),
		{
			title: 'auth:signin.signin-title',
			headerText: 'auth:signin.welcome-back',
			footerCallout: 'auth:signin.register-callout',
			footerCalloutLink: 'auth:signin.register-now',
			footerHref: authUtils.getRegisterUrl(request),
			forgotPasswordHref: authUtils.getForgotPasswordUrlFromRedirect(redirect),
			bodyClasses: 'fb-connect-page',
			heliosLoginURL: localSettings.helios.host + '/token',
			heliosFacebookConnectURL: localSettings.helios.host + '/users/',
			facebookAppId: localSettings.facebook.appId
		}
	);
}

function getSignInPage (request: Hapi.Request, reply: any) : Hapi.Response {
	var redirect: string = authView.getRedirectUrl(request),
		context: SignInViewContext = getSignInViewContext(request, redirect);

	if (request.auth.isAuthenticated) {
		return reply.redirect(redirect);
	}

	return authView.view('signin', context, request, reply);
}

function getFacebookSignInPage (request: Hapi.Request, reply: any) : Hapi.Response {
	var redirect: string = authView.getRedirectUrl(request),
		context: SignInViewContext = getFBSignInViewContext(request, redirect);

	if (request.auth.isAuthenticated) {
		return reply.redirect(redirect);
	}

	return authView.view('signin-fb', context, request, reply);
}

export function get (request: Hapi.Request, reply: any): void {
	if (request.query.method === 'facebook') {
		getFacebookSignInPage(request, reply);
	} else {
		getSignInPage(request, reply);
	}
}
