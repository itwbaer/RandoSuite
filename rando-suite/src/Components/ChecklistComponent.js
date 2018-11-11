import React, { Component } from 'react';
import {CheckDisplayComponent} from './CheckDisplayComponent';
import {FilterSelectComponent} from './FilterSelectComponent';
import {LoadAreaComponent} from './LoadAreaComponent';

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
      let area = "checks";
      checks.push(
        <CheckDisplayComponent
          key={"check-" + currentCheck.id} 
          name={checkName}
          location={checkLocation}
          state={checkState}
          checked={currentCheck.checked}
          onClick={() => this.props.onClick(area, currentCheck.id)}
        />
      );
    }

    return checks;


  }

  filterState(){
    let options = this.props.util.shared.getOptions(this.props.states);
    let defaultValues = this.props.util.shared.getDefaultOptions(this.props.states, this.props.filter.state);
    let key = "state";
    let placeholder = "State"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        defaultValue={defaultValues}
        options={options}
        onChange={(data) => this.props.onChange(key, data)}
      />
    );
  }

  filterAccessible(){
    let options = [
      { value: true, label: 'Accessible' },
      { value: false, label: 'Not Accessible' },
    ];
    let defaultValues = this.props.util.shared.getDefaultOptionsStatic(options, this.props.filter.accessible);
    let key = "accessible";
    let placeholder = "Accessible?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        defaultValue={defaultValues}
        options={options}
        onChange={(data) => this.props.onChange(key, data)}
      />
    );
  }

  filterChecked(){
    let options = [
      { value: -1, label: 'Unchecked' },
      { value: 1, label: 'Checked' },
    ];
    let defaultValues = this.props.util.shared.getDefaultOptionsStatic(options, this.props.filter.checked);
    let key = "checked";
    let placeholder = "Checked?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        defaultValue={defaultValues}
        options={options}
        onChange={(data) => this.props.onChange(key, data)}
      />
    );
  }


  filterLocations(){
    let options = this.props.util.shared.getOptions(this.props.locations);
    let defaultValues = this.props.util.shared.getDefaultOptions(this.props.locations, this.props.filter.location);
    let key = "location";
    let placeholder = "Locations"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        defaultValue={defaultValues}
        options={options}
        onChange={(data) => this.props.onChange(key, data)}
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
      <textarea class="form-control" key="save-box" rows="5">{this.props.util.shared.saveFile(this.props.obtainables, this.props.checks, this.props.filter, this.props.progressives)}</textarea>
    );
  }

  displayLoad(){
    let area = "load";
    return(
      <LoadAreaComponent
        onClick={(data) => this.props.onClick(area, 0, data)}
      />
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
              case 4:
                return this.displayLoad();
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