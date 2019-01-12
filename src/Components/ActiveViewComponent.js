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

  getDisplay(){
    switch(this.props.data.activeView) {
              case this.props.data.views.notes:
                return this.displayNotes();
              case this.props.data.views.filter:
                return this.displayFilter();
              case this.props.data.views.tracker:
                return this.displayTracker();
              case this.props.data.views.save:
                return this.displaySave();
              case this.props.data.views.load:
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