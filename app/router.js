import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	/*
	 This can be either '/*title' or '/wiki/*title' and is based on configuration
	 That is coming from MW
	 but if anything happens lets default to /wiki/*title

	 ensure that it has trailing / also
	 */
	var articlePath = Ember.getWithDefault(Mercury, 'wiki.articlePath', '/wiki/').replace(/\/?$/, '/');
	this.route('mainPage', {
		path: '/'
	});
	this.route('article', {
		path: articlePath + '*title'
	});
	this.route('edit', {
		path: articlePath + 'edit/:title/:sectionIndex'
	});
	// We don't want to duplicate the previous route
	if (articlePath !== '/') {
		/*
		 Route to catch all badly formed URLs, i.e., anything that doesn't match '/', '/wiki' or '/wiki/title',
		 which are the three cases already handled by existing routes.
		 */
		this.route('notFound', {
			path: '/*url'
		});
	}
});

Router.reopen({
	/**
	 * Sets location API depending on user agent with special case for Catchpoint tests
	 * @see http://emberjs.com/guides/routing/specifying-the-location-api/
	 */
	location: Ember.computed(function () {
		var ua = Ember.get(window, 'navigator.userAgent');
		return (ua && ua.match(/Catchpoint/)) ? 'none' : 'history';
	})
});

export default Router;
