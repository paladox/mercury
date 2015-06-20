/// <reference path="../app.ts" />
'use strict';
var _this = this;
App.MainPageModel = Em.Object.extend({
    featuredContent: null,
    curatedContent: null,
    trendingArticles: null,
    trendingVideos: null,
    init: function () {
        // Only curated content needs the special treatment
        _this.set('curatedContent', App.CuratedContentModel.create(_this.get('curatedContent')));
    }
});
