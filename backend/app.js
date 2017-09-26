(function(){

	'use strict';

	var express = require('express');
	var bodyParser = require('body-parser');
	var cors = require('cors');

	var user_routes = require('./routes/users.routes');
	var address_routes = require('./routes/address.routes');
	var port = 3001;
	var server = express();

	server.use(bodyParser.urlencoded({
		extended: true,
		limit: '50mb'
	}));
	server.use(bodyParser.json({ limit: '50mb' }));
	server.use(cors());
	server.use('/api', user_routes);
	server.use('/api', address_routes);

	server.listen(port, function(){
		console.log("Server it's ready in port: " + port);
	});

	module.exports = server;
})();