/**
  * <HeaderBar />
  */

import React from 'react';

export default class HeaderBar extends React.Component {
  // componentWillMount(){
  //   console.log('header props', this.props);
  // }
  render() {
    return (
      <div className="toolbar-header">
        <span className="label label-default">{this.props.data.text}</span>
        <div className="toolbar-header-buttons">
          { this.props.data.key !== "LineBreak" &&
            <div className="btn is-isolated btn-school" onClick={this.props.editModeOn.bind(this.props.parent, this.props.data)}><i className="is-isolated fa fa-pencil-square-o"></i></div>
          }
          <div className="btn is-isolated btn-school" onClick={this.props.onDestroy.bind(this, this.props.data)}><i className="is-isolated fa fa-trash-o"></i></div>
        </div>
      </div>
    );
  }
}
