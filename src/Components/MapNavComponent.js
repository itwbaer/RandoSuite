import React, { Component } from 'react';
import { MiniMapComponent } from './MiniMapComponent';
export class MapNavComponent extends Component{

	getMaps(){
		let maps = [];
    for(let i = 0; i < this.props.maps.length; i++){
      let currentMap = this.props.maps[i];

      maps.push(
        <MiniMapComponent
        	key={"minimap-" + currentMap.map.id}
        	map={currentMap.map}
        	mapImg={currentMap.image}
        	onClick={() => this.props.onClick(currentMap.map.id)}
        />
      );
    }

    return maps;
	}

	render() {
    return(
      <div>
      		{this.getMaps()}
      </div>
    );
  }
}