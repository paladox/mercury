import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['application'],
    queryParams: [{
            commentsPage: 'comments_page'
        }],
    commentsPage: null,
    noAds: Ember.computed.alias('controllers.application.noAds'),
    init: function () {
        this.setProperties({
            mainPageTitle: Ember.get(Mercury, 'wiki.mainPageTitle'),
            siteName: Ember.getWithDefault(Mercury, 'wiki.siteName', 'Wikia')
        });
    },
    actions: {
        updateHeaders: function (headers) {
            var article = this.get('model');
            article.set('sections', headers);
        },
        edit: function (title, sectionIndex) {
            App.VisibilityStateManager.reset();
            this.transitionToRoute('edit', title, sectionIndex);
            M.track({
                action: M.trackActions.click,
                category: 'sectioneditor',
                label: 'edit',
                value: sectionIndex
            });
        },
        articleRendered: function () {
            this.send('handleLightbox');
        }
    }
});
