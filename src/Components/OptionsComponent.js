import React, { Component } from 'react';

export class OptionsComponent extends Component{



	render() {
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          <button type="button" className="btn btn-primary" onClick={() => this.props.onClick(this.props.views.tracker)}>Tracker</button>
          <span className="space"></span>
          <button type="button" className="btn btn-secondary" onClick={() => this.props.onClick(this.props.views.notes)}>Notes</button>
          <span className="space"></span>
          <button type="button" className="btn btn-info" onClick={() => this.props.onClick(this.props.views.filter)}>Filter</button>
          <span className="space"></span>
          <button type="button" className="btn btn-success" onClick={() => this.props.onClick(this.props.views.save)}>Save</button>
          <span className="space"></span>
          <button type="button" className="btn btn-warning" onClick={() => this.props.onClick(this.props.views.load)}>Load</button>
        </div>
        
      </div>
    );
  }
}