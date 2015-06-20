/// <reference path="../../../../typings/ember/ember.d.ts" />
/// <reference path="../modules/Trackers/Internal.ts" />
/// <reference path="../modules/Trackers/UniversalAnalytics.ts" />
var Mercury;
(function (Mercury) {
    var Utils;
    (function (Utils) {
        // These actions were ported over from legacy Wikia app code:
        // https://github.com/Wikia/app/blob/dev/resources/wikia/modules/tracker.stub.js
        // The property keys were modified to fit style rules
        var actions = {
            // Generic add
            add: 'add',
            // Generic click, mostly javascript clicks
            // NOTE: When tracking clicks, consider binding to 'onMouseDown' instead of 'onClick'
            // to allow the browser time to send these events naturally. For more information on
            // this issue, see the `track()` method in "resources/modules/tracker.js"
            click: 'click',
            // Click on navigational button
            clickLinkButton: 'click-link-button',
            // Click on image link
            clickLinkImage: 'click-link-image',
            // Click on text link
            clickLinkText: 'click-link-text',
            // Generic close
            close: 'close',
            // Clicking okay in a confirmation modal
            confirm: 'confirm',
            // Generic disable
            disable: 'disable',
            // Generic enable
            enable: 'enable',
            // Generic error (generally AJAX)
            error: 'error',
            // Generic hover
            hover: 'hover',
            // impression of item on page/module
            impression: 'impression',
            // App installation
            install: 'install',
            // Generic keypress
            keypress: 'keypress',
            paginate: 'paginate',
            // Video play
            playVideo: 'play-video',
            // Removal
            remove: 'remove',
            // Generic open
            open: 'open',
            // Sharing view email, social network, etc
            share: 'share',
            // Form submit, usually a post method
            submit: 'submit',
            // Successful ajax response
            success: 'success',
            // General swipe event
            swipe: 'swipe',
            // Action to take a survey
            takeSurvey: 'take-survey',
            // View
            view: 'view'
        }, context = {
            a: null,
            n: null
        };
        function pruneParams(params) {
            delete params.action;
            delete params.label;
            delete params.value;
            delete params.category;
            delete params.isNonInteractive;
        }
        function isSpecialWiki() {
            try {
                return !!(M.prop('isGASpecialWiki') || Mercury.wiki.isGASpecialWiki);
            }
            catch (e) {
                // Property doesn't exist
                return false;
            }
        }
        function track(params) {
            var trackingMethod = params.trackingMethod || 'both', action = params.action, category = params.category ? 'mercury-' + params.category : null, label = params.label || '', value = params.value || 0, isNonInteractive = params.isNonInteractive !== false, trackers = Mercury.Modules.Trackers, tracker, uaTracker;
            if (M.prop('queryParams.noexternals')) {
                return;
            }
            params = $.extend({
                ga_action: action,
                ga_category: category,
                ga_label: label,
                ga_value: value,
                ga_is_nonInteractive: isNonInteractive
            }, params);
            //We rely on ga_* params in both trackers
            pruneParams(params);
            if (trackingMethod === 'both' || trackingMethod === 'ga') {
                if (!category || !action) {
                    throw new Error('missing required GA params');
                }
                uaTracker = new trackers.UniversalAnalytics(isSpecialWiki());
                uaTracker.track(category, actions[action], label, value, isNonInteractive);
            }
            if (trackingMethod === 'both' || trackingMethod === 'internal') {
                tracker = new trackers.Internal();
                params = $.extend(context, params);
                tracker.track(params);
            }
        }
        Utils.track = track;
        /**
         * function for aggregating all page tracking that Wikia uses.
         * To make trackPageView work with your tracker,
         * make it a class in Mercury.Modules.Trackers and export one function 'trackPageView'
         *
         * trackPageView is called in ArticleView.onArticleChange
         */
        function trackPageView(adsContext) {
            var trackers = Mercury.Modules.Trackers;
            if (M.prop('queryParams.noexternals')) {
                return;
            }
            Object.keys(trackers).forEach(function (tracker) {
                var Tracker = trackers[tracker], instance;
                if (typeof Tracker.prototype.trackPageView === 'function') {
                    instance = new Tracker(isSpecialWiki());
                    console.info('Track pageView:', tracker);
                    instance.trackPageView(instance.usesAdsContext ? adsContext : context);
                }
            });
        }
        Utils.trackPageView = trackPageView;
        function setTrackContext(data) {
            context = data;
        }
        Utils.setTrackContext = setTrackContext;
        // Export actions so that they're accessible as M.trackActions
        Utils.trackActions = actions;
    })(Utils = Mercury.Utils || (Mercury.Utils = {}));
})(Mercury || (Mercury = {}));
