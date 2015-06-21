export function initialize() {
	if (typeof EmPerfSender === 'undefined') {
		return;
	}

	$(window).load(function () { return M.sendPagePerformance(); });

	EmPerfSender.initialize({
		// Specify a specific function for EmPerfSender to use when it has captured metrics
		send: function (events, metrics) {
			// This is where we connect EmPerfSender with our persistent metrics adapter, in this case, M.trackPerf
			// is our instance of a Weppy interface
			M.trackPerf({
				module: metrics.klass.split('.')[0].toLowerCase(),
				name: metrics.klass,
				type: 'timer',
				value: metrics.duration
			});
		}
	});
}

export default {
  name: 'performance-monitoring',
	after: 'preload',
  initialize: initialize
};
