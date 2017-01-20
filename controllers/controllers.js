var Patient = require('../models/patient');

//get the list of all patients
exports.getall = function(req, res){

  console.log("all patients--------XXX-----");
  console.log(req);
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
  console.log(req);
    Patient.find({'firstname':req.body.firstname}, function (err, pats) {
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
exports.delete = function(req, res){
    
  console.log("delete patients-------------");
  console.log(req);
    Patient.remove({'firtname':req.body.firstname}, function(err) {

      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient deleted'});
    });
};


//get. profile pic of patient
exports.getprofile = function(req, res){
  res.sendFile(__dirname + path.sep + 'uploads' + path.sep + req.params.firstname + '_profile_pic');
};

