import Ember from 'ember';

export default Ember.Mixin.create({
    alertNotifications: Ember.A(),
    addAlert: function (alertType, message) {
        this.get('alertNotifications').pushObject({
            type: alertType,
            message: message
        });
    }
});
