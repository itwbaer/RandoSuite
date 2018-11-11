import React, { Component } from 'react';
import {cloneDeep} from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {MapComponent} from './Components/MapComponent.js';
import {MapNavComponent} from './Components/MapNavComponent.js';
import {ChecklistNavComponent} from './Components/ChecklistNavComponent.js';
import {ChecklistComponent} from './Components/ChecklistComponent.js';
import {ObtainableTrackerComponent} from './Components/ObtainableTrackerComponent.js';


class App extends Component {
  constructor(props) {
    super(props);

    const util =  {};

    util.checks = require('./util/checks.js');
    util.locations = require('./util/locations.js');
    util.obtainables = require('./util/obtainables.js');
    util.maps = require('./util/maps.js');
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

    //console.log(util.obtainables.canUse(0, obtainables[3] ,obtainables));
    //console.log(util.locations.canAccess(0, locations[13], locations, obtainables, locationsMap, obtainablesMap));
    //console.log(util.checks.canCheck(0, checks[1], locations, obtainables, checks, locationsMap, obtainablesMap, checksMap))
   

    let obtainableTypes = require("./data/ObtainableTypes.json");
    let obtainableTypesMap = this.mapCodeToID(obtainableTypes);    

    let progressives = require("./data/Progressives.json");
    let progressivesMap = this.mapCodeToID(progressives);

    let states = require("./data/States.json");
    let statesMap = this.mapCodeToID(states);

    let filter = require("./data/Filter.json");

    let maps = require("./data/Maps.json");
    let filteredChecks = util.checks.applyFilter(filter, checks, locations, obtainables, locationsMap, obtainablesMap, checksMap);
    let filteredMaps = util.maps.filterMaps(filteredChecks, maps);
    this.state = {util: util,

                  checks: checks,
                  checksMap: checksMap,
                  checkTypes: checkTypes,
                  checkTypesMap: checkTypesMap,
                  locations: locations,
                  locationsMap: locationsMap,
                  obtainables: obtainables,
                  obtainablesMap: obtainablesMap,
                  obtainableTypes: obtainableTypes,
                  obtainableTypesMap: obtainableTypesMap,
                  progressives: progressives,
                  progressivesMap: progressivesMap,
                  states: states,
                  statesMap: statesMap,

                  filter: filter,
                  filteredChecks: filteredChecks,

                  activeMap: 0,
                  maps: maps,
                  filteredMaps: filteredMaps,
                  checkHistory: [],
                  checklistDisplay: 0,
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

  loadFile(data){
    let obtainables = data.obtainables;
    let checks = data.checks;
    let filter = data.filter;

    let filteredChecks = this.state.util.checks.applyFilter(filter, checks, this.state.locations, obtainables, this.state.locationsMap, this.state.obtainablesMap, this.state.checksMap);
    let filteredMaps = this.state.util.maps.filterMaps(filteredChecks, this.state.maps);

    this.setState({obtainables: obtainables,
                    checks: checks,
                    filter: filter,
                    filteredChecks: filteredChecks,
                    filteredMaps: filteredMaps
                  });

  }

  handleClickObtainable(id, ctrl){
    const obtainables = cloneDeep(this.state.obtainables);
    if(!ctrl){
      
      obtainables[id].obtained = -obtainables[id].obtained;

      this.setState({obtainables: obtainables});
    }
    else{

    }

    this.runFilterNewObtainables(obtainables);
  }



  handleClickChecklistNav(id){
    //bring back checks
    if(id === 0){
      this.runFilter();
    }

    //undo last check
    if(id === 2){
      this.undoLastCheck();
    }

    //load
    if(id === 4){
      let data = require("./data/Load.json");
      this.loadFile(data);
    }

    //change display
    if(id === 0 || id === 1 || id === 3){
      this.setState({checklistDisplay: id});
    }

  }

  undoLastCheck(){

    const checks = cloneDeep(this.state.checks);
    const checkHistory = cloneDeep(this.state.checkHistory);
    if(checkHistory.length > 0){
      let click = checkHistory.pop();
      checks[click.id].checked = -click.check;

      console.log(click);
      console.log(checks);
      this.setState({checks: checks,
                      checkHistory: checkHistory
                    });
    }
    
  }

  handleClickCheck(id){
    const checks = cloneDeep(this.state.checks);
    const checkHistory = cloneDeep(this.state.checkHistory);
    checks[id].checked = -checks[id].checked;
    checkHistory.push({"id": id, "check": checks[id].checked});
    console.log(checks);
    console.log(checkHistory)
    this.setState({checks: checks,
                    checkHistory: checkHistory
                  });
    
  }

  handleClickMap(id){
    this.setState({activeMap: id});
  }

  runFilter(){
    let filteredChecks = this.state.util.checks.applyFilter(this.state.filter, 
      this.state.checks, this.state.locations, this.state.obtainables, this.state.locationsMap, this.state.obtainablesMap, this.state.checksMap);
    let filteredMaps = this.state.util.maps.filterMaps(filteredChecks, this.state.maps);
    this.setState({filteredChecks: filteredChecks,
                    filteredMaps: filteredMaps});
  }

  runFilterNewObtainables(obtainables){
    let filteredChecks = this.state.util.checks.applyFilter(this.state.filter, 
      this.state.checks, this.state.locations, obtainables, this.state.locationsMap, this.state.obtainablesMap, this.state.checksMap);
    let filteredMaps = this.state.util.maps.filterMaps(filteredChecks, this.state.maps);
    this.setState({filteredChecks: filteredChecks,
                    filteredMaps: filteredMaps});
  }


  render() {
    return (
      <div className="App container-fluid">
        <div className="row" id="PrimaryRow">
          <div className="grid-half col-4">
            <div className="row" id="ChecklistNavRow">
 
                <ChecklistNavComponent 
                  onClick={(id) => this.handleClickChecklistNav(id)}
                  display={this.state.checklistDisplay}

                />

            </div>
            <div className="row" id="ChecklistRow">
 
                <ChecklistComponent 
                  checks={this.state.checks}
                  obtainables={this.state.obtainables}
                  locations={this.state.locations}
                  locationsMap={this.state.locationsMap}
                  states={this.state.states}
                  filteredChecks={this.state.filteredChecks}
                  onClick={(id) => this.handleClickCheck(id)}
                  display={this.state.checklistDisplay}
                  util={this.state.util}
                  filter={this.state.filter}
                />

            </div>
            <div className="row" id="TrackerRow">

                <ObtainableTrackerComponent 
                  onClick={(id, ctrl) => this.handleClickObtainable(id, ctrl)}
                  obtainables={this.state.obtainables}
                  obtainablesMap={this.state.obtainablesMap}
                  progressives={this.state.progressives}
                  progressivesMap={this.state.progressivesMap}
                  
                />

            </div>
          </div>
          <div className="grid-half col-8">
            <div className="row" id="MapNavRow">
 
                <MapNavComponent
                  onClick={(id) => this.handleClickMap(id)} 
                  maps={this.state.filteredMaps}
                  util={this.state.util}
                />

            </div>
            <div className="row" id="MapRow">

                <MapComponent 
                  map={this.state.maps[this.state.activeMap]}
                  util={this.state.util}
                />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
