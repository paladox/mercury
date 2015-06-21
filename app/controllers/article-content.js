import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        changePage: function () {
            // return true for event to bubble up to ArticleController action changePage
            return true;
        }
    }
});
