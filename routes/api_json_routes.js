
var express = require('express');
var multer = require('multer');
var path = require('path');
var app_config = require('../config/app');

//for image storage
// read from form-data
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, app_config.uploads_dir_name);
  },
  filename: function (req, file, cb) {
    cb(null, req.body.firstname + '_'+ file.fieldname )
  }
});
upload = multer({ storage : storage }).single('profile_pic');

//=======================
//How can we inject this?
var patientctrl = require('../controllers/patient_ctrl');

var pat_router = express.Router();

//hello home
pat_router.get('', function(req, res){
  console.log("home-------------");
  res.json({message : 'Hello there'});
});

//get the list of all patients
pat_router.get('/patients', patientctrl.getall);

//get. search by first name
//regex:try more
//pat_router.get('/patients/:type(firstname|lastname|email)/:value/', patientctrl.search);
pat_router.get('/patients/:firstname', patientctrl.search);

//post. create a new patient
pat_router.post('/patients', upload, patientctrl.check_if_exists, patientctrl.create);

//put. update a patient
pat_router.put('/patients/:firstname', upload,  patientctrl.update)

//delete. delete a patient record
pat_router.delete('/patients/:firstname', patientctrl.delete, patientctrl.del_profile_pic)

//get profile image
pat_router.get('/profile/:firstname',patientctrl.getprofile);

module.exports = pat_router; 

