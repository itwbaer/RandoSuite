import React, { Component } from 'react';
import {FilterSelectComponent} from './FilterSelectComponent';

export class FilterComponent extends Component{

	filterState(){
    let key = "state";
    let options = this.props.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "State"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterOnChange(key, data)}
        isSearchable={false}
      />
    );
  }

  filterAccessible(){
    let key = "accessible";
    let options = this.props.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Accessible?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterOnChange(key, data)}
        isSearchable={false}
      />
    );
  }

  filterType(){
    let key = "checkType";
    let options = this.props.filterOptions[key];
    console.log(options);
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Type?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterOnChange(key, data)}
        isSearchable={false}
      />
    );
  }

  filterChecked(){
    let key = "checked";
    let options = this.props.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Checked?"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterOnChange(key, data)}
        isSearchable={false}
      />
    );
  }


  filterLocations(){
    let key = "location";
    let options = this.props.filterOptions[key];
    let selected = this.props.util.shared.getDefaultOptions(options, this.props.filter[key]);
    let placeholder = "Locations"
    return(
      <FilterSelectComponent
        key={key}
        placeholder={placeholder}
        selected={selected}
        options={options}
        onChange={(data) => this.props.filterOnChange(key, data)}
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