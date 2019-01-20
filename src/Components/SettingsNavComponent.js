import React, { Component } from 'react';

export class SettingsNavComponent extends Component{



	render() {
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          <button type="button" className="btn btn-success" onClick={() => this.props.onClick(this.props.views.checklist)}>Checklist</button>
          <span className="space"></span>
          <button type="button" className="btn btn-secondary" onClick={() => this.props.onClick(this.props.views.settings)}>Settings</button>
          <span className="space"></span>
          <button type="button" className="btn btn-light" onClick={() => this.props.onClick(this.props.views.about)}>About</button>
        </div>
        
      </div>
    );
  }
}