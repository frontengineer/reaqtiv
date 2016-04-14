import React from 'react';
import Rx from 'rx-lite';
import Input from '../form_builder/Input.jsx';
// import SpecMaker from './SpecMaker.jsx';
/*
var aggregator = function (spec, data) {

  var results = data.materials.filter(function (el) {
    return spec.list[el.cas] !== 'undefined' && spec.list[el.title] !== 'undefined';
  });

  console.log('results', { label: 'CHCC', count: results.length });
  return { label: spec.title, count: results.length };
};

var chccSpec = {
  title : 'CHCC',
  list  : {
    "50-0-0" : true,
    "formaldehyde": true,
    "62-53-3" : true,
    "aniline": true,
    "62-75-9" : true,
    "Butanol": true,
    "" : 'bad'
  }
};

var prod1 = {
    materials : [
    {cas: '50-0-0', title : 'formaldehyde'},
    {cas: '62-75-9'}
    ]
};

var aggregator2 = function (data, spec) {
  // data.subscribe(spec2.agg);
  data.subscribe(function (argument) {
    spec.agg(argument);
  });

};

let prod2 = new Rx.BehaviorSubject({
  formaldehyde : { cas: "50-0-0"},
  aniline_butanol : {}
});

var spec2 = {
  title : 'CHCC',
  list  : {
    "50-0-0" : true,
    "formaldehyde": true,
    "62-53-3" : true,
    "aniline": true,
    "62-75-9" : true,
    "Butanol": true,
    "" : 'bad'
  },
  specList : [
   {badness : 'Butanol_aniline'}
  ],

  agg : function (argument) {
    console.log(this.title);
    console.log('spec 2 agg', argument);
  }
};

var spec3 = {
  title : 'kugd',
  list  : {
    "50-0-0" : true,
    "formaldehyde": true,
    "62-53-3" : true,
    "aniline": true,
    "62-75-9" : true,
    "Butanol": true,
    "" : 'bad'
  },
  specList : [
   {badness : 'Butanol_aniline'}
  ],

  agg : function (argument) {
    console.log(this.title);
    console.log('spec 3 agg', argument);
  }
};
// aggregator(chccSpec, prod1);
aggregator2(prod2, spec2);
aggregator2(prod2, spec3);
*/
const Library = React.createClass({

  componentDidMount : function () {
    let list = Rx.Observable.fromEvent( document.querySelectorAll('div.col-md-6'), 'click');

    list
    .subscribe(function (ev) {
      console.log('ev', ev.target.getAttribute('id'));
    });
  },

  render : function () {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <form>
              <input />
              <input type="submit" value="find" />
            </form>
          </div>

        </div>


        <div className="row">
          <div id="1" className="col-md-6">bbb</div>

          <div id="2" className="col-md-6">cccc</div>
        </div>

      </div>
    )
  }
});



module.exports = Library;
