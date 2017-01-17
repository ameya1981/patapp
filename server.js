
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

var Patient = require('./models/patient');


// routing
var pat_router = express.Router();

//hello home
pat_router.get('/', function(req, res){

  res.json({message : 'Hello there'});

});

//pat_router.route('/patients')

pat_router.get('/patients', function(req, res){

    Patient.find(function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
  });

 pat_router.post('/patients', function(req, res){
    
    console.log(req);
    var patient = new Patient();
    patient.firstname = req.query.firstname;
    patient.lastname = req.query.lastname;
    patient.email = req.query.email;
    patient.profile_image_path = "";

    patient.save(function(err) {

      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient created'});
    });
  });


//prefix /api to all routes
pat_app.use('/api', pat_router);
//routing


//
pat_app.listen(app_config.port);

console.log("Up and running");
