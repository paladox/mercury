/// <reference path="../app.ts" />
'use strict';
App.ThirdsClickMixin = Em.Mixin.create({
    leftClickHandler: Em.K,
    rightClickHandler: Em.K,
    centerClickHandler: Em.K,
    viewportWidth: Em.computed(function () {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }),
    preventDefaultActions: function (event) {
        event.preventDefault();
        event.stopPropagation();
    },
    /**
     * @desc Checks on which area on the screen an event took place
     * and calls proper handler
     *
     * @param {PreventableClickEvent} event
     * @param {boolean} preventDefault
     */
    callClickHandler: function (event, preventDefault) {
        if (preventDefault === void 0) { preventDefault = false; }
        var viewportWidth = this.get('viewportWidth'), x = event.clientX, thirdPartOfScreen = viewportWidth / 3;
        if (x < thirdPartOfScreen) {
            if (this.leftClickHandler(event) && preventDefault) {
                this.preventDefaultActions(event);
            }
        }
        else if (x > viewportWidth - thirdPartOfScreen) {
            if (this.rightClickHandler(event) && preventDefault) {
                this.preventDefaultActions(event);
            }
        }
        else {
            if (this.centerClickHandler(event) && preventDefault) {
                this.preventDefaultActions(event);
            }
        }
    }
});
