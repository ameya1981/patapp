
var express = require('express');
var path = require('path');
var ui_router = express.Router();

//hello app-home
//render the index.html when user lands on host/app page
ui_router.get('', function(req, res){
  res.sendFile(path.join(path.resolve('.'),'public', 'index.html'));
});

module.exports = ui_router; 

