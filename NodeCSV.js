


var MachearCSV = function(fileName, callback) {

			var con =require("csvtojson").core.Converter;
			//var csvFileName="./educacion-2011-discapacidad.csv";

			//new converter instance
			var csvConverter = new con();

			csvConverter.on("record_parsed",function(resultRow,rawRow,rowIndex){
				console.log("fila: " + resultRow);
			});
			csvConverter.on("end_parsed", function(jsonObj){
				console.log(jsonObj);
				callback(jsonObj);
			} );

			//read from file
			csvConverter.from(fileName);
		

	};

module.exports.MachearCSV =    MachearCSV;