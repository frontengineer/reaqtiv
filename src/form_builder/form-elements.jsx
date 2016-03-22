import React from 'react';
import HeaderBar from './header-bar';
import StarRating from 'react-star-rating';
import Select from 'react-select';
import SignaturePad from 'react-signature-pad';

let FormElements = {};

let Header = React.createClass({
  render: function() {
    // let headerClasses = 'dynamic-input ' + this.props.data.element + '-input';
        return (<h3 className="static">{this.props.data.content}</h3>);
  }
})


let Paragraph = React.createClass({
  render: function() {
          return (<p className="static">{this.props.data.content}</p>)
  }
})

let LineBreak = React.createClass({
  render: function() { return (<hr />);
  }
})

let TextInput = React.createClass({

  render: function() {
    let props = {};
    props.type = "text";
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }

    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <input {...props} />
        </div>
    );
  }
})

let TextArea = React.createClass({

  render: function() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }




    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <textarea {...props} />
        </div>
    );
  }
})

let DatePicker = React.createClass({

  render: function() {
    let props = {};
    props.type = "date";
    props.className = "form-control";
    props.name = this.props.data.field_name;
    props.disabled = !this.props.mutable;

    // if (this.props.mutable) {
    //   props.defaultValue = this.props.defaultValue;
    //   props.ref = "child_ref_" + this.props.data.field_name;
    // }




    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <input {...props} />
        </div>
    );
  }
})

let Dropdown = React.createClass({

  render: function() {
    let props = {};
    props.className = "form-control";
    props.name = this.props.data.field_name;
    props.disabled = !this.props.mutable;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    }




    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <select {...props}>
            {this.props.data.options.map(function (option) {
              let this_key = 'preview_' + option.key;
              return <option value={option.value} key={this_key}>{option.text}</option>;
            })}
          </select>
        </div>
    );
  }
})


let Signature = React.createClass({

  componentDidMount() {
    // if (this.props.defaultValue !== undefined && this.props.defaultValue.length > 0) {
    //   let canvas = this.refs['canvas_'+this.props.data.field_name];
    //   canvas.fromDataURL('data:image/png;base64,' + this.props.defaultValue);
    // }
    console.log('FormElements: has element', document.getElementById('sigpad'), this.refs);
    // let pad_props = {};
    // pad_props.clearButton = {true};
    // React.render(<SignaturePad clearButton="true" />, document.getElementById('sigpad'));
    var signature = this.refs.sigpad;
    signature.off()
  },
  render: function() {
    let props = {};
    props.type = "hidden";
    props.name = this.props.data.field_name;

    // if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = "child_ref_" + this.props.data.field_name;
    // }
    let pad_props = {};
    pad_props.clearButton = {true};
    // if (this.props.mutable) {
      pad_props.defaultValue = this.props.defaultValue;
      pad_props.ref = 'canvas_'+this.props.data.field_name;
    // }


    // let pad_props = {};
    // pad_props.clearButton = {true};
    // React.render(<SignaturePad {...pad_props} />, document.getElementById('sigpad'));
    var addStyle = function(toggle){
      console.log('toggle', toggle);
      return !toggle ? {display: 'none'}: {}
    };

    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <div style={addStyle(this.props.mutable)}>
            <SignaturePad clearButton="true" ref="sigpad" />
          </div>

        </div>
    );
  }
})

let Tags = React.createClass({

  getInitialState() {
    return {value: this.props.defaultValue !== undefined ? this.props.defaultValue.split(",") : []};
  },
  handleChange(e) {
    this.setState({value: e});
  },
  render: function() {
    let options = this.props.data.options.map( option => {
      option.label = option.text;
      return option;
    })
    let props = {};
    props.disabled = !this.props.mutable;
    props.multi = true;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;
// props.value = 'blah';
// props.ref = "child_ref_" + this.props.data.field_name;
    props.options = options;
    if (!this.props.mutable) {props.value = options[0].text} // to show a sample of what tags looks like
    if (this.props.mutable) {
      props.value = this.state.value;
      props.ref = "child_ref_" + this.props.data.field_name;
    }

    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <Select {...props} />
        </div>
    );
  }
})

let Checkboxes = React.createClass({

  render: function() {
    let self = this;

    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          {this.props.data.options.map(function (option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = 'option_'+option.key;

            props.type = "checkbox"
            props.value = option.value;
            // if (self.props.mutable) {
            //   props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
            //   props.ref = "child_ref_" + option.key;
            // }
            props.disabled = !self.props.mutable;

            return (
              <label className="checkbox-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
    );
  }
})

let RadioButtons = React.createClass({

  render: function() {
    let self = this;




    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          {this.props.data.options.map(function (option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.field_name;

            props.type = "radio"
            props.value = option.value;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
              props.ref = "child_ref_" + option.key;
            }
            return (
              <label className="radio-label" key={this_key}>
                <input {...props} /> {option.text}
              </label>
            )
          })}
        </div>
    );
  }
})

let Rating = React.createClass({

  render: function() {
    let props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined && this.props.defaultValue.length) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.ref = "child_ref_" + this.props.data.field_name;
    }




    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <StarRating {...props} />
        </div>
    );
  }
})

let HyperLink = React.createClass({

  render: function() {

    return (
        <div className="form-group">
          <a target="_blank" href={this.props.data.href}>{this.props.data.content}</a>
        </div>
    );
  }
})

let Download = React.createClass({
  render: function() {
    const href = this.props.download_path + '?id=' + this.props.data.file_path;
    return (
        <div className="form-group">
          <a href={this.props.mutable? href: 'javascript:void(0)'}>{this.props.data.content}</a>
        </div>
    );
  }
})

let Camera = React.createClass({


  getInitialState() {
    return {img: null};
  },

  displayImage(e) {
    var self = this;
    var target = e.target;
    var file, reader;

    if(target.files && target.files.length) {
      file = target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        self.setState({
          img: reader.result
        });
      }
    }
  },

  clearImage() {
    this.setState({
      img: null
    })
  },

  render: function() {


    let props = {};
    props.disabled = !this.props.mutable;

    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <div className="image-upload-container">

            { !this.state.img &&
              <div>
                <input {...props} type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
                <div className="image-upload-control">
                  <div className="btn btn-default btn-school"><i className="fa fa-camera"></i> Upload Photo</div>
                  <p>Select an image from your computer or device.</p>
                </div>
              </div>
            }

            { this.state.img &&
              <div>
                <img src={ this.state.img } height="100" className="image-upload-preview" /><br />
                <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                  <i className="fa fa-times"></i> Clear Photo
                </div>
              </div>
            }

          </div>
        </div>
    );
  }
})

let Range = React.createClass({

  render: function() {
    let props = {};
    props.type = "range";
    props.name = this.props.data.field_name;
    props.list = "tickmarks_" + this.props.data.field_name;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;

    props.defaultValue = this.props.defaultValue !== undefined ? parseInt(this.props.defaultValue, 10) : parseInt(this.props.data.default_value, 10);

    if (this.props.mutable) {
      props.ref = "child_ref_" + this.props.data.field_name;
    }

    let datalist = [];
    for (var i=parseInt(this.props.data.min_value, 10); i <= parseInt(this.props.data.max_value, 10); i += parseInt(this.props.data.step, 10)) {
      datalist.push(i);
    }

    let oneBig = 100 / (datalist.length - 1);

    let _datalist = datalist.map((d,idx) => {
      return <option key={props.list+'_'+idx}>{d}</option>
    })

    let visible_marks = datalist.map((d,idx) => {
      let option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length-1)
        w = oneBig/2;
      option_props.key = props.list+'_label_'+idx;
      option_props.style = {width: w + '%'};
      if (idx === datalist.length-1)
        option_props.style = {width: w + '%', textAlign: 'right'};
      return <label {...option_props}>{d}</label>
    })


    return (
        <div className="form-group">
          <label>
            {this.props.data.label}
            { (this.props.data.hasOwnProperty('required') && this.props.data.required === true) &&
              <span className="label-required label label-danger">Required</span>
            }
          </label>
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <SliderNativeBootstrap
              name={props.name}
              value={props.defaultValue}
              step={this.props.data.step}
              max={this.props.data.max_value}
              min={this.props.data.min_value} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <datalist id={props.list}>
            {_datalist}
          </datalist>
        </div>
    );
  }
})


FormElements.Header = Header;
FormElements.Paragraph = Paragraph;
FormElements.LineBreak = LineBreak;
FormElements.TextInput = TextInput;
FormElements.TextArea = TextArea;
FormElements.Dropdown = Dropdown;
FormElements.Signature = Signature;
FormElements.Checkboxes = Checkboxes;
FormElements.DatePicker = DatePicker;
FormElements.RadioButtons = RadioButtons;
FormElements.Rating = Rating;
FormElements.Tags = Tags;
FormElements.HyperLink = HyperLink;
FormElements.Download = Download;
FormElements.Camera = Camera;
FormElements.Range = Range;

module.exports = FormElements;
