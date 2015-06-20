var SignupForm = (function () {
    function SignupForm(form) {
        this.generalValidationErrors = ['email_blocked', 'username_unavailable', 'birthdate_below_min_age'];
        this.generalErrorShown = false;
        this.form = form;
    }
    SignupForm.prototype.clearValidationErrors = function () {
        var errorNodes = this.form.querySelectorAll('.error');
        Array.prototype.forEach.call(errorNodes, function (node) {
            if (node.tagName === 'INPUT') {
                node.classList.remove('error');
            }
            else {
                node.parentNode.removeChild(node);
            }
        });
        this.generalErrorShown = false;
    };
    SignupForm.prototype.displayValidationErrors = function (errors) {
        var _this = this;
        Array.prototype.forEach.call(errors, function (err) {
            if (_this.generalValidationErrors.indexOf(err.description) === -1) {
                _this.displayFieldValidationError(err);
            }
            else {
                _this.displayGeneralError();
            }
        });
    };
    SignupForm.prototype.displayFieldValidationError = function (err) {
        var errorNode = this.createValidationErrorHTMLNode(err.description), input = this.form.elements[err.additional.field];
        input.parentNode.appendChild(errorNode);
        input.classList.add('error');
    };
    SignupForm.prototype.displayGeneralError = function () {
        if (!this.generalErrorShown) {
            var errorNode = this.createValidationErrorHTMLNode('registration_error');
            this.form.insertBefore(errorNode, document.getElementById('signupNewsletter').parentNode);
            this.generalErrorShown = true;
        }
    };
    SignupForm.prototype.createValidationErrorHTMLNode = function (errorDescription) {
        var errorNode = document.createElement('small');
        errorNode.classList.add('error');
        errorNode.appendChild(document.createTextNode(this.translateValidationError(errorDescription)));
        return errorNode;
    };
    SignupForm.prototype.translateValidationError = function (errCode) {
        return i18n.t('errors.' + errCode);
    };
    SignupForm.prototype.getFormValues = function () {
        var formElements = this.form.elements;
        return {
            username: formElements.namedItem('username').value,
            password: formElements.namedItem('password').value,
            email: formElements.namedItem('email').value,
            birthdate: formElements.namedItem('birthdate').value
        };
    };
    SignupForm.prototype.onSubmit = function (event) {
        var _this = this;
        var xhr = new XMLHttpRequest(), data = this.getFormValues(), submitButton = this.form.querySelector('button'), enableSubmitButton = function () {
            submitButton.disabled = false;
            submitButton.classList.remove('on');
        };
        submitButton.disabled = true;
        submitButton.classList.add('on');
        this.clearValidationErrors();
        xhr.onload = function (e) {
            var status = e.target.status;
            enableSubmitButton();
            if (status === 200) {
                alert('signed in correctly');
            }
            else if (status === 400) {
                _this.displayValidationErrors(JSON.parse(xhr.responseText).errors);
            }
            else {
                _this.displayGeneralError();
            }
        };
        xhr.onerror = function (e) {
            enableSubmitButton();
            _this.displayGeneralError();
        };
        xhr.open('POST', this.form.action, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send((new UrlHelper()).urlEncode(data));
        event.preventDefault();
    };
    SignupForm.prototype.watch = function () {
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    };
    return SignupForm;
})();
