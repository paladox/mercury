export class Quantserve extends BaseTracker {
	constructor () {
		window._qevents = [];
		super();
		this.usesAdsContext = true;
	}

	url () {
		return (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js?" + Math.random();
	}

	trackPageView () {
		var quantcastLabels = ['Category.MobileWeb.Mercury'];

		if (Mercury.wiki.vertical) {
			quantcastLabels.unshift(Mercury.wiki.vertical);
		}

		//without this quantserve does not want to track 2+ page view
		window.__qc = null;

		window._qevents = [{
			qacct: M.prop('tracking.quantserve'),
			labels: quantcastLabels.join(',')
		}];

		this.appendScript();
	}
}
