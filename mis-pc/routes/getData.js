var express = require('express');
var router = express.Router();
var fs=require('fs');

router.get('/position', function(req, res, next) {
	var factory=req.query.factory?req.query.factory:"";
	var path=factory?"./public/data/"+factory+"/position.json":"./public/data/position.json";
	var JsonObj=JSON.parse(fs.readFileSync(path));
  res.json(JsonObj);
});
router.get('/sheBei', function(req, res, next) {
	var factory=req.query.factory?req.query.factory:"";
	var path=factory?"./public/data/"+factory+"/sheBei.min.json":"./public/data/sheBei.min.json";
	var JsonObj=JSON.parse(fs.readFileSync(path));
  	res.json(JsonObj);
});
router.get('/factory', function(req, res, next) {
	var JsonObj=JSON.parse(fs.readFileSync('./public/data/factory.json'));
  res.json(JsonObj);
});
module.exports = router;