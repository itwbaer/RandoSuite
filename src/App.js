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

    const util =  {};
    util.checks = require('./util/checks.js');
    util.locations = require('./util/locations.js');
    util.obtainables = require('./util/obtainables.js');
    util.maps = require('./util/maps.js');
    util.shared = require('./util/shared.js');

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
    data.maps = require("./data/Maps.json");
    data.markers = require("./data/Markers.json");
    data.links = require("./data/Links.json");
    data.activeLocations = require("./data/ActiveLocations.json");
    data.activeMap = 0;
    data.activeLocation = 0;
    data.activeView = 0;
    data.filterOptions = util.shared.getAllFilterOptions(data);
    data.views = {"tracker": 0, "checks": 1, "notes": 2, "save": 3, "load" : 4};
    data.centeredViews = [data.views.tracker, data.views.save, data.views.load];

    let objectMaps = {};
    objectMaps.locations = util.shared.mapCodeToID(data.locations);
    objectMaps.checks = util.shared.mapCodeToID(data.checks);
    objectMaps.checkTypes = util.shared.mapCodeToID(data.checkTypes);
    objectMaps.obtainables= util.shared.mapCodeToID(data.obtainables);
    objectMaps.obtainableTypes = util.shared.mapCodeToID(data.obtainableTypes);
    objectMaps.progressives = util.shared.mapCodeToID(data.progressives);
    objectMaps.states = util.shared.mapCodeToID(data.states);
    objectMaps.maps = util.shared.mapCodeToID(data.maps);


    util.locations.linkAccess(data.locations, data.access);
    
    util.maps.linkMarkers(data.maps, data.markers, objectMaps);
    util.maps.linkMarkers(data.maps, data.links, objectMaps);
    util.maps.linkMarkers(data.maps, data.activeLocations, objectMaps);

    let mapImgs = util.maps.loadMapImgs(data.maps);


    let filteredChecks = util.checks.applyFilter(data, objectMaps);
    let filteredMaps = util.maps.filterMaps(filteredChecks, mapImgs, data, objectMaps);

    data["notes"] = "";
    this.map = null;
    this.mapImage = null;
    this.activeMarkers = {};

    this.state = {util: util,
                  data: data,

                  objectMaps: objectMaps,

                  mapImgs: mapImgs,

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
    loadData.obtainables = this.state.util.shared.copyKeys(["obtained", "secondary"], data.obtainables, loadData.obtainables);
    loadData.checks = this.state.util.shared.copyKeys(["checked"], data.checks, loadData.checks);
    loadData.progressives = this.state.util.shared.copyKeys(["index"], data.progressives, loadData.progressives);
    loadData.locations = cloneDeep(this.state.data.locations);
    loadData = assignIn(data, loadData);

    let filteredChecks = this.state.util.checks.applyFilter(loadData, this.state.objectMaps);
    let filteredMaps = this.state.util.maps.filterMaps(filteredChecks, this.state.mapImgs, loadData, this.state.objectMaps);
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

      update.obtainables = this.state.util.obtainables.progressiveObtain(progressive, update.obtainables, this.state.objectMaps);
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
    console.log(this.state.data);
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
    update.filter[key] = this.state.util.shared.optionsToFilter(data);
    
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

  handleClickChecklist(id, data){

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
    this.setMapImage(id, update.filter);
  }

  runFilter(data){

    let filteredChecks = this.state.util.checks.applyFilter(data, this.state.objectMaps);
    let filteredMaps = this.state.util.maps.filterMaps(filteredChecks, this.state.mapImgs, data, this.state.objectMaps);

    let markerKeys = Object.keys(this.activeMarkers)
    for(let i = 0; i < markerKeys.length; i++){
      let key = markerKeys[i];
      this.colorMarker(key, data);
    }
    this.setState({filteredChecks: filteredChecks,
                    filteredMaps: filteredMaps});

  }

  setMapImage(id, filter){
    filter = filter || this.state.data.filter;
    //first clear markers
    this.activeMarkers = {};
    this.map.eachLayer(function(layer){
        layer.remove();
    });

    let divisor = this.state.util.maps.divisor;
    let imageUrl = this.state.mapImgs[id].src;
    let imageBounds = [[0, 0], [0, 0]];
    let mapImage = L.imageOverlay(imageUrl, imageBounds);
    mapImage.addTo(this.map);
    this.mapImage = mapImage;
    let image = this.state.mapImgs[id];
    this.mapLat = image.height;
    this.mapLon = image.width;
    this.mapImage.setBounds([[0, 0], [(this.mapLat/divisor), (this.mapLon/divisor)]]);
    let center = [image.height/2/divisor, image.width/2/divisor];
    this.map.setView(center, 8);


    let padding = this.state.util.maps.padding/divisor;
    var corner1 = L.latLng(-padding, -padding),
    corner2 = L.latLng((image.height/divisor + padding), (image.width/divisor + padding)),
    bounds = L.latLngBounds(corner1, corner2)

    this.map.setMaxBounds(bounds);
    this.createMarkers(id, filter);
    //this.map.panTo(center);
  }

  createMarkers(id, filter){

    filter = filter || this.state.data.filter;

    let map = this.state.data.maps[id];
    let divisor = this.state.util.maps.divisor;
    this.activeMarkers = {};
    if(map["markers"] === undefined || map["markers"] === null){
      return;
    }

    for(let i = 0; i < map.markers.length; i++){
      let data = map.markers[i];

      switch(data.type){

        case "check":
          let check = this.state.data.checks[this.state.objectMaps.checks[data.key]];
          if(filter.checkType.includes(check.type)){

            let marker = L.circle([Math.abs(data.lat-this.mapLat)/divisor, data.lon/divisor], {
                color: "black",
                fillColor: "black",
                weight: 1.0,
                fillOpacity: 0,
                opacity: 0,
                radius: 5000,
                type: data.type
            });

            marker.bindPopup(check.name);
            marker.on('mouseover', function (e) {
                this.openPopup();
            });
            marker.on('mouseout', function (e) {
                this.closePopup();
            })
            marker.on('click', () => this.handleClickChecklist(check.id));

            marker.addTo(this.map);
            this.activeMarkers[data.key] = marker;
            this.colorMarker(data.key, this.state.data);
          }
          break;

        case "link":
          let centerLat = Math.abs(data.lat-this.mapLat)/divisor;
          let centerLon = data.lon/divisor;
          let height = 50/divisor;
          let width = 50/divisor;
          let bounds = [[centerLat + height, centerLon + width], [centerLat - height, centerLon - width]];
          let marker = L.rectangle(bounds, {
            color: "blue",
            weight: 1,
            fillOpacity: .75,
            opacity: 1
          });
          let linkedMap = this.state.data.maps[this.state.objectMaps.maps[data.key]];

          marker.bindPopup("To " + linkedMap.name);
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          })
          marker.on('click', () => this.handleClickMap(linkedMap.id, filter));

          marker.addTo(this.map);
          this.activeMarkers[data.key] = marker;
          break;

        case "location":
          if(true){
          let centerLat = Math.abs(data.lat-this.mapLat)/divisor;
          let centerLon = data.lon/divisor;
          let height = 10/divisor;
          let width = 10/divisor;
          let bounds = [[centerLat + height, centerLon + width], [centerLat - height, centerLon - width]];
          let marker = L.rectangle(bounds, {
            color: "blue",
            weight: 1,
            fillOpacity: .75,
            opacity: 1
          });
          let location = this.state.data.locations[this.state.objectMaps.locations[data.key]];

          marker.bindPopup(location.name);
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          })
          marker.on('click', () => this.handleChangeActiveLocation(location.id));

          marker.addTo(this.map);
          this.activeMarkers[data.key] = marker;
        }
          break;
      }
        
    }

  }

  colorMarker(key, data){

    if(this.activeMarkers === undefined || this.activeMarkers === null){
      return;
    }

    let marker = this.activeMarkers[key];
    //let data = this.state.data.markers;
    switch(marker.options.type){
      case "check":
        let color = "red";
        let check = data.checks[this.state.objectMaps.checks[key]];

        if(check.checked > 0){
          color = "green";
        }
        else{
          let canCheck = [];
          for(let i = 0; i < data.filter.state.length; i++){
            let state = data.filter.state[i]
            canCheck.push(
              this.state.util.checks.canCheck(
                state, check, data.locations, data.obtainables, data.checks, this.state.objectMaps
              )
            );
          }
          if(canCheck.includes(true)){color = "yellow";}
        }

        marker.setStyle({
          opacity: 1.0,
          fillOpacity: 0.5,
          color: color,
          fillColor: color
        })
        break;

        case "link":
          break;
        case "location":
          break;
    }
    

  }

  initializeMap(){
    let map = L.map('map-container', {attributionControl: false, zoomControl:false})
    map.setView([0, 0], 8);
    map.setMinZoom(8);
    map.setMaxZoom(10);
    this.map = map;
  }


  componentDidMount(){

    require('./util/scrollbar.js');
 
    this.initializeMap();
    this.setMapImage(this.state.data.activeMap, this.state.data.filter);
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
                  util={this.state.util}
                  obtainablesOnClick={(id, ctrl) => this.handleClickObtainable(id, ctrl)}
                  progressivesOnClick={(id, ctrl) => this.handleClickProgressive(id, ctrl)}
                  loadOnClick={(data) => this.loadFile(data)}
                  checklistOnClick={(id, data) => this.handleClickChecklist(id, data)}
                  filterSelectOnChange={(key, data) => this.handleFilterSelectChange(key, data)}
                  filterToggleOnChange={(key, data) => this.handleFilterToggleChange(key, data)}
                  changeNotes={(data) => this.handleChangeNotes(data)}
                  objectMaps={this.state.objectMaps}
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
                    checklistOnClick={(id, data) => this.handleClickChecklist(id, data)}
                    util={this.state.util}
                    data={this.state.data}
                    objectMaps={this.state.objectMaps}
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
