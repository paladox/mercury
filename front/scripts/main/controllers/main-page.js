import App from 'app';

App.MainPageController = Ember.Controller.extend({
	application: Ember.inject.controller(),

	noAds: Ember.computed.alias('application.noAds'),

	/**
	 * @returns {void}
	 */
	init() {
		this.setProperties({
			mainPageTitle: Ember.get(Mercury, 'wiki.mainPageTitle'),
			siteName: Ember.getWithDefault(Mercury, 'wiki.siteName', 'Wikia')
		});
	}
});

export default App.MainPageController;
