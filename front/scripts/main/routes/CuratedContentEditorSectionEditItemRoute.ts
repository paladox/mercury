/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />

'use strict';

interface CuratedContentEditorEditSectionItemRouteParamsInterface {
	section: string;
	item: string;
}

App.CuratedContentEditorSectionEditItemRoute = Em.Route.extend({
	model: function (params: CuratedContentEditorEditSectionItemRouteParamsInterface) {
		var item = decodeURIComponent(params.item),
			sectionModel = this.modelFor('curatedContentEditor.section'),
			itemModel = App.CuratedContentEditorModel.getSectionItem(sectionModel, item);

		return {
			section: sectionModel.label, // TODO what is it for?
			item: itemModel
		};
	},

	setupController: function (controller: any, model: typeof App.CuratedContentEditorItemModel) {
		this._super(controller, model);
		controller.set('originalItemLabel', model.item.label);
	},

	renderTemplate: function (): void {
		this.render('curated-content-editor-item');
	},

	actions: {
		goBack(): void {
			this.transitionTo('curatedContentEditor.section.index');
		},

		updateItem(newItem: CuratedContentEditorItemInterface): void {
			var sectionModel = this.modelFor('curatedContentEditor.section'),
				originalItemLabel = this.controllerFor('curatedContentEditor.section.editItem').get('originalItemLabel');

			App.CuratedContentEditorModel.updateSectionItem(sectionModel, newItem, originalItemLabel);
			this.transitionTo('curatedContentEditor.section.index');
		},

		deleteItem(): void {
			var sectionModel = this.modelFor('curatedContentEditor.section'),
				originalItemLabel = this.controllerFor('curatedContentEditor.section.editItem').get('originalItemLabel');

			App.CuratedContentEditorModel.deleteSectionItem(sectionModel, originalItemLabel);
			this.transitionTo('curatedContentEditor.section.index');
		}
	}
});
