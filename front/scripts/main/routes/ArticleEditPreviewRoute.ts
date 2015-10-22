/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../mixins/FullPageMixin.ts"/>

'use strict';

App.ArticleEditPreviewRoute = Em.Route.extend(App.FullPageMixin, {
	model: function(params: any): Em.RSVP.Promise {
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
});
