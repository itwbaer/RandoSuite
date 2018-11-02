import React, { Component } from 'react';

export class ChecklistNavComponent extends Component{
	render() {
    return(
      <div className="container-fluid">
        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
	        <option selected>Choose...</option>
	        <option value="1">One</option>
	        <option value="2">Two</option>
	        <option value="3">Three</option>
      	</select>
      </div>
    );
  }
}