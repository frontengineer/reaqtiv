import React from 'react/addons';
import Auth from '../service/AuthService';
import RouterContainer from '../service/RouterContainer';
import {Link } from 'react-router';

import ReactMixin from 'react-mixin';

export default class Login extends React.Component {

  constructor(props){
    super();
    this.state = {
      user: 'aa@aa.com',
      password: '1234'
    };

  }
  componentDidMount() {
  //  const { route } = this.props;
  //  const { router } = this.context;
  //  this.router = this.context.router;
   RouterContainer.set(this.context.router);
  //  console.log('Login: componentDidMount', this);

  //  router.setRouteLeaveHook(route, this.routerWillLeave);
  }

  login(e){
    e.preventDefault();
    console.log('the state', this.state);

    Auth.login(this.state.user, this.state.password).
    catch((err)=>{
      console.log('Error logging in', err);
    })
  }

  render(){
    return (
      <div>
        <form role="form">
         <div className="form-group">
          <div><input type="text" valueLink={this.linkState('user')} placeholder="Enter user name"/></div>
          <div><input type="password" valueLink={this.linkState('password')} placeholder="Enter password"/></div>
          </div>
          <button type="submit" onClick={this.login.bind(this)}>Submit</button>
        </form>
        <div className="well"><Link to="signup">Join</Link></div>
      </div>
    );
  }
}
Login.contextTypes = {
   router: React.PropTypes.object.isRequired
},

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);

module.exports = Login;
