import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        comments_page: {
            replace: true
        }
    },
    beforeModel: function (transition) {
        var title = transition.params.article.title ?
            transition.params.article.title.replace('wiki/', '') :
            Mercury.wiki.mainPageTitle;
        if (Mercury.error) {
            transition.abort();
        }
        this.controllerFor('application').send('closeLightbox');
        // If you try to access article with not-yet-sanitized title you can see in logs:
        // `Transition #1: detected abort.`
        // This is caused by the transition below but doesn't mean any additional requests.
        // TODO: This could be improved upon by not using an Ember transition to 'rewrite' the URL
        // Ticket here: https://wikia-inc.atlassian.net/browse/HG-641
        if (title.match(/\s/)) {
            this.transitionTo('article', M.String.sanitize(title));
        }
    },
    model: function (params) {
        return App.ArticleModel.find({
            basePath: Mercury.wiki.basePath,
            title: params.title,
            wiki: this.controllerFor('application').get('domain')
        });
    },
    afterModel: function (model) {
        this.controllerFor('application').set('currentTitle', model.get('title'));
        App.VisibilityStateManager.reset();
        // Reset query parameters
        model.set('commentsPage', null);
    },
    actions: {
        error: function (error, transition) {
            if (transition) {
                transition.abort();
            }
            Ember.Logger.warn('ArticleRoute error', error.stack || error);
            return true;
        },
        willTransition: function (transition) {
            // notify a property change on soon to be stale model for observers (like
            // the Table of Contents menu) can reset appropriately
            this.notifyPropertyChange('cleanTitle');
        },
        // TODO: This currently will scroll to the top even when the app has encountered
        // an error. Optimally, it would remain in the same place.
        didTransition: function () {
            window.scrollTo(0, 0);
            // bubble up to application didTransition hook
            return true;
        }
    }
});
