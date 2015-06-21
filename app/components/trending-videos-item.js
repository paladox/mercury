import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'a',
	classNames: ['trending-videos-item'],
	attributeBindings: ['href', 'style'],
	cropMode: Mercury.Modules.Thumbnailer.mode.topCrop,
	thumbnailer: Mercury.Modules.Thumbnailer,
	emptyGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7',
	currentlyRenderedImageUrl: Ember.computed.oneWay('emptyGif'),
	href: Ember.computed.oneWay('url'),
	imageWidth: 250,
	imageHeight: Ember.computed(function () {
		return Math.floor(this.get('imageWidth') * 9 / 16);
	}),
	style: null,
	willInsertElement: function () {
		this.updateImageSize(this.get('viewportDimensions.width'));
	},
	didInsertElement: function () {
		if (this.get('imageUrl')) {
			this.lazyLoadImage();
		}
	},
	viewportObserver: Ember.observer('viewportDimensions.width', function () {
		this.updateImageSize(this.get('viewportDimensions.width'));
	}),
	lazyLoadImage: function () {
		var options = {
			width: this.get('imageWidth'),
			height: this.get('imageHeight'),
			mode: this.get('cropMode')
		}, imageUrl = this.thumbnailer.getThumbURL(this.get('imageUrl'), options);
		this.set('currentlyRenderedImageUrl', imageUrl);
	},
	updateImageSize: function (viewportWidth) {
		var imageHeightString = String(Math.floor((viewportWidth - 10) * 9 / 16));
		this.set('imageStyle', Ember.String.htmlSafe("height: " + imageHeightString + "px;"));
	},
	click: function () {
		this.trackClick('modular-main-page', 'trending-videos');
	}


});
