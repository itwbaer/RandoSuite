import React, { Component } from 'react';
import {cloneDeep} from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {MapComponent} from './Components/MapComponent.js';
import {MapNavComponent} from './Components/MapNavComponent.js';
import {ChecklistNavComponent} from './Components/ChecklistNavComponent.js';
import {ChecklistComponent} from './Components/ChecklistComponent.js';
import {ObtainableTrackerComponent} from './Components/ObtainableTrackerComponent.js';

import full from './maps/full-map.jpg';
import ganon from './maps/inside-ganons-castle.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    const util =  {};

    util.checks = require('./util/checks.js');
    util.locations = require('./util/locations.js');
    util.obtainables = require('./util/obtainables.js');
    util.shared = require('./util/shared.js');

    let access = require("./data/Access.json");
    let locations = require("./data/Locations.json");
    let locationsMap = this.mapCodeToID(locations);

    util.locations.linkAccess(locations, access);



    let checks = require("./data/Checks.json");
    let checksMap = this.mapCodeToID(checks);

    let checkTypes = require("./data/CheckTypes.json");
    let checkTypesMap = this.mapCodeToID(checkTypes);

    let obtainables = require("./data/Obtainables.json");
    let obtainablesMap = this.mapCodeToID(obtainables);

    console.log(util.obtainables.canUse(obtainables[41] ,obtainables));

    let obtainableTypes = require("./data/ObtainableTypes.json");
    let obtainableTypesMap = this.mapCodeToID(obtainableTypes);    

    let progressives = require("./data/Progressives.json");
    let progressivesMap = this.mapCodeToID(progressives);

    let states = require("./data/States.json");
    let statesMap = this.mapCodeToID(states);

    let filter = require("./data/Filter.json");

    this.state = {util: util,

                  checks: checks,
                  checksMap: checksMap,
                  checkTypes: checkTypes,
                  checkTypes: checkTypesMap,
                  locations: locations,
                  locationsMap: locationsMap,
                  obtainables: obtainables,
                  obtainablesMap: obtainablesMap,
                  progressives: progressives,
                  progressivesMap: progressivesMap,
                  states: states,
                  statesMap: statesMap,

                  filter: filter

                  };
 
  }


  mapCodeToID(obj){
    let codeMap = {} 
    for(let i = 0; i < obj.length; i++){
      let current = obj[i];
      codeMap[current.code] = current.id;
    }

    return codeMap;
  }

  handleClickObtainable(id, ctrl){
    if(!ctrl){
      const obtainables = cloneDeep(this.state.obtainables);

      obtainables[id].obtained = -obtainables[id].obtained;

      this.state.util.checks.isAccessible();

      this.setState(obtainables);
    }
    else{

    }
  }


  render() {
    return (
      <div className="App container-fluid">
        <div className="row" id="PrimaryRow">
          <div className="grid-half col-4">
            <div className="row" id="ChecklistNavRow">

                <ChecklistNavComponent />

            </div>
            <div className="row" id="ChecklistRow">
 
                <ChecklistComponent 
                  checks={this.state.checks}
                  locations={this.state.locations}
                  locationsMap={this.state.locationsMap}
                  states={this.state.states}
                />

            </div>
            <div className="row" id="TrackerRow">

                <ObtainableTrackerComponent 
                  onClick={(id, ctlr) => this.handleClickObtainable(id, ctlr)}
                  obtainables={this.state.obtainables}
                  obtainablesMap={this.state.obtainablesMap}
                  progressives={this.state.progressives}
                  progressivesMap={this.state.progressivesMap}
                  
                />

            </div>
          </div>
          <div className="grid-half col-8">
            <div className="row" id="MapNavRow">
 
                <MapNavComponent />

            </div>
            <div className="row" id="MapRow">

                <MapComponent 
                  map={full}
                />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
