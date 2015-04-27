/**
 * Controls floating labels behavior on focus / blur events in input fields
 */
class Form {
	form: HTMLFormElement;

	constructor (form: Element) {
		this.form = <HTMLFormElement> form;
	}

	private onFocus (event: Event): void {
		var input = <HTMLInputElement> event.target,
			label = <HTMLElement> input.nextElementSibling,
			wrapper = <HTMLInputElement> input.parentElement;

		if (wrapper.className.match('input-container')) {
			label.classList.add('active');
		}
	}

	private onBlur (event: Event): void {
		var input = <HTMLInputElement> event.target,
			label = <HTMLElement> input.nextElementSibling,
			wrapper = <HTMLElement> input.parentElement;

		if (wrapper.className.match('input-container') && !input.value) {
			label.classList.remove('active');
		}
	}

	private togglePasswordInput (input: HTMLInputElement, toggler: HTMLElement): void {
		if (input.type === 'password') {
			input.type = 'text';
			toggler.classList.remove('on');
		} else {
			input.type = 'password';
			toggler.classList.add('on');
		}
		input.focus();
	}

	private onClick (event: Event): void {
		var element = <HTMLInputElement> event.target,
			wrapper: HTMLElement,
			input: HTMLInputElement;
		if (element.className.match('password-toggler')) {
			wrapper = <HTMLElement> element.parentElement;
			input = <HTMLInputElement> wrapper.querySelector('input');
			this.togglePasswordInput(input, element);
		} else if (element.className.match('dice')) {
			element.classList.toggle('on');
		}
	}

	/**
	 * Starts continuous checking for new input
	 */
	public watch (): void {
		this.form.addEventListener('focus', this.onFocus.bind(this), true);
		this.form.addEventListener('blur', this.onBlur.bind(this), true);
		this.form.addEventListener('click', this.onClick.bind(this));
	}
}