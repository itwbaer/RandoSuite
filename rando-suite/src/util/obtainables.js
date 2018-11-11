module.exports = {
	canUse: function(state, obtainable, obtainables){

		let isUseable = function(state, obtainable, obtainables){
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
						usable = usable && isUseable(state, obtainables[o], obtainables);
					}

					return usable;
				}

		}

		return isUseable(state, obtainable, obtainables);
	},

	progressiveObtain: function(progressive, obtainables, obtainablesMap){

		//first assume all unobtained
		for(let i = 0; i < progressive.options.length; i++){
			let option = progressive.options[i];
			obtainables[obtainablesMap[option]].obtained = -1;
		}

		//go through index and obtain all items along
		for(let i = -1; i < progressive.index; i++){
			let option = progressive.options[i+1];
			obtainables[obtainablesMap[option]].obtained = 1;
		}

		return obtainables;
	}
}