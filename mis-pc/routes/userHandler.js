var express = require('express');
var router = express.Router();
var mysql = require('mysql');


/* GET users listing. */
router.get('/', function(req, res, next) {
	var options = {
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'mis',
		port: '3306',
		multipleStatements: true
	};
	var pool = mysql.createPool(options);
	var factory=req.query.factory?req.query.factory:"";
	var page=req.query.page<=1?req.query.page-1:(req.query.page-1)*10;
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				if(req.query.do){
					var str=" WHERE ";
					if(req.query.do=="ok"){
						var arr=[1];
					}else if(req.query.do=="clear"){
						var arr=[2];
					}
					for(var i=0;i<req.query.value.length;i++){
							if(i<req.query.value.length-1){
								str+="id=? OR ";
							}else{
								str+="id=?";
							}
							arr.push(req.query.value[i]);
						}
					connection.query("UPDATE busers_"+factory+" SET state=?"+str,arr, function(err, result) {
						if(err) console.log(err);
						else {
								connection.query("SELECT COUNT(*) FROM busers_"+factory+" WHERE state=0", function(err1, result1) {
									if(err) console.log(err1);
									else {
										connection.query("SELECT * FROM busers_"+factory+" WHERE state=0 ORDER BY id DESC LIMIT ?,10",[page], function(err2, result2) {
											if(err) console.log(err2);
											else {
												if(req.query.do=="ok"){
													arr.splice(0,1);
													connection.query("INSERT INTO users_"+factory+"(userName,pass,chineseName,position,factory,state) SELECT userName,pass,chineseName,position,factory,state FROM busers_"+factory+str,arr, function(err3, result3) {
														if(err) console.log(err3);
														else {
															res.send({pageNums:result1[0]["COUNT(*)"],data:result2});
															pool.end();
														}
													});
												}else{
													res.send({pageNums:result1[0]["COUNT(*)"],data:result2});
													pool.end();
												}
											}
										});
									}
								});
								
							}
						});
					}else{
						if(req.query.queryStr){
							connection.query("SELECT COUNT(*) FROM busers_"+factory+" WHERE state=0 AND chineseName like ?",["%"+req.query.queryStr+"%"], function(err, result) {
								if(err) console.log(err);
								else {
									connection.query("SELECT * FROM busers_"+factory+" WHERE state=0 AND chineseName like ? ORDER BY id DESC LIMIT ?,10",["%"+req.query.queryStr+"%",page], function(err1, result1) {
										if(err) console.log(err);
										else {
												res.send({pageNums:result[0]["COUNT(*)"],data:result1});
												pool.end();
											}
									});
								}
							});
						}else{
							connection.query("SELECT COUNT(*) FROM busers_"+factory+" WHERE state=0", function(err, result) {
								if(err) console.log(err);
								else {
									connection.query("SELECT * FROM busers_"+factory+" WHERE state=0 ORDER BY id DESC LIMIT ?,10",[page], function(err1, result1) {
										if(err) console.log(err);
										else {
												res.send({pageNums:result[0]["COUNT(*)"],data:result1});
												pool.end();
											}
									});
								}
							});
						}	
					}
				}
				
		})
		
});


router.get('/user', function(req, res, next) {
	var options = {
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'mis',
		port: '3306',
		multipleStatements: true
	};
	var pool = mysql.createPool(options);
	var factory=req.query.factory?req.query.factory:"";
	var page=req.query.page<=1?req.query.page-1:(req.query.page-1)*10;
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				if(req.query.do){
					var str=" WHERE ";
					if(req.query.do=="ok"){
						var arr=[1];
					}else if(req.query.do=="clear"){
						var arr=[2];
					}
					for(var i=0;i<req.query.value.length;i++){
							if(i<req.query.value.length-1){
								str+="id=? OR ";
							}else{
								str+="id=?";
							}
							arr.push(req.query.value[i]);
						}
					connection.query("UPDATE users_"+factory+" SET state=?"+str,arr, function(err, result) {
						if(err) console.log(err);
						else {
								connection.query("SELECT COUNT(*) FROM users_"+factory+" WHERE state=1", function(err1, result1) {
									if(err1) console.log(err1);
									else {
										connection.query("SELECT * FROM users_"+factory+" WHERE state=1 ORDER BY id DESC LIMIT ?,10",[page], function(err2, result2) {
											if(err2) console.log(err2);
											else {
												res.send({pageNums:result1[0]["COUNT(*)"],data:result2});
												pool.end();
											}
										});
									}
								});
								
							}
						});
					}else{
						if(req.query.queryStr){
							connection.query("SELECT COUNT(*) FROM users_"+factory+" WHERE state=1 AND chineseName like ?",["%"+req.query.queryStr+"%"], function(err, result) {
								if(err) console.log(err);
								else {
									connection.query("SELECT * FROM users_"+factory+" WHERE state=1 AND chineseName like ? ORDER BY id DESC LIMIT ?,10",["%"+req.query.queryStr+"%",page], function(err1, result1) {
										if(err1) console.log(err1);
										else {
												res.send({pageNums:result[0]["COUNT(*)"],data:result1});
												pool.end();
											}
									});
								}
							});
						}else{
							connection.query("SELECT COUNT(*) FROM users_"+factory+" WHERE state=1", function(err, result) {
								if(err) console.log(err);
								else {
									connection.query("SELECT * FROM users_"+factory+" WHERE state=1 ORDER BY id DESC LIMIT ?,10",[page], function(err1, result1) {
										if(err1) console.log(err1);
										else {
												res.send({pageNums:result[0]["COUNT(*)"],data:result1});
												pool.end();
											}
									});
								}
							});
						}	
					}
				}
				
		})
		
});
module.exports = router;



//SELECT COUNT(*) FROM busers_ WHERE state=0 AND chineseName=?
//[?]
//SELECT * FROM busers_ WHERE state=0 AND chineseName=? ORDER BY id DESC LIMIT ?,10"
//[?,?]


//"UPDATE busers_"+factory+" SET state=? WHERE id=? OR......
//[?,?....]
//SELECT COUNT(*) FROM busers_"+factory+" WHERE state=0
//"SELECT * FROM busers_"+factory+" WHERE state=0 ORDER BY id DESC LIMIT ?,10"
//[?]
//"INSERT INTO users_"+factory+"(userName,pass,chineseName,position,factory) SELECT userName,pass,chineseName,position,factory FROM busers_"+factory+ WHERE id=? OR......
//[?,?....]

