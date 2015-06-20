/// <reference path="./BaseTracker.ts" />
/// <reference path="../../../../vendor/weppy/weppy.d.ts" />
/// <reference path="../../../baseline/mercury/utils/state.ts" />
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
            var Perf = (function (_super) {
                __extends(Perf, _super);
                function Perf() {
                    this.tracker = Weppy.namespace('mercury');
                    this.defaultContext = {
                        skin: 'mercury',
                        'user-agent': window.navigator.userAgent,
                        env: M.prop('environment'),
                        url: window.location.href.split('#')[0]
                    };
                    this.tracker.setOptions({
                        host: M.prop('weppyConfig').host,
                        transport: 'url',
                        context: this.defaultContext,
                        sample: M.prop('weppyConfig').samplingRate,
                        aggregationInterval: M.prop('weppyConfig').aggregationInterval
                    });
                    _super.call(this);
                }
                Perf.checkDependencies = function () {
                    return typeof Weppy === 'function';
                };
                Perf.prototype.track = function (params) {
                    var trackFn = this.tracker;
                    if (typeof params.module === 'string') {
                        trackFn = this.tracker.into(params.module);
                    }
                    // always set the current URL as part of the context
                    this.defaultContext.url = window.location.href.split('#')[0];
                    // update context in Weppy with new URL and any explicitly passed overrides for context
                    trackFn.setOptions({
                        context: $.extend(params.context, this.defaultContext)
                    });
                    switch (params.type) {
                        case 'count':
                            trackFn.count(params.name, params.value, params.annotations);
                            break;
                        case 'store':
                            trackFn.store(params.name, params.value, params.annotations);
                            break;
                        case 'timer':
                            trackFn.timer.send(params.name, params.value, params.annotations);
                            break;
                        case undefined:
                            throw 'You failed to specify a tracker type.';
                            break;
                        default:
                            throw 'This action not supported in Weppy tracker';
                    }
                    trackFn.flush();
                };
                return Perf;
            })(Trackers.BaseTracker);
            Trackers.Perf = Perf;
        })(Trackers = Modules.Trackers || (Modules.Trackers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
