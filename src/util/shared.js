function getAllFilterOptions(locations, states, checkTypes){
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

}



function mapCodeToID(obj){
	let codeMap = {} 
	for(let i = 0; i < obj.length; i++){
	  let current = obj[i];
	  codeMap[current.code] = current.id;
	}

	return codeMap;
}

function copyKeys(keys, original, load){

	for(let i = 0; i < load.length; i++){
		for(let j = 0; j < keys.length; j++){
			let key = keys[j];
			original[i][key] = load[i][key];
		}
	}

	return original;
}

function saveFile(obtainables, checks, filter, progressives, notes){
	let data = {};
	data.obtainables = obtainables;
	data.checks = checks;
	data.filter = filter;
	data.progressives = progressives;
	data.notes = notes;
	return JSON.stringify(data);
}

function optionsToFilter(options){
	let filter = [];
	for(let i = 0; i < options.length; i++){
		filter.push(options[i].value);
	}

	return filter;
}

function objectToOptions(obj){
	let options = [];
	for(let i = 0; i < obj.length; i++){
		let option = {};
		option["value"] = obj[i].id
		option["label"] = obj[i].name
		options.push(option);
	}

	return options;
}

function getDefaultOptions(obj, filter){
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

module.exports = {getAllFilterOptions,
mapCodeToID,
copyKeys,
saveFile,
optionsToFilter,
objectToOptions,
getDefaultOptions}