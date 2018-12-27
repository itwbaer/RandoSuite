const util = {};
util.checks = require('./checks.js');

module.exports = {
	filterMaps: function(checks, maps, mapImgs){
		let filteredMaps = [];

		let locations = util.checks.getLocations(checks);

		let pushedMaps = [];

		for(let i = 0; i < maps.length; i++){
			let current = maps[i];
			if(locations.includes(current.location) && !pushedMaps.includes(current.id)){
				let pair = {"map": current, "image": mapImgs[i]};
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
		
		
		return filteredMaps;
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
					"check" : marker.check,
					"lon": marker.lon[i],
					"lat": marker.lat[i]
				});

			}
		});
		console.log(maps);

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