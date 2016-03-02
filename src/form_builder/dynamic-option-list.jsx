/**
  * <DynamicOptionList />
  */

import React from 'react';
import ID from './UUID';
import assign from '../utils/assign';

export default class DynamicOptionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // element: assign({}, this.props.element)
      // data: this.props.data,
      // dirty: false
    }
  }
  componentWillMount(){
    this.setState({ element: JSON.parse(JSON.stringify(this.props.element)) })
  }
  componentWillReceiveProps(nextProps){
    this.setState({element: nextProps.element});
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  }
  editOption(option_index, e) {
    console.log('editing field', assign({blarg: 33}, this.state.element));
    let this_element = this.state.element;
    this_element.options[option_index].text = e.target.value;
    this_element.options[option_index].value = this._setValue(e.target.value);
    this.props.updateElement(assign({}, this.state.element));
    this.setState({
      element: this_element,
      dirty: true
    });

  }
  editOptionCorrect(option_index, e) {
    let this_element = this.state.element;
    if (this_element.options[option_index].hasOwnProperty("correct")) {
      delete(this_element.options[option_index]["correct"]);
    } else {
      this_element.options[option_index].correct = true;
    }
    this.setState({element: this_element});
    // this.props.updateElement.call(this.props.preview, this_element);
  }
  // updateOption() {
  //   // let this_element = assign({}, this.state.element);
  //   // to prevent ajax calls with no change
  //   if (this.state.dirty) {
  //     console.log('dirty ', this.state.element);
  //     this.props.updateElement(assign({}, this.state.element));
  //     // this.props.updateElement.call(this.props.preview, this_element);
  //     this.setState({dirty: false});
  //   }
  // }
  addOption(index) {
    console.log('add options', index, this.state.element);
    let this_element = assign({}, this.state.element);
    this_element.options.splice(index+1,0,{value: '', text: '', key: ID.uuid()});
    // this.props.updateElement.call(this.props.preview, this_element);
    this.props.updateElement(this_element);
  }
  removeOption(index) {
    console.log('add options', index, this.state.element);
    let this_element = assign({}, this.state.element);
    this_element.options.splice(index,1);
    // this.props.updateElement.call(this.props.preview, this_element);
    this.props.updateElement(this_element);
  }
  render() {
    console.log('rendering dynamic list with', this.state.element);
    return (
      <div className="dynamic-option-list">
        <ul>
          <li>
            <div className="row">
              <div className="col-sm-8"><b>Options</b></div>
              <div className="col-sm-4"><b>Correct</b></div>
            </div>
          </li>
          {
            this.state.element.options.map( (option, index) => {
              let this_key = 'edit_' + option.key;
              return (
                <li className="clearfix" key={this_key}>
                  <div className="row">
                    <div className="col-sm-8">
                      <input tabIndex={index+1} className="form-control" style={{width: '100%'}} type="text" name={'text_'+index} placeholder="Option text" value={option.text} onChange={this.editOption.bind(this, index)} />
                    </div>
                    {<div className="col-sm-1">
                      <input id="isRequired" ref="isRequired" className="form-control" type="checkbox" value="1" onChange={this.editOptionCorrect.bind(this, index)} checked={option.hasOwnProperty("correct")} />
                    </div>}
                    <div className="col-sm-3">
                      <div className="dynamic-options-actions-buttons">
                        <button onClick={this.addOption.bind(this, index)} className="btn btn-success"><i className="fa fa-plus-circle"></i></button>
                        { index > 0 &&
                          <button onClick={this.removeOption.bind(this, index)} className="btn btn-danger"><i className="fa fa-minus-circle"></i></button>
                        }
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
