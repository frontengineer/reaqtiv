import React from 'react';
import Rx from 'rx-lite';

export const Intent = new Rx.BehaviorSubject();

export default class Toolbar extends React.Component {
  _onClick(data) {
    Intent.onNext(data);
  }

  render() {
    return(
      <button className={'btn btn-default ' + this.props.css} onClick={this.props.onClick} ><i className={this.props.icon}></i>{this.props.text}</button>
    )
  }
}
