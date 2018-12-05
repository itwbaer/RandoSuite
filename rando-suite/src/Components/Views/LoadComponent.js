import React, { Component } from 'react';

export class LoadComponent extends Component{

	constructor(props) {
    super(props);

    this.state = {loadFile: ""};
 
  }

  handleClick = (event) => {

		this.props.loadOnClick(this.state.loadFile);

  }

  handleChange = (event) => {
  	
		this.setState({"loadFile" : event.target.value});

  }

	render() {
		return(
			<div className="container-fluid" id="">
				<h5>Paste saved data below and click import to load</h5>	
	   			<textarea className="form-control" key="load-box" rows="15" onChange={this.handleChange} defaultValue={this.state.loadFile}></textarea>
	   			<br/>
	   			<button type="button" className="btn btn-light" onClick={this.handleClick}>Import</button>
	   		</div>
	   );
  }
}