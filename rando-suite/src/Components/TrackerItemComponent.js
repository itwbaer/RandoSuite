import React, { Component } from 'react';

export class TrackerItemComponent extends Component{
	constructor(props) {
    super(props);
    
  }

  handleClick = (event) => {
    this.props.onClick(event.button);
  }

	render() {
		return(
    	<img 
    		className={"img-fluid " + (this.props.obtainable.obtained > 0 ? "obtained" : "unobtained")}
    		src={require("../icons/" +  this.props.obtainable.code + ".png")}
    		onClick={this.handleClick}
    	/>
    );
  }
}