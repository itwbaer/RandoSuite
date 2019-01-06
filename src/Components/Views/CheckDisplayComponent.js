import React, { Component } from 'react';

export class CheckDisplayComponent extends Component{

/*        <div className="col-sm-3"><p className="form-check-label noselect"
          onClick={this.handleClick}
        >
          {this.props.type}
        </p></div>*/
  handleClick = (event) => {

	  	this.props.onClick();
  }

	render() {
    return(
      <div className="row check-display">
      	<div className="col-sm-2"><input className="form-check-input" type="checkbox" checked={this.props.checked > 0} onClick={this.handleClick} readOnly/></div>
        <div className="col-sm-7"><p className="form-check-label noselect"
        	onClick={this.handleClick}
        >
          {this.props.name}
        </p></div>
        <div className="col-sm-3"><p className="form-check-label noselect"
          onClick={this.handleClick}
        >
          {this.props.state}
        </p></div>
        
        
      </div>
    );
  }
}