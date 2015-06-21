import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'a',
	attributeBindings: ['href'],
	classNames: ['curated-content-item'],
	classNameBindings: ['type'],
	cropMode: Mercury.Modules.Thumbnailer.mode.topCrop,
	thumbnailer: Mercury.Modules.Thumbnailer,
	emptyGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7',
	thumbUrl: Ember.computed.oneWay('emptyGif'),
	//@TODO for the purpose of MVP let's make it fixed value, we can adjust later
	imageSize: 200,
	style: null,
	model: null,
	type: Ember.computed.oneWay('model.type'),
	href: Ember.computed.oneWay('model.url'),
	isArticle: Ember.computed.equal('model.type', 'article'),
	willInsertElement: function () {
		this.updateImageSize(this.get('viewportDimensions.width'));
	},
	didInsertElement: function () {
		if (this.get('model.imageUrl')) {
			this.lazyLoadImage();
		}
	},
	click: function () {
		this.sendAction('action', this.get('model'));
	},
	viewportObserver: Ember.observer('viewportDimensions.width', function () {
		this.updateImageSize(this.get('viewportDimensions.width'));
	}),
	lazyLoadImage: function () {
		var options = {
			width: this.get('imageSize'),
			height: this.get('imageSize'),
			mode: this.get('cropMode')
		}, thumbUrl = this.thumbnailer.getThumbURL(this.get('model.imageUrl'), options);
		this.set('thumbUrl', thumbUrl);
	},
	updateImageSize: function (viewportSize) {
		var imageSize = String(Math.floor((viewportSize - 20) / 2));
		this.set('style', Ember.String.htmlSafe("height: " + imageSize + "px; width: " + imageSize + "px;"));
	}
});