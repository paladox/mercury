

var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var Trackers;
        (function (Trackers) {
            var Internal = (function () {
                function Internal() {
                    this.baseUrl = 'http://a.wikia-beacon.com/__track/';
                    this.callbackTimeout = 200;
                    var config = Internal.getConfig();
                    this.head = document.head || document.getElementsByTagName('head')[0];
                    this.defaults = config;
                }
                Internal.getConfig = function () {
                    var mercury = window.Mercury;
                    return {
                        c: mercury.wiki.id,
                        x: mercury.wiki.dbName,
                        lc: mercury.wiki.language.user,
                        u: 0,
                        s: 'mercury',
                        beacon: '',
                        cb: ~~(Math.random() * 99999)
                    };
                };
                Internal.isPageView = function (category) {
                    return category.toLowerCase() === 'view';
                };
                Internal.prototype.createRequestURL = function (category, params) {
                    var parts = [], paramStr, targetRoute = Internal.isPageView(category) ? 'view' : 'special/trackingevent', value;
                    Object.keys(params).forEach(function (key) {
                        value = params[key];
                        if (value != null) {
                            paramStr = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                            parts.push(paramStr);
                        }
                    });
                    return this.baseUrl + targetRoute + '?' + parts.join('&');
                };
                Internal.prototype.loadTrackingScript = function (url) {
                    var _this = this;
                    var script = document.createElement('script');
                    script.src = url;
                    script.onload = script.onreadystatechange = function (abort) {
                        if (!abort || !!script.readyState || !/loaded|complete/.test(script.readyState)) {
                            return;
                        }
                        // Handle memory leak in IE
                        script.onload = script.onreadystatechange = null;
                        // Remove the script
                        if (_this.head && script.parentNode) {
                            _this.head.removeChild(script);
                        }
                        // Dereference the script
                        script = undefined;
                        if (!abort && typeof _this.success === 'function') {
                            setTimeout(_this.success, _this.callbackTimeout);
                        }
                        else if (abort && typeof _this.error === 'function') {
                            setTimeout(_this.error, _this.callbackTimeout);
                        }
                    };
                    this.head.insertBefore(script, this.head.firstChild);
                };
                Internal.prototype.track = function (params) {
                    var config = $.extend(params, this.defaults);
                    this.loadTrackingScript(this.createRequestURL(config.ga_category, config));
                };
                /**
                 * alias to track a page view
                 */
                Internal.prototype.trackPageView = function (context) {
                    this.track($.extend({
                        ga_category: 'view'
                    }, context));
                };
                return Internal;
            })();
            Trackers.Internal = Internal;
        })(Trackers = Modules.Trackers || (Modules.Trackers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
