/**
 * Main entrypoint for validating user login
 */
var LoginValidator = (function () {
    function LoginValidator() {
        this.loginUsername = window.document.querySelector('#loginUsername');
        this.loginPassword = window.document.querySelector('#loginPassword');
        this.loginSubmit = window.document.querySelector('#loginSubmit');
    }
    /**
     * Activates / deactivates submit button in the login form
     */
    LoginValidator.prototype.onInput = function () {
        if (this.isNotEmpty()) {
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
    LoginValidator.prototype.isNotEmpty = function () {
        return !!(this.loginUsername.value.length && this.loginPassword.value.length);
    };
    LoginValidator.prototype.activateSubmit = function () {
        this.loginSubmit.disabled = false;
    };
    LoginValidator.prototype.deactivateSubmit = function () {
        this.loginSubmit.disabled = true;
    };
    /**
     * Starts continuous checking for new input
     */
    LoginValidator.prototype.watch = function () {
        this.onInput();
        window.document.querySelector('#loginForm')
            .addEventListener('input', this.onInput.bind(this));
    };
    return LoginValidator;
})();
