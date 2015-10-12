/// <reference path="../app.ts" />
/// <reference path="./MediaComponent.ts" />
/// <reference path="../mixins/ViewportMixin.ts" />
'use strict';

// TODO: Look into combining this into GalleryMediaComponent
App.InfoboxMediaCollectionComponent = App.MediaComponent.extend(App.ViewportMixin, {
	classNames: ['pi-media-collection'],
	layoutName: 'components/pi-media-collection',

	limit: 2,
	limitHeight: true,

	thumbHeight: 335,
	thumbWidth: Em.computed('viewportDimensions.width', function(): number {
		return this.get('viewportDimensions.width') - 30;
	}),

	incrementLimitValue: 10,

	setUp(): void {
		var mediaArray = Em.A(),
			emptyGif = this.get('emptyGif');

		this.get('media').forEach((media: ArticleMedia, index: number) => {
			media.galleryRef = index;
			media.currentNumber = index + 1;
			media.thumbUrl = emptyGif;
			media.captionClass = Em.get(media, 'caption.length') > 0 ? ' has-caption' : '';

			mediaArray.pushObject(Em.Object.create(media));
		});

		this.setProperties({
			media: mediaArray,
			limit: this.incrementLimitValue,
			galleryLength: mediaArray.length
		});
	},

	collectionWidth: Em.computed('galleryLength', 'thumbWidth', function(): number {
		return this.get('galleryLength') * this.get('thumbWidth');
	}),

	limitedMedia: Em.computed('media', function (): ArticleMedia[] {
		var limit = this.get('limit');

		if (limit > 0) {
			return this.get('media').slice(0, limit);
		}

		return this.get('media');
	}),

	loadImages(
		imageOrGalleryRef: any,
		limit: number = 2,
		thumbWidth: number = this.get('thumbWidth'),
		thumbHeight: number = this.get('thumbHeight')
	): void {
		var galleryRef = typeof imageOrGalleryRef === 'number' ?
				imageOrGalleryRef :
				~~imageOrGalleryRef.getAttribute('data-gallery-ref'),
			image: ArticleMedia,
			limit = Math.min(galleryRef + limit, this.get('galleryLength') - 1),
			mode = Mercury.Modules.Thumbnailer.mode.zoomCrop,
			height = thumbHeight,
			width = thumbWidth;

		for (; galleryRef <= limit; galleryRef++) {
			image = this.get('media').get(galleryRef);

			image.setProperties({
				thumbUrl: this.getThumbURL(image.url, {
					mode: mode,
					height: height,
					width: width
				}),
				load: true
			});
		}
	},

	/**
	 * Loads media and certain amount of images depending on the gallery width and thumbSize sets also onscroll handler
	 */
	load(): void {
		var $this: JQuery = this.$(),
			galleryWidth: number = $this.width(),
			thumbWidth: number = this.get('thumbWidth'),
			maxImages: number = Math.ceil(galleryWidth / thumbWidth);

		this.setUp();
		this.loadImages(0, maxImages);

		$this.on('scroll', () => {
			Em.run.debounce(this, 'onScroll', maxImages, 100);
		});
	},

	/**
	 * Check if the offsetLeft of image is smaller than
	 * sum of gallery width and its scrollLeft. If so, lazy load
	 * the next maxImages amount of images.
	 * If the gallery element is nested inside other element,
	 * the position: relative has to be set on .article-gallery in order to assign
	 * proper offsetParent to the image element.
	 */
	onScroll(maxImages: number): void {
		var $this = this.$(),
			imagesToLoad = $this.find('img:not(.loaded)'),
			galleryOffset = $this.scrollLeft() + $this.width();

		if (imagesToLoad.length) {
			imagesToLoad.each((index: number, image: HTMLImageElement): void => {
				if (image.offsetLeft < galleryOffset) {
					this.loadImages(image, maxImages);
				}
			});
		} else if (this.get('limit') < this.get('galleryLength')) {
			this.incrementProperty('limit', this.incrementLimitValue);
		} else {
			$this.off('scroll');
		}
	}
});
