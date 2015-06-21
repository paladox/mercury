import Ember from 'ember';

export default Ember.Component.extend({
	smallImageSize: {
		height: 64,
		width: 64
	},
	classNames: ['article-image'],
	classNameBindings: ['hasCaption', 'visible', 'isSmall'],
	layoutName: 'components/image-media',
	imageSrc: Ember.computed.oneWay('emptyGif'),
	hasCaption: Ember.computed.notEmpty('media.caption'),
	link: Ember.computed.alias('media.link'),
	isSmall: Ember.computed('width', 'height', function () {
		var imageWidth = this.get('width'), imageHeight = this.get('height');
		return !!imageWidth && imageWidth < this.smallImageSize.width || imageHeight < this.smallImageSize.height;
	}),
	/**
	 * used to set proper height to img tag before it loads
	 * so we have less content jumping around due to lazy loading images
	 * @return number
	 */
	computedHeight: Ember.computed('width', 'height', 'articleContent.width', function () {
		var pageWidth = this.get('articleContent.width'), imageWidth = this.get('width') || pageWidth, imageHeight = this.get('height');
		if (pageWidth < imageWidth) {
			return ~~(pageWidth * (imageHeight / imageWidth));
		}
		return imageHeight;
	}),
	/**
	 * @desc return the thumbURL for media.
	 * If media is an icon inside the infobox, width
	 * was already set.
	 */
	url: Ember.computed({
		get: function () {
			var media = this.get('media'), icon, mode, width;
			if (media) {
				icon = this.get('isInfoboxIcon');
				if (icon) {
					mode = Mercury.Modules.Thumbnailer.mode.scaleToWidth;
					width = this.get('width');
				}
				else {
					mode = Mercury.Modules.Thumbnailer.mode.thumbnailDown;
					width = this.get('articleContent.width');
				}
				return this.getThumbURL(media.url, {
					mode: mode,
					height: this.get('computedHeight'),
					width: width
				});
			}
			//if it got here, that means that we don't have an url for this media
			//this might happen for example for read more section images
		},
		set: function (key, value) {
			return this.getThumbURL(value, {
				mode: Mercury.Modules.Thumbnailer.mode.topCrop,
				height: this.get('computedHeight'),
				width: this.get('articleContent.width')
			});
		}
	}),
	/**
	 * @desc style used on img tag to set height of it before we load an image
	 * so when image loads, browser don't have to resize it
	 */
	style: Ember.computed('computedHeight', 'visible', function () {
		return (this.get('visible') ?
			'' :
		"height:" + this.get('computedHeight') + "px;").htmlSafe();
	}),
	/**
	 * load an image and run update function when it is loaded
	 */
	load: function () {
		var _this = this;
		var url = this.get('url'), image;
		if (url) {
			image = new Image();
			image.src = url;
			if (image.complete) {
				this.update(image.src);
			} else {
				image.addEventListener('load', function () {
					_this.update(image.src);
				});
			}
		}
	},
	/**
	 * updates img with its src and sets media component to visible state
	 *
	 * @param src string - src for image
	 */
	update: function (src) {
		this.setProperties({
			imageSrc: src,
			visible: true
		});
	}
});
