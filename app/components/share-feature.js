/* global Headroom */
import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['share-feature'],
	tagName: 'div',
	headroom: null,
	options: {
		// keep it consistent with values in _wikia-variables.scss
		smartBannerHeight: {
			android: 66,
			ios: 83
		}
	},
	offset: Ember.computed('smartBannerVisible', function () {
		if (this.get('smartBannerVisible')) {
			return this.get('options.smartBannerHeight.' + Mercury.Utils.Browser.getSystem());
		}

		return 0;
	}),

	/**
	 * Observes smartBannerVisible property which is controlled by SmartBannerComponent
	 * and goes through ApplicationController. Reinitializes Headroom when it changes.
	 */
	smartBannerVisibleObserver: Ember.observer('smartBannerVisible', function () {
		var headroom = this.get('headroom');
		headroom.destroy();
		this.initHeadroom();
	}),

	didInsertElement () {
		this.initHeadroom();
	},

	initHeadroom () {
		var headroom = new Headroom(this.get('element'), {
			classes: {
				initial: 'pinned',
				pinned: 'pinned'
			},
			offset: this.get('offset')
		});

		headroom.init();
		this.set('headroom', headroom);
	},

	shareUrl: Ember.computed('title', () =>
		encodeURIComponent(Mercury.wiki.basePath + Mercury.wiki.articlePath + this.get('title'))
	),

	lineShare: Ember.computed('shareUrl', () =>
		'http://line.me/R/msg/text/?' +
			encodeURIComponent(this.get('title')) +
			' ' +
			this.get('shareUrl')
	),

	facebookShare: Ember.computed('title', () =>
		'http://www.facebook.com/sharer/sharer.php?u=' + this.get('shareUrl')
	),

	twitterShare: Ember.computed('title', () =>
		'https://twitter.com/share?url=' + this.get('shareUrl')
	),

	googleShare: Ember.computed('title', () =>
		'https://plus.google.com/share?url=' + this.get('shareUrl')
	)
});
