import React, { Component } from 'react';
import {ChecklistComponent} from './Views/ChecklistComponent';
import {AboutComponent} from './Views/AboutComponent';
import {SettingsComponent} from './Views/SettingsComponent';


import {PopupWindow} from './PopupWindow';

export class RightViewComponent extends Component{

  displayAbout(){
    return(
      <AboutComponent 

        />
    );
  }

  displaySettings(){
    return(
        <SettingsComponent 

        />
    );
  }

  displayChecklist(){
    return(
      <ChecklistComponent 
        checklistOnClick={(id) => this.props.checklistOnClick(id)}
        util={this.props.util}
        data={this.props.data}
        objectMaps={this.props.objectMaps}
      />
    );
   
  }

  getDisplay(){
    switch(this.props.data.rightView) {
              case this.props.data.views.checklist:
                return this.displayChecklist();
              case this.props.data.views.settings:
                return this.displaySettings();
              case this.props.data.views.about:
                return this.displayAbout();

    }
  }

  render() {
    return(
      <div className="container-fluid">       
        {this.getDisplay()}
      </div>
    );
  }
}