function canUse(state, obtainable, obtainables){

	//console.log(obtainable)
	//check if in right state
	if(!obtainable.state.includes(state)){return false}

	if(obtainable.required_obtainables === undefined || obtainable.required_obtainables === null){
		return obtainable.obtained > 0;
	}
	else{
		let usable = true;
		for(let i = 0; i < obtainable.required_obtainables.length; i++){
			let o = obtainable.required_obtainables[i];
			usable = usable && canUse(state, obtainables[o], obtainables);
		}

		return usable && obtainable.obtained > 0;
	}

}

function progressiveObtain(progressive, obtainables, objectMaps){
	//first assume all unobtained
	for(let i = 0; i < progressive.options.length; i++){
		let option = progressive.options[i];
		obtainables[objectMaps.obtainables[option]].obtained = -1;
	}

	//go through index and obtain all items along
	for(let i = -1; i < progressive.index; i++){
		let option = progressive.options[i+1];
		obtainables[objectMaps.obtainables[option]].obtained = 1;
	}

	return obtainables;
}

function cycleObtain(update, objectMaps){
	//first unobtain everything
	for(let i = 0; i < update.cycles.length; i++){
		let cycle = update.cycles[i];
		for(let j = 0; j < cycle.options.length; j++){
			let obtainable = update.obtainables[objectMaps.obtainables[cycle.options[j]]];
			obtainable.obtained = -1;
		}
	}
	for(let i = 0; i < update.cycles.length; i++){
		let cycle = update.cycles[i];
		if(cycle.index > -1){

			let obtainable = update.obtainables[objectMaps.obtainables[cycle.options[cycle.index]]];
			if(cycle.obtained > 0){obtainable.obtained = 1}

		}
	}
}

module.exports = {canUse, progressiveObtain, cycleObtain}