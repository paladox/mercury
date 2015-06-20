var AutoTab = (function () {
    function AutoTab(input) {
        this.input = input;
        this.form = input.form;
        this.max = parseInt(input.getAttribute('maxlength'), 10);
    }
    AutoTab.prototype.init = function () {
        this.input.addEventListener('input', this.onInput.bind(this));
        //Jump to the next field if the input was autocompleted
        this.input.addEventListener('change', this.onInput.bind(this));
    };
    AutoTab.prototype.onInput = function () {
        var nextVisibleInput = this.getNextVisibleInput(), length = this.input.value.length;
        if (length >= this.max && nextVisibleInput) {
            nextVisibleInput.focus();
        }
    };
    /**
     * Get an array of all visible elements in the form
     */
    AutoTab.prototype.getVisibleElements = function () {
        return Array.prototype.filter.call(this.form.elements, function (element) {
            return element.type !== 'hidden';
        });
    };
    /**
     * Get the non-hidden input following this auto-tab input
     */
    AutoTab.prototype.getNextVisibleInput = function () {
        var elements = this.getVisibleElements(), nextInput = null;
        elements.every(function (element, index) {
            if (element === this.input) {
                nextInput = elements[index + 1];
                return false;
            }
            return true;
        }, this);
        return nextInput;
    };
    return AutoTab;
})();
