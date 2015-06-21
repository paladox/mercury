import Ember from 'ember';

export default Ember.Component.extend({
	classNameBindings: ['overlay:loading-overlay', 'hidden'],
	active: false,
	overlay: true,
	hidden: Ember.computed.not('active')
});
