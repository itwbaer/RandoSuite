import React, { Component } from 'react';

export class TrackerItemComponent extends Component{
	constructor(props) {
    super(props);
    this.state = {
    						obtained: this.props.obtainable.obtained
    					};
  }

  handleClick = (event) => {
  	let obtained = {obtained: -this.state.obtained};
  	this.setState(obtained);
  	console.log(obtained);
    this.props.onClick(event.button);
  }

	render() {
		return(
			<div className="col">
	    	<img 
	    		className={"img-fluid " + (this.state.obtained > 0 ? "obtained" : "unobtained")}
	    		src={require("../icons/" +  this.props.obtainable.code + ".png")}
	    		onClick={this.handleClick}
	    	/>
	    </div>
	   );
  }
}