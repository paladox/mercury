/// <reference path="../app.ts" />

'use strict';

App.ArticleCommentsModel = Em.Object.extend({
	articleId: null,
	comments: 0,
	users: null,
	pagesCount: 0,
	page: 0,

	fetch: Em.observer('page', 'articleId', function () {
		var page = this.get('page'),
			articleId = this.get('articleId');

		if (page && page >= 0 && articleId) {
			return new Em.RSVP.Promise((resolve: Function, reject: Function) => {
				Em.$.ajax(<JQueryAjaxSettings>{
					url: this.url(articleId, page),
					success: (data) => {
						this.setProperties(data.payload);
						resolve(this);
					},
					error: (data) => {
						reject(data);
					}
				});
			});
		}
	}),

	reset: Em.observer('articleId', function () {
		this.setProperties({
			comments: 0,
			users: null,
			pagesCount: 0
		});
	}),

	url(articleId: number, page: number = 0): string {
		return App.get('apiBase') + '/article/comments/' + articleId + '/' + page;
	}
});
