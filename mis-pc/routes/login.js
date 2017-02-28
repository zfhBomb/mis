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
	var user=req.body.userName;
	var factory=req.body.factory;
	var pass=req.body.password||req.body.newPass;
	connection.query(`SELECT * FROM users_${factory} WHERE userName="${user}" AND state=1`, function(err,result) {
		if(err) console.log(err);
			if(result.length==0){
				res.send({ok:1});
				connection.end();
			}else{
				bcrypt.compare(pass,result[0].pass,function(err1,isMatch){
					if(err1) console.log(err1)
					if(isMatch){
						if(req.body.newPass){
							bcrypt.genSalt(10,function(err2,salt){
								if(err2) console.log(err2)
								bcrypt.hash( req.body.newPass,null,null,function(err3,hash){
									if(err3) console.log(err3)
									connection.query(`UPDATE users_${factory} SET pass="${hash}" WHERE userName="${user}"`, function(err4,result1) {
										if(err4) console.log(err4);
										else{
											res.send({ok:0});
											connection.end();
										}
									})
								})
							})
						}else{
							if(req.session.loginCode==req.body.code){
								res.send({ok:0,user:result[0]});
								connection.end();
							}else{
								res.send({ok:3});
								connection.end();
							}
						}
					}else{
						res.send({ok:2});
						connection.end();
					}
				})	
			}
		});
	
	
		
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
    if (!req.session.loginCode) {
        req.session.loginCode = {};
    }
    req.session.loginCode = randomcode;
   // 输出图片
     var p = new captchapng(80,30,parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    res.send({data:img});
});


module.exports = router

//http://www.cnblogs.com/bling/p/5618339.html