import React, { Component } from 'react';

export class ChecklistNavComponent extends Component{

  createFilterOption(){
    let id = this.props.display === 0 ? 1 : 0;
    let text = id === 0 ? "Checks" : "Filter";

    return(
      <button type="button" className="btn btn-primary filter" onClick={() => this.props.onClick(id)}>{text}</button>
    );
  }

	render() {
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col">{this.createFilterOption()}</div>
          <div className="col"><button type="button" className="btn btn-danger undo" onClick={() => this.props.onClick(2)}>Undo</button></div>
          <div className="col"><button type="button" className="btn btn-success" onClick={() => this.props.onClick(3)}>Save</button></div>
          <div className="col"><button type="button" className="btn btn-secondary" onClick={() => this.props.onClick(4)}>Load</button></div>
        </div>
      </div>
    );
  }
}