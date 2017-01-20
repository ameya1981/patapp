var Patient = require('../models/patient');
const uploads_path = '/opt/bitnami/apps/patapp/uploads';
var path = require('path');

//abstract further
//var crud = require('./crud_ctrl')('patient');
//module.exports = crud;


//get the list of all patients
exports.getall = function(req, res){

  console.log("all patients--------yyy-----");
    Patient.find(function (err, pats) {
      console.log("got results" + err);
      if (err) { res.send(err); }
      console.log(pats);
      res.json(pats);
    });
};

//get. search by first name
exports.search = function(req, res){

  console.log("firstname patients-------------");
  console.log(req.params);
  /*var searchby = "'" + req.params.type + "'";
  var searchfor = req.params.value;
  var search = {searchby: searchfor};*/
    Patient.find({'firstname': req.params.firstname}, function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
};


//post. create a new patient
exports.create = function(req, res){
    
  console.log("add patients-------------");
  console.log(req);
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
exports.update = function(req, res){
    
  console.log("modify patients-------------");
  console.log(req);
    Patient.findOne({'firstname':req.params.firstname}, function (err, pats) {
      if (err) { res.send(err); }

      if (req.body.firstname) pats.firstname = req.body.firstname;
      if (req.body.lastname) pats.lastname = req.body.lastname;
      if (req.body.email) pats.email = req.body.email;
      pats.save(function(err) {
        if (err) { res.send(err); }
        res.json({status: 200, message: 'Patient cr info updated'});
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
   //next();
};

const fs = require('fs');

var get_img_path = function (firstname) {
  return uploads_path + path.sep + firstname + '_profile_pic';
}

exports.del_profile_pic = function(req, res) {

  var file_path = get_img_path(req.params.firstname);

  // add as endpoint/method to check if profile image exists
  fs.access(file_path, fs.constants.F_OK && fs.constants.X_OK, function (err) {
     //if (err) {res.status(404).send("The image you are trying to access does not exist.");}
     if (err) {console.log("The image you are trying to access does not exist.");}
     fs.unlink(file_path , function(err) {
              if (err) {res.send("Something went wrong. Could not delete your profile pic");}
            }
           );
  });
}

//get. profile pic of patient
exports.getprofile = function(req, res){

  var file_path = get_img_path(req.params.firstname);
  fs.access(file_path, fs.constants.F_OK && fs.constants.X_OK, function (err) {
    if (err) {res.send("The image you are trying to access does not exist.");}
    else {
      res.setHeader("Content-Type", "image/png");
      res.sendFile( file_path);
    }
  });
}
