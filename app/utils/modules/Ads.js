/// <reference path='../../../../typings/jquery/jquery.d.ts' />
/// <reference path='../../baseline/mercury.d.ts' />
/// <reference path='./Trackers/Krux.ts' />
/// <reference path='./Trackers/UniversalAnalytics.ts' />
/// <reference path='../../baseline/mercury.ts' />
/// <reference path='../utils/load.ts' />
'use strict';
var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var Ads = (function () {
            function Ads() {
                this.adSlots = [];
                this.adsContext = null;
                this.isLoaded = false;
            }
            /**
             * Returns instance of Ads object
             * @returns {Mercury.Modules.Ads}
             */
            Ads.getInstance = function () {
                if (Ads.instance === null) {
                    Ads.instance = new Mercury.Modules.Ads();
                }
                return Ads.instance;
            };
            /**
             * Initializes the Ad module
             *
             * @param adsUrl Url for the ads script
             * @param callback Callback function to execute when the script is loaded
             */
            Ads.prototype.init = function (adsUrl, callback) {
                var _this = this;
                //Required by ads tracking code
                window.gaTrackAdEvent = this.gaTrackAdEvent;
                // Load the ads code from MW
                M.load(adsUrl, function () {
                    if (require) {
                        require([
                            'ext.wikia.adEngine.adEngine',
                            'ext.wikia.adEngine.adContext',
                            'ext.wikia.adEngine.config.mobile',
                            'ext.wikia.adEngine.adLogicPageViewCounter',
                            'wikia.krux'
                        ], function (adEngineModule, adContextModule, adConfigMobile, adLogicPageViewCounterModule, krux) {
                            _this.adEngineModule = adEngineModule;
                            _this.adContextModule = adContextModule;
                            _this.adConfigMobile = adConfigMobile;
                            _this.adLogicPageViewCounterModule = adLogicPageViewCounterModule;
                            window.Krux = krux || [];
                            _this.isLoaded = true;
                            callback.call(_this);
                            _this.kruxTrackFirstPage();
                        });
                    }
                    else {
                        console.error('Looks like ads asset has not been loaded');
                    }
                });
            };
            /**
             * Method for sampling and pushing ads-related events
             * @arguments coming from ads tracking request
             * It's called by track() method in wikia.tracker fetched from app by ads code
             */
            Ads.prototype.gaTrackAdEvent = function () {
                var adHitSample = 1, GATracker;
                //Sampling on GA side will kill the performance as we need to allocate object each time we track
                //ToDo: Optimize object allocation for tracking all events
                if (Math.random() * 100 <= adHitSample) {
                    GATracker = new Mercury.Modules.Trackers.UniversalAnalytics();
                    GATracker.trackAds.apply(GATracker, arguments);
                }
            };
            /**
             * Function fired when Krux is ready (see init()).
             * Calls the trackPageView() function on Krux instance.
             * load() in krux.js (/app) automatically detect that
             * there is a first page load (needs to load Krux scripts).
             */
            Ads.prototype.kruxTrackFirstPage = function () {
                var KruxTracker = new Mercury.Modules.Trackers.Krux();
                KruxTracker.trackPageView();
            };
            Ads.prototype.setContext = function (adsContext) {
                this.adsContext = adsContext ? adsContext : null;
            };
            /**
             * Reloads the ads with the provided adsContext
             * @param adsContext
             */
            Ads.prototype.reload = function (adsContext) {
                // Store the context for external reuse
                this.setContext(adsContext);
                if (this.isLoaded && adsContext) {
                    this.adContextModule.setContext(adsContext);
                    this.adLogicPageViewCounterModule.increment();
                    // We need a copy of adSlots as .run destroys it
                    this.adEngineModule.run(this.adConfigMobile, this.getSlots(), 'queue.mercury');
                }
            };
            /**
             * Returns copy of adSlots
             *
             * @returns {string[][]}
             */
            Ads.prototype.getSlots = function () {
                return $.extend([], this.adSlots);
            };
            /**
             * Adds ad slot
             *
             * @param name name of the slot
             * @returns {number} index of the inserted slot
             */
            Ads.prototype.addSlot = function (name) {
                return this.adSlots.push([name]);
            };
            /**
             * Removes ad slot by name
             *
             * @param name Name of ths slot to remove
             */
            Ads.prototype.removeSlot = function (name) {
                this.adSlots = $.grep(this.adSlots, function (slot) {
                    return slot[0] && slot[0] === name;
                }, true);
            };
            Ads.prototype.openLightbox = function (contents) {
                /**
                 * This method is being overwritten in ApplicationRoute for ads needs.
                 * To learn more check ApplicationRoute.ts file.
                 */
            };
            /**
             * Retrieves the ads context
             *
             * @returns {Object|null}
             */
            Ads.prototype.getContext = function () {
                return this.adsContext;
            };
            Ads.instance = null;
            return Ads;
        })();
        Modules.Ads = Ads;
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
