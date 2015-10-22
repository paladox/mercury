/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../mixins/ViewportMixin.ts" />

'use strict';

App.ArticleEditPreviewComponent = Em.Component.extend(App.ViewportMixin, {
	classNames: ['article-edit-preview'],

	/*
	classNames: ['article-edit'],

	viewportHeightObserver: Em.observer('viewportDimensions.height', function () {
		this.adjustTextareaHeight();
	}),
	*/

	actions: {
		back(): void {
			this.sendAction('back');
		},

		publish(): void {
			this.sendAction('publish');
		}
	},

	/*
	adjustTextareaHeight: Em.on('didInsertElement', function(): void {
		Em.$('textarea').css('height', Em.$(window).height() - Em.$('.edit-head').outerHeight());
	})
	*/
});
