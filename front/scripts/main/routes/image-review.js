import ImageReviewModel from '../models/image-review';

export default Ember.Route.extend({
	onlyFlagged: false,

	beforeModel(transition) {
		if(transition.queryParams.fullscreen === 'true') {
			this.controllerFor('application').set('fullPage', true);
		}
	},

	renderTemplate(controller, model) {
		this.render('image-review', {controller, model});
	},

	model() {
		this.set('isLoading', true);
		return ImageReviewModel.startSession(this.get('onlyFlagged'));
	},

	actions: {
		error(error) {
			let errorMessage = i18n.t('app.image-review-error-other');

			if (error.status === 401) {
				errorMessage = i18n.t('app.image-review-error-no-access-permissions');
			}
			Ember.Logger.error(error);
			this.modelFor(this.routeName).addAlert({
				message: errorMessage,
				type: 'warning',
				persistent: true
			});
			this.transitionTo('mainPage');
			return false;
		},

		reviewAndGetMoreImages() {
			const model = this.modelFor('imageReview');

			this.set('onlyFlagged', false);
			ImageReviewModel.reviewImages(model.images);
			this.refresh();
		},

		getFlaggedOnly() {
			this.set('onlyFlagged', true);
			this.refresh();
		}
	}
});
