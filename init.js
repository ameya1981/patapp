var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    path = require('path');

module.exports = function(app_config) {

  var app = express();

  //override POST with PUT if X-HTTP... is set in headers
  // used when patient update called
  app.use(methodOverride('X-HTTP-Method-Override'))


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
  app.use('/profiles', express.static(path.join(__dirname, app_config.uploads_dir_name)));

  app.use(function(req, res, next) { 
    res.status(404).send('The page you are trying to access, does not exist.');
  });

  return app;

};




 
