export default class UniversalAnalytics {
	static dimensions = [];
	tracked = [];
	accounts;
	accountPrimary = 'primary';
	accountSpecial = 'special';
	accountAds = 'ads';

	constructor (isSpecialWiki = false) {
		if (!UniversalAnalytics.dimensions.length) {
			throw new Error(
				'Cannot instantiate UA tracker: please provide dimensions using UniversalAnalytics#setDimensions'
			);
		}

		// All domains that host content for Wikia
		// Use one of the domains below. If none matches, the tag will fall back to
		// the default which is 'auto', probably good enough in edge cases.
		var domain = [
			'wikia.com', 'ffxiclopedia.org', 'jedipedia.de',
			'marveldatabase.com', 'memory-alpha.org', 'uncyclopedia.org',
			'websitewiki.de', 'wowwiki.com', 'yoyowiki.org'
		].filter((domain) => document.location.hostname.indexOf(domain) > -1)[0];

		this.accounts = M.prop('tracking.ua');

		// Primary account
		this.initAccount(this.accountPrimary, domain);

		this.initAccount(this.accountAds, domain);

		if (isSpecialWiki) {
			this.initAccount(this.accountSpecial, domain);
		}
	}


	/**
	 * @static
	 * @description Synchronously sets the UA dimensional context
	 * @param {Array} dimensions  array of dimensions to set, may be strings or functions
	 * @param {boolean} overwrite  set to true to overwrite all preexisting dimensions and unset ones not declared
	 * @returns {boolean} true if dimensions were successfully set
	 */
	static setDimensions (dimensions, overwrite) {
		if (!dimensions.length) {
			return false;
		}

		if (overwrite) {
			UniversalAnalytics.dimensions = dimensions;
		} else {
			$.extend(UniversalAnalytics.dimensions, dimensions);
		}

		return true;
	}

	/**
	 * @private
	 * @param {number} idx of dimension
	 * @description Retrieves string value or invokes function for value
	 * @returns {string}
	 */
	getDimension (idx) {
		var dimension = UniversalAnalytics.dimensions[idx];
		return typeof dimension === 'function' ? dimension() : dimension;
	}

	/**
	 * Initialize an additional account or property
	 *
	 * @param {string} trackerName The name of the account as specified in localSettings
	 * @param {string} domain
	 */
	initAccount (trackerName, domain) {
		var options,
			prefix,
			dimensionNum;

		options = {
			name: '',
			allowLinker: true,
			sampleRate: this.accounts[trackerName].sampleRate
		};
		prefix = '';

		// Primary account should not have a namespace prefix
		if (trackerName !== this.accountPrimary) {
			prefix = this.accounts[trackerName].prefix + '.';
		}

		// Primary account should not have a namespace prefix
		if (trackerName !== this.accountPrimary) {
			options.name = this.accounts[trackerName].prefix;
		}

		ga('create', this.accounts[trackerName].id, 'auto', options);

		ga(prefix + 'require', 'linker');
		if (domain) {
			ga(prefix + 'linker:autoLink', domain);
		}

		UniversalAnalytics.dimensions.forEach((dimension, idx) =>
			ga(`${prefix}set`, `dimension${idx}`, this.getDimension(idx))
		);

		this.tracked.push(this.accounts[trackerName]);
	}

	/**
	 * Tracks an event, using the parameters native to the UA send() method
	 *
	 * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference}
	 * @param {string} category Event category.
	 * @param {string} action Event action.
	 * @param {string} label Event label.
	 * @param {number} value Event value. Has to be an integer.
	 * @param {boolean} nonInteractive Whether event is non-interactive.
	 */
	track (category, action, label, value, nonInteractive) {
		ga(
			'send',
			{
				hitType: 'event',
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				eventValue: value,
				nonInteraction: nonInteractive
			}
		);
	}

	/**
	 * Tracks an ads-related event
	 * @see {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference}
	 * @param {string} category Event category.
	 * @param {string} action Event action.
	 * @param {string} label Event label.
	 * @param {number} value Event value. Has to be an integer.
	 * @param {boolean} nonInteractive Whether event is non-interactive.
	 */
	trackAds (category, action, label, value, nonInteractive) {
		ga(
			this.accounts[this.accountAds].prefix + '.send',
			{
				hitType: 'event',
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				eventValue: value,
				nonInteraction: nonInteractive
			}
		);
	}

	/**
	 * Tracks the current page view
	 */
	trackPageView () {
		var pageType = this.getDimension(8);

		if (!pageType) {
			throw new Error('missing page type dimension (#8)');
		}

		this.tracked.forEach((account) => {
			var prefix = account.prefix ? account.prefix + '.' : '';
			ga(`${prefix}set`, 'dimension8', pageType, 3);
			ga(`${prefix}send`, 'pageview');
		});
	}
}
