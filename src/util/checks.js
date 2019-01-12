const util = {};
util.obtainables = require('./obtainables.js');
util.locations = require('./locations.js');

//this needs to be done after filtering
function groupByLocation(checks, locations){
	let groupedChecks = {};

	//initialize
	for(let i = 0; i < locations.length; i++){
		groupedChecks[i] = [];
	}

	//need to sort locations, then go
	for(let i = 0; i < checks.length; i++){
		let check = checks[i];
		groupedChecks[check.location].push(check);
	}

	return groupedChecks;
}

function applyFilterType(filter, checks){
	let filteredChecks = [];

	//for every check
	for(let i = 0; i < checks.length; i++){
		//for every state in the filter
		let check = checks[i];

		let isType = filter.checkType.includes(check.type);


		if(isType){filteredChecks.push(check);}
	}

	return filteredChecks;
}

//filters a given set of checks based on certain critera
function applyFilter(data, objectMaps){
	let filteredChecks = [];
	let filter = data.filter;
	let checks = data.checks;
	let locations = data.locations;
	let obtainables = data.obtainables;
	//for every check
	for(let i = 0; i < checks.length; i++){
		//for every state in the filter
		let check = checks[i];

		let inLocation = filter.location.includes(check.location);
		let hasChecked = filter.checked.includes(check.checked);
		let isType = filter.checkType.includes(check.type);
		//for each state, see if check falls in accessible rule
		let canCheck = [];
		let inState = [];
		for(let j = 0; j < filter.state.length; j++){
			let currentState = filter.state[j]
			canCheck.push(filter.accessible.includes(this.canCheck(currentState, check, locations, obtainables, checks, 
				objectMaps)))
			inState.push(check.state.includes(currentState));
		}
		check["canCheck"] = canCheck.includes(true);
		if(inLocation && hasChecked && isType && inState.includes(true) && canCheck.includes(true)){filteredChecks.push(check);}
	}

	return filteredChecks;
}

//returns an array of the locations contained in these checks
function getLocations(checks){
	let locations = [];
	for(let i = 0; i < checks.length; i++){
		let current = checks[i];
		if(!locations.includes(current.location)){locations.push(current.location)}
	}

	return locations;
}

//determines if a given check is able to be checked
function canCheck(state, check, locations, obtainables, checks, objectMaps){
	//console.log(check);
	//first check if allowed in state
	if(!check.state.includes(state)){
		return false;

	}

	//check if we can reach location
	let location = locations[check.location];
	if(!util.locations.canAccess(state, location, locations, obtainables, objectMaps)){
		return false;
	}

	//check if requireds

	if(check.required === undefined || check.required === null){
		return true;

	}
	else{
		//could have multiple sets
		let doneChecks = [];
		let haveObtainables = [];
		for(let i = 0; i < check.required.length; i++){
			let checkOption = check.required[i];
			//check if we have all obtainables

			if(checkOption.obtainables === undefined || checkOption.obtainables === null){
				//only 1 set, which is true;

				haveObtainables.push([true]);
			}

			//and if we have required items
			else{
				//could have multiple combinations
				let haveSet = [];
				for(let j = 0; j < checkOption.obtainables.length; j++){
					let currentSet = checkOption.obtainables[j];
					let setValid = true;
					for(let k = 0; k < currentSet.length; k++){
						let obtainable = obtainables[objectMaps.obtainables[currentSet[k]]];

						setValid = setValid && util.obtainables.canUse(state, obtainable, obtainables);
					}
					
					haveSet.push(setValid)
				}

				haveObtainables.push(haveSet);
			}


			//check if we need other checks
			if(checkOption.checks === undefined || checkOption.checks === null){
				//only 1 set, which is true;
				doneChecks.push([true]);
			}

			//and if we have checks
			else{
				//could have multiple combinations
				let haveSet = [];
				for(let j = 0; j < checkOption.checks.length; j++){
					let currentSet = checkOption.checks[j];
					let setValid = true;

					for(let k = 0; k < currentSet.length; k++){
						let check = checks[objectMaps.checks[currentSet[k]]];
						
						if(check.checked < 0){setValid = false;}
					}
					
					haveSet.push(setValid)
				}

				doneChecks.push(haveSet);
			}

		}


		//for every set, check if both have both obtainables and checks
		for(let i = 0; i < check.required.length; i++){
			
			if(doneChecks[i].includes(true) && haveObtainables[i].includes(true)){return true;}

		}

		return false;
	}

	
}

module.exports = {groupByLocation, 
applyFilterType, 
applyFilter, 
getLocations, 
canCheck}