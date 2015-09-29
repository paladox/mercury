/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />

App.SearchResultsRoute = Em.Route.extend({
	// Don't let the script to start loading multiple times (user opens the route, goes back, opens it again)
	googleCustomSearchLoadingInitialized: false,

	// Return a promise and resolve only after script is loaded - this way the route won't load before it happens
	beforeModel(): Em.RSVP.Promise {
		console.log('beforeModel');

		if (!this.get('googleCustomSearchLoadingInitialized')) {
			return this.loadGoogleCustomSearch();
		}

		console.log("Refreshing search");
		this.set('googleCustomSearchLoadingInitialized', false);
		this.refresh();

		//return new Em.RSVP.Promise((resolve: Function, reject: Function): void => {
		//	resolve();
		//});

		//return this.loadGoogleCustomSearchOld();
	},

	activate(): void {
		console.log('activate');
	},

	loadGoogleCustomSearch() : JQueryXHR {
		var searchKey = '006230450596576500385:kcgbfm7zpa8',
			url = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
				'//www.google.com/cse/cse.js?cx=' + searchKey;

		this.set('googleCustomSearchLoadingInitialized', true);
		return Em.$.getScript(url);
	},

	loadGoogleCustomSearchOld() : void {
		var searchKey : string = '006230450596576500385:kcgbfm7zpa8',
			googleCustomSearch : HTMLScriptElement = document.createElement('script'),
			s : HTMLScriptElement;

		googleCustomSearch.type = 'text/javascript';
		googleCustomSearch.async = true;
		googleCustomSearch.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
			'//www.google.com/cse/cse.js?cx=' + searchKey;

		s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(googleCustomSearch, s);
	}
});
