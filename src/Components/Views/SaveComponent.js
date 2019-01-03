import React, { Component } from 'react';

export class SaveComponent extends Component{

	render() {
		return(
			<div className="container-fluid" id="">
      			<h5>Copy and save the following data to your local computer</h5>
      			<textarea className="form-control" key="save-box" rows="15" readOnly value={this.props.util.shared.saveFile(this.props.obtainables, this.props.checks, this.props.filter, this.props.progressives)}></textarea>
    		</div>
    );
  }
}