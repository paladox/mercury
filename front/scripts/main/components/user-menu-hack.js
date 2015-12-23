import App from '../app';

export default App.UserMenuHackComponent = Ember.Component.extend({
	classNames: ['user-menu-hack'],
	classNameBindings: ['isOpen'],

	isOpen: false,

	links: Ember.computed('currentUser.name', function () {
		return [
			{
				href: M.buildUrl({
					namespace: 'User',
					title: this.get('currentUser.name'),
				}),
				textKey: 'user-menu-profile',
			},
			{
				href: M.buildUrl({
					namespace: 'Special',
					title: 'UserLogout',
				}),
				textKey: 'user-menu-log-out',
			}
		];
	}),

	actions: {
		/**
		 * @returns {void}
		 */
		close() {
			this.sendAction('closeUserMenu');
		},
	},
});
