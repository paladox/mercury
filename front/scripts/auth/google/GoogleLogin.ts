

interface GoogleErrorResponse {
}

interface GoogleUser {
	getAuthResponse?: Function;
	getBasicProfile?: Function;
}

interface AuthResponse {
    access_token: string;
    id_token: string;
    login_hint: string;
    scope: string;
    expires_in: string;
    first_issued_at: string;
    expires_at: string;
}

interface HeliosGoogleToken {
	g_access_token: string;
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
		this.loginButton.addEventListener('click', this.login.bind(this));
		window.gapi.load('auth2', (function(){
			var googleAuth:any = window.gapi.auth2.init({
				client_id: M.prop('googleAppId') + '.apps.googleusercontent.com',
				cookie_policy: 'single_host_origin'
			});

			googleAuth.attachClickHandler(
				this.loginButton,
				{},
				this.onSuccessfulLogin.bind(this),
				this.onFailedLogin.bind(this)
			);
		}).bind(this));
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
		this.getHeliosInfoFromGoogleToken(user.getAuthResponse());
	}

	private onFailedLogin(error: GoogleErrorResponse): void {
		this.activateButton();
	}

	private getGoogleRegistrationUrl(): string {
		var href = '/register',
			search = window.location.search;
		if (search.indexOf('?') !== -1) {
			search += '&method=google';
		} else {
			search += '?method=google';
		}

		return href + search;
	}

	private getHeliosInfoFromGoogleToken(googleAuthResponse: AuthResponse): void {
        var googleTokenXhr = new XMLHttpRequest(),
            data = <HeliosGoogleToken> {
                g_access_token: googleAuthResponse.id_token
            },
            url = this.loginButton.getAttribute('data-helios-google-uri');

        googleTokenXhr.onload = (e: Event) => {
            var status: number = (<XMLHttpRequest> e.target).status;

            if (status === HttpCodes.OK) {
                window.location.href = this.redirect;
            } else if (status === HttpCodes.BAD_REQUEST) {
				window.location.href = this.getGoogleRegistrationUrl();
            } else {
                //ToDo: something wrong with Helios backend
                this.activateButton();
            }
        };

        googleTokenXhr.onerror = (e: Event) => {
            this.activateButton();
        };

        googleTokenXhr.open('POST', url, true);
        googleTokenXhr.withCredentials = true;
        googleTokenXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        googleTokenXhr.send(this.urlHelper.urlEncode(data));
	}
}
