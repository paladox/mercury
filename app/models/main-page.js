import Ember from 'ember';
import curatedContentModel from 'curated-content';

var _this = this;
export default Ember.Object.extend({
    featuredContent: null,
    curatedContent: null,
    trendingArticles: null,
    trendingVideos: null,
    init: function () {
        // Only curated content needs the special treatment
        _this.set('curatedContent', curatedContentModel.create(_this.get('curatedContent')));
    }
});
