





App.FeaturedContentComponent = Ember.Component.extend(
	App.FeaturedContentMixin,
	App.TrackClickMixin,
	App.ThirdsClickMixin,
	{
		// See ThirdsClickMixin
		screenEdgeWidthRatio: (1 / 6),

		gestures: {
			/**
			 * @returns {void}
			 */
			swipeLeft() {
				trackEvent('featured-content-next');
				this.nextItem();
			},

			/**
			 * @returns {void}
			 */
			swipeRight() {
				trackEvent('featured-content-prev');
				this.prevItem();
			},
		},

		/**
		 * @returns {boolean}
		 */
		rightClickHandler() {
			trackEvent('featured-content-next');
			this.nextItem();
			return true;
		},

		/**
		 * @returns {boolean}
		 */
		leftClickHandler() {
			trackEvent('featured-content-prev');
			this.prevItem();
			return true;
		},

		/**
		 * @returns {boolean}
		 */
		centerClickHandler() {
			this.trackClick('modular-main-page', 'featured-content');
			trackEvent('featured-content-click');
			return false;
		},

		/**
		 * @param {PreventableClickEvent} event
		 * @returns {void}
		 */
		click(event) {
			this.callClickHandler(event, true);
		},
	}
);


