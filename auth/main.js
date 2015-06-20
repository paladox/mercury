/// <reference path="../../../typings/i18next/i18next.d.ts" />
if (typeof language === 'undefined') {
    language = '';
}
if (typeof translations === 'undefined') {
    translations = {};
}
i18n.init({
    fallbackLng: 'en',
    lng: language,
    lowerCaseLng: true,
    ns: 'auth-front',
    resStore: translations,
    useLocalStorage: false
});
window.document.addEventListener('DOMContentLoaded', function () {
    var formElement = window.document.querySelector('form'), birthdateContainer;
    if (formElement) {
        birthdateContainer = formElement.querySelector('.birthdate-container');
        new Form(formElement).watch();
        new SubmitValidator(formElement).watch();
        new SignupForm(formElement).watch();
    }
    if (birthdateContainer) {
        new BirthdateInput(birthdateContainer, formElement).init();
    }
});
