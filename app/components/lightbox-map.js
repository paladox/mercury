import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lightbox-map', 'lightbox-content-inner'],
	modelObserver: Ember.observer('model', function () {
		var model = this.get('model');
		this.sendAction('setHeader', model.title);
		this.sendAction('setQueryParam', 'map', model.id);
	}).on('didInsertElement')
});
