import React, { Component } from 'react';
import "react-toggle/style.css"
import Toggle from 'react-toggle'

export class FilterToggleComponent extends Component{

  handleChange = (event) => {

    this.props.onChange(event.target.checked);
      
  }


	render() {
    return(
        <div className="container-fluid">
        <h5>{this.props.placeholder}</h5>
        <label>
        <Toggle
          defaultChecked={this.props.checked}
          onChange={this.handleChange} />
      </label>
<br/></div>
    );
  }
}
