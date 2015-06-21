
var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var Trackers;
        (function (Trackers) {
            var Krux = (function () {
                function Krux() {
                    window.Krux = window.Krux || [];
                }
                /**
                * @desc Exports page params to Krux.
                * mobileId variable is the ID referencing to the mobile site
                * (see ads_run.js and krux.js in app repository)
                */
                Krux.prototype.trackPageView = function () {
                    if (typeof window.Krux.load === 'function') {
                        window.Krux.load(M.prop('tracking.krux.mobileId'));
                    }
                };
                return Krux;
            })();
            Trackers.Krux = Krux;
        })(Trackers = Modules.Trackers || (Modules.Trackers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
