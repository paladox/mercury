import Ember from 'ember';

/**
 * Mixin that sends 'onVisible' action when element appears on screen for the first time.
 *
 */
export default Ember.Mixin.create({
    init: function () {
        this._super();
        App.VisibilityStateManager.add(this);
    }
});
