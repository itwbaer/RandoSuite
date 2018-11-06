module.exports = {
	loadMaps: function(checks){
		let maps = [];
		let mapData = require("../data/Maps.json");
		let test = require("../maps/" + mapData[0].code + "." + mapData[0].extension)
		maps.push(test);
		return maps;
	}
}