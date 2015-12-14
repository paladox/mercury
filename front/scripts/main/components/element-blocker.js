import App from '../app';

export default App.LoadingSpinnerComponent = Ember.Component.extend({
	classNameBindings: ['overlay:loading-overlay'],
	isVisible: Ember.computed.alias('active'),

	active: false,
	overlay: true,
	radius: 100,

	dotStyle: Ember.computed('radius', function () {
		return new Ember.Handlebars.SafeString(`border-width: ${4 * this.get('radius') / 100}px`);
	}),

	loaderStyle: Ember.computed('radius', function () {
		const radius = this.get('radius');

		return new Ember.Handlebars.SafeString(`width: ${radius}px; height: ${radius}px; margin: -${radius / 2}px 0 0 -${radius / 2}px`);
	})
});
