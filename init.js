var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    path = require('path');

module.exports = function() {

  var app = express();
  //app.use(bodyParser.urlencoded({extended: true}));
  //app.use(bodyParser.json());
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
  app.use('/profiles', express.static(path.join(__dirname, 'uploads')));

  app.use(function(req, res, next) { 
    res.status(404).send('The page you are trying to access, does not exist.');
  });

  return app;

};




 
