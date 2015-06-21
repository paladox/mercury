import Ember from 'ember';

var editModel = Ember.Object.extend({
    content: null,
    originalContent: null,
    timestamp: null,
    title: null,
    sectionIndex: null,
    isDirty: Ember.computed('content', 'originalContent', function () {
        return this.get('content') !== this.get('originalContent');
    })
});

editModel.reopenClass({
    getEditToken: function (title) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                url: '/api.php',
                data: {
                    action: 'query',
                    prop: 'info',
                    titles: title,
                    intoken: 'edit',
                    format: 'json'
                },
                dataType: 'json',
                success: function (resp) {
                    var edittoken, pages = Ember.get(resp, 'query.pages');
                    if (pages) {
                        // FIXME: MediaWiki API, seriously?
                        edittoken = pages[Object.keys(pages)[0]].edittoken;
                        resolve(edittoken);
                    }
                    else {
                        reject();
                    }
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    },
    publish: function (model) {
        var _this = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            _this.getEditToken(model.title)
                .then(function (token) {
                Ember.$.ajax({
                    url: '/api.php',
                    data: {
                        action: 'edit',
                        title: model.title,
                        section: model.sectionIndex,
                        text: model.content,
                        token: token,
                        format: 'json'
                    },
                    dataType: 'json',
                    method: 'POST',
                    success: function (resp) {
                        if (resp && resp.edit && resp.edit.result === 'Success') {
                            resolve();
                        }
                        else if (resp && resp.error) {
                            reject(resp.error.code);
                        }
                        else {
                            reject();
                        }
                    },
                    error: function (err) {
                        reject(err);
                    }
                });
            }, function (err) {
                reject(err);
            });
        });
    },
    load: function (title, sectionIndex) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax('/api.php', {
                dataType: 'json',
                cache: false,
                data: {
                    action: 'query',
                    prop: 'revisions',
                    // FIXME: It should be possible to pass props as an array
                    rvprop: 'content|timestamp',
                    titles: title,
                    rvsection: sectionIndex,
                    format: 'json'
                }
            })
                .done(function (resp) {
                var pages, revision;
                if (resp.error) {
                    reject(resp.error.code);
                    return;
                }
                pages = Ember.get(resp, 'query.pages');
                if (pages) {
                    // FIXME: MediaWiki API, seriously?
                    revision = pages[Object.keys(pages)[0]].revisions[0];
                    resolve(App.EditModel.create({
                        title: title,
                        sectionIndex: sectionIndex,
                        content: revision['*'],
                        originalContent: revision['*'],
                        timestamp: revision.timestamp
                    }));
                }
                else {
                    reject();
                }
            })
                .fail(function (err) {
                reject(err);
            });
        });
    }
});

export default editModel;
