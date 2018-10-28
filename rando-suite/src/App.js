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
    this.state = {obtainables: obtainables 

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

  handleClickObtainable(id, click){
    const obtainables = cloneDeep(this.state.obtainables);
    console.log(obtainables);
    if(click === 0){
      obtainables[id].obtained = -(obtainables[id].obtained);
    }
    else if(click === 2){
      
    }
    console.log(obtainables);
    this.setState(obtainables);
    console.log(this.state);
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
                  onClick={(id, click) => this.handleClickObtainable(id, click)}
                  obtainables={this.state.obtainables}
                />

            </div>
          </div>
          <div className="grid-half col-8">
            <div className="row" id="MapNavRow">
 
                <MapNavComponent />

            </div>
            <div className="row" id="MapRow">

                <MapComponent 
                  map={ganon}
                />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
