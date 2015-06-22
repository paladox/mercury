export class Internal {
	baseUrl;
	callbackTimeout;
	success;
	error;
	head;
	defaults;

	constructor () {
		var config = Internal.getConfig();

		this.callbackTimeout = 200;
		this.baseUrl = 'http://a.wikia-beacon.com/__track/';
		this.head = document.head || document.getElementsByTagName('head')[0];
		this.defaults = config;
	}

	static getConfig () {
		var mercury = window.Mercury;

		return {
			c: mercury.wiki.id,
			x: mercury.wiki.dbName,
			lc: mercury.wiki.language.user,
			u: 0,
			s: 'mercury',
			beacon: '',
			cb: ~~(Math.random() * 99999)
		};
	}

	static isPageView (category) {
		return category.toLowerCase() === 'view';
	}

	createRequestURL (category, params) {
		var parts = [],
			paramStr,
			targetRoute = Internal.isPageView(category) ? 'view' : 'special/trackingevent',
			value;

		Object.keys(params).forEach((key) => {
			value = params[key];

			if (value != null) {
				paramStr = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
				parts.push(paramStr);
			}
		});

		return this.baseUrl + targetRoute + '?' + parts.join('&');
	}

	loadTrackingScript (url) {
		var script = document.createElement('script');

		script.src = url;

		script.onload = script.onreadystatechange = (abort) => {

			if (!abort || !!script.readyState || !/loaded|complete/.test(script.readyState)) {
				return;
			}

			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;

			// Remove the script
			if (this.head && script.parentNode) {
				this.head.removeChild(script);
			}

			// Dereference the script
			script = undefined;

			if (!abort && typeof this.success === 'function') {
				setTimeout(this.success, this.callbackTimeout);

			} else if (abort && typeof this.error === 'function') {
				setTimeout(this.error, this.callbackTimeout);
			}
		};

		this.head.insertBefore(script, this.head.firstChild);
	}

	track (params) {
		var config = $.extend(params, this.defaults);

		this.loadTrackingScript(
			this.createRequestURL(config.ga_category, config)
		);
	}

	/**
	 * alias to track a page view
	 */
	trackPageView (context) {
		this.track($.extend({
			ga_category: 'view'
		}, context));
	}
}
