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

			//this.transitionToRoute('searchResults');

			/*
			 this.set('isPublishing', true);
			 this.get('application').showLoader();
			 App.ArticleEditModel.publish(this.get('model')).then(
			 this.handlePublishSuccess.bind(this),
			 this.handlePublishError.bind(this)
			 );
			 M.track({
			 action: M.trackActions.click,
			 category: 'sectioneditor',
			 label: 'publish'
			 });
			 */
		},
		back(): void {
			console.log('ArticleEditPreviewController.actions.back');

			this.transitionToRoute(
				'articleEdit',
				this.get('model.title'),
				this.get('model.sectionIndex')
			);

			/*
			this.transitionToRoute('article', this.get('model.title'));
			M.track({
				action: M.trackActions.click,
				category: 'sectioneditor',
				label: 'back',
				value: this.get('publishDisabled')
			});
			*/
		}
	}
});
