


var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var playerClassMap = {
            youtube: 'YouTube',
            ooyala: 'Ooyala'
        };
        var VideoLoader = (function () {
            function VideoLoader(data) {
                this.data = data;
                this.loadPlayerClass();
            }
            VideoLoader.prototype.isProvider = function (name) {
                return !!this.data.provider.toLowerCase().match(name);
            };
            /**
             * Loads player for the video, currently either OoyalaPlayer, YouTubePlayer or BasePlayer (default)
             */
            VideoLoader.prototype.loadPlayerClass = function () {
                var provider = this.getProviderName(), playerClassStr = (playerClassMap[provider] || 'Base') + 'Player', players = Modules.VideoPlayers, params = $.extend(this.data.jsParams, {
                    size: {
                        height: this.data.height,
                        width: this.data.width
                    }
                });
                this.player = new players[playerClassStr](provider, params);
                this.player.onResize();
            };
            VideoLoader.prototype.getProviderName = function () {
                return this.isProvider('ooyala') ? 'ooyala' : this.data.provider;
            };
            VideoLoader.prototype.onResize = function () {
                this.player.onResize();
            };
            return VideoLoader;
        })();
        Modules.VideoLoader = VideoLoader;
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
