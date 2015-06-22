export default class YouTubePlayer extends BasePlayer {
	resourceURI = 'https://www.youtube.com/iframe_api';
	containerId = this.createUniqueId('youtubeVideoPlayer');
	started;
	ended;

	constructor (provider, params) {
		super(provider, params);
		this.started = false;
		this.ended = false;
		this.bindPlayerEvents();
	}

	bindPlayerEvents () {
		this.params.events = {
			'onReady': () => { return this.onPlayerReady.apply(this, arguments); },
			'onStateChange': () => { return this.onPlayerStateChange.apply(this, arguments); }
		};

		if (window.YT) {
			this.createPlayer();
		} else {
			window.onYouTubeIframeAPIReady = () => {
				this.createPlayer();
			};
			this.loadPlayer();
		}
	}

	createPlayer () {
		this.player = new window.YT.Player(this.containerId, this.params);
	}

	onPlayerReady () {
		this.onResize();
		this.track('player-loaded');
	}

	onPlayerStateChange (event) {
		if (!this.started && event.data === 1) {
			this.track('content-begin');
			this.started = true;
		}
		if (!this.ended && event.data === 0) {
			this.track('content-end');
			this.ended = true;
		}
	}
}
