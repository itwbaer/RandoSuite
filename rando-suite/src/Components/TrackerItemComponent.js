import React, { Component } from 'react';

export class TrackerItemComponent extends Component{

  handleClick = (event) => {
  	if(!event.ctrlKey){

	    this.props.onClick(event.button, event.ctrlKey);
  	}
  	else{
  		
  		this.props.onClick(event.button, event.ctrlKey);
  	}
  }

	render() {
		return(
			<div className="col">
	    	<img 
	    		className={"img-fluid " + (this.props.obtainable.obtained > 0 ? "obtained" : "unobtained")}
	    		src={require("../icons/" +  this.props.obtainable.code + (this.props.obtainable.secondary > 0 ? "_secondary" : "") + ".png")}
	    		onClick={this.handleClick}
	    		alt=""
	    	/>
	    </div>
	   );
  }
}