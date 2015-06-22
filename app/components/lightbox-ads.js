import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lightbox-ads', 'lightbox-content-inner'],

	didInsertElement() {
		this.sendAction('setHeader', 'Advertisement');
	}
});
