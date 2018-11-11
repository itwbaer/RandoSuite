import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

export class FilterSelectComponent extends Component{

  handleChange = (event) => {

      this.props.onChange(event);
      
  }

	render() {
    return(
        <Select
          className="filterOption"
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          placeholder={this.props.placeholder}
          defaultValue={this.props.defaultValue}
          options={this.props.options}
          onChange={this.handleChange}
        />
    );
  }
}
