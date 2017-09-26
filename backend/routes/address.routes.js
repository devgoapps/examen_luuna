(function(){

	'use strict';

	var express = require('express');
	var cors = require('cors');
	var AddressController = require('../controllers/address.controller');

	var api = express.Router();

	api.post('/create/address', cors(), AddressController.createAddress);
	api.post('/update/address', cors(), AddressController.updateAddress);
	api.get('/get/address', cors(), AddressController.getAllAddress);
	api.delete('/delete/address', cors(), AddressController.deleteAddress);

	module.exports = api;
})();