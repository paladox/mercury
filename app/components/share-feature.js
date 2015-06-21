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
	didInsertElement: function () {
		this.initHeadroom();
	},
	initHeadroom: function () {
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
	lineShare: Ember.computed('title', function () {
		return "http://line.me/R/msg/text/?" + encodeURIComponent(this.get('title')) + " " + encodeURIComponent(Mercury.wiki.basePath + Mercury.wiki.articlePath + this.get('title'));
	}),
	facebookShare: Ember.computed('title', function () {
		return "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(Mercury.wiki.basePath + Mercury.wiki.articlePath + this.get('title'));
	}),
	twitterShare: Ember.computed('title', function () {
		return "https://twitter.com/share?url=" + encodeURIComponent(Mercury.wiki.basePath + Mercury.wiki.articlePath + this.get('title'));
	}),
	googleShare: Ember.computed('title', function () {
		return "https://plus.google.com/share?url=" + encodeURIComponent(Mercury.wiki.basePath + Mercury.wiki.articlePath + this.get('title'));
	})
});
