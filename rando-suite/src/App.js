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
    let obtainables = require("./data/Obtainables.json");
    let obtainablesMap = this.mapCodeToID(obtainables);
    this.state = {obtainables: obtainables,
                  obtainablesMap: obtainablesMap
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

  handleClickObtainable(id){

    const obtainables = cloneDeep(this.state.obtainables);

    obtainables[id].obtained = -obtainables[id].obtained;


    this.setState(obtainables);

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
 
                <ChecklistComponent />

            </div>
            <div className="row" id="TrackerRow">

                <ObtainableTrackerComponent 
                  onClick={(id) => this.handleClickObtainable(id)}
                  obtainables={this.state.obtainables}
                  map={this.state.obtainablesMap}
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
