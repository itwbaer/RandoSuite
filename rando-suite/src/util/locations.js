const util = {};
util.obtainables = require('./obtainables.js');

module.exports = {

	linkAccess: function(locations, access){

		//for each access, attach to location.access
		access.forEach(function(a){
			locations[a.location]["access"] = {};
			locations[a.location]["access"][a.state.toString()] = {};
			locations[a.location]["access"][a.state.toString()]["required"] = a.required;
		});

		return locations;
	},

	canAccess: function(state, location, locations, obtainables, locationsMap, obtainablesMap){

		let isAccessible = function(state, location, locations, obtainables, locationsMap, obtainablesMap){

				//first check if our state can even get there
				if(!location.state.includes(state)){
					return false;

				}


				//if no access modifier, we can get there
				if(location.access === undefined){
					return true;

				}
				else{
					if(location.access[state.toString()] === undefined){
						//if there is no modifier for the given state, we can get there
						return true;	
					}

					//there is an access modifier for our state
					//get access modifier for given state
					let access = location.access[state.toString()];


					let reachable = true;
					let haveObtainables = true;
					//look at each of the required things
					for(let i = 0; i < access.required.length; i++){
						let accessOption = access.required[i];

						//need to check if we can get to the required location
						let newLocation = locations[locationsMap[accessOption.location]];
						//is there a required location?
						if(newLocation !== null){
							reachable = reachable && isAccessible(state, newLocation, locations, obtainables, locationsMap, obtainablesMap);
						}

						//and if we have required items
						if(accessOption.obtainables !== null){
							//potentially multiple sets
							for(let j = 0; j < accessOption.obtainables.length; j++){
								let currentSet = accessOption.obtainables[j];
								for(let k = 0; k < currentSet.length; k++){
									let obtainable = obtainables[obtainablesMap[currentSet[k]]];
									haveObtainables = haveObtainables && util.obtainables.canUse(obtainable, obtainables);
								}
							}
						}
					}

					return reachable && haveObtainables;

				}

		}

		return isAccessible(state, location, locations, obtainables, locationsMap, obtainablesMap);
	
	}
}