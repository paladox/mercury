var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var VideoPlayers;
        (function (VideoPlayers) {
            var OoyalaPlayer = (function (_super) {
                __extends(OoyalaPlayer, _super);
                function OoyalaPlayer(provider, params) {
                    _super.call(this, provider, params);
                    // a bit ambiguous based on legacy return, but the first file is the
                    // Ooyala embedded API, the second is AgeGate
                    this.resourceURI = this.params.jsFile[0];
                    // Ooyala JSON payload contains a DOM id
                    this.containerId = this.createUniqueId(this.params.playerId);
                    this.started = false;
                    this.ended = false;
                    this.containerSelector = '#' + this.containerId;
                    this.setupPlayer();
                }
                OoyalaPlayer.prototype.setupPlayer = function () {
                    var _this = this;
                    this.params = $.extend(this.params, {
                        onCreate: function () { return _this.onCreate.apply(_this, arguments); }
                    });
                    if (!window.OO) {
                        this.loadPlayer();
                    }
                    else {
                        this.createPlayer();
                    }
                };
                OoyalaPlayer.prototype.createPlayer = function () {
                    window.OO.Player.create(this.containerId, this.params.videoId, this.params);
                };
                OoyalaPlayer.prototype.playerDidLoad = function () {
                    this.createPlayer();
                };
                OoyalaPlayer.prototype.onCreate = function (player) {
                    var _this = this;
                    var messageBus = player.mb;
                    // Player has loaded
                    messageBus.subscribe(window.OO.EVENTS.PLAYER_CREATED, 'tracking', function () {
                        _this.track('player-load');
                    });
                    // Actual content starts playing (past any ads or age-gates)
                    messageBus.subscribe(window.OO.EVENTS.PLAYING, 'tracking', function () {
                        if (!_this.started) {
                            _this.track('content-begin');
                            _this.started = true;
                        }
                    });
                    // Ad starts
                    messageBus.subscribe(window.OO.EVENTS.WILL_PLAY_ADS, 'tracking', function () {
                        _this.track('ad-start');
                    });
                    // Ad has been fully watched
                    messageBus.subscribe(window.OO.EVENTS.ADS_PLAYED, 'tracking', function () {
                        _this.track('ad-finish');
                    });
                };
                return OoyalaPlayer;
            })(VideoPlayers.BasePlayer);
            VideoPlayers.OoyalaPlayer = OoyalaPlayer;
        })(VideoPlayers = Modules.VideoPlayers || (Modules.VideoPlayers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
