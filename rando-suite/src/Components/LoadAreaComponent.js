import React, { Component } from 'react';

export class LoadAreaComponent extends Component{

	constructor(props) {
    super(props);

    this.state = {loadFile: ""};
 
  }

  handleClick = (event) => {

		this.props.onClick(this.state.loadFile);

  }

  handleChange = (event) => {
  	
		this.setState({"loadFile" : event.target.value});

  }

	render() {
		return(
			<div>
				<button type="button" className="btn btn-warning" onClick={this.handleClick}>Load</button>
	   		<textarea className="form-control" key="load-box" rows="5" onChange={this.handleChange} defaultValue={this.state.loadFile}></textarea>
	   	</div>
	   );
  }
}