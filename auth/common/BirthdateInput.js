var BirthdateInput = (function () {
    function BirthdateInput(el, form) {
        var elements = form.elements;
        this.wrapper = el;
        this.realInput = elements.birthdate;
        this.day = elements.day;
        this.month = elements.month;
        this.year = elements.year;
        this.fakeInputs = this.wrapper.querySelectorAll('input');
    }
    BirthdateInput.prototype.init = function () {
        this.initFocus();
        this.initAutoTab();
        this.initBirthdateValue();
    };
    BirthdateInput.prototype.initFocus = function () {
        var _this = this;
        var firstInput = this.fakeInputs[0], inputContainer = this.wrapper.parentElement, target;
        inputContainer.addEventListener('focus', (function () {
            target = event.target;
            if (target === _this.realInput) {
                _this.realInput.type = 'hidden';
                _this.wrapper.classList.remove('hide');
                firstInput.focus();
            }
            _this.wrapper.classList.add('focused');
        }).bind(this), true);
        inputContainer.addEventListener('blur', (function () {
            _this.wrapper.classList.remove('focused');
        }).bind(this), true);
    };
    BirthdateInput.prototype.initAutoTab = function () {
        Array.prototype.forEach.call(this.fakeInputs, function (input) {
            new AutoTab(input).init();
        });
    };
    BirthdateInput.prototype.initBirthdateValue = function () {
        this.wrapper.addEventListener('input', this.setRealValue.bind(this));
    };
    /**
     * Set the value for the input that will ultimately be saved upon form submission
     */
    BirthdateInput.prototype.setRealValue = function () {
        this.realInput.value = this.year.value + '-' + this.month.value + '-' + this.day.value;
    };
    return BirthdateInput;
})();
