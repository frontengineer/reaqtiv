import React from 'react';
import AuthService from '../service/AuthService';
import RouterContainer from '../service/RouterContainer';


export default (ComponentToBeRendered) => {
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
         userLoggedIn: !!this.props.isLoggedIn,
         user: this.props.user,
         jwt: this.props.jwt
       };
     }

    componentDidMount(){
      console.log('ProtectedComponent:componentDidMount', this.props, this.state);
        RouterContainer.set(this.context.router);
      let jwt = localStorage.getItem('jwt');
      // automatically authenticates the user if a JWT is found
      if (jwt) AuthService.autoLoginUser(jwt, this.props.location.pathname);
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

      if(this.props.user && this.props.jwt){
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
