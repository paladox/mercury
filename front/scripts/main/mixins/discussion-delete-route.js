import App from '../app';

export default App.DiscussionDeleteRouteMixin = Ember.Mixin.create({
	/**
	 * Get loading spinner container.
	 * On post list it's post, on post-details it's applicationController to overlay entire page
	 * @param {object} post
	 * @returns {object}
	 */
	getLoadingSpinnerContainer(post) {
		return this.get('postDeleteFullScreenOverlay') ?
			this.controllerFor('application') :
			post;
	},

	actions: {
		/**
		 * Pass post deletion to model
		 * @param {object} post
		 * @returns {void}
		 */
		deletePost(post) {
			const loadingSpinnerContainer = this.getLoadingSpinnerContainer(post);

			this.loadingIndicator.activate();
			this.modelFor(this.get('routeName')).deletePost(post).then(() => {
				this.loadingIndicator.deactivate();
			});
		},

		/**
		 * Pass post undeletion to model
		 * @param {object} post
		 * @returns {void}
		 */
		undeletePost(post) {
			const loadingSpinnerContainer = this.getLoadingSpinnerContainer(post);

			this.loadingIndicator.activate();
			this.modelFor(this.get('routeName')).undeletePost(post).then(() => {
				this.loadingIndicator.deactivate();
			});
		},

		/**
		 * Pass reply deletion to model
		 * @param {object} reply
		 * @returns {void}
		 */
		deleteReply(reply) {
			this.loadingIndicator.activate();
			this.modelFor(this.get('routeName')).deleteReply(reply).then(() => {
				this.loadingIndicator.deactivate();
			});
		},

		/**
		 * Pass reply undeletion to model
		 * @param {object} reply
		 * @returns {void}
		 */
		undeleteReply(reply) {
			this.loadingIndicator.activate();
			this.modelFor(this.get('routeName')).undeleteReply(reply).then(() => {
				this.loadingIndicator.deactivate();
			});
		}
	}
});
