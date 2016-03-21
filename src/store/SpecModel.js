import React from 'react';
import Rx from 'rx-lite';
import ElementData, {elementList, _defaultItemOptions} from '../form_builder/FormFieldData';
import _ from 'lodash';
import axios from 'axios';
import ID from '../form_builder/UUID';
import assign from '../utils/assign';
import Keys from '../form_builder/FormBuilderIntents';

import {SpecIntent} from '../intents/SpecIntent';

require('es6-promise').polyfill();
const SpecOutputModel = new Rx.BehaviorSubject([]);
export default SpecOutputModel;
// export function getRawData(){ return ElementData.getElements(); };


function finder(valueFn, bestFn, coll){
   return _.reduce(coll, function(best, current){
      var bestValue = valueFn(best);
      var currentValue = valueFn(current);

      return (bestValue === bestFn(bestValue, currentValue) ? best: current )
   });
}

/**
TODO
- Disable left menu top nav during edit mode
- Design UI toggles for Add, Edit, Conditions, Rankings
- Develop Conditions
- Develop Rating
- Consider creating "Downloadables" button
    to allow Multiple Downloadables on a same line vs. separate row
--- fix options add/remove
- in CheckBoxes edit use text only algo/validation
-- when pre-loaded fields...edit mode not updating changes
- modify all elements to work in edit mode
**/

let user = function(loginData) {
  return {
    id: null,
    username    : null, // isUnique
    email       : null,
    password    : null,
    userlevel   : null,
    avatar      : null,
    signup      : null,
    lastlogin   : null,
    notescheck  : null,
    activated   : null,
  }
};

const getHashValue = function(hash, key) {
  return function (key) {
    return hash[key];
  }
};

const getAltOptions = getHashValue(_defaultItemOptions);
const toElementMap = function(list1, keyName, el) {
  let hash = {};
  return function(keyName) {
    hash = _.reduce(list1, function(acc, curr) {
      acc[curr[keyName]] = (curr.options) ?  assign({}, curr, { options: getAltOptions(curr.key) }) : curr;
      return acc;
    }, {});

    return function(el) {
      let newEl = assign({}, hash[el], { refId : ID.uuid()});
      return _.cloneDeep(newEl);
    }
  }
}

const createElement = toElementMap(elementList)('key');
let initialSpecFields = [];
const SpecFieldSubject = new Rx.BehaviorSubject(initialSpecFields);


  // var source = Rx.Observable.fromPromise(axios.get('/mock_form_data.json')
  //   .then(function (response) {
  //     // console.log('axios then',response);
  //     return response.data;
  //   })
  //   .catch(function (response) {
  //     console.log('axios catch',response);
  //   })).subscribe(x => {
  //   SpecFieldSubject.onNext(function(){
  //     return x;
  //   })
  // });



/*
Recieves values pushed by SpecIntent to SpecFieldSubject( fn(values) ).
*/
SpecFieldSubject.
  scan(function (acc, op) {
    return op(acc);
  }).subscribe(SpecOutputModel);

SpecIntent.subscribe(action => {
  if( !(action && typeof action.intent === 'string') ) return;

  switch (action.intent) {
    case Keys.ADD_ELEMENT:
      SpecFieldSubject.onNext(function(fields){
        return [createElement(action.payload)].concat(fields);
      });
      break;

    case Keys.SORT_ELEMENTS:
      SpecFieldSubject.onNext(function (fields) {
        return action.payload.map(i => {
          return fields[i]
        });
      });
      break;
    case Keys.DESTROY_ELEMENT:
      SpecFieldSubject.onNext(function (fields) {
        return fields.filter(i => { return i.refId !== action.payload });
      });
      break;
    case Keys.UPDATE_ELEMENT:
    // console.log('SpecModel: model updating action payload', action.payload);
      SpecFieldSubject.onNext(function (fields) {
          return fields.map( x => {
            return (x.refId !== action.payload.refId) ? x : assign({}, action.payload) ;
          });
      });
      break;
    default:
      return;
  }
});
