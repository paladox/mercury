/// <reference path="../../baseline/mercury.d.ts" />
/**
 * @define variantTesting
 *
 * Helper for variant testing using Optimizely
 */
'use strict';
var Mercury;
(function (Mercury) {
    var Utils;
    (function (Utils) {
        var VariantTesting;
        (function (VariantTesting) {
            /**
             * Activates all variant tests for the current page
             *
             * @returns {void}
             */
            function activate() {
                var optimizely = window.optimizely;
                if (optimizely) {
                    optimizely.push(['activate']);
                }
            }
            VariantTesting.activate = activate;
            /**
             * Tracks an event by name
             *
             * @param {string} eventName
             * @returns {void}
             */
            function trackEvent(eventName) {
                var optimizely = window.optimizely;
                if (optimizely) {
                    optimizely.push(['trackEvent', eventName]);
                }
            }
            VariantTesting.trackEvent = trackEvent;
            /**
             * Integrates Optimizely with Universal Analytics
             *
             * @param {[]} dimensions
             * @returns {[]}
             */
            function integrateOptimizelyWithUA(dimensions) {
                var optimizely = window.optimizely, experimentId, dimension, experimentName, variationName;
                if (optimizely && optimizely.activeExperiments) {
                    optimizely.activeExperiments.forEach(function (experimentId) {
                        if (optimizely.allExperiments.hasOwnProperty(experimentId) &&
                            typeof optimizely.allExperiments[experimentId].universal_analytics === 'object') {
                            dimension = optimizely.allExperiments[experimentId].universal_analytics.slot;
                            experimentName = optimizely.allExperiments[experimentId].name;
                            variationName = optimizely.variationNamesMap[experimentId];
                            dimensions[dimension] = "Optimizely " + experimentName + " (" + experimentId + "): " + variationName;
                        }
                    });
                }
                return dimensions;
            }
            VariantTesting.integrateOptimizelyWithUA = integrateOptimizelyWithUA;
        })(VariantTesting = Utils.VariantTesting || (Utils.VariantTesting = {}));
    })(Utils = Mercury.Utils || (Mercury.Utils = {}));
})(Mercury || (Mercury = {}));
