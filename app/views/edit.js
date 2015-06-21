import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['edit-view'],
    init: function () {
        var _this = this;
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function () {
            _this.adjustTextareaHeight();
        });
    },
    willInsertElement: function () {
        var _this = this;
        Ember.$(window).on('resize.editor', function () {
            _this.adjustTextareaHeight();
        });
    },
    willDestroyElement: function () {
        Ember.$(window).off('resize.editor');
    },
    adjustTextareaHeight: function () {
        Ember.$('textarea').css('height', Ember.$(window).height() - Ember.$('.edit-head').outerHeight());
    }
});
