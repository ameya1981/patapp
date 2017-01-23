//requirements
var Patient = require('../models/patient');
var path = require('path');
var app_config = require('../config/app');
const uploads_path = app_config.uploads_dir

//abstract further
//var crud = require('./crud_ctrl')('patient');
//module.exports = crud;

/*
Define methods to fetch data using the Patient model.


*/
//get the list of all patients
exports.getall = function(req, res){

  //console.log("all patients--------yyy-----");
    Patient.find(function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
};

// given a firstname, check if patient exists.
// called before create
exports.check_if_exists = function(req, res, next) {
    Patient.find({'firstname': req.body.firstname}, function (err, pats) {
      if (err) { return err; }
       
      if (pats.length == 0){
        next();
      }
      else{
        res.status(409).send('Patient Exists with the name : ' + req.body.firstname);
      }
    });
}

//get. search by first name
exports.search = function(req, res){

    Patient.find({'firstname': req.params.firstname}, function (err, pats) {
      if (err) { res.send(err); }
      if (pats.length == 0){
        res.status(404).send('No Patient Found with the name : ' + req.params.firstname);
      }
      else{res.json(pats);}
    });
};


//post. create a new patient
// the image upload will be taken by multer
exports.create = function(req, res){
    
  //console.log("add patients-------------");
    var patient = new Patient();
    patient.firstname = req.body.firstname;
    patient.lastname = req.body.lastname;
    patient.email = req.body.email;
    patient.profile_image_path = "";

    patient.save(function(err) {
      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient created'});
    });
};

//put. update a patient
// the image upload will be taken by multer
exports.update = function(req, res){
    
  //findOneandUpate?
    Patient.findOne({'firstname':req.params.firstname}, function (err, pats) {
      if (err) { res.send(err); }

      if (req.body.firstname) pats.firstname = req.body.firstname;
      if (req.body.lastname) pats.lastname = req.body.lastname;
      if (req.body.email) pats.email = req.body.email;
      pats.save(function(err) {
        if (err) { res.send(err); }
        res.json({status: 200, message: 'Patient info updated'});
      });
  });
};

//delete. delete a patient record
exports.delete = function(req, res, next){
    
  console.log("delete patients-------------");
  console.log(req.params);
    Patient.remove({'firstname':req.params.firstname}, function(err) {

      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient deleted'});
    });
};

// delete the profile pic when a patient gets deleted
const fs = require('fs');
exports.del_profile_pic = function(req, res) {
  var file_path = uploads_path + path.sep + req.params.firstname + '_profile_pic';
  fs.unlink(file_path , function(err) {
              if (err) {res.send(err);}
            }
           );
}

//get. profile pic of patient
exports.getprofile = function(req, res){
  res.setHeader("Content-Type", "image/png");
  res.sendFile( uploads_path + path.sep + req.params.firstname + '_profile_pic');
};
