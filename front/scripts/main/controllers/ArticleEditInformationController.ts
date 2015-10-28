/// <reference path="../app.ts" />
/// <reference path="../../baseline/mercury.d.ts" />
'use strict';

App.ArticleEditInformationController = Em.Controller.extend({
	application: Em.inject.controller(),


	actions: {
		publish(): void {
			console.log('ArticleEditInformationController.actions.publish');

			this.transitionToRoute(
				'articleEditPreview',
				this.get('model.title'),
				this.get('model.sectionIndex')
			);
		},
		back(): void {
			console.log('ArticleEditInformationController.actions.back');

			this.transitionToRoute('article', this.get('model.title'));
			M.track({
				action: M.trackActions.click,
				category: 'sectioneditor',
				label: 'back',
				value: this.get('publishDisabled')
			});
		}
	}
});
