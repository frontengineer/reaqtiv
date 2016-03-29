import Rx from 'rx-lite';
import React from 'react/addons';
import AuthService from '../service/AuthService';
import RouterContainer from '../service/RouterContainer';
import ReactMixin from 'react-mixin';

export default class SignUp extends React.Component {

  constructor(props){
    super();
    this.state = {
      isValidDomain : false,
      domain: 'cool',
      username: 'murray',
      email   : 'aa@aa.com',
      password: '1234',
      password2: '1234'
    };

  }
  componentDidMount() {
  //  RouterContainer.set(this.context.router);
console.log('SignUp:componentDidMount', this.refs.domain);
  var domainEvt = Rx.Observable.fromEvent(this.refs.domain, 'keyup')
  .map(e => e.target.value)
  .throttle(750)
  .distinctUntilChanged()
  .map(search => AuthService.checkForDomain(search))
  .switchLatest();

  domainEvt.subscribe(x => {
    console.log('domain input', x);
  });
  /*
  let input = this.refs.domain;
console.log('SignUp:componentDidMount', this.refs.domain);
  var domainEvt = Rx.Observable.fromEvent(input, 'keyup')
            .map(function (e) {
                return e.target.value; // Project the text from the input
            })
            .throttle(750)
            .distinctUntilChanged(); // Only if the value has changed

    domainEvt.subscribe(function(x){
      console.log('domain input', x);
    })

  */
  }

  createAccount(e){
    e.preventDefault();
    console.log('SignUp:createAccount with', this.state);

    AuthService.signup(this.state).
    catch((err)=>{
      console.log('Account creation failed:', err);
    });
  }

  render(){
    return (
      <form role="form">
        <div className="form-group">
          <div><label>Team name:</label><input ref="domain" type="text" valueLink={this.linkState('domain')} placeholder="Enter team name"/><span>.reaqtiv.com</span></div>
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
