
//import modules

var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var bodyParser = require('body-parser'); 

var pat_app = express();
var upload = multer({ dest: './uploads/' });
pat_app.use(bodyParser.urlencoded({ extended: true }));
pat_app.use(bodyParser.json());
//pat_app.use(express.json());
//pat_app.use(express.urlencoded());

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

  console.log("home-------------");
  console.log(req);
  res.json({message : 'Hello there'});

});

//get the list of all patients
pat_router.get('/patients', function(req, res){

  console.log("all patients-------------");
  console.log(req);
    Patient.find(function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
  });

//get. search by first name
pat_router.get('/patients/:firstname', function(req, res){

  console.log("firstname patients-------------");
  console.log(req);
    Patient.find({'firstname':req.params.firstname}, function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
  });


//post. create a new patient
 pat_router.post('/patients', function(req, res){
    
  console.log("add patients-------------");
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

//put. update a patient
 pat_router.put('/patients/:firstname', function(req, res){
    
  console.log("modify patients-------------");
  console.log(req);
    Patient.findOne({'firstname':req.params.firstname}, function (err, pats) {
      if (err) { res.send(err); }

      if (req.body.firstname) pats.firstname = req.body.firstname;
      if (req.body.lastname) pats.lastname = req.body.lastname;
      if (req.body.email) pats.email = req.body.email;
      console.log(typeof pats);
      console.log("pats object");
      console.log(req.body.email);
      console.log(pats);
      pats.save(function(err) {
        if (err) { res.send(err); }
        res.json({status: 200, message: 'Patient cr info updated'});
      });
  });
 });

//delete. delete a patient record
 pat_router.delete('/patients/:firstname', function(req, res){
    
  console.log("delete patients-------------");
  console.log(req);
    Patient.remove({'firtname':req.body.firstname}, function(err) {

      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient deleted'});
    });
  });


//prefix /api to all routes
pat_app.use('/api', pat_router);
//routing


//
pat_app.listen(app_config.port);

console.log("Up and running");
