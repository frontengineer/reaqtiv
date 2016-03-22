import React from 'react';
import ProtectedComponent from '../service/ProtectedComponent';
const Home = {

  render: () => {
    return (
      <section className="panel well">
        hello world!
      </section>
    );
  }
}

module.exports = React.createClass(Home);
