import Ember from 'ember';

export function numeralHelper (numberToFormat, format) {
    return numeral(numberToFormat).format(format);
}

export default Ember.HTMLBars.registerBoundHelper(numeralHelper);
