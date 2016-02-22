import React from 'react';
import Rx from 'Rx';
import FormFieldButtons from './FormFieldButtons';
import {elementList} from './FormFieldData';
import FormDraft from './FormDraft';
import SpecOutputModel, {getRawData} from '../store/SpecModel';

const buttonList = elementList.map(x => { return { key: x.key, title: x.title, icon: x.icon } });

export default class CreateSpec extends React.Component {
  constructor(props){
    super(props);

    this.displayName = this.lexicon = 'SpecCreation';
    this.state = {
      fieldList : [],
      mutable : false
    };
  }

  componentWillMount(){
    SpecOutputModel.
    zip(ary => {
      console.log('CreateSpec: fieldList update', ary);
       return { fieldList: ary} }).
    subscribe(this.setState.bind(this));

  }

  togglePreview(){
    this.setState({ mutable: !this.state.mutable });
  }
  save(){
    console.log(JSON.stringify(this.state.fieldList));
  }

  render() {
    console.log('CreateSpec: render with state content', this.state);

    return (
        <div className="row">
          <button onClick={this.togglePreview.bind(this)}>Preview</button>
          <button onClick={this.save.bind(this)}>Save</button>
          <FormFieldButtons buttonList={buttonList} />
          <FormDraft mutable={this.state.mutable} fieldList={this.state.fieldList} />
        </div>
    )
  }
}



module.exports = CreateSpec;
