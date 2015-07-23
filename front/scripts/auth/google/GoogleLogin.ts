interface GoogleResponse {
    status: string;
    authResponse: GoogleAuthData;
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
    }

    public init (): void {
        this.loginButton.addEventListener('click', this.login.bind(this));


        this.redirect = this.urlHelper.urlDecode(window.location.search.substr(1))['redirect'] || '/';
    }

    public login (): void {
        // G+ login
        this.deactivateButton();
    }

    public onLogin(response: GoogleResponse): void {
        if (response.status === 'connected') {
            this.onSuccessfulLogin(response);
        } else {
            this.onFailedLogin(response);
        }
    }

    private activateButton(): void {
        this.loginButton.classList.remove('on');
        this.loginButton.classList.remove('disabled');
    }

    private deactivateButton(): void {
        this.loginButton.classList.add('on');
        this.loginButton.classList.add('disabled');
    }

    private onSuccessfulLogin(response: GoogleResponse): void {
        alert("hura");
        this.getHeliosInfoFromGoogleToken(response.authResponse);
    }

    private onFailedLogin(response: GoogleResponse): void {
        alert("be");
        this.activateButton();
    }

    private getHeliosInfoFromGoogleToken(googleAuthData: GoogleAuthData): void {

    }
}
