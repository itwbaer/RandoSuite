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
		else if(current.location === -1 && !pushedMaps.includes(current.id)){
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
	colorMarker
}