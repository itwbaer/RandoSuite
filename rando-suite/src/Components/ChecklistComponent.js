import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

export class ChecklistComponent extends Component{

  displayChecks(){
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
          key={"check-" + currentCheck.id} 
          name={checkName}
          location={checkLocation}
          state={checkState}
          checked={currentCheck.checked}
          onClick={() => this.props.onClick(currentCheck.id)}
        />
      );
    }

    return checks;


  }

  filterState(){
    let options = this.props.util.shared.getOptions(this.props.states);
    let defaultValues = this.props.util.shared.getDefaultOptions(this.props.states, this.props.filter.state);
    return(
      <Select
        key={"state"}
        className="filterOption"
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isMulti
        placeholder="State"
        defaultValue={defaultValues}
        options={options}
      />
    );
  }

  filterAccessible(){
    let options = [
      { value: true, label: 'Accessible' },
      { value: false, label: 'Not Accessible' },
    ];
    let defaultValues = this.props.util.shared.getDefaultOptionsStatic(options, this.props.filter.accessible);
    return(
      <Select
        key={"accessible"}
        className="filterOption"
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isMulti
        placeholder="Accessible?"
        defaultValue={defaultValues}
        options={options}
      />
    );
  }

  filterChecked(){
    let options = [
      { value: -1, label: 'Unchecked' },
      { value: 1, label: 'Checked' },
    ];
    let defaultValues = this.props.util.shared.getDefaultOptionsStatic(options, this.props.filter.checked);
    return(
      <Select
        key={"checked"}
        className="filterOption"
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isMulti
        placeholder="Checked?"
        defaultValue={defaultValues}
        options={options}
      />
    );
  }

  filterLocations(){
    let options = this.props.util.shared.getOptions(this.props.locations);
    let defaultValues = this.props.util.shared.getDefaultOptions(this.props.locations, this.props.filter.location);
    return(
      <Select
        key={"locations"}
        className="filterOption"
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isMulti
        placeholder="Locations"
        defaultValue={defaultValues}
        options={options}
      />
    );
  }

  displayFilter(){
    let filter = [];
    filter.push(this.filterState());
    filter.push(this.filterAccessible());
    filter.push(this.filterChecked());
    filter.push(this.filterLocations());
    return filter;
  }

  displaySave(){
    return(
      <p>{this.props.util.shared.saveFile(this.props.obtainables, this.props.checks, this.props.filter)}</p>
    );
  }

  getDisplay(){
    switch(this.props.display) {
              case 0:
                return this.displayChecks();
              case 1:
                return this.displayFilter();
              case 3:
                return this.displaySave();
              default:
                  return this.displayChecks();
    }
  }

	render() {
    return(
      <div className="container-fluid">       
      	{this.getDisplay()}
      </div>
    );
  }
}