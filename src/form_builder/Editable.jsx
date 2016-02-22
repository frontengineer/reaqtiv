import React from 'react';
import Rx from 'rx-lite';
import assign from 'object-assign';

export const Intent = new Rx.BehaviorSubject();

export default class Editable extends React.Component {
  componentWillMount(){
    this.setState({element: this.props.element})
  }

  handleChange(index, e){
    console.log('Editable:handleChange', index, e.target.value);
    let el = assign({}, this.state.element);
    el.options[index].text = e.target.value;
    el.options[index].value = e.target.value;
    this.setState({ element: assign({}, this.state.element, el) });
    console.log('Editable:handleChange', this.props, this.state);

  }
  render() {
    let options = this.state.element.options.map((op, index) => {
      return (
        <div key={'editable-option-'+index}><input  value={op.text} onChange={this.handleChange.bind(this, index)} /></div>
      )
    });
    return(
      <div>
        <button onClick={this.props.handleDone}>Done</button>
        {options}
      </div>

    )
  }
}
