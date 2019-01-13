import React, { Component } from 'react';
import {cloneDeep, assignIn} from 'lodash';

import "../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {MapComponent} from './Components/MapComponent.js';
import {MapNavComponent} from './Components/MapNavComponent.js';
import {OptionsComponent} from './Components/OptionsComponent.js';
import {ActiveViewComponent} from './Components/ActiveViewComponent.js';
import {ChecklistComponent} from './Components/Views/ChecklistComponent.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.util =  {};
    this.util.checks = require('./util/checks.js');
    this.util.locations = require('./util/locations.js');
    this.util.obtainables = require('./util/obtainables.js');
    this.util.maps = require('./util/maps.js');
    this.util.shared = require('./util/shared.js');

    let data = {};
    data.access = require("./data/Access.json");
    data.locations= require("./data/Locations.json");
    data.checks = require("./data/Checks.json");
    data.checkTypes = require("./data/CheckTypes.json");
    data.obtainables = require("./data/Obtainables.json");
    data.tracker = require("./data/Tracker.json");
    data.obtainableTypes = require("./data/ObtainableTypes.json");   
    data.progressives = require("./data/Progressives.json");
    data.states = require("./data/States.json");
    data.filter = require("./data/Filter.json");
    data.maps = this.util.maps.generateMaps(require("./data/Maps.json"));
    data.activeMap = 0;
    data.activeLocation = 0;
    data.activeView = 0;
    data.filterOptions = this.util.shared.getAllFilterOptions(data);
    data.views = {"tracker": 0, "checks": 1, "notes": 2, "save": 3, "load" : 4};
    data.centeredViews = [data.views.tracker, data.views.save, data.views.load];

    this.objectMaps = {};
    this.objectMaps.locations = this.util.shared.mapCodeToID(data.locations);
    this.objectMaps.checks = this.util.shared.mapCodeToID(data.checks);
    this.objectMaps.checkTypes = this.util.shared.mapCodeToID(data.checkTypes);
    this.objectMaps.obtainables= this.util.shared.mapCodeToID(data.obtainables);
    this.objectMaps.obtainableTypes = this.util.shared.mapCodeToID(data.obtainableTypes);
    this.objectMaps.progressives = this.util.shared.mapCodeToID(data.progressives);
    this.objectMaps.states = this.util.shared.mapCodeToID(data.states);
    this.objectMaps.maps = this.util.shared.mapCodeToID(data.maps);


    this.util.locations.linkAccess(data.locations, data.access);
    
    this.util.maps.linkMarkers(data.maps, require("./data/Markers.json"), this.objectMaps);
    this.util.maps.linkMarkers(data.maps, require("./data/Links.json"), this.objectMaps);
    this.util.maps.linkMarkers(data.maps, require("./data/ActiveLocations.json"), this.objectMaps);

    let filteredChecks = this.util.checks.applyFilter(data, this.objectMaps);
    let filteredMaps = this.util.maps.filterMaps(filteredChecks, data, this.objectMaps);

    data["notes"] = "";

    this.mapDisplay = {};
    this.mapDisplay.container = null;
    this.mapDisplay.activeMarkers = {};
    this.mapDisplay.clickFunctions = {"check": (id) => this.handleClickChecklist(id),
                                      "link": (id, filter) => this.handleClickMap(id, filter),
                                      "location": (id) => this.handleChangeActiveLocation(id),
                                      }
    this.state = {
                  data: data,
                  filteredChecks: filteredChecks,
                  filteredMaps: filteredMaps,             
                };
  }

  loadFile(loadData){
    if(loadData === undefined || loadData === null || loadData === ""){
      return;
    }
    const data = cloneDeep(this.state.data);
    loadData = JSON.parse(loadData);

    //only extracting clicked/obtained/index
    loadData.obtainables = this.util.shared.copyKeys(["obtained", "secondary"], data.obtainables, loadData.obtainables);
    loadData.checks = this.util.shared.copyKeys(["checked"], data.checks, loadData.checks);
    loadData.progressives = this.util.shared.copyKeys(["index"], data.progressives, loadData.progressives);
    loadData.locations = cloneDeep(this.state.data.locations);
    loadData = assignIn(data, loadData);

    let filteredChecks = this.util.checks.applyFilter(loadData, this.objectMaps);
    let filteredMaps = this.util.maps.filterMaps(filteredChecks, loadData, this.objectMaps);
    this.handleClickMap(this.state.data.activeMap, loadData.filter);
    this.runFilter(loadData);
    this.setState({ data: loadData,
                  filteredChecks: filteredChecks,
                  filteredMaps: filteredMaps
                });
  }

  handleClickObtainable(id, ctrl){
    let update = {};
    update.obtainables = cloneDeep(this.state.data.obtainables);
    if(!ctrl){
      
      update.obtainables[id].obtained = -update.obtainables[id].obtained;

    }
    else{
      update.obtainables[id].secondary = -update.obtainables[id].secondary;

    }
    update = assignIn(this.state.data, update);
    this.setState({data: update});
    this.runFilter(update);
  }

  handleClickProgressive(id, ctrl){
    let update = {};
    update.progressives = cloneDeep(this.state.data.progressives);
    update.obtainables = cloneDeep(this.state.data.obtainables);
    let progressive = update.progressives[id];
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

      update.obtainables = this.util.obtainables.progressiveObtain(progressive, update.obtainables, this.objectMaps);
    }
    update = assignIn(this.state.data, update);
    this.runFilter(update);
    this.setState({data: update});    
  }


  handleClickOptions(id, data){

    //change display
    let update = {};
    update.activeView = id;
    update = assignIn(this.state.data, update);
    this.setState({data: update});
    //run the filter?
  }

  handleChangeNotes(data){
    let update = {};
    update.notes = data;
    update = assignIn(this.state.data, update)
    this.setState({data: update});
  }

  handleChangeActiveLocation(id){
    let update = {};
    update.activeLocation = id;
    update = assignIn(this.state.data, update)
    this.setState({data: update});
  }

  handleFilterSelectChange(key, data){
    let update = {};
    update.filter = cloneDeep(this.state.data.filter);
    update.filter[key] = this.util.shared.optionsToFilter(data);
    
    if(key === "checkType"){
      this.handleClickMap(this.state.data.activeMap, update.filter);
    }
    update = assignIn(this.state.data, update);
    this.runFilter(update);
    this.setState({data: update});
  }

  handleFilterToggleChange(key, data){
    let update = {};
    update.filter = cloneDeep(this.state.data.filter);
    update.filter[key] = data;
    update = assignIn(this.state.data, update);
    this.setState({data: update});
    this.runFilter(update);

  }

  handleClickChecklist(id){

    let update = {};
    update.checks = cloneDeep(this.state.data.checks);
    update.checks[id].checked = -update.checks[id].checked;
    update = assignIn(this.state.data, update);
    this.setState({ data: update });

    this.runFilter(update);

    
    
  }

  handleClickMap(id, filter){
    let update = {};
    update.filter = filter || cloneDeep(this.state.data.filter);
    update.activeMap = id;
    //update.activeLocation = id > 0 ? this.state.data.maps[id].location : this.state.data.activeLocation;
    update.activeLocation = this.state.data.maps[id].location;
    update = assignIn(this.state.data, update);
    this.setState({data: update});
    this.util.maps.setMapImage(this.mapDisplay, update);
    this.util.maps.createMarkers(this.mapDisplay, update, this.objectMaps);
  }

  runFilter(data){

    let filteredChecks = this.util.checks.applyFilter(data, this.objectMaps);
    let filteredMaps = this.util.maps.filterMaps(filteredChecks, data, this.objectMaps);

    let markerKeys = Object.keys(this.mapDisplay.activeMarkers)
    for(let i = 0; i < markerKeys.length; i++){
      let key = markerKeys[i];
      this.util.maps.colorMarker(key, this.mapDisplay, data, this.objectMaps);
    }
    this.setState({filteredChecks: filteredChecks,
                    filteredMaps: filteredMaps});

  }


  initializeMap(){
    let container = L.map('map-container', {attributionControl: false, zoomControl:false})
    container.setView([0, 0], 8);
    container.setMinZoom(8);
    container.setMaxZoom(10);
    this.mapDisplay.container = container;
  }


  componentDidMount(){

    require('./util/scrollbar.js');
 
    this.initializeMap();
    this.util.maps.setMapImage(this.mapDisplay, this.state.data);
    this.util.maps.createMarkers(this.mapDisplay, this.state.data, this.objectMaps);
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
                  views={this.state.data.views}
                />
              </div>
            </div>
            <div className="row" id="ViewRow">
              <div className={"col" + (this.state.data.centeredViews.includes(this.state.data.activeView) ? " align-self-center" : "")}>
                <ActiveViewComponent
                  filteredChecks={this.state.filteredChecks}
                  util={this.util}
                  obtainablesOnClick={(id, ctrl) => this.handleClickObtainable(id, ctrl)}
                  progressivesOnClick={(id, ctrl) => this.handleClickProgressive(id, ctrl)}
                  loadOnClick={(data) => this.loadFile(data)}
                  checklistOnClick={(id, data) => this.handleClickChecklist(id, data)}
                  filterSelectOnChange={(key, data) => this.handleFilterSelectChange(key, data)}
                  filterToggleOnChange={(key, data) => this.handleFilterToggleChange(key, data)}
                  changeNotes={(data) => this.handleChangeNotes(data)}
                  objectMaps={this.objectMaps}
                  data={this.state.data}
                />
              </div>
            </div>

          </div>
          <div className="grid-half col-8">
              <div className="row" id="MapRow">
                <div className="col-7">
                  <MapComponent 
                  />
                </div>
                <div className="col-5" id="Checklist">
                  <ChecklistComponent 
                    checklistOnClick={(id) => this.handleClickChecklist(id)}
                    util={this.util}
                    data={this.state.data}
                    objectMaps={this.objectMaps}
                  />
                </div>
              </div>

            <div className="row" id="MapNavRow">
 
                <MapNavComponent
                  onClick={(id) => this.handleClickMap(id)} 
                  maps={this.state.filteredMaps}
                />

            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
