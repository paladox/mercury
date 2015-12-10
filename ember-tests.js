var App = require('main/app').default;

module('main/routes/article', {
	afterEach: function() {
		Ember.run(App, 'destroy');
	}
});

test('visit mainPage', function(assert) {
	visit('/wiki/Muppet');
	andThen(function() {
		assert.ok(currentRouteName() === 'article');
	});
});
