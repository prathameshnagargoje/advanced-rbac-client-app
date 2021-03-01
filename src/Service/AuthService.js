import { UserManager } from 'oidc-client';
import { Constants } from '../helpers/Constants';

export class AuthService {
  constructor() {
    const settings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: Constants.redirect_uri,
      silent_redirect_uri: Constants.silent_redirect_uri,
      post_logout_redirect_uri: Constants.clientRoot,
      response_type: Constants.response_type,
      grant_type: Constants.grant_type,
      scope: Constants.clientScope
    };
    this.userManager = new UserManager(settings);
  }

  getUser() {
    return this.userManager.getUser(); //Getting logged in user details along with id_token, access_token from session storage.
  }

  login() {
    return this.userManager.signinRedirect(); //Redirecting to Keycloak predefined/custom login page.
  }

  renewToken() {
    return this.userManager.signinSilent(); //Silent signin incase if you know access token is going to expire soon.
  }

  logout() {
    return this.userManager.signoutRedirect(); //Logout functionality.
  }

  store(user){
    this.userManager.storeUser(user);
  }

}
