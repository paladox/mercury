/// <reference path="../app.ts" />
'use strict';

App.CuratedContentEditBlockComponent = Em.Component.extend({
	classNames: ['curated-content-edit-block'],
	tagName: 'section',

	actions: {
		editItem: function (item: CuratedContentEditItemInterface): void {
			this.sendAction('editItem', item);
		},

		openSection: function (item: CuratedContentEditItemInterface): void {
			this.sendAction('openSection', item);
		}
	}
});