module.exports = {

	copyKeys: function(keys, original, load){

		for(let i = 0; i < original.length; i++){
			for(let j = 0; j < keys.length; j++){
				let key = keys[j];
				original[i][key] = load[i][key];
			}
		}

		return original;
	},

	saveFile: function(obtainables, checks, filter, progressives){
		let data = {};
		data.obtainables = obtainables;
		data.checks = checks;
		data.filter = filter;
		data.progressives = progressives;

		return JSON.stringify(data);
	},

	optionsToFilter: function(options){
		let filter = [];
		for(let i = 0; i < options.length; i++){
			filter.push(options[i].value);
		}

		return filter;
	},

	getOptions: function(obj){
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
			if(filter.includes(obj[i].id)){
				let option = {};
				option["value"] = obj[i].id
				option["label"] = obj[i].name
				options.push(option);
			}

		}

		return options;
	},

	getDefaultOptionsStatic: function(obj, filter){
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