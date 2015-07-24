

interface GoogleErrorResponse {
}

interface GoogleUser {
	getAuthResponse?: any;
}

interface GoogleAuthData {
	accessToken: string;
	expiresIn: number;
}

interface HeliosGoogleToken {
	google_access_token: string;
}

class GoogleLogin {
	redirect:string;
	loginButton:HTMLAnchorElement;
	urlHelper:UrlHelper;

	constructor(loginButton:HTMLAnchorElement) {
		this.loginButton = loginButton;
		this.urlHelper = new UrlHelper();
		new GoogleApi(this.init.bind(this));
	}

	public init (): void {
		var googleLogin:GoogleLogin = this;

		this.loginButton.addEventListener('click', this.login.bind(this));
		window.gapi.load('auth2', function(){
			var googleAuth:any = window.gapi.auth2.init({
				client_id: M.prop('googleAppId') + '.apps.googleusercontent.com',
				cookie_policy: 'single_host_origin'
			});

			googleAuth.attachClickHandler(
				googleLogin.loginButton,
				{},
				googleLogin.onSuccessfulLogin.bind(googleLogin),
				googleLogin.onFailedLogin.bind(googleLogin)
			);
		});
		this.redirect = this.urlHelper.urlDecode(window.location.search.substr(1))['redirect'] || '/';
	}

	public login (): void {
		this.deactivateButton();
	}

	private activateButton(): void {
		this.loginButton.classList.remove('on');
		this.loginButton.classList.remove('disabled');
	}

	private deactivateButton(): void {
		this.loginButton.classList.add('on');
		this.loginButton.classList.add('disabled');
	}

	private onSuccessfulLogin(user: GoogleUser): void {
		console.log(user, user.getAuthResponse());
        this.activateButton();
		//this.getHeliosInfoFromGoogleToken(response.authResponse);
	}

	private onFailedLogin(error: GoogleErrorResponse): void {
		console.log(JSON.stringify(error, undefined, 2));
		this.activateButton();
	}

	private getHeliosInfoFromGoogleToken(googleAuthData: GoogleAuthData): void {

	}
}
