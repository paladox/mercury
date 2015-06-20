/**
 * Controls floating labels behavior on focus / blur events in input fields
 */
var Form = (function () {
    function Form(form) {
        this.form = form;
        this.inputs = this.form.querySelectorAll('input[type=text], input[type=password], input[type=email]');
    }
    Form.prototype.onFocus = function (event) {
        var input = event.target, wrapper, label;
        if (input.type === 'checkbox') {
            return;
        }
        wrapper = this.findWrapper(input);
        label = this.findLabel(wrapper);
        if (input.tagName.toLowerCase() === 'input' && wrapper) {
            label.classList.add('active');
        }
    };
    Form.prototype.onBlur = function (event) {
        Array.prototype.forEach.call(this.inputs, (function (input) {
            var wrapper = this.findWrapper(input), label = this.findLabel(wrapper);
            if (!input.classList.contains('fake-input') && input.id !== 'signupBirthDate' &&
                wrapper && input.value === '') {
                label.classList.remove('active');
            }
        }).bind(this));
    };
    Form.prototype.togglePasswordInput = function (input, toggler) {
        if (input.type === 'password') {
            input.type = 'text';
            toggler.classList.add('on');
        }
        else {
            input.type = 'password';
            toggler.classList.remove('on');
        }
        input.focus();
    };
    Form.prototype.onClick = function (event) {
        var element = event.target, wrapper, input;
        if (element.className.match('password-toggler')) {
            wrapper = element.parentElement;
            input = wrapper.querySelector('input');
            this.togglePasswordInput(input, element);
        }
        else if (element.className.match('dice')) {
            element.classList.toggle('on');
        }
    };
    /**
     * Moves labels up if they were filled by the browser's autofill
     */
    Form.prototype.onChange = function () {
        Array.prototype.forEach.call(this.inputs, (function (input) {
            var wrapper = this.findWrapper(input), label = this.findLabel(wrapper);
            if (input.value && wrapper) {
                label.classList.add('active');
            }
        }).bind(this));
    };
    Form.prototype.findWrapper = function (currentElement) {
        while (currentElement && !currentElement.classList.contains('input-container')) {
            currentElement = currentElement.parentElement;
        }
        return currentElement;
    };
    Form.prototype.findLabel = function (container) {
        return container.querySelector('label');
    };
    /**
     * Starts continuous checking for new input
     */
    Form.prototype.watch = function () {
        this.onChange();
        this.form.addEventListener('focus', this.onFocus.bind(this), true);
        this.form.addEventListener('blur', this.onBlur.bind(this), true);
        this.form.addEventListener('change', this.onChange.bind(this), true);
        this.form.addEventListener('click', this.onClick.bind(this));
    };
    return Form;
})();
