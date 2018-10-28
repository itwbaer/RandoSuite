import React, { Component } from 'react';
import {TrackerItemComponent} from './TrackerItemComponent';
export class ObtainableTrackerComponent extends Component{
	render() {
    return(
      <div className="container-fluid">
        <div className="row">
        </div>
        <div className="row">
        </div>
        <div className="row">
        </div>
        <div className="row">
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[1]}
        		onClick={(click) => this.props.onClick(1, click)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[1]}
        		onClick={(click) => this.props.onClick(1, click)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[1]}
        		onClick={(click) => this.props.onClick(1, click)}
        	/>
        	<TrackerItemComponent
        		obtainable={this.props.obtainables[1]}
        		onClick={(click) => this.props.onClick(1, click)}
        	/>
        </div>
      </div>
    );
  }
}