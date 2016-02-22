import React from 'react';
import Rx from 'rx-lite';


let _fields = [];

let TextInput = React.createClass({
  render : function(){
     return (<div>TextInput</div>);
  }
});

const Model = new Rx.BehaviorSubject();


export default Model;
