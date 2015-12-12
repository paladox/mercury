import App from '../app';

export default App.LoadingSpinnerComponent = Ember.Component.extend({
	classNameBindings: ['overlay:loading-overlay'],
	isVisible: Ember.computed.alias('active'),

	active: false,
	overlay: true,
	radius: 100,

	halfRadius: Ember.computed('radius', function () {
		return this.get('radius') / 2;
	}),

	strokeWidth: Ember.computed('radius', function () {
		return 4 * this.get('radius') / 100;
	}),
});
