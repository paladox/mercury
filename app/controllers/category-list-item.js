import Ember from 'ember';

export default Ember.Controller.extend({
    cleanTitle: Ember.computed('model.title', function () {
        return M.String.normalize(this.get('model.title').toString());
    })
});
