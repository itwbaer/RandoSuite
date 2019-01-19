import React, { Component } from 'react';

export class CycleTrackerItemComponent extends Component{


  handleClick = (event) => {
  	this.props.onClick(event.ctrlKey, event.altKey);
		
  }


	render() {
    let obtainable = {};
    if(this.props.cycle.index > -1){
      obtainable = this.props.obtainables[this.props.objectMaps.obtainables[this.props.cycle.options[this.props.cycle.index]]];
    }
		return(
      <div className="col-sm-2">
        <img
          id={this.props.trackerID}
          className={"img-fluid noselect " + (this.props.cycle.obtained > 0 ? "obtained" : "unobtained")}
          src={this.props.cycle.index > -1 ? require("../../icons/" +  obtainable.code + ".png") : require("../../icons/" +  this.props.cycle.default)}
          onClick={this.handleClick}
          alt=""
        />
      </div>
     );
  }
}