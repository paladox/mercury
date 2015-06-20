/// <reference path="../../../../../typings/ember/ember.d.ts" />
/// <reference path="./BaseTracker.ts" />
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var Trackers;
        (function (Trackers) {
            var Quantserve = (function (_super) {
                __extends(Quantserve, _super);
                function Quantserve() {
                    window._qevents = [];
                    _super.call(this);
                    this.usesAdsContext = true;
                }
                Quantserve.prototype.url = function () {
                    return (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js?" + Math.random();
                };
                Quantserve.prototype.trackPageView = function () {
                    var quantcastLabels = ['Category.MobileWeb.Mercury'];
                    if (Mercury.wiki.vertical) {
                        quantcastLabels.unshift(Mercury.wiki.vertical);
                    }
                    //without this quantserve does not want to track 2+ page view
                    window.__qc = null;
                    window._qevents = [{
                            qacct: M.prop('tracking.quantserve'),
                            labels: quantcastLabels.join(',')
                        }];
                    this.appendScript();
                };
                return Quantserve;
            })(Trackers.BaseTracker);
            Trackers.Quantserve = Quantserve;
        })(Trackers = Modules.Trackers || (Modules.Trackers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
