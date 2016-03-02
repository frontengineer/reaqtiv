import React from 'react';
import Rx from 'rx-lite';
import DynamicOptionList from './dynamic-option-list';
import TextAreaAutosize from 'react-textarea-autosize';
import assign from '../utils/assign';
import {FieldComponetIntentOutput} from './FieldComponent';
import Keys from './FormBuilderIntents';

export const IntentOutput = new Rx.BehaviorSubject([]);

//proxy to this IntentOutput
FieldComponetIntentOutput.subscribe(x => {
  if (!(x && x.intent)) return;
    IntentOutput.onNext(x);
});

export default class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old_element_data : this.props.element
    };
    //   element: this.props.element//,
    //   // data: this.props.data,
    //   // dirty: false
    // }
  }
  componentWillReceiveProps(nextProps){
    console.log('got new props', this.props);
  }
  componentWillMount() {

    this.setState({
      element: this.props.element
    });
  }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log('the curr props ', this.props.element, ' next prop set', nextProps.element);
  //   // console.log('the curr state ', this.state, ' next state set', nextState.element);
  //   // console.log('matching state', (nextProps.element === this.state.element));
  //   return (nextProps.element === this.props.element);
  // }

  // toggleRequired() {
  //   let this_element = this.state.element;
  // }

  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked

    let this_element = assign({}, this.state.element );
    this_element[elemProperty] = e.target[targProperty];
console.log('updating with', elemProperty, targProperty,  this_element, e.target.id);
    // if(e.target.id === 'isRequired'){
    //   let reqField = this.refs['isRequired'].getDOMNode();
    //   reqField.checked = !reqField.checked;
    //   console.log('check status', reqField.checked);
    //
    // }
    console.log('FormElementsEdit:editElementProp', this.props.element, this_element);
      this.updateElement(this_element);
  }

  handleCancel () {
    console.log('undo changes to', this.state.old_element_data);
    // IntentOutput.onNext({ intent: Keys.UPDATE_ELEMENT, payload: this.state.old_element_data });

    this.setState({ element : JSON.parse(JSON.stringify(this.state.old_element_data)) });
    // IntentOutput.onNext({ intent: Keys.CANCEL});
    // { editModeOn: false, key: null }
    // requestsort('Sorted_List', reorder);
    // FieldListIntent.onNext({ lexicon: this.displayName, key:'Sorted_List', payload: reorder });
  }

  handleDone () {
    console.log('all done', this.state, this.props);
    if(this.state.element && this.state.element !== this.props.element){
      console.log('requesting update', this.state.element, this.props.element);
      // console.log('the state', this.state.element, this.props.element);
      // console.log('the props', this.state.element, this.props.element);
      let nextState = assign({}, this.state.element);
      // this.updateElement(nextState);

      IntentOutput.onNext({ intent: Keys.UPDATE_ELEMENT, payload: nextState });

    }
    // IntentOutput.onNext({ intent: Keys.EDIT_MODE_OFF});
    // // this.setState({ element: null });
    // console.log('FormElementsEdit: all done');
    // console.log('FormElementsEdit: the state', this.state.element);
    // console.log('FormElementsEdit: the props', this.props.element);

    this.props.handleDone('wrapping up');

  }

  updateElement(element) {
    console.log('update data', element);
    this.setState({ element : element });

    // IntentOutput.onNext({ intent: Keys.UPDATE_ELEMENT, payload: element });

    // let this_element = this.state.element;
    // // to prevent ajax calls with no change
    // if (this.state.dirty) {
    //   this.props.updateElement.call(this.props.preview, this_element);
    //   this.setState({dirty: false});
    // }
  }
  // getContent(){
  //   console.log('getting content', this.props.element.content);
  //   return !this.state.element ? this.props.element.content : this.state.element.content;
  // }

  render() {
    console.log('rendering edit', this.state);
    let this_checked = this.state.element.hasOwnProperty('required') ? this.state.element.required : false;
    let this_files = this.props.files.length ? this.props.files : [];
    if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== ""){
      this_files.unshift({id: '', file_name: ''});
    }

    return (
      <div>
        <div  className="navbar edit-done-bar">
          <div className="edit-done-bar-button">
            <a href="javascript:void(0)" onClick={this.handleCancel.bind(this)}>undo changes</a>&nbsp;&nbsp;&nbsp;
            <button className='btn btn-primary navbar-btn' onClick={this.handleDone.bind(this)}>Done</button>
          </div>
        </div>
        <div>
          <h4>Editing: {this.props.element.text}</h4><br />
        </div>

        { this.state.element.hasOwnProperty('content') &&
          <div className="form-group">
            <label>Text to display:</label>
            {React.createElement(TextAreaAutosize, {
              value: function(el){ return el.state.element.content }(this),
              type: 'text',
              className:'form-control',
              onChange:this.editElementProp.bind(this, 'content', 'value'),
              componentWillUnmount : function(el){
                console.log('unmounting:', el);
              }
            })}
          </div>
        }
        { this.state.element.hasOwnProperty('file_path') &&
          <div className="form-group">
            <label>Choose file:</label>
            {false && //Disable for now and try text input
            <select className="form-control" value={this.state.element.file_path} onChange={this.editElementProp.bind(this, 'file_path', 'value')}>
              {this_files.map(function (file) {
                let this_key = 'file_' + file.id;
                return <option value={file.id} key={this_key}>{file.file_name}</option>;
              })}
            </select>
            }
            <input type="text" className="form-control" value={this.state.element.file_path} onChange={this.editElementProp.bind(this, 'file_path', 'value')} />
            <br />

          </div>
        }
        { this.state.element.hasOwnProperty('href') &&
          <div className="form-group">
            <label>Link to:</label>
            <TextAreaAutosize type="text" className="form-control" value={this.state.element.href} onChange={this.editElementProp.bind(this, 'href', 'value')} />
          </div>
        }
        { this.state.element.hasOwnProperty('label') &&
          <div className="form-group">
            <label>Display Label</label>
            <input type="text" className="form-control" value={this.state.element.label} onChange={this.editElementProp.bind(this, 'label', 'value')} />
            <br />
            <label>
              <input type="checkbox" checked={this_checked} value={true} onChange={this.editElementProp.bind(this, 'required', 'checked')} /> Required
            </label>
          </div>
        }
        { this.state.element.hasOwnProperty('step') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Step</label>
              <input type="number" className="form-control" value={this.state.element.step} onChange={this.editElementProp.bind(this, 'step', 'value')} />
            </div>
          </div>
        }
        { this.state.element.hasOwnProperty('min_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Min</label>
              <input type="number" className="form-control" value={this.state.element.min_value} onChange={this.editElementProp.bind(this, 'min_value', 'value')} />
              <input type="text" className="form-control" value={this.state.element.min_label} onChange={this.editElementProp.bind(this, 'min_label', 'value')} />
            </div>
          </div>
        }
        { this.state.element.hasOwnProperty('max_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Max</label>
              <input type="number" className="form-control" value={this.state.element.max_value} onChange={this.editElementProp.bind(this, 'max_value', 'value')} />
              <input type="text" className="form-control" value={this.state.element.max_label} onChange={this.editElementProp.bind(this, 'max_label', 'value')} />
            </div>
          </div>
        }
        { this.state.element.hasOwnProperty('default_value') &&
          <div className="form-group">
            <div className="form-group-range">
              <label>Default Selected</label>
              <input type="number" className="form-control" value={this.state.element.default_value} onChange={this.editElementProp.bind(this, 'default_value', 'value')} />
            </div>
          </div>
        }
        { this.props.showCorrectColumn && this.state.element.canHaveAnswer && !this.state.element.hasOwnProperty('options') &&
          <div className="form-group">
            <label>Correct Answer</label>
            <input type="text" className="form-control" value={this.state.element.correct}  onChange={this.editElementProp.bind(this, 'correct', 'value')} />
          </div>
        }
        { this.state.element.hasOwnProperty('options') &&
          <DynamicOptionList showCorrectColumn={this.props.showCorrectColumn} element={this.state.element} key={this.state.element.options.length} updateElement={this.updateElement.bind(this)}/>
        }
      </div>
    );
  }
}
FormElementsEdit.defaultProps = {className: 'edit-element-fields'}
