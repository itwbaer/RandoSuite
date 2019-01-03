import React, { Component } from 'react';
import {TrackerItemComponent} from './TrackerItemComponent';
import {ProgressiveTrackerItemComponent} from './ProgressiveTrackerItemComponent';

export class TrackerComponent extends Component{

  generateTracker(){
    let tracker = [];
    for(let i = 0; i < this.props.tracker.length; i++){
      let row = this.props.tracker[i];
      tracker.push(this.generateRow(row, i));
      
    }
    return tracker;
  }

  generateRow(trackerRow, i){
    let row = [];

    for(let j = 0; j < trackerRow.length; j++){
        let item = trackerRow[j];
        switch(item.type){
          case "obtainable":
            row.push(
              <TrackerItemComponent
                key={item.code}
                trackerID={item.code}
                obtainable={this.props.obtainables[this.props.obtainablesMap[item.code]]}
                onClick={(ctrl) => this.props.obtainablesOnClick(this.props.obtainablesMap[item.code], ctrl)}
              />
            );
            break;
          case "progressive":
            row.push(
              <ProgressiveTrackerItemComponent
                key={item.code}
                trackerID={item.code}
                obtainables={this.props.obtainables}
                obtainablesMap={this.props.obtainablesMap}
                progressive={this.props.progressives[this.props.progressivesMap[item.code]]}
                onClick={(ctrl) => this.props.progressivesOnClick(this.props.progressivesMap[item.code], ctrl)}
              />
            );
            break;
          case "blank1":
            row.push(<div key={i.toString() + j.toString()} className="col-sm-1"></div>);
            break;
          case "blank2":
            row.push(<div key={i.toString() + j.toString()} className="col-sm-2"></div>);
            break;
          default:
            row.push(<div key={i.toString() + j.toString()} className="col-sm-1"></div>);
            break;
        }
      }
    return(
      <div key={"row" + i} className="row">
        {row}
      </div>
    );
  }

	render() {
    return(
      <div className="container-fluid tracker-container">
        {this.generateTracker()}
        <br /><p>This app is still in development. Your feedback is important! Please send comments and suggestions to randosuite@gmail.com</p>
      </div>
        
    );
  }
}