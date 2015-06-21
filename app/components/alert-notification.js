import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['alert-notification', 'alert-box'],
	classNameBindings: ['alert.type'],
	alert: null,
	notificationExpiry: 10000,
	timeout: null,
	didInsertElement: function () {
		var _this = this;
		this.set('timeout', Ember.run.later(this, function () {
			_this.dismissNotification();
		}, this.get('notificationExpiry')));
	},
	willDestroyElement: function () {
		Ember.run.cancel(this.get('timeout'));
	},
	dismissNotification: function () {
		this.sendAction('action', this.get('alert'));
	},
	actions: {
		close: function () {
			this.dismissNotification();
		}
	}
});
