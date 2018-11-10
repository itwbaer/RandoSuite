import React, { Component } from 'react';
import { MiniMapComponent } from './MiniMapComponent';
export class MapNavComponent extends Component{

	getMaps(){
		let maps = [];
    for(let i = 0; i < this.props.maps.length; i++){
      let currentMap = this.props.maps[i];

      let mapImg = this.props.util.maps.loadMapImg(currentMap);
      maps.push(
        <MiniMapComponent
        	key={"minimap-" + currentMap.id}
        	map={currentMap}
        	mapImg={mapImg}
        	onClick={() => this.props.onClick(currentMap.id)}
        />
      );
    }

    return maps;
	}

	render() {
    return(
      <div className="row">
      		{this.getMaps()}
      </div>
    );
  }
}