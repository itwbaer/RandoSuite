const util = {};
util.checks = require('./checks.js');

module.exports = {
	padding: 100,
	divisor: 1000,

	filterMaps: function(filter, filteredChecks, maps, mapImgs, locations, obtainables, checks, locationsMap, obtainablesMap, checksMap){

		let filteredMaps = [];

		let checkLocations = util.checks.getLocations(filteredChecks);

		let pushedMaps = [];

		for(let i = 0; i < maps.length; i++){
			let current = maps[i];
			let count = checksRemaining(current, filter, locations, obtainables, checks, locationsMap, obtainablesMap, checksMap);
			if(checkLocations.includes(current.location) && !pushedMaps.includes(current.id)){
				let pair = {"map": current, "image": mapImgs[i]};
				pair["map"]["count"] = count;
				filteredMaps.push(pair);
				pushedMaps.push(current.id);
			}
			else if(current.location === -1 && !pushedMaps.includes(current.id)){
				//always add -1
				let pair = {"map": current, "image": mapImgs[i]};
				filteredMaps.push(pair);
				pushedMaps.push(current.id);
			}

		}

		function compareCount(a, b) {
		  
		  //if location is -1, always add first
		  if(a.map.location === -1){
		  	return 1;
		  }

		  if (a.map.count > b.map.count) {
		    return -1;
		  }
		  else if (a.map.count < b.map.count) {
		    return 1;
		  }
		  return 0;
		}

		function compareString(a, b) {
		  
		  //if location is -1, always add first
		  if(a.map.location === -1){
		  	return 1;
		  }

		  if (a.map.name.toLowerCase() > b.map.name.toLowerCase()) {
		    return 1;
		  }
		  else if (a.map.name.toLowerCase() < b.map.name.toLowerCase()) {
		    return -1;
		  }
		  return 0;
		}

		function checksRemaining(map, filter, locations, obtainables, checks, locationsMap, obtainablesMap, checksMap){
			let count = 0;
			if(!("markers" in map)){ return count;}
			for(let i = 0; i < map.markers.length; i++){
				let marker = map.markers[i];

				if(marker.type === "check"){
					//if we can check it, add to total
					let check = checks[checksMap[marker.key]];
					if(filter.checkType.includes(check.type)){
						let canCheck = [];
						for(let j = 0; j < filter.state.length; j++){
							let state = filter.state[j];
							canCheck.push(util.checks.canCheck(state, check, locations, obtainables, 
																checks, locationsMap, obtainablesMap, checksMap) && check.checked < 0);
							
						}

						if(canCheck.includes(true)){
							count++;
						}
					}
				}
			}

			return count;
		}

		//sort alphabetically
		return filteredMaps.sort(compareCount);
		
	},

	linkMarkers: function(maps, mapsMap, markers){

		//for each access, attach to location.access
		markers.forEach(function(marker){
			for(let i = 0; i < marker.map.length; i++){
				let mapCode = marker.map[i];

				let map = maps[mapsMap[mapCode]];
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
		

	},

	loadMapImgs: function(maps){
		let mapImgs = [];

		for(let i = 0; i < maps.length; i++){
			let map = maps[i];
			let image = new Image();
			image.src = require("../maps/" + map.code + "." + map.extension);
			mapImgs.push(image);

			
		}
		
		
		return mapImgs;
	}

}