var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var Trackers;
        (function (Trackers) {
            var Comscore = (function (_super) {
                __extends(Comscore, _super);
                function Comscore() {
                    window._comscore = window._comscore || [];
                    _super.call(this);
                }
                Comscore.prototype.url = function () {
                    return (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js?" + Math.random();
                };
                Comscore.prototype.trackPageView = function () {
                    var comscore = M.prop('tracking.comscore'), id = comscore.id, c7Value = comscore.c7Value;
                    window._comscore.push({
                        c1: '2',
                        c2: id,
                        options: {
                            url_append: comscore.keyword + '=' + c7Value
                        }
                    });
                    this.appendScript();
                };
                return Comscore;
            })(Trackers.BaseTracker);
            Trackers.Comscore = Comscore;
        })(Trackers = Modules.Trackers || (Modules.Trackers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
