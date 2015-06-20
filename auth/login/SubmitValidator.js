/**
 * Main entrypoint for validating user login
 */
var SubmitValidator = (function () {
    function SubmitValidator(form) {
        this.form = form;
        this.submitButton = this.form.querySelector('button[type=submit]');
        this.inputFields = form.querySelectorAll('input[type=text], ' +
            'input[type=password], input[type=number], input[type=email]');
    }
    /**
     * Activates / deactivates submit button in the login form
     */
    SubmitValidator.prototype.onChange = function () {
        if (this.areAllFieldsFilled()) {
            this.activateSubmit();
        }
        else {
            this.deactivateSubmit();
        }
    };
    /**
     * Checks if both username and password fields are not empty
     * @returns {boolean}
     */
    SubmitValidator.prototype.areAllFieldsFilled = function () {
        var i, input;
        for (i = 0; i < this.inputFields.length; i++) {
            input = this.inputFields[i];
            if (!input.value) {
                return false;
            }
        }
        return true;
    };
    SubmitValidator.prototype.activateSubmit = function () {
        this.submitButton.disabled = false;
    };
    SubmitValidator.prototype.deactivateSubmit = function () {
        this.submitButton.disabled = true;
    };
    /**
     * Starts continuous checking for new input
     */
    SubmitValidator.prototype.watch = function () {
        this.onChange();
        this.form.addEventListener('change', this.onChange.bind(this), true);
        this.form.addEventListener('input', this.onChange.bind(this));
    };
    return SubmitValidator;
})();
