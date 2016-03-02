import React, {Component} from 'react';
import Rx from 'rx-lite';

let InputIntent = new Rx.Subject();

const TodoList = React.createClass({

  statics : {
    getIntent : function () {
      return InputIntent;
    }
  },
  getInitialState : function () {
    return {
      randomId : 'input-' + Math.round(Math.random() * 10000)
      // inputValue : this.props.todo.text
    }
  },

  componentDidMount : function () {
    let source = Rx.Observable.fromEvent(document.getElementById(this.state.randomId), 'keyup');

    this.stream = source.
    filter(function (todoInput) {
      return (todoInput.target.value !='') && (todoInput.keyCode === 13);
    }).
    subscribe(function (todoInput) {
      // console.log({ text: todoInput.target.value.trim() });
      InputIntent.onNext({ text: todoInput.target.value.trim() });
      todoInput.target.value = '';
    });

  },

  componentWillUnmount : function () {
    this.stream.dispose();
  },

  render: function(){
    let self = this;
    let list = 'll';

    return (
      <section className="main">
        <input type="text" id={this.state.randomId}/>
      </section>
    )
  }
});

module.exports = TodoList;
