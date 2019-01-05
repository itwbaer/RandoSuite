import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

export class FilterSelectComponent extends Component{

  handleChange = (event) => {
    this.props.onChange(event);
      
  }

  handleClickAll = (event) => {
    this.handleChange(this.props.options);
  }

  handleClickNone = (event) => {
    this.handleChange([]);
  }

  selectButtons(){
    if(this.props.selectButtons){
      return(
        <div><button type="button" className="btn btn-success" onClick={this.handleClickAll}>Select All</button><span className="space"></span>
        <button type="button" className="btn btn-danger" onClick={this.handleClickNone}>Deselect All</button></div>
      );
    }
  }

	render() {
    return(
        <div className="container-fluid">
        <h5>{this.props.placeholder}</h5>
        {this.selectButtons()}
        <Select
          className="filterOption"
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          placeholder={this.props.placeholder}
          value={this.props.selected}
          options={this.props.options}
          onChange={this.handleChange}
          isSearchable={this.props.isSearchable}         
        /><br/></div>
    );
  }
}
