import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';

export class ChecklistComponent extends Component{

  createChecklist(){
    let checklist = [];

    //first group the checks
    let groupedChecks = this.props.util.checks.groupByLocation(this.props.filteredChecks, this.props.locations);

    //get sorted locations
    let sortedLocations = this.props.util.locations.sortLocations(this.props.locations, this.props.locationsMap);

    //for every locations
    for(let i = 0; i < sortedLocations.length; i++){
      let currentIndex = sortedLocations[i].id;

      //heading
      for(let j = 0; j < this.props.filteredChecks.length; j++){
        if(this.props.filteredChecks[j].location === currentIndex){
          checklist.push(<h5 key={"heading-" + this.props.locations[currentIndex].name}>{this.props.locations[currentIndex].name}</h5>);
          break;
        }
      }

      //push all checks
      let locationChecks = groupedChecks[currentIndex];
      for(let j = 0; j < locationChecks.length; j++){
        let currentCheck = locationChecks[j];

        let checkName = currentCheck.name;
        let checkLocation = this.props.locations[currentCheck.location].name;
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
            checked={currentCheck.checked}
            onClick={(data) => this.props.checklistOnClick(currentCheck.id, data)}
          />
       );
      }
    }

    return checklist;
    /*for(let i = 0; i < this.props.filteredChecks.length; i++){


      let currentCheck = this.props.filteredChecks[i];

      let checkName = currentCheck.name;
      let checkLocation = this.props.locations[currentCheck.location].name;
      let checkState = "";
      for(let j = 0; j < currentCheck.state.length; j++){
        let currentState = currentCheck.state[j];
        if(j === 0){checkState = checkState + this.props.states[currentState].name}
        else{checkState = checkState + "/" + this.props.states[currentState].name}
      }

      checks.push(
        <CheckDisplayComponent
          key={"check-" + currentCheck.id} 
          name={checkName}
          location={checkLocation}
          state={checkState}
          checked={currentCheck.checked}
          onClick={(data) => this.props.checklistOnClick(currentCheck.id, data)}
        />
      );
    }

    return checks;*/


  }


	render() {
    return(
      <div className="container-fluid" id="">       
      	{this.createChecklist()}
      </div>
    );
  }
}