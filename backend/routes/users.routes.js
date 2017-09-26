(function(){

	'use strict';

	var express = require('express');
	var cors = require('cors');
	var UserController = require('../controllers/users.controller');

	var api = express.Router();

	api.post('/login', cors(), UserController.login);
	api.post('/create/user', cors(), UserController.createUser);
	api.post('/update/user', cors(), UserController.updateUser);
	api.get('/get/users', cors(), UserController.getAllUsers);
	api.delete('/delete/user', cors(), UserController.deleteUser);

	module.exports = api;
})();