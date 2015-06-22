import Ember from 'ember';
import Thumbnailer from '../utils/modules/thumbnailer';
import LinkedGalleryMediaComponent from 'linked-gallery-media';
import GalleryMediaComponent from 'gallery-media';
import VideoMediaComponent from 'video-media';
import ImageMediaComponent from 'image-media';

var baseMedia = Ember.Component.extend({
	tagName: 'figure',
	classNames: ['media-component'],
	width: null,
	height: null,
	ref: null,
	emptyGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7',
	visible: false,
	media: null,
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

	normalizeThumbWidth (width) {
		if (width <= this.thumbSize.small) {
			return this.thumbSize.small;
		} else if (width <= this.thumbSize.medium) {
			return this.thumbSize.medium;
		}

		return this.thumbSize.medium;
	},

	getThumbURL (url, options) {
		if (options.mode === Thumbnailer.mode.thumbnailDown) {
			options.width = this.normalizeThumbWidth(options.width);
		}
		if (!this.get('limitHeight')) {
			options.height = options.width;
		}
		url = Thumbnailer.getThumbURL(url, options);
		return url;
	},

	/**
	 * @desc Determines if current image is an icon placed inside the infobox.
	 * Icons are commonly used for the money, weight etc. values.
	 * Main infobox images has the media.context field with 'infobox-big' value.
	 */
	isInfoboxIcon: Ember.computed('media', {
		get () {
			var media = this.get('media'),
				insideInfobox = this.isInsideInfobox(),
				height,
				width;

			if (media.context !== 'infobox-big' && insideInfobox) {
				height = this.get('infoboxIconSize.height');
				width = Math.floor(height * media.width / media.height);

				this.setProperties({
					height,
					width
				});

				return true;
			}

			return false;
		},
		set (key, value) {
			this.set('isInfoboxIcon', value);
			return value;
		}
	}),
	isInsideInfobox () {
		return this.$().closest('.portable-infobox').length > 0;
	},
	/**
	 * @desc caption for current media
	 */
	caption: Ember.computed('media', {
		get () {
			var media = this.get('media');
			if (media && typeof media.caption === 'string') {
				return media.caption;
			}
		},
		set (key, value) {
			return value;
		}
	}),
	actions: {
		onVisible () {
			this.load();
		},
		clickLinkedImage () {
			M.track({
				action: M.trackActions.click,
				category: 'linked-image'
			});
		}
	}
});

baseMedia.reopenClass({
	newFromMedia (media) {
		if (Ember.isArray(media)) {
			if (media.some(function (media) { return !!media.link; })) {
				return LinkedGalleryMediaComponent.create();
			} else {
				return GalleryMediaComponent.create();
			}
		} else if (media.type === 'video') {
			return VideoMediaComponent.create();
		}
		else {
			return ImageMediaComponent.create();
		}
	}
});

export default baseMedia;
