/// <reference path="../../../baseline/mercury.d.ts" />
'use strict';
/**
 * Base class for trackers that have to append their scripts like Comscore or Quantserve
 */
var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var Trackers;
        (function (Trackers) {
            var BaseTracker = (function () {
                function BaseTracker() {
                    this.usesAdsContext = false;
                }
                //This method should overridden implemented by a tracker
                BaseTracker.prototype.url = function () {
                    return '';
                };
                BaseTracker.prototype.appendScript = function () {
                    var elem = document.createElement('script');
                    elem.async = true;
                    elem.src = this.url();
                    BaseTracker.script.parentNode.insertBefore(elem, BaseTracker.script);
                };
                BaseTracker.script = document.getElementsByTagName('script')[0];
                return BaseTracker;
            })();
            Trackers.BaseTracker = BaseTracker;
        })(Trackers = Modules.Trackers || (Modules.Trackers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
