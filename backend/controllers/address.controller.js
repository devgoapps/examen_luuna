(function(){

	'use strict';

	var connection = require('../connection');
	
	function createAddress(req, res){
		var params = req.body;
		
		var statement = 'INSERT INTO address SET ?';
	
		connection.query(statement, params, function(error, result) {
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido guardar el registro.' });
			}else{
				res.status(200).send({ message: 'El registro se guardo correctamente.', itemCreated: result.insertId });
			}
		});	
	}

	function updateAddress(req, res){
		var params = req.body;

		var statement = 'UPDATE address SET ? WHERE address_id = ?';
		var values = [params, params.address_id];

		connection.query(statement, values, function(error, result){
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido actualizar el registros.' });
			}else{
				res.status(200).send({ message: 'El registro se actualizo correctamente.', result: result });
			}
		});
	}

	function getAllAddress(req, res){
		var statement = "SELECT * FROM address WHERE 1 = 1 ";
		
		connection.query(statement, function(error, results){
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido obtener los registros.' });
			}else{
				res.status(200).send({ message: 'Registros obtenidos ' + results.length, results: results });
			}
		});
	}

	function deleteAddress(req, res){
		var address_id = req.query.address_id;

		var statement = 'DELETE FROM address WHERE address_id = ' + address_id;
		
		connection.query(statement, function(error, result){
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido eliminar el registros.' });
			}else{
				res.status(200).send({ message: 'El registro se elimino correctamente.', result: result });
			}
		});
	}

	module.exports = {
		createAddress,
		updateAddress,
		getAllAddress,
		deleteAddress
	};

})();