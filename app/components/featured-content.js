import Ember from 'ember';

export default Ember.Component.extend({

	classNames: ['featured-content'],
	currentItemIndex: 0,
	// should it be here?
	model: [],
	hammerOptions: {
		swipe_velocity: 0.1,
		swipe_threshold: 1,
		pan_velocity: 0.1,
		pan_threshold: 1
	},
	currentItem: Ember.computed('model', 'currentItemIndex', function () {
		//@TODO evaluate better solution
		return this.getWithDefault('model', [])[this.get('currentItemIndex')];
	}),
	lastIndex: Ember.computed('model', function () {
		return this.getWithDefault('model', []).length - 1;
	}),
	rightClickHandler: function () {
		this.nextItem();
		return true;
	},
	leftClickHandler: function () {
		this.prevItem();
		return true;
	},
	centerClickHandler: function () {
		this.trackClick('modular-main-page', 'featured-content');
		return false;
	},
	gestures: {
		swipeLeft: function () {
			this.nextItem();
		},
		swipeRight: function () {
			this.prevItem();
		}
	},
	click: function (event) {
		this.callClickHandler(event, true);
	},
	/**
	 * @desc Keep pagination up to date
	 */
	currentItemIndexObserver: Ember.observer('currentItemIndex', function () {
		var $pagination = this.$('.featured-content-pagination');
		$pagination.find('.current').removeClass('current');
		$pagination.find("li[data-index=" + this.get('currentItemIndex') + "]").addClass('current');
	}).on('didInsertElement'),
	prevItem: function () {
		if (this.get('currentItemIndex') === 0) {
			this.set('currentItemIndex', this.get('lastIndex'));
		}
		else {
			this.decrementProperty('currentItemIndex');
		}
	},
	nextItem: function () {
		if (this.get('currentItemIndex') >= this.get('lastIndex')) {
			this.set('currentItemIndex', 0);
		}
		else {
			this.incrementProperty('currentItemIndex');
		}
	}


});
