import Ember from 'ember';

export default Ember.Object.extend({
    model: null,
    init: function () {
        var _this = this;
        var userId = this.get('userId');
        if (userId !== null) {
            App.UserModel.find({ userId: userId }).then(function (result) {
                _this.set('model', result);
            });
        }
        this._super();
    },
    isAuthenticated: Ember.computed.bool('userId'),
    userId: Ember.computed(function () {
        var cookieUserId = ~~M.prop('userId');
        return cookieUserId > 0 ? cookieUserId : null;
    })
});
