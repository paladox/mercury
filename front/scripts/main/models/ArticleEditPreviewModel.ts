/// <reference path="../app.ts" />
/// <reference path="../../baseline/mercury" />
/// <reference path="../mixins/ArticleEditMixin.ts" />
'use strict';

App.ArticleEditPreviewModel = Em.Object.extend({
	content: null,
	originalContent: null,
	timestamp: null,
	title: null,
	sectionIndex: null,
	isDirty: Em.computed('content', 'originalContent', function (): boolean {
		return this.get('content') !== this.get('originalContent');
	})
});

App.ArticleEditPreviewModel.reopenClass(App.ArticleEditMixin, {
	load: function(title: string, sectionIndex: number): Em.RSVP.Promise {
		console.log('ArticleEditPreviewModel.load');

		return new Em.RSVP.Promise((resolve: Function, reject: Function): void => {
			console.log("ArticleEditPreviewModel.load resolve promise");

			// fixme: need to get data from ArticleEdit
			resolve(App.ArticleEditPreviewModel.create({
				title: title,
				sectionIndex: sectionIndex,
				content: 'content',
				originalContent: 'originalContent',
				timestamp: 'timestamp'
			}));
		});
	}
});
