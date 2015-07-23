

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
        this.loginButton.addEventListener('click', this.login.bind(this));
        window.gapi.load('auth2', function(){
            alert("dupa");
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            window.auth2 = window.gapi.auth2.init({
                client_id: M.prop('googleAppId') + '.apps.googleusercontent.com'
                //cookiepolicy: 'single_host_origin',
            });
            window.auth2.attachClickHandler(this.loginButton, {}, this.onSuccessfulLogin, this.onFailedLogin);
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
        alert("hura");
        console.log(user);
        console.log(user.getAuthResponse().access_token);
        //this.getHeliosInfoFromGoogleToken(response.authResponse);
    }

    private onFailedLogin(error: GoogleErrorResponse): void {
        alert("be");
        console.log(JSON.stringify(error, undefined, 2));
        this.activateButton();
    }

    private getHeliosInfoFromGoogleToken(googleAuthData: GoogleAuthData): void {

    }
}
