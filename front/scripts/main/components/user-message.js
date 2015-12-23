import App from '../app';

/**
 * AlertNotification
 * @typedef {Object} AlertNotification
 * @property {string} message
 * @property {string} [type]
 * @property {number} [expiry]
 * @property {boolean} [unsafe]
 * @property {*} [callbacks]
 * @property {boolean} [persistent]
 */

export default App.UserMessageComponent = Ember.Component.extend({
	classNames: ['user-message'],
	classNameBindings: ['isOpen'],

	message: '',

	parsedMessage: Ember.computed('message', function () {
		return i18n.t(this.get('message'), {ns: 'discussion'});
	}),

	alerts: null,

	messageObserver: Ember.observer('message', function () {
		if (this.get('message')) {
			this.set('isOpen', true);
		}
	}),

	actions: {
		/**
		 * @param {AlertNotification} alert
		 * @returns {void}
		 */
		close() {
			this.setProperties({
				isOpen: false,
				message: ''
			});
		},
	},
});
