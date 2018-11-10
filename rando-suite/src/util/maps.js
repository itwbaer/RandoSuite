const util = {};
util.checks = require('./checks.js');

module.exports = {
	filterMaps: function(checks, maps){
		let filteredMaps = [];

		let locations = util.checks.getLocations(checks);

		let pushedMaps = [];
		for(let i = 0; i < maps.length; i++){

			let current = maps[i];
			if(locations.includes(current.location) && !pushedMaps.includes(current.id)){
				filteredMaps.push(current);
				pushedMaps.push(maps[i].id);
			}
			
		}
		
		
		return filteredMaps;
	},

	loadMapImgs: function(maps){
		let mapImgs = [];

		for(let i = 0; i < maps.length; i++){

			let current = require("../maps/" + maps[i].code + "." + maps[i].extension);

				mapImgs.push(current);

			
		}
		
		
		return mapImgs;
	},

	loadMapImg: function(map){


		return require("../maps/" + map.code + "." + map.extension);

	}

}