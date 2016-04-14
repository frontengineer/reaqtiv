import React, {Component} from 'react';
import Rx from 'rx-lite';
import ToolbarItem, {Intent as ToolbarButtonIntent} from './toolbar-item.jsx';
import Keys from './FormBuilderIntents';
import ElementData, {elementList, _defaultItemOptions} from './FormFieldData';
import assign from '../utils/assign';

// const filterByKey = ElementData.filterBy('key');
// function getIt(coll1, coll2, elKey){
//   return coll1.filter(x => x.key === elKey ).
//     map(x => {
//       return (x.options) ? assign({}, x, {options: coll2[x.key] }) : x;
//     })[0];
// }
// let holdOps = function(ary, targ) {
//   return function(targ){
//     if(targ.hasOwnProperty('options')){
//       targ.options = ary[targ.key];
//     }
//     return targ;
//   };
// };
// let blah = holdOps(_defaultItemOptions);
// console.log('my blah', blah);

export default class FormBuilder extends React.Component {
  constructor(props){
    super(props);
    this.displayName = this.lexicon = 'SpecFieldCreationButton';
    // this.state = {
    //   buttonList : new Array(0)
    // };
  }

  buttonAction(intent){
    // let el = elementList.filter(x => x.key === intent)[0];
    console.log('FormFieldButtons: button intent ', intent);
    Intent.onNext({ intent: Keys.ADD_ELEMENT, payload:  intent });

  }

  render() {
    return (
      <div id="custom-form-toolbar" className="col-md-9">
        <h3>creation</h3>
        <div className="form-field-buttons">
          {
            this.props.buttonList.map((ToolbarButtonIntent, index) => {
              return (<div key={index} className='vpad5'><ToolbarItem text={ToolbarButtonIntent.title} onClick={this.buttonAction.bind(this, ToolbarButtonIntent.key)} css='btn-block dashed text-left' icon={ToolbarButtonIntent.icon}  /></div>)
            })
          }
        </div>
      </div>
    )
  }
}
export const Intent = new Rx.BehaviorSubject();

// ToolbarButtonIntent.subscribe(data => {
//   if(!data) return;
// console.log('creation', data);
// console.log('new Data 1', data);
// console.log('new Data 2', getElementWithOptions(data.key));
// // console.log('new Data 3', newData);
// let newData = assign({}, data, { options: (getElementWithOptions(data.key) || [])});
// // if (data.options){newData.options = getElementWithOptions(data.key)}
//   Intent.onNext({ intent: Keys.ADD_ELEMENT, payload: newData });
//   newData = null;
// });
