class OoyalaPlayer extends BasePlayer {
	/**
	 * @param {string} provider
	 * @param {*} params
	 * @returns {void}
	 */
	constructor(provider, params) {
		super(provider, params);

		this.started = false;
		this.ended = false;

		// a bit ambiguous based on legacy return, but the first file is the
		// Ooyala embedded API, the second is AgeGate
		this.resourceURI = params.jsFile[0];

		// Ooyala JSON payload contains a DOM id
		this.containerId = BasePlayer.createUniqueId(params.playerId);
		this.containerSelector = `#${this.containerId}`;

		this.setupPlayer();
	}

	/**
	 * @returns {void}
	 */
	setupPlayer() {
		this.params = $.extend(this.params, {
			onCreate: () => {
				return this.onCreate.apply(this, arguments);
			}
		});

		if (!window.OO) {
			this.loadPlayer();
		} else {
			this.createPlayer();
		}
	}

	/**
	 * @returns {void}
	 */
	createPlayer() {
		window.OO.Player.create(this.containerId, this.params.videoId, this.params);
	}

	/**
	 * @returns {void}
	 */
	playerDidLoad() {
		this.createPlayer();
	}

	/**
	 * @param {*} player
	 * @returns {void}
	 */
	onCreate(player) {
		const messageBus = player.mb;

		// Player has loaded
		messageBus.subscribe(window.OO.EVENTS.PLAYER_CREATED, 'tracking', () => {
			this.track('player-load');
		});

		// Actual content starts playing (past any ads or age-gates)
		messageBus.subscribe(window.OO.EVENTS.PLAYING, 'tracking', () => {
			if (!this.started) {
				this.track('content-begin');
				this.started = true;
			}
		});

		// Ad starts
		messageBus.subscribe(window.OO.EVENTS.WILL_PLAY_ADS, 'tracking', () => {
			this.track('ad-start');
		});

		// Ad has been fully watched
		messageBus.subscribe(window.OO.EVENTS.ADS_PLAYED, 'tracking', () => {
			this.track('ad-finish');
		});
	}
}
