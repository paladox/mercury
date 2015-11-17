


/**
 * Mixin that sends 'onVisible' action when element appears on screen for the first time.
 *
 */

App.VisibleMixin = Ember.Mixin.create({
	/**
	 * @returns {void}
	 */
	init() {
		this._super();

		VisibilityStateManager.add(this);
	}
});


