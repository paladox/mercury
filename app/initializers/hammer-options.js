export function initialize() {
	window.emberHammerOptions = {
		hammerOptions: {
			//we are using fastclick so this is adviced by ember-hammer lib
			ignoreEvents: [],
			swipe_velocity: 0.1,
			pan_threshold: 1
		}
	};
}

export default {
  name: 'hammer-options',
  initialize: initialize
};
