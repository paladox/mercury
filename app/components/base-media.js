import Ember from 'ember';

var baseMedia = Ember.Component.extend({
	tagName: 'figure',
	classNames: ['media-component'],
	width: null,
	height: null,
	ref: null,
	emptyGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7',
	visible: false,
	media: null,
	thumbnailer: Mercury.Modules.Thumbnailer,
	limitHeight: false,
	//thumb widths
	thumbSize: {
		small: 340,
		medium: 660,
		large: 900
	},
	//icon width depends on it's real dimensions
	infoboxIconSize: {
		height: 20
	},
	normalizeThumbWidth: function (width) {
		if (width <= this.thumbSize.small) {
			return this.thumbSize.small;
		}
		else if (width <= this.thumbSize.medium) {
			return this.thumbSize.medium;
		}
		return this.thumbSize.medium;
	},
	getThumbURL: function (url, options) {
		if (options.mode === Mercury.Modules.Thumbnailer.mode.thumbnailDown) {
			options.width = this.normalizeThumbWidth(options.width);
		}
		if (!this.get('limitHeight')) {
			options.height = options.width;
		}
		url = this.thumbnailer.getThumbURL(url, options);
		return url;
	},
	/**
	 * @desc Determines if current image is an icon placed inside the infobox.
	 * Icons are commonly used for the money, weight etc. values.
	 * Main infobox images has the media.context field with 'infobox-big' value.
	 */
	isInfoboxIcon: Ember.computed('media', {
		get: function () {
			var media = this.get('media'), insideInfobox = this.isInsideInfobox(), iconHeight, width;
			if (media.context !== 'infobox-big' && insideInfobox) {
				iconHeight = this.get('infoboxIconSize.height');
				width = Math.floor(iconHeight * media.width / media.height);
				this.set('height', iconHeight);
				this.set('width', width);
				return true;
			}
			return false;
		},
		set: function (key, value) {
			this.set('isInfoboxIcon', value);
			return value;
		}
	}),
	isInsideInfobox: function () {
		return this.$().closest('.portable-infobox').length > 0;
	},
	/**
	 * @desc caption for current media
	 */
	caption: Ember.computed('media', {
		get: function () {
			var media = this.get('media');
			if (media && typeof media.caption === 'string') {
				return media.caption;
			}
		},
		set: function (key, value) {
			return value;
		}
	}),
	actions: {
		onVisible: function () {
			this.load();
		},
		clickLinkedImage: function () {
			M.track({
				action: M.trackActions.click,
				category: 'linked-image'
			});
		}
	}
});

baseMedia.reopenClass({
	newFromMedia: function (media) {
		if (Ember.isArray(media)) {
			if (media.some(function (media) { return !!media.link; })) {
				return App.LinkedGalleryMediaComponent.create();
			} else {
				return App.GalleryMediaComponent.create();
			}
		} else if (media.type === 'video') {
			return App.VideoMediaComponent.create();
		}
		else {
			return App.ImageMediaComponent.create();
		}
	}
});

export default baseMedia;