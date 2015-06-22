/**
 * Base class for trackers that have to append their scripts like Comscore or Quantserve
 */

export default class BaseTracker {
	usesAdsContext;
	script;

	constructor () {
		this.usesAdsContext = false;
		this.script = document.getElementsByTagName('script')[0];
	}

	//This method should overridden implemented by a tracker
	url() {
		return '';
	}

	appendScript() {
		var elem = document.createElement('script');
		elem.async = true;
		elem.src = this.url();
		BaseTracker.script.parentNode.insertBefore(elem, BaseTracker.script);
	}
}
