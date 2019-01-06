import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';

export class ChecklistComponent extends Component{

  createChecklist(){
    let checklist = [];

    if(this.props.activeLocation === -1){ return checklist; }
    //first group the checks
    let filteredChecks = this.props.util.checks.applyFilterType(
      this.props.filter, this.props.checks, this.props.locations, this.props.obtainables, 
      this.props.locationsMap, this.props.obtainablesMap, this.props.checksMap
    );
    let groupedChecks = this.props.util.checks.groupByLocation(filteredChecks, this.props.locations);

    let location = this.props.locations[this.props.activeLocation];
    checklist.push(<h5 key={"heading-" + location.name}>{location.name}</h5>);

    let locationChecks = groupedChecks[location.id];
    for(let j = 0; j < locationChecks.length; j++){
      let currentCheck = locationChecks[j];

      let checkName = currentCheck.name;
      let checkLocation = this.props.locations[currentCheck.location].name;
      let checkType = this.props.checkTypes[currentCheck.type].name;
      let checkState = "";
      for(let j = 0; j < currentCheck.state.length; j++){
        let currentState = currentCheck.state[j];
        if(j === 0){checkState = checkState + this.props.states[currentState].name}
        else{checkState = checkState + "/" + this.props.states[currentState].name}
      }

      checklist.push(
        <CheckDisplayComponent
          key={"check-" + currentCheck.id} 
          name={checkName}
          location={checkLocation}
          state={checkState}
          type={checkType}
          checked={currentCheck.checked}
          onClick={(data) => this.props.checklistOnClick(currentCheck.id, data)}
        />
      );
     
    }
      

    return checklist;

  }


	render() {
    return(
      <div>
        <div className="container-fluid">       
        	{this.createChecklist()}
        </div>
      </div>
    );
  }
}