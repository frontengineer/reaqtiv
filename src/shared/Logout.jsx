import React from 'react';
import AuthService from '../service/AuthService';

export default class Logout extends React.Component {

  componentDidMount(){
    AuthService.logout();
  }

  render(){
    return (
      <section className="panel well">
        you are logged successesfully
      </section>
    );
  }
}

module.exports = Logout;
