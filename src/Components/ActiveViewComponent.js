import React, { Component } from 'react';
import {TrackerComponent} from './Views/TrackerComponent';
import {NotesComponent} from './Views/NotesComponent';
import {FilterComponent} from './Views/FilterComponent';
import {LoadComponent} from './Views/LoadComponent';
import {SaveComponent} from './Views/SaveComponent';
import {ChecklistComponent} from './Views/ChecklistComponent';
import {AboutComponent} from './Views/AboutComponent';
import {SettingsComponent} from './Views/SettingsComponent';

import {PopupWindow} from './PopupWindow';

export class ActiveViewComponent extends Component{

  displayNotes(){
    return(
      <NotesComponent
          changeNotes={(data) => this.props.changeNotes(data)}
          notes={this.props.data.notes}
        />
    );
  }

  displayTracker(){
    return(
        <TrackerComponent
          tracker={this.props.data.tracker}
          obtainablesOnClick={(id, ctrl) => this.props.obtainablesOnClick(id, ctrl)}
          obtainables={this.props.data.obtainables}
          progressives={this.props.data.progressives}
          progressivesOnClick={(id, ctrl) => this.props.progressivesOnClick(id, ctrl)}
          cycles={this.props.data.cycles}
          cyclesOnClick={(id, ctrl, alt) => this.props.cyclesOnClick(id, ctrl, alt)}
          data={this.props.data}
          objectMaps={this.props.objectMaps}
        />
    );
  }

  displayFilter(){
    return(
      <FilterComponent 
          filterSelectOnChange={(key, data) => this.props.filterSelectOnChange(key, data)}
          filterToggleOnChange={(key, data) => this.props.filterToggleOnChange(key, data)}
          filter={this.props.data.filter}
          states={this.props.data.states}
          locations={this.props.data.locations}
          checkTypes={this.props.data.checkTypes}
          util={this.props.util}
          data={this.props.data}
      />
    );
  }

  displaySave(){
    return(
      <SaveComponent
        util={this.props.util}
        obtainables={this.props.data.obtainables}
        checks={this.props.data.checks}
        filter={this.props.data.filter}
        progressives={this.props.data.progressives}
        data={this.props.data}
      />
    );
  }

  displayLoad(){
    return(
      <LoadComponent
        loadOnClick={(data) => this.props.loadOnClick(data)}
      />
    );
   
  }

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
    switch(this.props.activeView) {
              case this.props.views.Notes:
                return this.displayNotes();
              case this.props.views.Filter:
                return this.displayFilter();
              case this.props.views.Tracker:
                return this.displayTracker();
              case this.props.views.Save:
                return this.displaySave();
              case this.props.views.Load:
                return this.displayLoad();
              case this.props.views.Checklist:
                return this.displayChecklist();
              case this.props.views.Settings:
                return this.displaySettings();
              case this.props.views.About:
                return this.displayAbout();
              default:
                return this.displayTracker();
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