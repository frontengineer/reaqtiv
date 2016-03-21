import Rx from 'rx-lite';

import Keys from '../form_builder/FormBuilderIntents';
import {Intent as Create_Field} from '../form_builder/FormFieldButtons';
import {FieldListIntent as FLI} from '../form_builder/FormDraft';
import {IntentOutput as SpecFormIntent} from '../form_builder/form-elements-edit';


const AggIntent = new Rx.BehaviorSubject();
const SpecIntent = new Rx.BehaviorSubject([]);

// gather disparate actions and feed to SpecIntent
Rx.Observable.merge(FLI, SpecFormIntent).subscribe(SpecIntent);

Create_Field.subscribe(data => {
  // console.log('SpecIntent: field component intent', data)
  // if((data && data.intent) && data.intent === Keys.DESTROY_ELEMENT){
  //   console.log('destroyer', data);
    SpecIntent.onNext(data);
  // }
});

// AggIntent.subscribe(function (intent) {
//   console.log('agg', intent);
//   if( !(intent && typeof intent.key === 'string') ) return;
//
//   switch (intent.lexicon) {
//     case 'SpecFieldCreationButton':
//       SpecIntent.onNext({ action: 'Create_Field', payload: intent });
//       break;
//     case 'SortableSpecField':
//       SpecIntent.onNext({ action: 'Sorted_List', payload: intent.payload });
//       break;
//     case 'DESTORY_COMPONENT':
//     console.log('kill', intent);
//       SpecIntent.onNext({ action: 'KILL', payload: intent.payload });
//       break;
//     case 'EDIT':
//     console.log('edit', intent);
//       // SpecIntent.onNext({ action: 'EDIT', payload: intent.payload });
//       break;
//     default:
//
//   }
//
// });


export {SpecIntent as SpecIntent};
