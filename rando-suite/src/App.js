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
    data = JSON.parse(data);
    //only extracting clicked/obtained/index
    const obtainables = cloneDeep(this.state.obtainables);
    const checks = cloneDeep(this.state.checks);
    const progressives = cloneDeep(this.state.progressives);
    let loadObtainables = this.state.util.shared.copyKeys(["obtained", "secondary"], obtainables, data.obtainables);
    let loadChecks = this.state.util.shared.copyKeys(["checked"], checks, data.checks);
    let loadProgressives = this.state.util.shared.copyKeys(["index"], progressives, data.progressives);

    let filter = data.filter;
    let filteredChecks = this.state.util.checks.applyFilter(filter, loadChecks, this.state.locations, loadObtainables, this.state.locationsMap, this.state.obtainablesMap, this.state.checksMap);
    let filteredMaps = this.state.util.maps.filterMaps(filteredChecks, this.state.maps);

    this.setState({obtainables: loadObtainables,
                    checks: loadChecks,
                    filter: filter,
                    progressives: loadProgressives,
                    filteredChecks: filteredChecks,
                    filteredMaps: filteredMaps
                  });

    this.runFilter(filter, checks, this.state.locations, obtainables);
  }

  handleClickObtainable(id, ctrl){
    const obtainables = cloneDeep(this.state.obtainables);
    if(!ctrl){
      
      obtainables[id].obtained = -obtainables[id].obtained;

      this.setState({obtainables: obtainables});
    }
    else{
      obtainables[id].secondary = -obtainables[id].secondary;

      this.setState({obtainables: obtainables});
    }

    this.runFilter(this.state.filter, this.state.checks, this.state.locations, obtainables);
  }

  handleClickProgressive(id, ctrl){
    const progressives = cloneDeep(this.state.progressives);
    let progressive = progressives[id];
    let adj = 1 * ctrl;

    let nextI = progressive.index + adj;

    if(progressive.type === "text"){
      if(nextI <= progressive.options.length - 1 && nextI >= 0){
        progressive.index = nextI;
      }
      else if(nextI > progressive.options.length - 1){
        progressive.index = 0;
      }
      else if(nextI < 0){
        progressive.index = progressive.options.length - 1;
      }
    }

    //if obtainable handle logic
    if(progressive.type === "obtainable"){
      if(nextI <= progressive.options.length - 1 && nextI >= -1){
        progressive.index = nextI;
      }
      else if(nextI > progressive.options.length - 1){
        progressive.index = -1;
      }
      else if(nextI < -1){
        progressive.index = progressive.options.length - 1;
      }

      let obtainables = cloneDeep(this.state.obtainables);
      obtainables = this.state.util.obtainables.progressiveObtain(progressive, obtainables, this.state.obtainablesMap);
      this.runFilter(this.state.filter, this.state.checks, this.state.locations, obtainables);
      this.setState({obtainables: obtainables});
    }

    this.setState({progressives: progressives});    
  }


  handleClickChecklistNav(id, data){
    //bring back checks
    if(id === 0){
      this.runFilter(this.state.filter, this.state.checks, this.state.locations, this.state.obtainables);
    }

    //undo last check
    if(id === 2){
      this.undoLastCheck();
    }


    //change display
    if(id === 0 || id === 1 || id === 3 || id === 4){
      this.setState({checklistDisplay: id});
    }

  }

  undoLastCheck(){

    const checks = cloneDeep(this.state.checks);
    const checkHistory = cloneDeep(this.state.checkHistory);
    if(checkHistory.length > 0){
      let click = checkHistory.pop();
      checks[click.id].checked = -click.check;

      this.setState({checks: checks,
                      checkHistory: checkHistory
                    });
      this.runFilter(this.state.filter, checks, this.state.locations, this.state.obtainables);
    }
    
  }

  handleFilterChange(key, data){
    const filter = cloneDeep(this.state.filter);
    filter[key] = this.state.util.shared.optionsToFilter(data);
    this.setState({filter: filter});
    this.runFilter(filter, this.state.checks, this.state.locations, this.state.obtainables);
  }

  handleClickCheckList(area, id, data){

    switch(area){
      case "checks":
        const checks = cloneDeep(this.state.checks);
        const checkHistory = cloneDeep(this.state.checkHistory);
        checks[id].checked = -checks[id].checked;
        checkHistory.push({"id": id, "check": checks[id].checked});
        this.setState({checks: checks,
                        checkHistory: checkHistory
                      });

        this.runFilter(this.state.filter, checks, this.state.locations, this.state.obtainables);
        break;
      case "load":
        this.loadFile(data);
        break;
    }
    
  }

  handleClickMap(id){
    this.setState({activeMap: id});
  }

  runFilter(filter, checks, locations, obtainables){
    let filteredChecks = this.state.util.checks.applyFilter(filter, checks, locations, obtainables, this.state.locationsMap, this.state.obtainablesMap, this.state.checksMap);
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
                  onClick={(area, id, data) => this.handleClickCheckList(area, id, data)}
                  display={this.state.checklistDisplay}
                  util={this.state.util}
                  filter={this.state.filter}
                  progressives={this.state.progressives}
                  onChange={(key, data) => this.handleFilterChange(key, data)}
                />

            </div>
            <div className="row" id="TrackerRow">

                <ObtainableTrackerComponent 
                  onClick={(id, ctrl) => this.handleClickObtainable(id, ctrl)}
                  obtainables={this.state.obtainables}
                  obtainablesMap={this.state.obtainablesMap}
                  progressives={this.state.progressives}
                  progressivesMap={this.state.progressivesMap}
                  progressiveOnClick={(id, ctrl) => this.handleClickProgressive(id, ctrl)}
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
