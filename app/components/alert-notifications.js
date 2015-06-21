import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['alert-notifications'],
	alerts: null,
	actions: {
		dismissAlert: function (alert) {
			this.get('alerts').removeObject(alert);
		}
	}
});
