import React, { Component } from 'react';
import map from '../maps/full-map.jpg'

export class MapComponent extends Component{

	selectImage(){
      let canvas = document.getElementById('MapCanvas');
      let context = canvas.getContext('2d');
      let background = new Image();
      background.src = this.props.source;
      background.onload = function(){
			    context.drawImage(background,0,0);   
			}

     
	}


	render() {
    return(
      <div className="container-fluid">       
        <canvas id="MapCanvas" />
      </div>
    );
  }
}
