import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['alert-notification', 'alert-box'],
	classNameBindings: ['alert.type'],
	alert: null,
	notificationExpiry: 10000,
	timeout: null,

	didInsertElement () {
		this.set('timeout', Ember.run.later(this, () => {
			this.dismissNotification();
		}, this.get('notificationExpiry')));
	},

	willDestroyElement () {
		Ember.run.cancel(this.get('timeout'));
	},

	dismissNotification () {
		this.sendAction('action', this.get('alert'));
	},

	actions: {
		close () {
			this.dismissNotification();
		}
	}
});
