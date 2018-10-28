import React, { Component } from 'react';

export class MapComponent extends Component{

	componentDidMount(){
      let canvas = document.getElementById('map-canvas');
      let context = canvas.getContext('2d');
 			let background = document.getElementById('map-img');

      background.onload = function(){

      		canvas.width = background.width;
      		canvas.height = background.height;
			}

     
	}


	render() {
    return(
        <div className="map-container">
	    		<img id="map-img" src={this.props.map} />
	    		<canvas id="map-canvas" />
	      </div>
    );
  }
}
