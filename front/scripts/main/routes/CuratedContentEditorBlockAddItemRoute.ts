/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />

'use strict';

App.CuratedContentEditorBlockAddItemRoute = Em.Route.extend({
	model(): CuratedContentEditorItemModel {
		return App.CuratedContentEditorItemModel.createNew();
	},

	setupController(controller: any, model: CuratedContentEditorItemModel, transition: EmberStates.Transition): void {
		var block = transition.params['curatedContentEditor.blockAddItem'].block,
			parentSection = this.modelFor('curatedContentEditor').get(block);

		this._super(controller, model, transition);
		controller.setProperties({
			alreadyUsedLabels: App.CuratedContentEditorModel.getAlreadyUsedLabels(parentSection),
			block,
			isFeaturedItem: block === 'featured'
		});
	},

	renderTemplate(): void {
		this.render('curated-content-editor-item');
	},

	actions: {
		goBack(): void {
			this.transitionTo('curatedContentEditor.index');
		},

		done(newItem: CuratedContentEditorItemModel): void {
			var block = this.controllerFor('curatedContentEditor.blockAddItem').get('block'),
				rootModel: CuratedContentEditorModel = this.modelFor('curatedContentEditor'),
				blockModel: CuratedContentEditorItemModel = rootModel[block];

			App.CuratedContentEditorModel.addItem(blockModel, newItem);
			this.transitionTo('curatedContentEditor.index');
		},

		deleteItem(): void {
			this.send('goBack');
		}
	}
});