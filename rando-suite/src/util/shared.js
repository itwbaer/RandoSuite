module.exports = {

	saveFile: function(obtainables, checks, filter){
		let data = {};
		data.obtainables = obtainables;
		data.checks = checks;
		data.filter = filter;

		return JSON.stringify(data);
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