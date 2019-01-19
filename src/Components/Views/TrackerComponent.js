import React, { Component } from 'react';
import {TrackerItemComponent} from './TrackerItemComponent';
import {ProgressiveTrackerItemComponent} from './ProgressiveTrackerItemComponent';
import {CycleTrackerItemComponent} from './CycleTrackerItemComponent';

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
                obtainable={this.props.obtainables[this.props.objectMaps.obtainables[item.code]]}
                onClick={(ctrl) => this.props.obtainablesOnClick(this.props.objectMaps.obtainables[item.code], ctrl)}
              />
            );
            break;
          case "progressive":
            row.push(
              <ProgressiveTrackerItemComponent
                key={item.code}
                trackerID={item.code}
                obtainables={this.props.obtainables}
                progressive={this.props.progressives[this.props.objectMaps.progressives[item.code]]}
                onClick={(ctrl) => this.props.progressivesOnClick(this.props.objectMaps.progressives[item.code], ctrl)}
                data={this.props.data}
                objectMaps={this.props.objectMaps}
              />
            );
            break;
          case "cycle":
            row.push(
              <CycleTrackerItemComponent
                key={item.code}
                trackerID={item.code}
                obtainables={this.props.obtainables}
                cycle={this.props.cycles[this.props.objectMaps.cycles[item.code]]}
                onClick={(ctrl, alt) => this.props.cyclesOnClick(this.props.objectMaps.cycles[item.code], ctrl, alt)}
                data={this.props.data}
                objectMaps={this.props.objectMaps}
              />
            );
            break;
          case "text":
            row.push(<span className="noselect col-sm-2">{item.code}</span>);
          break;
          case "blank1":
            row.push(<div key={i.toString() + j.toString()} className="col-sm-1"></div>);
            break;
          case "blank2":
            row.push(<div key={i.toString() + j.toString()} className="col-sm-2"></div>);
            break;
          case "blank3":
            row.push(<div key={i.toString() + j.toString()} className="col-sm-3"></div>);
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
        <br /><p>To "right click", hold ctrl and left click.
         <br />This app is still in development. <a href="https://docs.google.com/forms/d/1b5XYgakDUHQm40OGakSqSVNj4KCCMO2mTimLtLgoTL0" target="_blank" rel="noopener noreferrer">Your feedback is important!</a>
         <br />*Can only guarantee this works in Google Chrome on Desktop/Laptop.*
         </p>
      </div>
        
    );
  }
}