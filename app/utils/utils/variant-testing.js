/**
 * @define variantTesting
 *
 * Helper for variant testing using Optimizely
 */

/**
 * Activates all variant tests for the current page
 *
 * @returns {void}
 */
export function activate () {
	var optimizely = window.optimizely;

	if (optimizely) {
		optimizely.push(['activate']);
	}
}

/**
 * Tracks an event by name
 *
 * @param {string} eventName
 * @returns {void}
 */
export function trackEvent (eventName) {
	var optimizely = window.optimizely;

	if (optimizely) {
		optimizely.push(['trackEvent', eventName]);
	}
}

/**
 * Integrates Optimizely with Universal Analytics
 *
 * @param {[]} dimensions
 * @returns {[]}
 */
export function integrateOptimizelyWithUA (dimensions) {
	var optimizely = window.optimizely,
		experimentId,
		dimension,
		experimentName,
		variationName;

	if (optimizely && optimizely.activeExperiments) {
		optimizely.activeExperiments.forEach((experimentId) => {
			if (
				optimizely.allExperiments.hasOwnProperty(experimentId) &&
				typeof optimizely.allExperiments[experimentId].universal_analytics === 'object'
			) {
				dimension = optimizely.allExperiments[experimentId].universal_analytics.slot;
				experimentName = optimizely.allExperiments[experimentId].name;
				variationName = optimizely.variationNamesMap[experimentId];

				dimensions[dimension] = `Optimizely ${experimentName} (${experimentId}): ${variationName}`;
			}
		});
	}

	return dimensions;
}
