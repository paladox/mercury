/// <reference path="../app.ts" />
/// <reference path="../../mercury/utils/browser.ts" />
/// <reference path="../../../../typings/headroom/headroom.d.ts" />
'use strict';

App.HeadroomMixin = Em.Mixin.create({
	headroom: null,

	// keep it consistent with values in _wikia-variables.scss
	smartBannerHeight: {
		android: 66,
		ios: 83
	},

	offset: Em.computed('smartBannerVisible', function (): number {
		if (this.get('smartBannerVisible')) {
			return this.get('smartBannerHeight.' + Mercury.Utils.Browser.getSystem());
		}
		return 0;
	}),

	/**
	 * Observes smartBannerVisible property which is controlled by SmartBannerComponent
	 * and goes through ApplicationController. Reinitializes Headroom when it changes.
	 *
	 * We're cacheing values, because we want to re-initialize Headroom only when those are changed
	 * and only once - without cache'ing smartBannerVisibleObserver is fiering for each component
	 * it's included in - at the time of writing this it's TWO TIMES
	 */

	cachedProperties: {
		smartBannerVisible: null,
		offset: null,
		headroomOptions: null,
	},

	smartBannerVisibleObserver: Em.on('willInsertElement',
		Em.observer('smartBannerVisible', 'offset', 'headroomOptions', function (): void {
			var headroom = this.get('headroom'),
				smartBannerVisible = this.get('smartBannerVisible'),
				offset = this.get('offset'),
				headroomOptions = this.get('headroomOptions'),
				cachedProperties = this.get('cachedProperties');

			if (smartBannerVisible !== cachedProperties.smartBannerVisible ||
				headroomOptions !== cachedProperties.headroomOptions ||
				offset !== cachedProperties.offset) {

				this.set('cachedProperties', {
					smartBannerVisible,
					offset,
					headroomOptions,
				});

				if (headroom) {
					headroom.destroy();
				}

				this.initHeadroom(headroomOptions, offset);
			}
		})
	),

	initHeadroom(headroomOptions: any, offset: number): void {
		var headroom: Headroom,
			options = {
				classes: {
					initial: 'headroom',
					pinned: 'pinned',
					unpinned: 'un-pinned',
					top: 'headroom-top',
					notTop: 'headroom-not-top'
				},
				offset
			};

		if (headroomOptions) {
			options = $.extend({}, options, headroomOptions);
		}

		headroom = new Headroom(this.get('element'), options);
		headroom.init();

		this.set('headroom', headroom);
	}
});
