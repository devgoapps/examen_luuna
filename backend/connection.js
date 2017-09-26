(function(){

	'use strict';

	var mysql = require('mysql');

	var conn = mysql.createConnection({
		host: 'localhost',
		user: 'admin',
		password: 'admin',
		database: 'examenLuuna'
	});

	conn.connect(function(error){
		if(error){
			console.error(error);
		}else{
			console.log('La conexion a MySql fue correcta');
		}
	});
	module.exports = conn;
})();