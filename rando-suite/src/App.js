import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
        <div className="row" id="PrimaryRow">
          <div className="grid-half col-4">
            <div className="row" id="ChecklistNavRow">

                Checklist Nav

            </div>
            <div className="row" id="ChecklistRow">
 
                Checklist

            </div>
            <div className="row" id="TrackerRow">

                Tracker

            </div>
          </div>
          <div className="grid-half col-8">
            <div className="row" id="MapNavRow">
 
                MapNav

            </div>
            <div className="row" id="MapRow">

                Map

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
