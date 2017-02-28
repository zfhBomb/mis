var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var formatCSTDate=require("../base/formatDate.js");


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
	var factory=req.query.factory;
	var str = "UPDATE mistable_"+factory+",process_"+factory+" SET";
	var sqlArr = [];
	var dataId=req.query.id;
	delete req.query.factory;
	for(var key in req.query){
		if(key!="yiJian"){
			if(key!="id"){
				str+=",";
			}
			str+=" ??=?"
			sqlArr.push("process_"+factory+"."+key);
			if(key.indexOf("date") > -1){
				if(req.query[key]){
					sqlArr.push(new Date());
				}else{
					sqlArr.push(null);
				}
			}else{
				sqlArr.push(req.query[key]);
			}
		}else{
			str+=", ??=?";
			sqlArr.push("mistable_"+factory+"."+key);
			sqlArr.push(req.query[key]);
		}	
	}
	str+=" WHERE mistable_"+factory+".id=process_"+factory+".id AND mistable_"+factory+".id = "+dataId;
	var pool = mysql.createPool(options);
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				connection.query("SELECT * FROM process_"+factory+" WHERE id=?", [dataId], function(err, result) {
					if(err) console.log(err);
					else {
							if(result.length<1){
								connection.query("INSERT INTO process_"+factory+" set ?", {id:dataId,state:0}, function(err1, result1) {
									if(err) console.log(err);
									else{
										res.send({id:dataId,state:0});
										pool.end();
									}
								});
							}else{
								connection.query(str, sqlArr, function(err2, result2) {
									if(err) console.log(err);
									else{
										connection.query("SELECT * FROM process_"+factory+" WHERE id=?", [dataId], function(err3, result3) {
											if(err) console.log(err);
											else{
												result3[0]
												for(var i=0;i<4;i++){
													if(result3[0]["date"+i]){
														result3[0]["date"+i]=formatCSTDate(result3[0]["date"+i], "yyyy-MM-dd hh:mm:ss")
													}
												}
												res.send(result3[0]);
												pool.end();
											}
										
										});
									}
								});
							
							}
						}
					});
				}
		})
		
});

module.exports = router;