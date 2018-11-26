const util = {};
util.obtainables = require('./obtainables.js');

module.exports = {

	sortLocations: function(locations, locationsMap){
		let sortedLocations = [];

		let locationKeys = Object.keys(locationsMap);
		locationKeys = locationKeys.sort()

		for(let i = 0; i < locationKeys.length; i++){
			let key = locationKeys[i];
			let index = locationsMap[key]
			sortedLocations.push(locations[index]);
		}


		//sorted indexes
		return sortedLocations;
	},

	linkAccess: function(locations, access){

		//for each access, attach to location.access
		access.forEach(function(a){

			if(locations[a.location]["access"] === undefined || locations[a.location]["access"] === null){
				locations[a.location]["access"] = {};
			}
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
				if(location.access === undefined || location.access === null){
					return true;

				}
				else{
					if(location.access[state.toString()] === undefined || location.access[state.toString()] === null){
						//if there is no modifier for the given state, we can get there
						return true;	
					}

					//there is an access modifier for our state
					//get access modifier for given state
					let access = location.access[state.toString()];


					let reachable = [];
					let haveObtainables = [];
					//look at each of the required things
					for(let i = 0; i < access.required.length; i++){
						let accessOption = access.required[i];
						//is there required location
						if(accessOption.location === undefined || accessOption.location === null){
							reachable.push(true);

						}
						else{
							//need to check if we can get to the required location
							let newLocation = locations[locationsMap[accessOption.location]];

							let locationReachable = isAccessible(state, newLocation, locations, obtainables, locationsMap, obtainablesMap);
							

							reachable.push(locationReachable);
						}
						

						//if no required items
						if(accessOption.obtainables === undefined || accessOption.obtainables === null){
							//only 1 set, which is true;
							haveObtainables.push([true]);
						}
						//and if we have required items
						else{

							//potentially multiple sets
							let haveSet = [];
							for(let j = 0; j < accessOption.obtainables.length; j++){
								let currentSet = accessOption.obtainables[j];
								let setValid = true;
								for(let k = 0; k < currentSet.length; k++){
									let obtainable = obtainables[obtainablesMap[currentSet[k]]];
			
									setValid = setValid && util.obtainables.canUse(state, obtainable, obtainables);
								}
								
								haveSet.push(setValid)
							}

							haveObtainables.push(haveSet);
						}
					}

					//for every set, check if both reachable and obtainable
					for(let i = 0; i < access.required.length; i++){
						
						if(reachable[i] && haveObtainables[i].includes(true)){return true;}

					}

					return false;

				}

		}

		return isAccessible(state, location, locations, obtainables, locationsMap, obtainablesMap);
	
	}
}