import App from '../app';

export default App.LoadingIndicatorComponent = Ember.Component.extend({
	isActive: Ember.computed.alias('loadingIndicator.isActive'),

	style: Ember.computed('isActive', function () {
		return new Ember.Handlebars.SafeString(`display: ${this.get('isActive') ? 'block' : 'none'}`);
	}),
});
