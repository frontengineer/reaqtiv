import React, {Component} from 'react/addons';
import Rx from 'rx-lite';
import assign from '../utils/assign';
import HeaderBar from './header-bar';
import Sortable from 'react-sortable-items';
import SortableItemMixin from 'react-sortable-items/SortableItemMixin';
import fieldLibrary from './form-elements';
import Keys from './FormBuilderIntents';

export const FieldComponetIntentOutput = new Rx.BehaviorSubject();
export const IntentOutput = new Rx.BehaviorSubject();

/*********************

Component -> EDIT_COMPONENT|DESTORY_COMPONENT
**********************/
export default function(ReactComponent, data, index, mutable, methods){
  console.log('FieldComponent: add field component', data);
  data.text = data.title;
  let wrapConfig = {
    parent      : data.title,
    editModeOn  : methods.handleEdit,
    data        : data,
    onDestroy   : function (x) {
      console.log('FieldComponent: destroy FieldComponent', x);
      FieldComponetIntentOutput.onNext({ intent: Keys.DESTROY_ELEMENT, payload: x.refId });
    },
    onEdit   : function (x) {
      // EditContent.onNext({ editModeOn: true })
    },
    static      : true,
    required    : false
  };

  let Wrap = React.createClass({
    mixins : [SortableItemMixin],
    render: function() {
      return this.renderWithSortable(
        <div className="rfb-item" >
          { !mutable &&
            <HeaderBar {...this.props} />
          }
          <ReactComponent mutable={mutable} data={data} />
        </div>
      );
    }
  });

  return !mutable ? (<Wrap key={index} sortData={index} isDraggable={true} {...wrapConfig} />) : (<ReactComponent mutable={mutable} data={data} />);
};
