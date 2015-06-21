var dateUtils = require('../../lib/DateUtils');
var BirthdateInput = (function () {
    function BirthdateInput(endian, lang) {
        /**
         * A date endian is the order in which year, month, and day are displayed
         * @see http://en.wikipedia.org/wiki/Date_format_by_country
         * @see http://grammarpartyblog.com/2011/07/17/one-little-endian-two-little-endians-formatting-dates-across-the-globe/
         */
        this.endians = {
            big: 'big',
            little: 'little',
            middle: 'middle'
        };
        this.endian = endian;
        this.lang = lang;
    }
    BirthdateInput.prototype.getInputData = function () {
        if (!this.inputData) {
            this.setInputData();
        }
        return this.inputData;
    };
    BirthdateInput.prototype.setInputData = function () {
        var inputData = {
            'day': {
                name: 'day',
                maxLength: 2,
                maxVal: 31,
                placeholder: dateUtils.get('day-format', this.lang),
                separator: dateUtils.get('day-separator', this.lang)
            },
            'month': {
                name: 'month',
                maxLength: 2,
                maxVal: 12,
                placeholder: dateUtils.get('month-format', this.lang),
                separator: dateUtils.get('month-separator', this.lang)
            },
            'year': {
                name: 'year',
                maxLength: 4,
                maxVal: new Date().getFullYear(),
                placeholder: dateUtils.get('year-format', this.lang),
                separator: dateUtils.get('year-separator', this.lang)
            }
        };
        this.inputData = this.orderInputDataByLocale(inputData);
    };
    BirthdateInput.prototype.orderInputDataByLocale = function (data) {
        var inputsArr = [], endian = this.endian.toLowerCase();
        switch (endian) {
            case this.endians.big.toLowerCase():
                inputsArr = [data.year, data.month, data.day];
                break;
            case this.endians.middle.toLowerCase():
                inputsArr = [data.month, data.day, data.year];
                break;
            default:
                inputsArr = [data.day, data.month, data.year];
                break;
        }
        return inputsArr;
    };
    return BirthdateInput;
})();
module.exports = BirthdateInput;
