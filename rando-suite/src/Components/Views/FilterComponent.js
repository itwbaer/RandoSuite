import React, { Component } from 'react';
import {FilterSelectComponent} from './FilterSelectComponent';

export class FilterComponent extends Component{

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
        onChange={(data) => this.props.filterOnChange(key, data)}
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
        onChange={(data) => this.props.filterOnChange(key, data)}
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
        onChange={(data) => this.props.filterOnChange(key, data)}
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
        onChange={(data) => this.props.filterOnChange(key, data)}
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

	render() {
		return(
      <div className="container-fluid" id="">       
      	{this.displayFilter()}
      </div>
    );
  }
}