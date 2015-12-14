import App from '../app';
import DiscussionDeleteControllerMixin from '../mixins/discussion-delete-controller';

export default App.DiscussionPostController = Ember.Controller.extend(DiscussionDeleteControllerMixin, {
	postListSort: '',

	canShowMore: Ember.computed('model.postCount', 'model.replies.length', function () {
		const model = this.get('model');

		return model.get('replies.length') < model.get('postCount');
	}),

	willDestroy () {
		this._super();

		clearInterval(this.get('intervalId'));
	},

	init () {
		let context, intervalId;

		this._super();

		if (!this.get('intervalId')) {
			context = this;
			intervalId = setInterval(function () {
				const model = context.get('model');
				model.updateView();
			}, 10000);

			this.set('intervalId', intervalId);
		}
	},

	actions: {
		/**
		 * @returns {void}
		 */
		expand() {
			const model = this.get('model');

			model.loadNextPage().then(() => {
				const model = this.get('model');

				if (model.get('minorError')) {
					// Hide more posts button when error occurred
					model.set('postCount', model.get('replies.length'));
				}
			});
		},

		/**
		 * Bubbles up to DiscussionPostRoute
		 *
		 * @returns {void}
		 */
		retry() {
			this.get('target').send('retry');
		},

		/**
		 * @returns {void}
		 */
		goToAllDiscussions() {
			this.get('target').send('goToAllDiscussions');
		},

		/**
		 * @returns {void}
		 */
		goToForum() {
			const model = this.get('model');

			this.get('target').send('goToForum', model.get('forumId'), this.get('postListSort'));
		},
	}
});
