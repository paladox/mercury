var M = window.M;

M.prop('apiBase', '/api/mercury', true);
M.provide('wiki', {
	language: {
		content: 'en'
	},
	dbName: 'muppet'
});

window.ga = function(){};
M.prop('tracking', {
	ua: {
		primary: {
			id: 'UA-32129070-1',
			sampleRate: 10
		},
		ads: {
			prefix: 'ads',
			id: 'UA-32129071-1',
			sampleRate: 100
		},
		special: {
			prefix: 'special',
			id: 'UA-32132943-1',
			sampleRate: 100
		},
		scriptUrl: '//www.google-analytics.com/analytics.js'
	}
});

M.prop('weppyConfig', {
	aggregationInterval: function() {},
	host: 'foo',
	samplingRate: 100
});

window.Mercury = window.Mercury || {};
window.Mercury.article = 'lorem ipsum';
