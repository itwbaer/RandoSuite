const L = require("leaflet");

const util = {};
util.checks = require('./checks.js');

const padding = 500;
const divisor = 1000;

function filterMaps(filteredChecks, data, objectMaps){

	let filteredMaps = [];
	let filter = data.filter;
	let maps = data.maps;
	let locations = data.locations;
	let obtainables = data.obtainables;
	let checks = data.checks;
	let checkLocations = util.checks.getLocations(filteredChecks);

	let pushedMaps = [];

	for(let i = 0; i < maps.length; i++){
		let current = maps[i];
		if(checkLocations.includes(current.location) && !pushedMaps.includes(current.id)){
			current.count = checksRemaining(current, filter, locations, obtainables, checks, objectMaps);
			filteredMaps.push(current);
			pushedMaps.push(current.id);
		}
		else if(current.location === "location_world" && !pushedMaps.includes(current.id)){
			filteredMaps.push(current);
			pushedMaps.push(current.id);
		}

	}

	//sort alphabetically
	return filteredMaps.sort(filter.mapsByCount ? compareCount : compareName);
	
}

function checksRemaining(map, filter, locations, obtainables, checks, objectMaps){
	let count = 0;
	if(!("markers" in map)){ return count;}
	for(let i = 0; i < map.markers.length; i++){
		let marker = map.markers[i];

		if(marker.type === "check"){
			//if we can check it, add to total
			let check = checks[objectMaps.checks[marker.key]];
			if(filter.checkType.includes(check.type)){
				let canCheck = [];
				for(let j = 0; j < filter.state.length; j++){
					let state = filter.state[j];
					canCheck.push(util.checks.canCheck(state, check, locations, obtainables, 
														checks, objectMaps) && check.checked < 0);
					
				}

				if(canCheck.includes(true)){
					count++;
				}
			}
		}
	}

	return count;
}

function compareCount(a, b) {
  
  //if location is -1, always add first
  if(a.location === -1){
  	return 1;
  }

  if (a.count > b.count) {
    return -1;
  }
  else if (a.count < b.count) {
    return 1;
  }
  return 0;
}

function compareName(a, b) {
  
  //if location is -1, always add first
  if(b.location === -1){
  	return 1;
  }

  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  else if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  return 0;
}

function linkMarkers(maps, markers, objectMaps){

	//for each access, attach to location.access
	markers.forEach(function(marker){
		for(let i = 0; i < marker.map.length; i++){
			let mapCode = marker.map[i];

			let map = maps[objectMaps.maps[mapCode]];
			if(map["markers"] === undefined || map["markers"] === null){
				map["markers"] = [];
			}
			map["markers"].push({
				"key" : marker.key,
				"lon": marker.lon[i],
				"lat": marker.lat[i],
				"type": marker.type
			});

		}
	});
	

}


function generateMaps(maps){

	for(let i = 0; i < maps.length; i++){
		let map = maps[i];
		let image = new Image();
		image.src = require("../maps/" + map.code + "." + map.extension);
		map.image = image
	}

	return maps;
}

function setMapImage(mapDisplay, data, objectMaps){
  //first clear markers
  mapDisplay.activeMarkers = {};
  mapDisplay.container.eachLayer(function(layer){
      layer.remove();
  });

  let image = data.maps[data.activeMap].image;

  mapDisplay.height = image.height;
  mapDisplay.width = image.width;
  mapDisplay.center = [image.height/2/divisor, image.width/2/divisor];

  mapDisplay.image = L.imageOverlay(image.src, [[0, 0], [(image.height/divisor), (image.width/divisor)]]);

  mapDisplay.image.addTo(mapDisplay.container);

  mapDisplay.container.setView(mapDisplay.center, 8);


  let padding = this.padding/this.divisor;
  let corner1 = L.latLng(-padding, -padding);
  let corner2 = L.latLng((image.height/this.divisor + padding), (image.width/this.divisor + padding)),
  bounds = L.latLngBounds(corner1, corner2)

  mapDisplay.container.setMaxBounds(bounds);
  //this.createMarkers(data);
  //this.mapDisplay.container.panTo(center);
}

function createMarkers(mapDisplay, data, objectMaps){

  let map = data.maps[data.activeMap];

  mapDisplay.activeMarkers = {};
  if(mapDisplay.markerLayer){
  	mapDisplay.container.removeLayer(mapDisplay.markerLayer)
  }

  if(map["markers"] === undefined || map["markers"] === null){
    return;
  }

  let markers= [];
  for(let i = 0; i < map.markers.length; i++){
    let markerData = map.markers[i];

    switch(markerData.type){

      case "check":{
        let check = data.checks[objectMaps.checks[markerData.key]];
        if(data.filter.checkType.includes(check.type)){

          let marker = L.circle([Math.abs(markerData.lat-mapDisplay.height)/divisor, markerData.lon/divisor], {
              color: "black",
              fillColor: "black",
              weight: 1.0,
              fillOpacity: 0,
              opacity: 0,
              radius: 5000,
              type: markerData.type
          });

          marker.bindPopup(check.name);
          marker.on('mouseover', function (e) {
              this.openPopup();
          });
          marker.on('mouseout', function (e) {
              this.closePopup();
          })
          marker.on('click', () => mapDisplay.clickFunctions.check(check.id));

          markers.push(marker);
          mapDisplay.activeMarkers[markerData.key] = marker;
          colorMarker(markerData.key, mapDisplay, data, objectMaps);
        }
        break;
      }

      case "link":{
        let centerLat = Math.abs(markerData.lat-mapDisplay.height)/divisor;
        let centerLon = markerData.lon/divisor;
        let height = 50/divisor;
        let width = 50/divisor;
        let bounds = [[centerLat + height, centerLon + width], [centerLat - height, centerLon - width]];
        let marker = L.rectangle(bounds, {
          color: "blue",
          weight: 1,
          fillOpacity: .75,
          opacity: 1,
          type: markerData.type
        });
        let linkedMap = data.maps[objectMaps.maps[markerData.key]];

        marker.bindPopup("To " + linkedMap.name);
        marker.on('mouseover', function (e) {
            this.openPopup();
        });
        marker.on('mouseout', function (e) {
            this.closePopup();
        })
        marker.on('click', () => mapDisplay.clickFunctions.link(linkedMap.id));

        markers.push(marker);
        mapDisplay.activeMarkers[markerData.key] = marker;
        break;
      }

      case "location":{
      	let location = data.locations[objectMaps.locations[markerData.key]];
      	let finished = location.checkCount.cantCheck === 0 && location.checkCount.canCheck === 0 &&  location.checkCount.hasChecked > 0; 
      	let noChecks = location.checkCount.canCheck === 0;
      	if(!(data.filter.worldNone && noChecks) && !(data.filter.worldDone && finished)){
      		let centerLat = Math.abs(markerData.lat-mapDisplay.height)/divisor;
	        let centerLon = markerData.lon/divisor;
	        let height = 10/divisor;
	        let width = 10/divisor;
	        let bounds = [[centerLat + height, centerLon + width], [centerLat - height, centerLon - width]];
	        let marker = L.rectangle(bounds, {
	          color: "blue",
	          weight: 1,
	          fillOpacity: .75,
	          opacity: 1,
	          type: markerData.type
	        });

	        marker.bindPopup(location.name);
	        marker.on('mouseover', function (e) {
	            this.openPopup();
	        });
	        marker.on('mouseout', function (e) {
	            this.closePopup();
	        })
	        marker.on('click', () => mapDisplay.clickFunctions.location(location.id));

	        markers.push(marker);
	        mapDisplay.activeMarkers[markerData.key] = marker;
	      	colorMarker(markerData.key, mapDisplay, data, objectMaps);
      	}
        break;
      }
    }
      
  }
  mapDisplay.markerLayer = L.layerGroup(markers);
  mapDisplay.markerLayer.addTo(mapDisplay.container);

}

function colorMarker(key, mapDisplay, data, objectMaps){

	if(mapDisplay.activeMarkers === undefined || mapDisplay.activeMarkers === null){
	  return;
	}

	let marker = mapDisplay.activeMarkers[key];
	switch(marker.options.type){

	  case "check":{

		  let color = "red";
			let check = data.checks[objectMaps.checks[key]];

			if(check.checked > 0){
			  color = "green";
			}
			else{
			  let canCheck = [];
			  for(let i = 0; i < data.filter.state.length; i++){
			    let state = data.filter.state[i]
			    canCheck.push(
			      util.checks.canCheck(
			        state, check, data.locations, data.obtainables, data.checks, objectMaps
			      )
			    );
			  }
			  if(canCheck.includes(true)){color = "yellow"}
			}

			marker.setStyle({
			  opacity: 1.0,
			  fillOpacity: 0.5,
			  color: color,
			  fillColor: color
			});
		  break;
		}

	  case "link":{
	    break;
	  }

	  case "location":{
	  	let color
			let location = data.locations[objectMaps.locations[key]];

			if(location.checkCount.cantCheck === 0 && location.checkCount.canCheck === 0 && location.checkCount.hasChecked > 0){
			  color = "green";
			}
			else if(location.checkCount.canCheck > 0) {
				color = "yellow";
			}
			else{
				color = "red";
			}

			marker.setStyle({
			  fillOpacity: .75,
        opacity: 1,
			  color: color,
			  fillColor: color
			});
	    break;
		}

	}   

}

module.exports = {
	padding,
	divisor,
	filterMaps,
	checksRemaining,
	linkMarkers,
	generateMaps,
	setMapImage,
	createMarkers,
	colorMarker
}