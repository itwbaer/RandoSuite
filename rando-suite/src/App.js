import React, { Component } from 'react';
import {cloneDeep} from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {MapComponent} from './Components/MapComponent.js';
import {MapNavComponent} from './Components/MapNavComponent.js';
import {OptionsComponent} from './Components/OptionsComponent.js';
import {ActiveViewComponent} from './Components/ActiveViewComponent.js';

class App extends Component {
  constructor(props) {
    super(props);

    const util =  {};

    util.checks = require('./util/checks.js');
    util.locations = require('./util/locations.js');
    util.obtainables = require('./util/obtainables.js');
    util.maps = require('./util/maps.js');
    util.shared = require('./util/shared.js');

    let tracker = require("./data/Tracker.json");

    let access = require("./data/Access.json");
    let locations = require("./data/Locations.json");
    let locationsMap = util.shared.mapCodeToID(locations);

    util.locations.linkAccess(locations, access);

    const views = {"tracker": 0, "checks": 1, "filter": 2, "save": 3, "load" : 4}
    const centeredViews = [views.tracker, views.save, views.load];
    let checks = require("./data/Checks.json");
    let checksMap = util.shared.mapCodeToID(checks);

    let checkTypes = require("./data/CheckTypes.json");
    let checkTypesMap = util.shared.mapCodeToID(checkTypes);

    let obtainables = require("./data/Obtainables.json");
    let obtainablesMap = util.shared.mapCodeToID(obtainables);
   
    let obtainableTypes = require("./data/ObtainableTypes.json");
    let obtainableTypesMap = util.shared.mapCodeToID(obtainableTypes);    

    let progressives = require("./data/Progressives.json");
    let progressivesMap = util.shared.mapCodeToID(progressives);

    let states = require("./data/States.json");
    let statesMap = util.shared.mapCodeToID(states);

    let filter = require("./data/Filter.json");

    let maps = require("./data/Maps.json");
    let filteredChecks = util.checks.applyFilter(filter, checks, locations, obtainables, locationsMap, obtainablesMap, checksMap);
    let filteredMaps = util.maps.filterMaps(filteredChecks, maps);

    let filterOptions = util.shared.getAllFilterOptions(locations, states);

    this.state = {util: util,

                  tracker: tracker,

                  views: views,
                  activeView: 0,
                  centeredViews: centeredViews,
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
                  filterOptions: filterOptions,

                  activeMap: 0,
                  maps: maps,
                  filteredMaps: filteredMaps,
                  checkHistory: [],

                  };
  }

  loadFile(data){
    if(data === undefined || data === null || data === ""){
      return;
    }

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


  handleClickOptions(id, data){

    //change display
    this.setState({activeView: id});

    //run the filter?
    /*if(id === this.state.views.checks){
      this.runFilter(this.state.filter, this.state.checks, this.state.locations, this.state.obtainables);
    }*/
  }

  // handleClickSelectAll(key){
  //   const filter = cloneDeep(this.state.filter);
  //   filter[key] = this.state.util.shared.optionsToFilter(this.state.filterOptions[key]);
  //   this.setState({filter: filter});
  //   this.runFilter(filter, this.state.checks, this.state.locations, this.state.obtainables);
  // }

  // handleClickSelectNone(key){
  //   const filter = cloneDeep(this.state.filter);
  //   filter[key] = [];
  //   this.setState({filter: filter});
  //   this.runFilter(filter, this.state.checks, this.state.locations, this.state.obtainables);
  // }

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

  handleClickCheckList(id, data){


      const checks = cloneDeep(this.state.checks);
      const checkHistory = cloneDeep(this.state.checkHistory);
      checks[id].checked = -checks[id].checked;
      checkHistory.push({"id": id, "check": checks[id].checked});
      this.setState({checks: checks,
                      checkHistory: checkHistory
                    });

      this.runFilter(this.state.filter, checks, this.state.locations, this.state.obtainables);

    
    
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
            <div className="row" id="OptionsRow">
              <div className="col align-self-center">
                <OptionsComponent
                  onClick={(id, data) => this.handleClickOptions(id, data)}
                  views={this.state.views}
                />
              </div>
            </div>
            <div className="row" id="ViewRow">
              <div className={"col" + (this.state.centeredViews.includes(this.state.activeView) ? " align-self-center" : "")}>
                <ActiveViewComponent
                  tracker={this.state.tracker}
                  views={this.state.views}
                  activeView={this.state.activeView}
                  states={this.state.states}
                  checks={this.state.checks}
                  locations={this.state.locations}
                  locationsMap={this.state.locationsMap}
                  filteredChecks={this.state.filteredChecks}
                  util={this.state.util}
                  filter={this.state.filter}
                  filterOptions={this.state.filterOptions}
                  obtainables={this.state.obtainables}
                  obtainablesMap={this.state.obtainablesMap}
                  progressives={this.state.progressives}
                  progressivesMap={this.state.progressivesMap}
                  obtainablesOnClick={(id, ctrl) => this.handleClickObtainable(id, ctrl)}
                  progressivesOnClick={(id, ctrl) => this.handleClickProgressive(id, ctrl)}
                  loadOnClick={(data) => this.loadFile(data)}
                  checklistOnClick={(id, data) => this.handleClickCheckList(id, data)}
                  filterOnChange={(key, data) => this.handleFilterChange(key, data)}
                />
              </div>
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
