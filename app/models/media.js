import Ember from 'ember';

export default Ember.Object.extend({
    find: function (id) {
        return this.get('media')[id];
    },
    /**
     * @param title
     * @returns {{mediaRef: number, galleryRef: number}}
     */
    getRefsForLightboxByTitle: function (title) {
        var media = this.get('media'), mediaRef = null, galleryRef = null, findInMedia = function (mediaItem, mediaIndex) {
            if (Ember.isArray(mediaItem)) {
                return mediaItEmber.some(findInGallery, {
                    mediaIndex: mediaIndex
                });
            }
            else if (mediaItEmber.title === title) {
                mediaRef = mediaIndex;
                return true;
            }
        }, findInGallery = function (galleryItem, galleryIndex) {
            if (galleryItEmber.title === title) {
                mediaRef = this.mediaIndex;
                galleryRef = galleryIndex;
                return true;
            }
            return false;
        };
        if (Ember.isArray(media)) {
            media.some(findInMedia);
        }
        else {
            Ember.Logger.debug('Media is not an array', media);
        }
        return {
            mediaRef: mediaRef,
            galleryRef: galleryRef
        };
    }
});
