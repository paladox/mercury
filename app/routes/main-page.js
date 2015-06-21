import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function (transition) {
        this.transitionTo('article', Ember.get(Mercury, 'wiki.mainPageTitle'));
    }
});
