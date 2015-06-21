

var __extends = window.__extends || function (d, b) {
    for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p];}}
    function Extender() { this.constructor = d; }
		Extender.prototype = b.prototype;
    d.prototype = new Extender();
};
var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var VideoPlayers;
        (function (VideoPlayers) {
           var YouTubePlayer = (function (_super) {
                __extends(YouTubePlayer, _super);
                function YouTubePlayer(provider, params) {
                    _super.call(this, provider, params);
                    this.resourceURI = 'https://www.youtube.com/iframe_api';
                    this.containerId = this.createUniqueId('youtubeVideoPlayer');
                    this.started = false;
                    this.ended = false;
                    this.bindPlayerEvents();
                }
                YouTubePlayer.prototype.bindPlayerEvents = function () {
                    var _this = this;
                    this.params.events = {
                        'onReady': function () { return _this.onPlayerReady.apply(_this, arguments); },
                        'onStateChange': function () { return _this.onPlayerStateChange.apply(_this, arguments); }
                    };
                    if (window.YT) {
                        this.createPlayer();
                    }
                    else {
                        window.onYouTubeIframeAPIReady = function () {
                            _this.createPlayer();
                        };
                        this.loadPlayer();
                    }
                };
                YouTubePlayer.prototype.createPlayer = function () {
                    this.player = new window.YT.Player(this.containerId, this.params);
                };
                YouTubePlayer.prototype.onPlayerReady = function () {
                    this.onResize();
                    this.track('player-loaded');
                };
                YouTubePlayer.prototype.onPlayerStateChange = function (event) {
                    if (!this.started && event.data === 1) {
                        this.track('content-begin');
                        this.started = true;
                    }
                    if (!this.ended && event.data === 0) {
                        this.track('content-end');
                        this.ended = true;
                    }
                };
                return YouTubePlayer;
            })(VideoPlayers.BasePlayer);
            VideoPlayers.YouTubePlayer = YouTubePlayer;
        })(VideoPlayers = Modules.VideoPlayers || (Modules.VideoPlayers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
