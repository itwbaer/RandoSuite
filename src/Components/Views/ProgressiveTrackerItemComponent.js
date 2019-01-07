import React, { Component } from 'react';

export class ProgressiveTrackerItemComponent extends Component{


  handleClick = (event) => {
  	if(!event.ctrlKey){

	    this.props.onClick(1);
  	}
  	else{
  		
  		this.props.onClick(-1);
  	}
		
  }

  parseType(){

  	let progressive = this.props.progressive;
  	let i = progressive.index;
  	switch (progressive.type){
  		case "text":
  			return(
  					<span className="noselect" onClick={this.handleClick}>
  						{progressive.options[i]}
  					</span>
  				);
  		case "obtainable":
  			//if index -1, always display first
  			//otherwise display index
  			let obtainable = {};
  			if(progressive.index < 0){
  				obtainable = this.props.obtainables[this.props.objectMaps.obtainables[progressive.options[0]]];
  			}
  			else{
  				obtainable = this.props.obtainables[this.props.objectMaps.obtainables[progressive.options[progressive.index]]];
  			}
  			
  			return(
		    	<img
            id={this.props.trackerID}
		    		className={"img-fluid noselect " + (obtainable.obtained > 0 ? "obtained" : "unobtained")}
		    		src={require("../../icons/" +  obtainable.code + ".png")}
		    		onClick={this.handleClick}
		    		alt=""
		    	/>
	    	);
  		default:
  			return(<span></span>);

  	}

  }

	render() {
		return(
			<div className="col-sm-2">
				{this.parseType()}
	    </div>
	   );
  }
}