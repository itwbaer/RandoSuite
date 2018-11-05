const util = {};
util.obtainables = require('./obtainables.js');
util.locations = require('./locations.js');

module.exports = {
	applyFilter: function(filter, checks, locations, obtainables, locationsMap, obtainablesMap, checksMap){
		let filteredChecks = [];

		//for every check
		for(let i = 0; i < checks.length; i++){
			//for every state in the filter
			let check = checks[i];

			let inLocation = filter.location.includes(check.location);
			let hasChecked = filter.checked.includes(check.checked);
			//for each state, see if check falls in accessible rule
			let canCheck = [];
			let inState = [];
			for(let j = 0; j < filter.state.length; j++){
				let currentState = filter.state[j]
				canCheck.push(filter.accessible.includes(this.canCheck(currentState, check, locations, obtainables, checks, locationsMap, obtainablesMap, checksMap)))
				inState.push(filter.state.includes(currentState));
			}
/*			console.log(inLocation);
			console.log(inState);
			console.log(hasChecked);
			console.log(canCheck);*/

			if(inLocation && hasChecked && inState.includes(true) && canCheck.includes(true)){filteredChecks.push(check);}
		}

		return filteredChecks;
	},

	canCheck: function(state, check, locations, obtainables, checks, locationsMap, obtainablesMap, checksMap){
		
		//first check if allowed in state
		if(!check.state.includes(state)){
			return false;

		}

		//check if we can reach location
		let location = locations[check.location];
		if(!util.locations.canAccess(state, location, locations, obtainables, locationsMap, obtainablesMap)){
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
							let obtainable = obtainables[obtainablesMap[currentSet[k]]];
	
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
							let check = checks[checksMap[currentSet[k]]];
							
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
}