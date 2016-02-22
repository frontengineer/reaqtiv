import React, {Component} from 'react/addons';
import Rx from 'rx-lite';
import assign from '../utils/assign';
// import {getElementWithOptions} from './FormFieldData';
import FormElementsEdit, {IntentOutput as EditResults} from './form-elements-edit';
import Keys from './FormBuilderIntents';

// export const IntentInput = new Rx.BehaviorSubject();
// export const IntentOutput = new Rx.BehaviorSubject();


const qk = function (blah) {
  return (blah === Keys.EDIT_ELEMENT || blah === Keys.UPDATE_ELEMENT);
}

export default class FormDraft extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'EditFormField';
    // this.state = {
    //   editModeOn : false
    // };
  }

  componentWillMount(){
    console.log('EditForm:componentWillMount', this.props);
    // let self = this;
    // // EditResults.subscribe(this.setState.bind(this));
    // EditResults.subscribe(x=> {
    //   if(!x)return;
    //   self.setState(assign({}, x, { editModeOn : qk(x.intent) }));
    // });
  }


    _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
    }

    // updateElement(element) {
      // let data = this.state.data;
      // let found = false;
      //
      // for(var i=0, len=data.length; i < len; i++) {
      //   if (element.id === data[i].id) {
      //     data[i] = element;
      //     found = true;
      //     break;
      //   }
      // }
        // console.log('Edit Form: update element', element);
      // if (found) {
        // ElementActions.saveData(data);
      // }
    // }

    // handleDone(x){
    //   console.log('the new done', x);
      // this.setState()
      // handleDone () {
      //   console.log('FormElementsEdit: all done');
      //   console.log('FormElementsEdit: the state', this.state.element);
      //   console.log('FormElementsEdit: the props', this.props.element);
      //   if(this.state.element && this.state.element !== this.props.element){
      //     console.log('FormElementsEdit: requesting update');
      //     console.log('FormElementsEdit: the state', this.state.element);
      //     console.log('FormElementsEdit: the props', this.props.element);
      //     // IntentOutput.onNext({ intent: Keys.UPDATE_ELEMENT, payload: this.state.element });
      //   }
      //   IntentOutput.onNext({ intent: Keys.EDIT_MODE_OFF});
      //   // this.setState({ element: null });
      // }
    // }

  render() {
    if(!this.props.element){ return (<div></div>) }
    // let element = assign({}, this.state);
    // console.log('STATE KEY', this.state, element.intent,  qk(element.intent), Keys.EDIT_ELEMENT, Keys.UPDATE_ELEMENT );
    // let item = FieldComponent(fieldLibrary[this.state.key], this.state, Math.round(Math.random() * 100000000) );
    return (
      <div id="edit-form" className={this.props.element ? "editModeOn" : ''}>
          {this.props.element && <FormElementsEdit showCorrectColumn={this.props.showCorrectColumn} files={this.props.files}  preview={this} element={this.props.element} handleDone={this.props.handleDone} />}
      </div>
    )
  }
}
FormDraft.defaultProps = { showCorrectColumn: false, files: [{id: 32, file_name: 'the doc'}], editMode: false, editElement: null, className: 'react-form-builder-preview pull-left'}
