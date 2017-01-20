module.exports = function(pat_app) {


var patientctrl = require('../controllers/controller');

// routing
var pat_router = express.Router();
var img_router = express.Router();

//hello home
pat_router.get('/', function(req, res){

  console.log("home-------------");
  console.log(req);
  res.json({message : 'Hello there'});

});

//get the list of all patients
pat_router.get('/patients', function(req, res){

  patientctrl.getall(function (err, pats) {
    if (err) { res.send(err); }
    res.json(pats);
  });
});

//get. search by first name
pat_router.get('/patients/:firstname', function(req, res){

  console.log("firstname patients-------------");
  console.log(req);
    Patient.find({'firstname':req.body.firstname}, function (err, pats) {
      if (err) { res.send(err); }
      res.json(pats);
    });
  });


//post. create a new patient
 pat_router.post('/patients', upload,  function(req, res){
    
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

//put. update a patient
 pat_router.put('/patients/:firstname', function(req, res){
    
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

//delete. delete a patient record
 pat_router.delete('/patients/:firstname', function(req, res){
    
  console.log("delete patients-------------");
  console.log(req);
    Patient.remove({'firtname':req.body.firstname}, function(err) {

      if (err) { res.send(err); }
      res.json({status: 200, message: 'Patient deleted'});
    });
  });


//get. profile pic of patient
  img_router.get('/profile/:firstname', function(req, res){
     res.sendFile(__dirname + path.sep + 'uploads' + path.sep + req.params.firstname + '_profile_pic');
  });

//prefix /api to all routes
pat_app.use('/api', pat_router);
pat_app.use('/image', img_router);
//routing

}
