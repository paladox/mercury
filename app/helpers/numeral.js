

Ember.Handlebars.registerBoundHelper('numeral', function (numberToFormat, format) {
    return numeral(numberToFormat).format(format);
});
