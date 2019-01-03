import React, { Component } from 'react';

export class CheckDisplayComponent extends Component{

  handleClick = (event) => {

	  	this.props.onClick();
  }

	render() {
    return(
      <div className="row check-display">
      	<div className="col-sm-1"><input className="form-check-input" type="checkbox" checked={this.props.checked > 0} onClick={this.handleClick} readOnly/></div>
        <div className="col-sm-5"><p className="form-check-label noselect"
        	onClick={this.handleClick}
        >
          {this.props.name}
        </p></div>
        <div className="col-sm-3"><p className="form-check-label noselect"
          onClick={this.handleClick}
        >
          {this.props.type}
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