import Ember from 'ember';

/**
 * This mixin keeps track of viewport size which is updated on every window resize.
 * Mixin has two properties stored as an object: viewport height and viewport width.
 * It is stored as object because objects and arrays are shared among all objects which include mixin.
 * @type {Ember.Mixin}
 */
export default Ember.Mixin.create({
    //This object is shared among all objects which include this mixin
    viewportDimensions: {
        height: null,
        width: null
    },
    initiated: false,
    init: function () {
        var _this = this;
        this._super();
        if (!this.get('initiated')) {
            this.onResize();
            Ember.$(window).on('resize', function () {
                _this.onResize();
            });
            this.set('initiated', true);
        }
    },
    onResize: function () {
        this.set('viewportDimensions.width', Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
        this.set('viewportDimensions.height', Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
    }
});