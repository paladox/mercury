



var Mercury;
(function (Mercury) {
    var Modules;
    (function (Modules) {
        var VideoPlayers;
        (function (VideoPlayers) {
            var BasePlayer = (function () {
                function BasePlayer(provider, params) {
                    //Most common video container selector
                    this.containerSelector = '.lightbox-content-inner > iframe';
                    if (!provider) {
                        throw new Error('VideoPlayer requires a provider as the first argument');
                    }
                    this.provider = provider;
                    this.params = params;
                    this.id = params.videoId;
                    this.videoWidth = params.size.width;
                    this.videoHeight = params.size.height;
                }
                BasePlayer.prototype.loadPlayer = function () {
                    var _this = this;
                    return M.load(this.resourceURI, function () {
                        // called once player is loaded
                        _this.playerDidLoad();
                    });
                };
                /**
                 * Intentionally a no-op, documentation that this hook is implemented
                 * and to not error when called by loadPlayer*
                 */
                BasePlayer.prototype.playerDidLoad = function () { };
                /**
                 * Sets CSS width and height for the video container.
                 * Container selector is can be overriden by the inheriting class
                 * @param {String} containerSelector - JQuery selector of the video container
                 */
                BasePlayer.prototype.onResize = function (containerSelector) {
                    if (containerSelector === void 0) { containerSelector = this.containerSelector; }
                    var $container = $(containerSelector), $lightbox = $('.lightbox-wrapper'), lightboxWidth = $lightbox.width(), lightboxHeight = $lightbox.height(), targetSize, sanitizedSize;
                    targetSize = Mercury.Utils.Calculation.containerSize(lightboxWidth, lightboxHeight, this.videoWidth, this.videoHeight);
                    // sanitize as our backend sometimes returns size of 0x0
                    if (targetSize.width > 0 && targetSize.height > 0) {
                        sanitizedSize = {
                            width: targetSize.width,
                            height: targetSize.height
                        };
                    }
                    else {
                        sanitizedSize = {
                            width: '100%',
                            height: '100%'
                        };
                    }
                    $container.css(sanitizedSize);
                };
                BasePlayer.prototype.createUniqueId = function (id) {
                    var element = document.getElementById(id), newId = id + new Date().getTime();
                    if (element) {
                        element.id = newId;
                    }
                    return newId;
                };
                BasePlayer.prototype.track = function (event) {
                    if (event === void 0) { event = ''; }
                    return M.track({
                        action: event,
                        label: this.provider,
                        category: 'video-player-' + event
                    });
                };
                return BasePlayer;
            })();
            VideoPlayers.BasePlayer = BasePlayer;
        })(VideoPlayers = Modules.VideoPlayers || (Modules.VideoPlayers = {}));
    })(Modules = Mercury.Modules || (Mercury.Modules = {}));
})(Mercury || (Mercury = {}));
