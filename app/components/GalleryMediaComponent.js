/// <reference path="../app.ts" />
/// <reference path="./MediaComponent.ts" />
/// <reference path="../mixins/ArticleContentMixin.ts" />
'use strict';
App.GalleryMediaComponent = App.MediaComponent.extend(App.ArticleContentMixin, {
    classNames: ['article-gallery'],
    layoutName: 'components/gallery-media',
    thumbSize: 195,
    //limit how many images get rendered before user scrolls to a gallery
    limit: 2,
    incrementLimitValue: 10,
    setUp: function () {
        var mediaArray = Em.A(), emptyGif = this.get('emptyGif');
        this.get('media').forEach(function (media, index) {
            media.galleryRef = index;
            media.thumbUrl = emptyGif;
            media.captionClass = media.caption.length > 0 ? ' has-caption' : '';
            mediaArray.pushObject(Em.Object.create(media));
        });
        this.setProperties({
            media: mediaArray,
            limit: this.incrementLimitValue,
            galleryLength: mediaArray.length
        });
    },
    limitedMedia: Em.computed('media', 'limit', function () {
        var limit = this.get('limit');
        if (limit > 0) {
            return this.get('media').slice(0, limit);
        }
        return this.get('media');
    }),
    loadImages: function (imageOrGalleryRef, limit, thumbSize) {
        if (limit === void 0) { limit = 2; }
        if (thumbSize === void 0) { thumbSize = this.get('thumbSize'); }
        var galleryRef = typeof imageOrGalleryRef === 'number' ?
            imageOrGalleryRef :
            ~~imageOrGalleryRef.getAttribute('data-gallery-ref'), image, limit = Math.min(galleryRef + limit, this.get('galleryLength') - 1), 
        //if this gallery is inside infobox it has to be set of icons
        setOfIcons = this.isInsideInfobox(), mode = Mercury.Modules.Thumbnailer.mode.topCrop, height = thumbSize, width = thumbSize;
        for (; galleryRef <= limit; galleryRef++) {
            image = this.get('media').get(galleryRef);
            if (setOfIcons) {
                mode = Mercury.Modules.Thumbnailer.mode.scaleToWidth;
                height = this.get('infoboxIconSize.height');
                width = Math.floor(height * image.width / image.height);
            }
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
    load: function () {
        var _this = this;
        var $this = this.$(), galleryWidth = $this.width(), thumbSize = this.get('thumbSize'), maxImages = Math.ceil(galleryWidth / thumbSize);
        this.setUp();
        this.loadImages(0, maxImages);
        $this.on('scroll', function () {
            Em.run.debounce(_this, 'onScroll', maxImages, 100);
        });
    },
    onScroll: function (maxImages) {
        var _this = this;
        var $this = this.$(), imagesToLoad = $this.find('img:not(.loaded)'), galleryOffset = $this.scrollLeft() + $this.width();
        if (imagesToLoad.length) {
            imagesToLoad.each(function (index, image) {
                if (image.offsetLeft < galleryOffset) {
                    _this.loadImages(image, maxImages);
                }
            });
        }
        else if (this.get('limit') < this.get('galleryLength')) {
            this.incrementProperty('limit', this.incrementLimitValue);
        }
        else {
            $this.off('scroll');
        }
    }
});
