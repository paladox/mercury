/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />

'use strict';

App.CuratedContentEditBlockItemRoute = Em.Route.extend({
	renderTemplate: function (): void {
		this.render('curated-content-edit-item');
	},

	serialize: function (model: CuratedContentEditBlockItemInterface) {
		return {
			// Sections have titles, section items have labels and titles - we want to show labels for them
			block: model.block,
			item: encodeURIComponent(model.item.label || model.item.title)
		};
	},

	/**
	 * @desc If model wasn't passed to the route (on page refresh) we redirect to /main/edit
	 *
	 * @param transition
	 */
	beforeModel: function (transition: any) {
		if (!Em.isArray(transition.intent.contexts)) {
			this.transitionTo('curatedContentEdit.index');
		}
	}
});
