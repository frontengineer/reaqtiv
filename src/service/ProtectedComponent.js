import React from 'react';
import AuthService from '../service/AuthService';
import RouterContainer from '../service/RouterContainer';


module.exports = (ComponentToBeRendered) => {
  class ProtectedComponent extends React.Component {
    constructor(props) {
      super(props);
      console.log('ProtectedComponent:constructor', props);
      // console.log('thiso', AuthService.isLoggedIn());
      this.state = {
        currentUser : this._getLoginState(props)
      };
      this._getLoginState = this._getLoginState.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    _getLoginState(props) {
       return {
         userLoggedIn: AuthService.isLoggedIn()
        //  user: this.props.user,
        //  jwt: this.props.jwt
       };
     }

    componentDidMount(){
      console.log('ProtectedComponent:componentDidMount', this.props, this.state);
      if(AuthService.isLoggedIn()) { return}
      RouterContainer.set(this.context.router);
      AuthService.setTransitionPath(this.props.location.pathname);
      console.log('AuthService:getTransitionPath', AuthService.getTransitionPath());
      let jwt = localStorage.getItem('jwt');
      let unauthorized = !AuthService.isLoggedIn() && !jwt;
      // automatically authenticates the user if a JWT is found
      if (jwt) AuthService.autoLoginUser(jwt);

      // redirect to login page is theres no current user state or any JWT
      if (unauthorized) {
        RouterContainer.get().push('login');
      }

    }

    _onChange(){
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      // this._unsubscribe();
    }

    // _updateState(state) {
    //   // once AuthActions.autoLoginUser returns success and authenticates, the current user state is updated
    //   this.setState({ currentUser: state.currentUser });
    // }

    render(){
      let s = this.state;

      if(AuthService.isLoggedIn()){
        return <ComponentToBeRendered {...this.props} />
      }else {
        console.log('cannot access that component');
        return (<div>...Loading</div>);
      }
    }

  }

  ProtectedComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  return ProtectedComponent;
}
