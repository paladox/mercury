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
	/*
	publish: function(model: any): Em.RSVP.Promise {
		console.log('ArticleEditModel.publish');

		return new Em.RSVP.Promise((resolve: Function, reject: Function): void => {
			this.getEditToken(model.title)
				.then((token: any): void => {
					Em.$.ajax(<JQueryAjaxSettings>{
						url: M.buildUrl({path: '/api.php'}),
						data: {
							action: 'edit',
							title: model.title,
							section: model.sectionIndex,
							text: model.content,
							token: token,
							format: 'json'
						},
						dataType: 'json',
						method: 'POST',
						success: (resp: any): void => {
							if (resp && resp.edit && resp.edit.result === 'Success') {
								resolve();
							} else if (resp && resp.error) {
								reject(resp.error.code);
							} else {
								reject();
							}
						},
						error: (err): void => {
							reject(err);
						}
					});
				}, (err: any) => {
					reject(err);
				});
		});
	},
	*/

	load: function(title: string, sectionIndex: number): Em.RSVP.Promise {
		console.log('ArticleEditPreviewModel.load');

		return new Em.RSVP.Promise((resolve: Function, reject: Function): void => {
			console.log("here");
			console.log("here");

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
