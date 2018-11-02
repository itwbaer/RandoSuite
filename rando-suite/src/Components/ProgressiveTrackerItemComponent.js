import React, { Component } from 'react';

export class ProgressiveTrackerItemComponent extends Component{
	constructor(props) {
    super(props);
    this.state = {
    						index: this.props.progressive.index,
    					};
  }

  handleClick = (event) => {

	  	let index = {index: (this.state.index + 1)};
	  	this.setState(index);
  		console.log(index);
  }

	render() {
		return(
			<div className="col">
	    	<span className="noselect" onClick={this.handleClick}>
	    		{this.props.progressive.options[this.state.index]}
	    	</span>
	    </div>
	   );
  }
}