/// <reference path="../app.ts" />
/// <reference path="../../baseline/mercury.d.ts" />
'use strict';

App.MainPageController = Em.Controller.extend({
	init: function (): void {
		this.set('siteName', Em.getWithDefault(Mercury, 'wiki.siteName', 'Wikia'));
	},

	actions: {
		openCuratedContentItem: function(item) {
			if (item.type === 'section') {
				this.transitionToRoute('mainPage.section', item.label);
			} else if (item.type === 'category') {
				this.transitionToRoute('mainPage.category', item.label);
			}
		}
	}
});
