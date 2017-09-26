(function(){

	'use strict';

	var connection = require('../connection');
	
	function login(req, res){
		var body = req.body;
		var email = body.email;
		var password = body.password;

		var statement = "SELECT * FROM users WHERE 1 = 1 ";
		if(email && password){

			statement += 'AND email=\'' + email + '\' ';
			statement += 'AND password=\'' + password + '\'';

			console.log(statement);

			connection.query(statement, function(error, results){
				if(error){
					console.error(error);
					res.status(500).send({ error: 'El usuario no existe.' });
				}else{
					if(!results || results.length < 1){
						res.status(404).send({ error: 'El usuario no existe.' });
					}else{
						res.status(200).send({ message: 'Usuario correcto ', results: results });
					}
				}
			});
		}else {
			res.status(500).send({ error: 'Los campos email y password son requeridos.' });
		}
	}

	function createUser(req, res){
		var params = req.body;
		
		var statement = 'INSERT INTO users SET ?';
	
		connection.query(statement, params, function(error, result) {
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido guardar el registro.' });
			}else{
				res.status(200).send({ message: 'El registro se guardo correctamente.', itemCreated: result.insertId });
			}
		});	
	}

	function updateUser(req, res){
		var params = req.body;

		var statement = 'UPDATE users SET ? WHERE user_id = ?';
		var values = [params, params.user_id];

		connection.query(statement, values, function(error, result){
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido actualizar el registros.' });
			}else{
				res.status(200).send({ message: 'El registro se actualizo correctamente.', result: result });
			}
		});
	}

	function getAllUsers(req, res){
		var statement = "SELECT * FROM users WHERE 1 = 1 ";
		
		connection.query(statement, function(error, results){
			if(error){
				console.error(error);
				res.status(500).send({ error: 'No se ha podido obtener los registros.' });
			}else{
				res.status(200).send({ message: 'Registros obtenidos ' + results.length, results: results });
			}
		});
	}

	function deleteUser(req, res){
		var user_id = req.query.user_id;

		var statement = 'DELETE FROM users WHERE user_id = ' + user_id;
		
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
		login,
		createUser,
		updateUser,
		getAllUsers,
		deleteUser
	};

})();