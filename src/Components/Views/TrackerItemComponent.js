import React, { Component } from 'react';

export class TrackerItemComponent extends Component{

  handleClick = (event) => {

	this.props.onClick(event.ctrlKey);

  }

	render() {
		return(
			<div className="col-sm-2">
	    	<img
	    		id={this.props.trackerID}
	    		className={"img-fluid noselect " + (this.props.obtainable.obtained > 0 ? "obtained" : "unobtained")}
	    		src={require("../../icons/" +  this.props.obtainable.code + (this.props.obtainable.secondary > 0 ? "_secondary" : "") + ".png")}
	    		onClick={this.handleClick}
	    		alt=""
	    	/>
	    	<div className="count noselect" onClick={this.handleClick}>{this.props.obtainable.count}</div>
	    </div>
	   );
  }
}