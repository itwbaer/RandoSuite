const util = {};
util.checks = require('./checks.js');
util.obtainables = require('./obtainables.js');

function sortLocations(locations, objectMaps){
	let sortedLocations = [];

	let locationKeys = Object.keys(objectMaps.locations);
	locationKeys = locationKeys.sort()

	for(let i = 0; i < locationKeys.length; i++){
		let key = locationKeys[i];
		let index = objectMaps.locations[key]
		sortedLocations.push(locations[index]);
	}


	//sorted indexes
	return sortedLocations;
}

function linkAccess(locations, access){

	//for each access, attach to location.access
	access.forEach(function(a){

		if(locations[a.location]["access"] === undefined || locations[a.location]["access"] === null){
			locations[a.location]["access"] = {};
		}
		locations[a.location]["access"][a.state.toString()] = {};
		locations[a.location]["access"][a.state.toString()]["required"] = a.required;
	});

}

function canAccess(state, location, locations, obtainables, objectMaps){

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
				let newLocation = locations[objectMaps.locations[accessOption.location]];

				let locationReachable = canAccess(state, newLocation, locations, obtainables, objectMaps);
				

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
						let obtainable = obtainables[objectMaps.obtainables[currentSet[k]]];

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

function checksRemaining(location, data, objectMaps){
	let cantCheck = 0;
	let canCheck = 0;
	let hasChecked = 0;
	for(let i = 0; i < data.checks.length; i++){
		let check = data.checks[i];
		if(data.filter.checkType.includes(check.type) && check.location === location.id){
			if(check.checked > 0){
				hasChecked++;
			}
			else{
				let canCheck = [];
				for(let j = 0; j < data.filter.state.length; j++){
					let state = data.filter.state[j];
					canCheck.push(util.checks.canCheck(state, check, data.locations, data.obtainables, 
														data.checks, objectMaps));
					
				}

				if(canCheck.includes(true)){
					canCheck++;
				}
				else{
					cantCheck++;
				}
			}
			
		}
		
	}

	location.checkCount = {"cantCheck": cantCheck, "canCheck": canCheck, "hasChecked": hasChecked};
}

module.exports = {sortLocations,
linkAccess,
canAccess,
checksRemaining}