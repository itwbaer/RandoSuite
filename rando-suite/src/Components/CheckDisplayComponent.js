import React, { Component } from 'react';

export class CheckDisplayComponent extends Component{
	constructor(props) {
    super(props);
    this.state = {
    	checked: false 		
    };
  }

  handleClick = (event) => {
  		let checked = {checked: !this.state.checked}
	  	this.setState(checked);
  }

	render() {
    return(
      <div className="container-fluid check-display">
      	<input className="form-check-input" type="checkbox" checked={this.state.checked} onClick={this.handleClick}/>
        <p className="form-check-label noselect"
        	onClick={this.handleClick}
        >
          {this.props.name}, {this.props.location}, {this.props.state}
        </p>
        
      </div>
    );
  }
}