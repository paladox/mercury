/**
 * @description Instantiates performance tracker
 */

import Perf from '../modules/trackers/perf';

function getInstance() {
	if (Perf.checkDependencies()) {
		instance = instance || new Perf();
		return instance;
	}
	throw new Error('no instance found');
}

export function trackPerf(obj) {
	return getInstance().track(obj);
}

export function sendPagePerformance() {
	// Initializes Weppy context
	getInstance();
	Weppy.sendPagePerformance();
}
