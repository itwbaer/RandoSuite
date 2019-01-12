import React, { Component } from 'react';

export class NotesComponent extends Component{


  handleChange = (event) => {
		this.props.changeNotes(event.target.value);
  }

	render() {
		return(
			<div className="container-fluid" id="">
				<br />
	   			<textarea className="form-control" key="notes" rows="18" onChange={this.handleChange} value={this.props.notes}></textarea>
	   		</div>
	   );
  }
}