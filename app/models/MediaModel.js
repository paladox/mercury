/// <reference path="../app.ts" />
'use strict';
App.MediaModel = Em.Object.extend({
    find: function (id) {
        return this.get('media')[id];
    },
    /**
     * @param title
     * @returns {{mediaRef: number, galleryRef: number}}
     */
    getRefsForLightboxByTitle: function (title) {
        var media = this.get('media'), mediaRef = null, galleryRef = null, findInMedia = function (mediaItem, mediaIndex) {
            if (Em.isArray(mediaItem)) {
                return mediaItem.some(findInGallery, {
                    mediaIndex: mediaIndex
                });
            }
            else if (mediaItem.title === title) {
                mediaRef = mediaIndex;
                return true;
            }
        }, findInGallery = function (galleryItem, galleryIndex) {
            if (galleryItem.title === title) {
                mediaRef = this.mediaIndex;
                galleryRef = galleryIndex;
                return true;
            }
            return false;
        };
        if (Em.isArray(media)) {
            media.some(findInMedia);
        }
        else {
            Em.Logger.debug('Media is not an array', media);
        }
        return {
            mediaRef: mediaRef,
            galleryRef: galleryRef
        };
    }
});
