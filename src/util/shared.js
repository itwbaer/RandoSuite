module.exports = {

	getAllFilterOptions: function(locations, states, checkTypes){
		let options = {};
		options["location"] = this.objectToOptions(locations);
		options["state"] = this.objectToOptions(states);
		options["checkType"] = this.objectToOptions(checkTypes);
		options["accessible"] = [
									{ value: true, label: 'Accessible' },
      								{ value: false, label: 'Not Accessible' }
      							];
      	options["checked"] = 	[
									{ value: -1, label: 'Unchecked' },
      								{ value: 1, label: 'Checked' }
      							];
      	return options;

	},

	createIdArray: function(){

	},

	mapCodeToID(obj){
		let codeMap = {} 
	    for(let i = 0; i < obj.length; i++){
	      let current = obj[i];
	      codeMap[current.code] = current.id;
	    }

	    return codeMap;
 	},

	copyKeys: function(keys, original, load){

		for(let i = 0; i < load.length; i++){
			for(let j = 0; j < keys.length; j++){
				let key = keys[j];
				original[i][key] = load[i][key];
			}
		}

		return original;
	},

	saveFile: function(obtainables, checks, filter, progressives, notes){
		let data = {};
		data.obtainables = obtainables;
		data.checks = checks;
		data.filter = filter;
		data.progressives = progressives;
		data.notes = notes;
		return JSON.stringify(data);
	},

	optionsToFilter: function(options){
		let filter = [];
		for(let i = 0; i < options.length; i++){
			filter.push(options[i].value);
		}

		return filter;
	},

	objectToOptions: function(obj){
		let options = [];
		for(let i = 0; i < obj.length; i++){
			let option = {};
			option["value"] = obj[i].id
			option["label"] = obj[i].name
			options.push(option);
		}

		return options;
	},

	getDefaultOptions: function(obj, filter){
		let options = [];
		for(let i = 0; i < obj.length; i++){
			if(filter.includes(obj[i].value)){
				let option = {};
				option["value"] = obj[i].value
				option["label"] = obj[i].label
				options.push(option);
			}

		}

		return options;
	}
}