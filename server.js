
//import modules
var pat_app_config = require('./config/app');
var pat_app = require('./init')();

pat_app.listen(pat_app_config.port);

exports = module.exports = pat_app;

console.log("Up and running");
