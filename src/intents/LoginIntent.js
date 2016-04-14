import Rx from 'rx-lite';
import RouterContainer from '../service/RouterContainer';
import AuthService from '../service/AuthService';
const LoginIntentStream = new Rx.BehaviorSubject({});

// gather disparate actions and feed to SpecIntent
// Rx.Observable.merge(FLI, SpecFormIntent).subscribe(SpecIntent);

AuthService.getStream().subscribe(action => {
  console.log('Auth Stream fired', action);
  switch (action.intent) {
    case 'LOGIN_USER':
      if (typeof localStorage !== undefined  && typeof localStorage === 'function') {
        localStorage.setItem('jwt', action.payload.token);
      }
      LoginIntentStream.onNext({ intent: action.intent, payload: action.payload.token});
      RouterContainer.get().push((action.payload.pathname || 'home'))
      break;
    case 'LOGOUT_USER':
      if (typeof localStorage !== undefined  && typeof localStorage === 'function') {
        localStorage.removeItem(action.payload);
      }
      LoginIntentStream.onNext({ intent: action.intent, payload: {user: null, jwt: null } });
    default:

  }
});


export default LoginIntentStream;
