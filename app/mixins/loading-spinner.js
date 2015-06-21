import Ember from 'ember';

export default Ember.Mixin.create({
    isLoading: false,
    spinnerDelay: 300,
    spinnerTimeout: null,
    /**
     * @desc show loader with some small delay
     * if we are able to load it under the delay
     * perceived speed of applications is better
     * if not, small delay will be almost unnoticeable
     */
    showLoader: function () {
        var _this = this;
        if (!this.get('isLoading')) {
            this.set('spinnerTimeout', Ember.run.later(this, function () {
                _this.set('isLoading', true);
            }, this.spinnerDelay));
        }
    },
    hideLoader: function () {
        Ember.run.cancel(this.get('spinnerTimeout'));
        this.set('isLoading', false);
    }
});
