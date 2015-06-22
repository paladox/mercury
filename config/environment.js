/* jshint node: true */

module.exports = function(environment) {
	var ENV = {
		//TODO: unhardcode that
		apiBase: 'api/v1',
		modulePrefix: 'mercury',
		environment: environment,
		baseURL: '/',
		locationType: 'auto',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			}
		},
		APP: {
				// Here you can pass flags/options to your application instance
				// when it is created
		},
		contentSecurityPolicy: {
			//TODO: investigate why this needs to be here
			'style-src': "'self' 'unsafe-inline'",
		}
	};

	// turn on debugging with querystring ?debug=1
	if (environment === 'development' ||
	  this.location && this.location.search.match(/debug=1/)
	) {
		ENV.APP.LOG_RESOLVER = true;
		ENV.APP.LOG_ACTIVE_GENERATION = true;
		ENV.APP.LOG_TRANSITIONS = true;
		ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.baseURL = '/';
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {
	}

	return ENV;
};
