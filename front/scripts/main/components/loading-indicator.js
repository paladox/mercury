import App from '../app';

export default App.LoadingIndicatorComponent = Ember.Component.extend({
	verticalName: Ember.computed(() => {
		return Ember.get(Mercury, 'wiki.vertical');
	}),

	isActive: Ember.computed.alias('loadingIndicator.isActive'),

	style: Ember.computed('isActive', function () {
		return new Ember.Handlebars.SafeString(`display: ${this.get('isActive') ? 'block' : 'none'}`);
	}),
});
