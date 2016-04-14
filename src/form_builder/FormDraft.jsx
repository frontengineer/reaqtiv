import React, {Component} from 'react';
import Rx from 'rx-lite';
import assign from 'object-assign';
import _ from 'lodash';
import Sortable from 'react-sortable-items';
import fieldLibrary from './form-elements.jsx';
import FieldComponent from './FieldComponent.jsx';
import EditForm from './EditForm.jsx';
import Keys from './FormBuilderIntents';

export const FieldListIntent = new Rx.BehaviorSubject();


const LEXICON = 'SortableSpecField';
// function () {
  // FieldListIntent.onNext({ lexicon: this.displayName, key:'Sorted_List', payload: reorder });

// }

export default class FormDraft extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = LEXICON;
    this.state = {
      editable : {
        editModeOn : false
      }
    }
  }

  handleSort (reorder) {
    FieldListIntent.onNext({ intent: Keys.SORT_ELEMENTS, payload: reorder})
    // FieldListIntent.onNext({ lexicon: this.displayName, key:'Sorted_List', payload: reorder });
  }

  handleEdit(x){

      // FieldComponetIntentOutput.onNext(assign({}, x, { editModeOn: true }));
      let clone = _.merge({}, x);//this.props.fieldList.filter( el => el.refId === x.refId);
      console.log('FormDraft current fieldList', this.props, clone);
      console.log('FormDraft: edit the x', x);
      this.setState({ fieldToEdit: clone })
      // FieldComponetIntentOutput.onNext({ intent: Keys.EDIT_ELEMENT, payload: x.refId });

  }

  handleDone(x){
    console.log('FormDraft: the new done', x);
    this.setState(function(s){
      return delete s['fieldToEdit'];
    })
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
  }


  handleDestory(refId){
    // console.log('FormDraft: destroy FieldComponent', x);
    FieldListIntent.onNext({ intent: Keys.DESTROY_ELEMENT, payload: refId });

  }

  render() {
    let methods = { handleEdit: this.handleEdit.bind(this), handleDestory: this.handleDestory.bind(this) };
    console.log('FormDraft: fieldList', this.props.fieldList);
    var items = this.props.fieldList.map((x, index) => FieldComponent(fieldLibrary[x.key], x, index, this.props.mutable, methods) );
    return (
      <div id="custom-form-draft" className="col-md-9">
        <EditForm element={this.state.fieldToEdit} handleDone={this.handleDone.bind(this)}/>

        <form method="POST" action="http://localhost:3000/profile">
          <Sortable onSort={this.handleSort.bind(this)}>
          {items}
          </Sortable>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
