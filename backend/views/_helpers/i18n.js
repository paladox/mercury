function i18nHelper(key, options) {
    var translateWithCache = this.i18n.translateWithCache, params = {}, namespace = '', instance = this.i18n.getInstance(), 
    // Hash object is created from parameters passed into i18n tag (i.e. foo=bar or template context).
    hash = options.hash;
    Object.keys(hash).forEach(function (key) {
        if (key === 'ns') {
            namespace = hash[key] + ':';
        }
        else {
            params[key] = String(hash[key]);
        }
    });
    return translateWithCache(namespace + key, instance.lng(), params);
}
module.exports = i18nHelper;
