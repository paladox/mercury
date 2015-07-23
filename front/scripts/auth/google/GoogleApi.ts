interface GoogleAuth {
	attachClickHandler?: Function;
}

interface Window {
	gapi?: any;
	googleAuth?: GoogleAuth;
	googleApiInit?: Function;
}

class GoogleApi {

	version: string = 'v2.0';

	constructor (onLoad: Function = Function.prototype) {
		var js: HTMLScriptElement,
			firstJS: HTMLScriptElement = window.document.getElementsByTagName('script')[0];
		if (window.document.getElementById('google-jsapi')) {
			return;
		}
		js = window.document.createElement('script');
		js.id = 'google-jsapi';
		js.src = "https://apis.google.com/js/platform.js?onload=googleApiInit";
		firstJS.parentNode.insertBefore(js, firstJS);

		window.googleApiInit = function(): void {
			onLoad();
		}.bind(this);
	}

}
