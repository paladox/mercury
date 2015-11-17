import App from 'app';
import CuratedContentEditorModel from 'models/curated-content-editor';

App.CuratedContentEditorBlockEditItemRoute = Ember.Route.extend({
	/**
	 * @param {Object} params
	 * @returns {CuratedContentEditorItemModel} item
	 */
	model(params) {
		const block = params.block,
			item = decodeURIComponent(params.item),
			rootModel = this.modelFor('curatedContentEditor'),
			blockModel = rootModel[block];

		return CuratedContentEditorModel.getItem(blockModel, item);
	},

	/**
	 * @param {Object} controller
	 * @param {CuratedContentEditorItemModel} model
	 * @param {EmberStates.Transition} transition
	 * @returns {void}
	 */
	setupController(controller, model, transition) {
		const block = transition.params['curatedContentEditor.blockEditItem'].block,
			rootModel = this.modelFor('curatedContentEditor'),
			alreadyUsedLabels = (block === 'optional') ?
				CuratedContentEditorModel.getAlreadyUsedNonFeaturedItemsLabels(rootModel, model.label) :
				CuratedContentEditorModel.getAlreadyUsedLabels(rootModel.get(block), model.label);

		this._super(controller, model, transition);
		controller.setProperties({
			alreadyUsedLabels,
			block,
			isFeaturedItem: block === 'featured',
			originalItemLabel: model.label
		});
	},

	/**
	 * @returns {void}
	 */
	renderTemplate() {
		this.render('curated-content-editor-item');
	},

	actions: {
		/**
		 * @returns {void}
		 */
		goBack() {
			this.transitionTo('curatedContentEditor.index');
		},

		/**
		 * @param {CuratedContentEditorItemModel} newItem
		 * @returns {void}
		 */
		done(newItem) {
			const controller = this.controllerFor('curatedContentEditor.blockEditItem'),
				block = controller.get('block'),
				originalItemLabel = controller.get('originalItemLabel'),
				rootModel = this.modelFor('curatedContentEditor'),
				blockModel = rootModel[block];

			CuratedContentEditorModel.updateItem(blockModel, newItem, originalItemLabel);
			this.transitionTo('curatedContentEditor.index');
		},

		/**
		 * @returns {void}
		 */
		deleteItem() {
			const controller = this.controllerFor('curatedContentEditor.blockEditItem'),
				block = controller.get('block'),
				item = controller.get('originalItemLabel'),
				rootModel = this.modelFor('curatedContentEditor'),
				blockModel = rootModel[block];

			CuratedContentEditorModel.deleteItem(blockModel, item);
			this.transitionTo('curatedContentEditor.index');
		}
	}
});
