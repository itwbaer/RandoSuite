module.exports = {
	canUse: function(obtainable, obtainables){

		let isUseable = function(obtainable, obtainables){
				if(obtainable.required_obtainables === undefined){
					return obtainable.obtained > 0;
				}
				else{
					let usable = true;
					for(let i = 0; i < obtainable.required_obtainables.length; i++){
						let o = obtainable.required_obtainables[i];
						usable = usable && isUseable(obtainables[o], obtainables);
					}

					return usable;
				}

		}

		return isUseable(obtainable, obtainables);
	}
}