
var express = require('express');
var path = require('path');
var ui_router = express.Router();

//hello app-home
ui_router.get('', function(req, res){

  //res.sendFile('/home/bitnami/git_repos/patapp/public/index.html');
  res.sendFile(path.join(path.resolve('.'),'public', 'index.html'));
  console.log("app-home-------------");

});

module.exports = ui_router; 

