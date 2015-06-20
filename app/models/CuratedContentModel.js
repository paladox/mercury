/// <reference path="../app.ts" />
'use strict';
App.CuratedContentModel = Em.Object.extend({
    fetchItemsForSection: function (sectionName, sectionType) {
        var _this = this;
        if (sectionType === void 0) { sectionType = 'section'; }
        return new Em.RSVP.Promise(function (resolve, reject) {
            var url = App.get('apiBase');
            url += (sectionType === 'section') ?
                //We don't need to wrap it into Try/Catch statement
                //See: https://github.com/Wikia/mercury/pull/946#issuecomment-113501147
                '/curatedContent/' + encodeURIComponent(sectionName) :
                '/category/' + encodeURIComponent(sectionName);
            Em.$.ajax({
                url: url,
                success: function (data) {
                    var sanitizedData = [];
                    if (data.items) {
                        sanitizedData = data.items.map(function (item) {
                            return _this.sanitizeItem(item);
                        });
                    }
                    resolve(sanitizedData);
                },
                error: function (data) {
                    reject(data);
                }
            });
        });
    },
    sanitizeItem: function (rawData) {
        var item;
        if (rawData.type === 'section') {
            item = {
                label: rawData.title,
                imageUrl: rawData.image_url,
                type: 'section'
            };
        }
        else if (rawData.type === 'category') {
            item = {
                label: rawData.label || rawData.title,
                imageUrl: rawData.image_url,
                type: 'category',
                categoryName: rawData.title
            };
        }
        else {
            item = {
                label: rawData.title,
                imageUrl: rawData.thumbnail,
                type: rawData.type,
                url: rawData.url
            };
        }
        return item;
    }
});
