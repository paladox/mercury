import Ember from 'ember';

export default Ember.Mixin.create({
    isJapaneseBrowser: Ember.computed(function () {
        var lang = navigator.language || navigator.browserLanguage;
        if (!lang) {
            return this.get('isJapaneseWikia');
        }
        lang = lang.substr(0, 2);
        return lang === 'ja';
    }),

    isJapaneseWikia: Ember.computed(function () {
        return Ember.get(Mercury, 'wiki.language.content') === 'ja';
    })
});
