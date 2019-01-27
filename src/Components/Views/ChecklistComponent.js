import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';

export class ChecklistComponent extends Component{

  createChecklist(){
    let checklist = [];

    if(this.props.data.activeLocation === -1){ return checklist; }
    //first group the checks
    let filteredChecks = this.props.util.checks.applyFilterType(this.props.data);
    let groupedChecks = this.props.util.checks.groupByLocation(filteredChecks, this.props.data.locations, this.props.objectMaps);
    let location = this.props.data.locations[this.props.data.activeLocation];
    checklist.push(<h5 key={"heading-" + location.name}>{location.name}</h5>);

    let locationChecks = groupedChecks[location.id];

    for(let j = 0; j < locationChecks.length; j++){
      let currentCheck = locationChecks[j];

      let checkName = currentCheck.name;
      let checkLocation = this.props.data.locations[this.props.objectMaps.locations[currentCheck.location]].name;
      let checkType = this.props.data.checkTypes[currentCheck.type].name;
      let checkState = "";
      let canCheck = [];
      for(let i = 0; i < this.props.data.filter.state.length; i++){
        let state = this.props.data.filter.state[i];
        canCheck.push(this.props.util.checks.canCheck(
          state, currentCheck, this.props.data.locations, this.props.data.obtainables, this.props.data.checks, this.props.objectMaps)
        );
      }

      let checkClass = currentCheck.checked > 0 ? "checked" : (canCheck.includes(true) ? "canCheck" : "cantCheck")
      for(let j = 0; j < currentCheck.state.length; j++){
        let currentState = currentCheck.state[j];
        if(j === 0){checkState = checkState + this.props.data.states[currentState].name}
        else{checkState = checkState + "/" + this.props.data.states[currentState].name}
      }

      checklist.push(
        <CheckDisplayComponent
          key={"check-" + currentCheck.id} 
          name={checkName}
          location={checkLocation}
          state={checkState}
          type={checkType}
          checked={currentCheck.checked}
          checkClass={checkClass}
          onClick={() => this.props.checklistOnClick(currentCheck.id)}
        />
      );
     
    }
      

    return checklist;

  }


	render() {
    return(

        <div className="container-fluid">       
        	{this.createChecklist()}
        </div>

    );
  }
}