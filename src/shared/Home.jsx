import React from 'react';
import ProtectedComponent from '../service/ProtectedComponent';

export default class Home extends React.Component {
  render() {
    return (
      <section className="panel well">
        hello world!
      </section>
    );
  }
}
module.exports = Home;
