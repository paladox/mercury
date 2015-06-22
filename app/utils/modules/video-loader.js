var playerClassMap = {
	youtube: 'YouTube',
	ooyala: 'Ooyala'
};

export default class VideoLoader {
	data;
	player;

	constructor (data) {
		this.data = data;
		this.loadPlayerClass();
	}

	isProvider (name) {
		return !!this.data.provider.toLowerCase().match(name);
	}

	/**
	 * Loads player for the video, currently either OoyalaPlayer, YouTubePlayer or BasePlayer (default)
	 */
	loadPlayerClass () {
		var provider = this.getProviderName(),
			playerClassStr = (playerClassMap[provider] || 'Base') + 'Player',
			players = VideoPlayers,
			params = $.extend(this.data.jsParams, {
				size: {
					height: this.data.height,
					width: this.data.width
				}
			});

		this.player = new players[playerClassStr](provider, params);
		this.player.onResize();
	}

	getProviderName () {
		return this.isProvider('ooyala') ? 'ooyala' : this.data.provider;
	}

	onResize () {
		this.player.onResize();
	}
}
