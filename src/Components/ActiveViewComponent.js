import React, { Component } from 'react';
import {TrackerComponent} from './Views/TrackerComponent';
import {NotesComponent} from './Views/NotesComponent';
import {FilterComponent} from './Views/FilterComponent';
import {LoadComponent} from './Views/LoadComponent';
import {SaveComponent} from './Views/SaveComponent';

import {PopupWindow} from './PopupWindow';

export class ActiveViewComponent extends Component{

  displayNotes(){
    return(
      <NotesComponent
          changeNotes={(data) => this.props.changeNotes(data)}
          notes={this.props.notes}
        />
    );
  }

  displayTracker(){
    return(
        <TrackerComponent
          tracker={this.props.tracker}
          obtainablesOnClick={(id, ctrl) => this.props.obtainablesOnClick(id, ctrl)}
          obtainables={this.props.obtainables}
          obtainablesMap={this.props.obtainablesMap}
          progressives={this.props.progressives}
          progressivesMap={this.props.progressivesMap}
          progressivesOnClick={(id, ctrl) => this.props.progressivesOnClick(id, ctrl)}
        />
    );
  }

  displayFilter(){
    return(
      <FilterComponent 
          filterSelectOnChange={(key, data) => this.props.filterSelectOnChange(key, data)}
          filterToggleOnChange={(key, data) => this.props.filterToggleOnChange(key, data)}
          filter={this.props.filter}
          filterOptions={this.props.filterOptions}
          states={this.props.states}
          locations={this.props.locations}
          checkTypes={this.props.checkTypes}
          util={this.props.util}
      />
    );
  }

  displaySave(){
    return(
      <SaveComponent
        util={this.props.util}
        obtainables={this.props.obtainables}
        checks={this.props.checks}
        filter={this.props.filter}
        progressives={this.props.progressives}
        notes={this.props.notes}
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

  getDisplay(){
    switch(this.props.activeView) {
              case this.props.views.notes:
                return this.displayNotes();
              case this.props.views.filter:
                return this.displayFilter();
              case this.props.views.tracker:
                return this.displayTracker();
              case this.props.views.save:
                return this.displaySave();
              case this.props.views.load:
                return this.displayLoad();
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