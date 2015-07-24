interface HeliosGoogleRegistrationData {
	birthdate: string;
	email: string;
	g_access_token: string;
	password: string;
	username: string;
	langCode?: string;
	marketingallowed?: string;
}

class GoogleRegistration {

	form: HTMLFormElement;
	redirect: string;
	urlHelper: UrlHelper;
	marketingOptIn: MarketingOptIn;
	gToken: string;

	constructor (form: HTMLFormElement) {
		this.form = form;
		this.urlHelper = new UrlHelper();
		if (window.location.search) {
			var params: Object = this.urlHelper.urlDecode(window.location.search.substr(1));
			this.redirect = params['redirect'];
		}
		this.marketingOptIn = new MarketingOptIn();
		this.marketingOptIn.init();
		this.redirect = this.redirect || '/';

		this.form.addEventListener('submit', this.onSubmit.bind(this));
		new GoogleApi(this.init.bind(this));
	}

	public init (): void {
		window.gapi.load('auth2', (function() {
			var googleAuth:any = window.gapi.auth2.init({
				client_id: M.prop('googleAppId') + '.apps.googleusercontent.com',
				cookie_policy: 'single_host_origin'
			});

			googleAuth.currentUser.listen((function(user:GoogleUser){
				this.gToken = user.getAuthResponse().id_token;

				this.setUpEmailInput(user.getBasicProfile().getEmail());
			}).bind(this));
		}).bind(this));
		this.redirect = this.urlHelper.urlDecode(window.location.search.substr(1))['redirect'] || '/';
	}

	private setUpEmailInput (email: string): void {
		var emailInput = <HTMLInputElement> this.form.elements.namedItem('email'),
			emailInputLabel: HTMLLabelElement;

		if (email && emailInput) {
			emailInput.disabled = true;
			emailInputLabel = <HTMLLabelElement> emailInput.nextElementSibling;
			emailInputLabel.classList.add('active');
			emailInput.value = email;
		}
	}

	private getHeliosRegistrationDataFromForm(): HeliosGoogleRegistrationData {
		var formElements: HTMLCollection = this.form.elements;
		return {
			username: (<HTMLInputElement> formElements.namedItem('username')).value,
			password: (<HTMLInputElement> formElements.namedItem('password')).value,
			email: (<HTMLInputElement> formElements.namedItem('email')).value,
			birthdate: (<HTMLInputElement> formElements.namedItem('birthdate')).value,
			langCode: (<HTMLInputElement> formElements.namedItem('langCode')).value,
			marketingallowed: (<HTMLInputElement> formElements.namedItem('marketingallowed')).value,
			g_access_token: this.gToken
		};
	}

	private loginWithGoogleAccessToken (gToken: string, heliosTokenUrl: string): void {
			var tokenXhr = new XMLHttpRequest(),
			data = <HeliosGoogleToken> {
				g_access_token: gToken
			};

		tokenXhr.onload = (e: Event): void => {
			var status: number = (<XMLHttpRequest> e.target).status;

			if (status === HttpCodes.OK) {
				window.location.href = this.redirect;
			} else if (status === HttpCodes.BAD_REQUEST) {
				//ToDo show the "unable to login" error
			} else {
				//ToDo show the "unable to login" error
			}
		};

		tokenXhr.onerror = (e: Event): void => {
			//ToDo show the "unable to login" error
		};

		tokenXhr.open('POST', heliosTokenUrl, true);
		tokenXhr.withCredentials = true;
		tokenXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		tokenXhr.send(this.urlHelper.urlEncode(data));
	}

	public onSubmit (event: Event): void {
		event.preventDefault();

		var registrationXhr = new XMLHttpRequest(),
			data = <HeliosGoogleRegistrationData> this.getHeliosRegistrationDataFromForm(),
			url = this.form.getAttribute('action');

		registrationXhr.onload = (e: Event) => {
			var status: number = (<XMLHttpRequest> e.target).status;

			if (status === HttpCodes.OK) {
				this.loginWithGoogleAccessToken(this.gToken, url.replace('/users', '/token'));
			} else if (status === HttpCodes.BAD_REQUEST) {
				//ToDo: show validation errors
			} else {
				//ToDo: show unhealthy backed message
			}
		};

		registrationXhr.onerror = (e: Event) => {
			//ToDo: show unhealthy backed message
		};

		registrationXhr.open('POST', url, true);
		registrationXhr.withCredentials = true;
		registrationXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		registrationXhr.send(this.urlHelper.urlEncode(data));
	}
}
