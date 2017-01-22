var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

var patapp_config = require('./config/app'),
    patapp_db_config = require('./config/db');

module.exports = function() {

  var app = express();

  /*app.locals.db_conn = patapp_db_config.db_conn;
  app.locals.db_user = patapp_db_config.db_user;
  app.locals.db_pswd = patapp_db_config.db_pswd;*/

  //set routers
  var pat_router = require('./routes/api_json_routes');
  var ui_router = require('./routes/ui_routes');
  app.use('/api', pat_router);
  app.use('/app', ui_router);

  app.get('/', function (req, res){
    res.redirect('/app');
  });

  app.use('/', express.static(path.join(__dirname, 'public')));
  app.use('/bower_components', express.static(path.join(__dirname, 'public/bower_components')));

  app.use(function(req, res, next) {  
    res.status(404).send('The page you are trying to access, does not exist.');
  });

  /*app.all('/api/*', function (req, res, next) {
    console.log('This is the all');
    next(req, res);
  });*/

  return app;

};




 
