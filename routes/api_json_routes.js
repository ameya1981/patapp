
var express = require('express');
var multer = require('multer');
var path = require('path');

//for image storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
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
//pat_router.get('/^patients+:(firstname|lastname|email)\/:(.+)/', patientctrl.search);
pat_router.get('/patients/:type(firstname|lastname|email)/:value/', patientctrl.search);
/*pat_router.get('/patients/:firstname', function(req, res){

  console.log("firstname patients-------------");
  console.log(req);
    Patient.find({'firstname':req.body.firstname}, function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
  });
*/

//post. create a new patient
pat_router.post('/patients', upload, patientctrl.create);
/*pat_router.post('/patients', upload,  function(req, res){
    
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
  });
*/

//put. update a patient
pat_router.put('/patients/:firstname', patientctrl.update)
/* pat_router.put('/patients/:firstname', function(req, res){
    
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
 });
*/

//delete. delete a patient record
pat_router.delete('/patients/:firstname', patientctrl.delete, patientctrl.del_profile_pic)
/*pat_router.delete('/patients/:firstname', function(req, res){
    
  console.log("delete patients-------------");
  console.log(req);
    Patient.remove({'firtname':req.body.firstname}, function(err) {

      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient deleted'});
    });
  });
*/

pat_router.get('/profile/:firstname',patientctrl.getprofile);

/* function(req, res){
  res.setHeader("Content-Type", "image/png");
  //res.sendFileyyp(".." + path.sep + 'uploads' + path.sep + req.params.firstname + '_profile_pic');
  res.sendFile( "/opt/bitnami/apps/patapp" + path.sep + 'uploads' + path.sep + req.params.firstname + '_profile_pic');

}); */



module.exports = pat_router; 

