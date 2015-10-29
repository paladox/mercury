/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../mixins/FullPageMixin.ts"/>

'use strict';

App.ArticleEditPreviewRoute = Em.Route.extend(App.ViewportMixin, {
	model: function (params:any): Em.RSVP.Promise {
		console.log('ArticleEditPreviewRoute.model');
		console.log(params);
		return App.ArticleEditPreviewModel.load(params.title, params.sectionIndex);
	},

	renderTemplate(): void {
		console.log('ArticleEditPreviewRoute.renderTemplate');

		this.render('article-edit-preview', {
			controller: 'articleEditPreview'
		});
	},

	actions: {
		publish(): void {
			console.log('ArticleEditPreviewRoute.actions.publish');

			this.transitionTo('articleEditInformation',
				this.currentModel.get('model.title'),
				this.currentModel.get('model.sectionIndex')
			);
		},
		back(): void {
			console.log(this.currentModel.get('title'));
			console.log('ArticleEditPreviewRoute.actions.back');
			console.log(this.get('model.title'));
			console.log(this.get('model.sectionIndex'));

			this.transitionTo('articleEdit',
				this.currentModel.get('title'),
				this.currentModel.get('sectionIndex')
			);
		}
	}
});
