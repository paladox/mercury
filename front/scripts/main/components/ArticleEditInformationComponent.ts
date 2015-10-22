/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../app.ts" />
/// <reference path="../mixins/ViewportMixin.ts" />

'use strict';

App.ArticleEditInformationComponent = Em.Component.extend(App.ViewportMixin, {
	classNames: ['article-edit-information'],

	actions: {
		back(): void {
			this.sendAction('back');
		},

		publish(): void {
			this.sendAction('publish');
		}
	},
});
