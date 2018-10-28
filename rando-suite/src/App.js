import React, { Component } from 'react';
import logo from './logo.svg';
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

                <ObtainableTrackerComponent />

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
