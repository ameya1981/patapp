
//import modules

var express = require('express');
var pat_app = express();


//read configs
var db_conn = require('./config/db');
var app_config = require('./config/app');


// routing
var pat_router = express.Router();

//hello home
pat_router.get('/', function(req, res){

  res.json({message : 'Hello there'});

});


//prefix /api to all routes
pat_app.use('/api', pat_router);
//routing


//
pat_app.listen(app_config.port);

