//i18n.init({
//	debug: debug,
//	detectLngQS: 'uselang',
//	fallbackLng: 'en',
//	lng: application.get('language'),
//	lowerCaseLng: true,
//	ns: 'main',
//	resStore: loadedTranslations,
//	useLocalStorage: false
//});

window.document.addEventListener('DOMContentLoaded', function ():void {
	var formElement: HTMLFormElement = <HTMLFormElement> window.document.querySelector('form'),
		birthdateContainer: HTMLElement = <HTMLElement> formElement.querySelector('.birthdate-container'),
		fakeBirthdateInput: HTMLInputElement = <HTMLInputElement> birthdateContainer.nextElementSibling;

	new Form(formElement).watch();
	new SubmitValidator(formElement).watch();
	new BirthdateInput(birthdateContainer, fakeBirthdateInput).init();
});
