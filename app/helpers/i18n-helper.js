import Ember from 'ember';

export function i18nHelper () {
    var options = Array.prototype.pop.call(arguments),
		params = {},
		value,
		namespace = 'main';

    if (arguments.length > 1) {
        value = Array.prototype.join.call(arguments, '.');
    } else {
        value = arguments[0];
    }

    Object.keys(options.hash).forEach((key) => {
        if (key === 'ns') {
            namespace = options.hash[key];
        }
        else if (key !== 'boundOptions' && options.hash[key]) {
            params[key] = this.get('parentView').get(String(options.hash[key]));
        }
    });

    return i18n.t(namespace + ':' + value, params);
}

export default Ember.HTMLBars.registerBoundHelper(i18nHelper);
