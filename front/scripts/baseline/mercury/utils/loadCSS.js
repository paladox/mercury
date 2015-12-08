if (typeof window.M === 'undefined') {
	window.M = {};
}

(function (M) {
	/**
	 * By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM.
	 * However, if you desire a more specific location in your document use before parameter.
	 *
	 * @see https://github.com/filamentgroup/loadCSS
	 * @param {string} href - URL for your CSS file
	 * @param {HTMLElement} [before] - element the script should use as a reference for injecting <link> before
	 * @param {string} [media='all'] - media type or query of the stylesheet
	 * @returns {HTMLElement}
	 */
	M.loadCSS = function (href, before, media = 'all') {
		const doc = window.document,
			link = doc.createElement('link'),
			sheets = doc.styleSheets;

		let ref,
			onloadcssdefined;

		if (before) {
			ref = before;
		} else {
			const refs = (doc.body || doc.getElementsByTagName('head')[0]).childNodes;

			ref = refs[refs.length - 1];
		}

		link.rel = 'stylesheet';
		link.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		link.media = 'only x';

		// Inject link
		// Note: `insertBefore` is used instead of `appendChild`, for safety
		// re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ref.parentNode.insertBefore(link, (before ? ref : ref.nextSibling));

		// A method (exposed on return object for external use) that mimics onload by polling
		// until document.styleSheets until it includes the new sheet.
		onloadcssdefined = function (cb) {
			const resolvedHref = link.href;

			let i = sheets.length;

			while (i--) {
				if (sheets[i].href === resolvedHref) {
					return cb();
				}
			}

			setTimeout(() => onloadcssdefined(cb));
		};

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		link.onloadcssdefined = onloadcssdefined;
		onloadcssdefined(() => link.media = media);

		return link;
	};
})(M);
