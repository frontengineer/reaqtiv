import AuthService from './AuthService';
class AuthHelper {
  // checks for the store state for current user, if non existent then it auto logins based on json web token in localStorage
  updateCurrentUser() {
    if (AuthStore.getCurrentUser()) return;

    let jwt = localStorage.getItem('jwt');
    if (jwt) AuthActions.autoLoginUser(jwt);
  }
}

export default new AuthHelper;
