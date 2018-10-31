import React, { Component } from 'react';

export class TrackerItemComponent extends Component{
	constructor(props) {
    super(props);
    this.state = {
    						obtained: this.props.obtainable.obtained,
    						secondary: this.props.obtainable.secondary
    					};
  }

  handleClick = (event) => {
  	if(!event.ctrlKey){
	  	let obtained = {obtained: -this.state.obtained};
	  	this.setState(obtained);

	    this.props.onClick(event.button, event.ctrlKey);
  	}
  	else{
  		let secondary = {secondary: -this.state.secondary};
	  	this.setState(secondary);
  		this.props.onClick(event.button, event.ctrlKey);
  	}
  }

	render() {
		return(
			<div className="col">
	    	<img 
	    		className={"img-fluid " + (this.state.obtained > 0 ? "obtained" : "unobtained")}
	    		src={require("../icons/" +  this.props.obtainable.code + (this.state.secondary > 0 ? "_secondary" : "") + ".png")}
	    		onClick={this.handleClick}
	    	/>
	    </div>
	   );
  }
}