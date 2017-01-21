var express = require('express'),
    bodyParser = require('body-parser');

var patapp_config = require('./config/app'),
    patapp_db_config = require('./config/db');

/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.firstname + '_'+ file.fieldname )
  }
})*/


module.exports = function() {

  var app = express();

  //app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(bodyParser.json());

  app.locals.db_conn = patapp_db_config.db_conn;
  app.locals.db_user = patapp_db_config.db_user;
  app.locals.db_pswd = patapp_db_config.db_pswd;

  // to store profile pics
  //app.locals.img_upload_middleware = multer({ storage : storage }).single('profile_pic');

  //set routers
  var pat_router = require('./routes/api_json_routes');
      //img_router = require('./routes/img_routes');
  app.use('/api', pat_router);
  // app.use('/image', img_router);

 // app.use(logger('dev'));

  app.use(function(req, res, next) {  
    res.status(404).send('The page you are trying to access, does not exist.');
    //next(err);
  });

  app.all('/api/*', function (req, res, next) {
    console.log('This is the all');
    next(req, res);
  });

  return app;

};




 
