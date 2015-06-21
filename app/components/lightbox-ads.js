import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lightbox-ads', 'lightbox-content-inner'],
	didInsertElement: function () {
		this.sendAction('setHeader', 'Advertisement');
	}
});
