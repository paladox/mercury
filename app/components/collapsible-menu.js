import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'nav',
	classNames: ['collapsible-menu'],
	classNameBindings: ['additionalClasses'],
	// Begin component property defaults
	additionalClasses: null,
	isCollapsed: true,
	observe: null,
	ordered: false,
	showMenuIcon: true,
	tLabel: '',
	trackingEvent: null,
	// End component property
	actions: {
		toggleMenu () {
			this.toggleProperty('isCollapsed');

			// Track opening and closing menu
			if (this.trackingEvent !== null) {
				M.track({
					action: M.trackActions.click,
					category: this.get('trackingEvent'),
					label: this.get('isCollapsed') ? 'close' : 'open'
				});
			}
		}
	},

	didInsertElement () {
		Ember.addObserver(this, 'observe', this, this.titleDidChange);
	},

	willDestroyElement () {
		Ember.removeObserver(this, 'observe', this, this.titleDidChange);
	},

	titleDidChange () {
		if (!this.get('isCollapsed')) {
			this.set('isCollapsed', true);
		}
	}
});
