/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../mixins/ViewportMixin.ts" />

'use strict';

App.ArticleEditPreviewComponent = Em.Component.extend(App.ViewportMixin, {
	classNames: ['article-edit-preview'],

	actions: {
		back(): void {
			console.log('ArticleEditPreviewComponent.back');
			this.sendAction('back');
		},

		publish(): void {
			console.log('ArticleEditPreviewComponent.publish');
			this.sendAction('publish');
		}
	},
});
