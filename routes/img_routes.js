module.exports = function(pat_app) {

//var patientctrl = require('../controllers/controller');

// routing
var img_router = express.Router();

//get. profile pic of patient
img_router.get('/profile/:firstname', function(req, res){
  res.sendFile(__dirname + path.sep + 'uploads' + path.sep + req.params.firstname + '_profile_pic');
});

}
