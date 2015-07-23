interface Window {
	googleInit?: Function;
}

class GoogleApi {

	constructor (onLoad: Function = Function.prototype) {
		var js: HTMLScriptElement,
			firstJS: HTMLScriptElement = window.document.getElementsByTagName('script')[0];
		if (window.document.getElementById('google-jsapi')) {
			return;
		}
		js = window.document.createElement('script');
		js.id = 'google-jsapi';
		js.src = "https://apis.google.com/js/platform.js?onload=googleInit";
		firstJS.parentNode.insertBefore(js, firstJS);

		window.googleInit = function(): void {
			onLoad();
		}.bind(this);
	}

}
