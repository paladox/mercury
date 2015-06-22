import Ember from 'ember';
import ArticleCommentsModel from '../models/article-comments';

export default Ember.Component.extend({
	page: null,
	articleId: null,
	commentsCount: null,
	classNames: ['article-comments', 'mw-content'],
	model: null,
	isCollapsed: true,
	nextButtonShown: false,
	prevButtonShown: false,
	showComments: Ember.computed.bool('page'),

	/**
	 * @desc scrolls to top of article's container, used for pagination
	 */
	scrollToTop () {
		window.scrollTo(0, this.$().offset().top);
	},
	didInsertElement () {
		this.set('model', ArticleCommentsModel.create({
			articleId: this.get('articleId')
		}));

		if (this.get('page')) {
			this.scrollToTop();
		}
	},

	/**
	 * @desc observes changes to page property, applies limit `1 <= page <= model.pagesCount`
	 * and updates model, so it can load a page of comments
	 */
	pageObserver: Ember.observer('page', 'model.comments', function () {
		Ember.run.scheduleOnce('afterRender', this, () => {
			var page = this.get('page'),
				count = this.get('model.pagesCount'),
				currentPage = page,
				currentPageInteger,
				isFirstPage;

			// since those can be null we intentionally correct the types
			if (page != null && count != null) {
				currentPage = Math.max(Math.min(page, count), 1);
			}

			currentPageInteger = parseInt(currentPage, 10);
			isFirstPage = currentPageInteger === 1;

			this.setProperties({
				nextButtonShown: (isFirstPage || currentPageInteger < count) && count > 1,
				prevButtonShown: !isFirstPage && (currentPageInteger > 1),
				page: currentPage
			});

			this.set('model.page', currentPage);
		});
	}),

	/**
	 * @desc watches changes to model, and scrolls to top of comments
	 */
	commentsObserver: Ember.observer('model.comments', function () {
		if (this.get('model.comments')) {
			this.scrollToTop();
		}
	}),

	/**
	 * @desc if articleId changes, updates model
	 */
	articleIdObserver: Ember.observer('articleId', function () {
		this.setProperties({
			'model.articleId': this.get('articleId'),
			page: null
		});
		this.rerender();
	}),

	actions: {
		nextPage () {
			this.incrementProperty('page');
		},
		prevPage () {
			this.decrementProperty('page');
		},
		toggleComments () {
			this.set('page', this.get('page') ? null : 1);
			this.toggleProperty('isCollapsed');

			M.track({
				action: M.trackActions.click,
				category: 'comments',
				label: this.get('page') ? 'open' : 'close'
			});
		}
	}
});
