/// <reference path="../app.ts" />
/// <reference path="../../baseline/mercury.d.ts" />
'use strict';

App.ArticleEditPreviewController = Em.Controller.extend({
	application: Em.inject.controller(),

	actions: {
		publish(): void {
			console.log('ArticleEditPreviewController.actions.publish');

			this.transitionToRoute(
				'articleEditInformation',
				this.get('model.title'),
				this.get('model.sectionIndex')
			);
		},
		back(): void {
			console.log('ArticleEditPreviewController.actions.back');

			this.transitionToRoute(
				'articleEdit',
				this.get('model.title'),
				this.get('model.sectionIndex')
			);
		}
	}
});
