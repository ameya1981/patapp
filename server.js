
//import modules

var express = require('express');
var mongoose = require('mongoose');
var pat_app = express();


//read configs
var db = require('./config/db');
var db_options = { 
  user: db.user,
  pass: db.pswd
}
var app_config = require('./config/app');


// connect to db
mongoose.connect(db.db_conn, db_options);


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

console.log("Up and running");
