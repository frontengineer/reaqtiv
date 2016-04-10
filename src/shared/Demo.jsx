import React from 'react';
import Rx from 'rx-lite';
import Input from '../form_builder/Input';

let assign = require('../utils/assign');

/**
* pump new immutable data list in here for specs to subscribe to
*/
let CMRT_SCORE;
// 0, 1, 2
// 0, 1, 2
// 0, 1, 2
// 0, 1, 2
// 0, 1, 2
// 0, 1, 2
// 0, 1, 2
// let CMRTS = [
//   [// DRC
//     q : 1,
//     q : 1,
//     q : 1,
//     q : 2,
//     q : 3,
//     q : 2,
//     q : 1
//   ],
//   [// Inconsistent
//     q : 2,
//     q : 2,
//     q : 2,
//     q : 0,
//     q : 4,
//     q : 0,
//     q : 0
//   ],
//   [
//     q : 2,
//     q : 2,
//     q : 2,
//     q : 0,
//     q : 0,
//     q : 0,
//     q : 0
//   ]
// ];

let CMRTS = [
  {
    name : 'Joe',
    cmrt :   [// DRC
      { q1 : 'yes' },
      { q2 : 'yes' },
      { q3 : 'yes' },
      { q4 : 'no' },
      { q5 : '51' },
      { q6 : 'no' },
      { q7 : 'yes' }
    ]
  },

  {
    name : 'Larry',
    cmrt : [// Inconsistent
      { q1 : 'no' },
      { q2 : 'no' },
      { q3 : 'no' },
      { q4 : '' },
      { q5 : '76' },
      { q6 : '' },
      { q7 : '' }
    ]
  },

  {
    name : 'Bob',
    cmrt : [
      { q1 : 'no' },
      { q2 : 'no' },
      { q3 : 'no' },
      { q4 : '' },
      { q5 : '' },
      { q6 : '' },
      { q7 : '' }
    ]
  }
];

Array.prototype.concatAll = function () {
  var results = [];
  this.forEach((arg) => Array.prototype.push.apply(results, arg));
  return results;
};

let cmrt_results = CMRTS.map( (doc) => {
  return doc.cmrt.filter((q) => q.q1 === 'no');
}).concatAll();
// cmrt_results.subscribe((list) => console.log('list', list));

// console.log('cmrt_results', cmrt_results);

let concern = [
  {result: 'DRC Yes'},
  {result: 'DRC Uncertain'},
  {result: 'DRC Uncertain'},
  {result: 'Inconsistent'},
  {result: 'Uncertain'},
  {result: 'DRC CF 3TG'},
  {result: 'Recycled/Scrap'},
  {result: 'DRC Free 3TG'},
  {result: 'No 3TG'},
  {result: 'Pending'}
];

// let DRC_YES = Rx.Observable.fromArray(CMRT);
// DRC_YES.filter(()=>);


let cardList = [
{
  id: 234,
  title : 'Washer',
  material  : [
    {
      cas: '',
      sym: 'Au',
      volperc       : '4',
      coo : 'Uraguay',
      providers  : [
        { title: 'Joe\'s Smelting', role: 'smelter'}
      ]
    }
  ]
},
{
  id: 9037,
  title : 'Printer',
  material  : [
    {
      cas: '',
      sym: 'Sn',
      volperc       : '4',
      coo : 'Peru',
      providers  : [
        { title: 'Joe\'s Smelting', role: 'smelter'}
      ]
    }
  ]
},
{
  id:5,
  title : 'Lawn Mower',
  material  : [
    {
      cas: '',
      sym: 'Au',
      volperc       : '4',
      coo : 'Canada',
      providers  : [
        { title: 'Joe\'s Smelting', role: 'smelter'}
      ]
    }
  ]
}
];

let ProductData = Rx.Observable.fromArray(cardList);
// let dyF = new Function('mat', 'return /Au/.test(mat.sym)');
// // (mat)=> /Au/.test(mat.sym)
// let goldie = ProductData.
// filter( function (product) {
//   return product.material.filter(dyF).length;
// }).
// subscribe((x)=> console.log('goldie', x));

// cardList.
//   filter((card)=> /Au/.test(card.material.sym) ).
//   map((card) => assign({}, card, { rating: 'hasBronze'}) );


// console.log('resultSet', resultSet);
let theSpec = {
  contains : { cass: 42, syn: 'Au', num: 79 }
};

// let myQuery = ProductData.sub

// console.log('foobar', fooBar(1, 2)); // will give you 3

// window.DataList = new Rx.BehaviorSubject();
//
// /////////////////////////////////
// window.dataFields = [
// {
//   material  : 'gold',
//   amt       : '4',
//   unit      : 'oz'
// },
// {
//   material  : 'bronze',
//   amt       : '4',
//   unit      : 'oz'
// }
// ,
// {
//   material  : 'tin',
//   amt       : '54',
//   unit      : 'oz'
// }
// ];
//
// DataList.onNext(dataFields);
/*
const Spec2 = React.createClass({

  aggregator : function (data) {
    const self = this;
    let results = [];
    let DataStream = Rx.Observable.fromArray(data);

    let hasGold = DataStream.
      filter((x) => {
        return x.material.toLowerCase() === 'gold';
      }).scan((acc, curr) => {
        console.log('acc', acc, 'curr', curr);
        return [curr].concat(acc);
      }).
      subscribe((x) => self.setState({ results: x }) );

    let hasBronze = DataStream.
      filter((x) => {
        return x.material.toLowerCase() === 'bronze';
      }).scan((acc, curr) => {
        console.log('acc', acc, 'curr', curr);
        return [curr].concat(acc);
      });

  },

  componentWillMount : function(){
    const self = this;
    //
    // setTimeout(()=> this.state.spec.onNext(dataFields), 1000);
    this.props.DataList.subscribe(function (listVal) {
      console.log('listVal', listVal);
      self.aggregator(listVal);
    });
  },

  getInitialState : function () {
    return {
      results: 0,
      data: 0,
      spec : new Rx.BehaviorSubject()
    }
  },

  render : function () {
    // let output = this.props.list.map(function(field){
    //   console.log('filed', field.material);
    //   return (<div>{field.material}</div>)
    // });
    return (
      <div className="well">
        <h6>CM</h6>
        <div>{this.state.results.length} </div>
      </div>
    );
  }
});

const SpecEdit = React.createClass({

  getInitialState : function () {
    return {
      query : []
    }
  },

  componentWillMount : function () {
    let self = this;
    let query = Input.getIntent().
    subscribe(function (queryUpdate) {
      console.log('queryUpdate', queryUpdate);
      self.setState({ query : [queryUpdate, ...self.state.query] });
    });
  },

  render : function () {
    let list = this.state.query.map(function (queryField) {
      return (<li>{queryField}</li>);
    });

    return (
      <div style={{position: 'fixed', right: 0, width: '400px', background: '#ccc'}}>
        <div className="row">
          <div id="spec-list" className="col-md-6">

            <Input id="i1"/>
          </div>
          <div id="spec-output" className="col-md-6"><ul>{list}</ul></div>
        </div>
      </div>
    )
  },

  handleChange : function (event) {
    console.log(event.target.el);
    let el = this.refs.blah.getDOMNode();
    console.log(el.value);
    this.setState({ query: el.value });
  }
});


const ReaqTor = React.createClass({

  Spec : {'gold' : 1, 'bronze': 2},

  DataList : DataList,

  getInitialState : function () {
    return {
      status : ''
    }
  },

  componentWillMount : function () {
    // this.DataList.subscribe(this.handleChange);
    this.initSpec();
  },
  render : function(){
    return (
      <div>
        <h5>ReaqTor Info</h5>
        {this.state.status}
      </div>
    )
  },

  initSpec : function () {
    let self = this;

    this.DataList.
    subscribe((listData) => {
      Rx.Observable.fromArray(listData).
      filter(function (card) {
        return self.Spec[card.material];      }).
      toArray().
      subscribe((x) => {
        console.log('x found', x);
        this.setState({ status: x.length ? 'bad' : 'none' });
      });
    });
  }
});









*/




const Demo = {

  render: () => {
    return (
      <div className="container">



        <section className="analytics">
          <h5>Follow Standard</h5>



        </section>
        <section style={{display:'none'}} className="target-list">
          Demo Home<br />
          <form>
            <div className="form-group">
              <label>Name or Ref# </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Material </label>
              <input type="text" className="form-control" />
            </div>
          </form>

        </section>
      </div>
    );
  }
};

module.exports = React.createClass(Demo);
