import React, { Component } from 'react';
import {FilterSelectComponent} from './FilterSelectComponent';
import {FilterToggleComponent} from './FilterToggleComponent';

export class FilterComponent extends Component{

  filterMapSort(){
    let key = "mapsByCount";
    let placeholder = "Sort Maps By Count?"
    return(
      <FilterToggleComponent
        key={key}
        placeholder={placeholder}
        checked={this.props.filter[key]}
        onChange={(data) => this.props.filterToggleOnChange(key, data)}
      />
    );
  }

  filterWorldDone(){
    let key = "worldDone";
    let placeholder = "Hide World Done?"
    return(
      <FilterToggleComponent
        key={key}
        placeholder={placeholder}
        checked={this.props.filter[key]}
        onChange={(data) => this.props.filterToggleOnChange(key, data)}
      />
    );
  }

  filterWorldNone(){
    let key = "worldNone";
    let placeholder = "Hide World None?"
    return(
      <FilterToggleComponent
        key={key}
        placeholder={placeholder}
        checked={this.props.filter[key]}
        onChange={(data) => this.props.filterToggleOnChange(key, data)}
      />
    );
  }

	filterState(){
    let key = "state";
    let options = this.props.data.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "State"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterSelectOnChange(key, data)}
        isSearchable={false}
      />
    );
  }

  filterAccessible(){
    let key = "accessible";
    let options = this.props.data.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Accessible?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterSelectOnChange(key, data)}
        isSearchable={false}
      />
    );
  }

  filterType(){
    let key = "checkType";
    let options = this.props.data.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Type?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterSelectOnChange(key, data)}
        isSearchable={false}
      />
    );
  }

  filterChecked(){
    let key = "checked";
    let options = this.props.data.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Checked?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterSelectOnChange(key, data)}
        isSearchable={false}
      />
    );
  }


  filterLocations(){
    let key = "location";
    let options = this.props.data.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Locations"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterSelectOnChange(key, data)}
        isSearchable={true}
        selectButtons={true}
      />
    );
  }

  displayFilter(){
    let filter = [];
    filter.push(this.filterState());
    filter.push(this.filterAccessible());
    filter.push(this.filterType());
    filter.push(this.filterChecked());
    filter.push(this.filterWorldNone());
    filter.push(this.filterWorldDone());
    filter.push(this.filterMapSort());
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