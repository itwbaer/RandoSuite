import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';

export class ChecklistComponent extends Component{
	render() {
    return(
      <div className="container-fluid">
      	<CheckDisplayComponent 
      		name={this.props.checks[0].code}
      		location={this.props.locations[this.props.checks[0].location].name}
      		state={this.props.states[this.props.checks[0].state].name}
      	/>
      </div>
    );
  }
}