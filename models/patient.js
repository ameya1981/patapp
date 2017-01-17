var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var db = require('../config/db');
var db_options = {
  user: db.user,
  pass: db.pswd
}
// connect to db
// mongoose.connect(db.db_conn, db_options);

var connection = mongoose.createConnection(db.db_conn, db_options);

autoIncrement.initialize(connection);

var PatientSchema   = new Schema({
    firstname: String,
    lastname: String,
    patid: Number,
    profile_image_path: String,
    email: String,
    });

PatientSchema.plugin(autoIncrement.plugin, {model: 'Patient', field: 'patid', startAt: 1, incrementBy:1});

 module.exports = mongoose.model('Patient', PatientSchema);

