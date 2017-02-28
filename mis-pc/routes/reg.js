var express = require('express');
var router = express.Router();
var mysql=require('mysql'); 
var captchapng = require('captchapng');
var bcrypt=require('bcrypt-nodejs');

router.post('/', function(req, res, next) {
var connection = mysql.createConnection({ 
	  	host : '127.0.0.1',
	  	user : 'root',
	  	password : 'root',
	  	database : 'mis',
	  	port:'3306'
	});
	connection.connect();
	var user=req.body;
	var factory=req.body.factory;
	var userName=req.body.userName;
	if(req.body.code==req.session.regCode){
		connection.query('select * from busers_'+factory+' where userName=?', userName, function(err, result) {
			if (err) {
				console.log(err);
			}else{
				if(result.length>0||userName.indexOf("admin")>-1){
					req.session.regCode="";
					res.send({msg:0});
					connection.end();
				}else{
					delete user.code;
					bcrypt.genSalt(10,function(err,salt){
						if(err) console.log(err)
						bcrypt.hash( user.pass,null,null,function(err,hash){
							if(err) console.log(err)
							user.pass=hash;
							connection.query('insert into busers_'+factory+' set ?', user, function(err, result) {
								if (err) {
									console.log(err);
								}else{
									res.send({msg:1});
									connection.end();
								}
							});
						})
					})
				}
			}
		});
	}else{
		req.session.regCode="";
		res.send({msg:2});
	}
	
});

router.get('/', function(req, res, next) {
	 var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
    		randomcode += code[parseInt(Math.random() * 1000) % code.length];
    		if(i==0&&randomcode=="0"){
    			randomcode="1";
    		}
    }
    // 保存到session
    if (!req.session.regCode) {
        req.session.regCode = {};
    }
    req.session.regCode = randomcode;
   // 输出图片
     var p = new captchapng(80,30,parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    res.send({data:img});
});

module.exports = router

//bcrypt.genSalt(10,function(err,salt){
//	if(err) console.log(err)
//	bcrypt.hash( user.password,salt,function(err,hash){
//		if(err) console.log(err)
//		user.password=hash;
//	})
//})


//bcrypt.compare(user.password,pass,function(err,isMatch){
//	if(err) console.log(err)
//	
//})
