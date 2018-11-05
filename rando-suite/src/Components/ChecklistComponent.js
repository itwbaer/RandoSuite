import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';

export class ChecklistComponent extends Component{

  getChecks(){
    let checks = [];

    for(let i = 0; i < this.props.filteredChecks.length; i++){
      let currentCheck = this.props.filteredChecks[i];

      let checkName = currentCheck.code;
      let checkLocation = this.props.locations[currentCheck.location].name;
      let checkState = "";
      for(let j = 0; j < currentCheck.state.length; j++){
        let currentState = currentCheck.state[j];
        if(j === 0){checkState = checkState + this.props.states[currentState].name}
        else{checkState = checkState + "/" + this.props.states[currentState].name}
      }

      checks.push(
        <CheckDisplayComponent
          key={currentCheck.id} 
          name={checkName}
          location={checkLocation}
          state={checkState}
        />
      );
    }

    return checks;


  }

	render() {
    return(
      <div className="container-fluid">
      	{this.getChecks()}
      </div>
    );
  }
}