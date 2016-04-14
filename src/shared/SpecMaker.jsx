import React from 'react';
import Input from '../form_builder/Input.jsx';
import assign from '../utils/assign';


export default class SpecMaker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      boxStyle : {
        display : 'none',
        position: 'fixed',
        background: '#fc0',
        top: '50px',
        right: '50px',
        bottom: '50px',
        left: '50px',
        zIndex : 10
      },

      tmpSpec : {}
    }
  }

  componentWillMount() {
    let tmp = {}, queryFilter;
    let self = this;
    let source = Input.getIntent().
    subscribe(function (text) {
      queryFilter = 'queryFilter_' + Math.round(Math.random() * 1000000);

      tmp[queryFilter] = new Function(queryFilter, 'return ' + queryFilter);
      self.setState({
        tmpSpec : assign({}, self.state.tmpSpec, tmp)
      });
      console.log(self.state.tmpSpec);
      console.log(self.state.tmpSpec[queryFilter]('ewe'));
      console.log('state var', self.state.tmpSpec[queryFilter]);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.showModal.bind(this, 'block')}>Create Standard</button>
        <div style={this.state.boxStyle}>
          <button onClick={this.showModal.bind(this, 'none')}>Done</button>

          <Input />
        </div>
      </div>
    )
  }

  showModal(display) {
    this.setState({ boxStyle : assign({}, this.state.boxStyle, { display: display }) });
  }
}


module.exports = SpecMaker;
