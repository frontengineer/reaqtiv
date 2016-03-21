import React from 'react/addons';
import Auth from '../service/AuthService';
import RouterContainer from '../service/RouterContainer';
import ReactMixin from 'react-mixin';

export default class SignUp extends React.Component {

  constructor(props){
    super();
    this.state = {
      username: 'murray',
      email   : 'aa@aa.com',
      password: '1234',
      password2: '1234'
    };

  }
  componentDidMount() {
   RouterContainer.set(this.context.router);
  }

  createAccount(e){
    e.preventDefault();
    console.log('SignUp:createAccount with', this.state);

    Auth.signup(this.state).
    catch((err)=>{
      console.log('Account creation failed:', err);
    });
  }

  render(){
    return (
      <form role="form">
       <div className="form-group">
        <div><label>Username:</label><input type="text" valueLink={this.linkState('username')} placeholder="Enter user name"/></div>
        <div><label>Email:</label><input type="text" valueLink={this.linkState('email')} placeholder="Enter email"/></div>
        <div><label>Password:</label><input type="password" valueLink={this.linkState('password')} placeholder="Enter password"/></div>
        <div><label>Repeat Password:</label><input type="password" valueLink={this.linkState('password2')} placeholder="Re-Enter password"/></div>
        </div>
        <button type="submit" onClick={this.createAccount.bind(this)}>Submit</button>
      </form>
    );
  }
}
SignUp.contextTypes = {
   router: React.PropTypes.object.isRequired
},

ReactMixin(SignUp.prototype, React.addons.LinkedStateMixin);

module.exports = SignUp;
