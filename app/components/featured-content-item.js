import Ember from 'ember';
import Thumbnailer from '../utils/modules/thumbnailer';

export default Ember.Component.extend({
	tagName: 'a',
	classNames: ['featured-content-item'],
	attributeBindings: ['href', 'style'],
	cropMode: Thumbnailer.mode.zoomCrop,
	emptyGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7',
	imageUrl: Ember.computed.oneWay('emptyGif'),
	href: Ember.computed.oneWay('url'),
	style: null,
	// TODO make it more responsive
	imageWidth: 400,
	imageHeight: 225,
	willInsertElement () {
		this.updateContainerHeight(this.get('viewportDimensions.width'));
	},

	viewportObserver: Ember.observer('viewportDimensions.width', function () {
		this.updateContainerHeight(this.get('viewportDimensions.width'));
	}),

	/**
	 * @desc Keep the 16:9 ratio
	 */
	updateContainerHeight (containerWidth) {
		var height = String(Math.round((containerWidth / 16) * 9));

		this.set('style', Ember.String.htmlSafe('height: %@px;'.fmt(height)));
	}
});
