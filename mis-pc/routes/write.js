var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.post('/', function(req, res, next) {
	var options = {
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'mis',
		port: '3306',
		multipleStatements: true
	};
	var str = "";
	var sqlArr = [];
	var datas=req.body;
	var factory=req.body.factory;
	datas.date=new Date();
	delete req.body.factory
	var pool = mysql.createPool(options);
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				var sqlStr = 'INSERT INTO mistable_'+factory+' SET ?';
				//console.log(numStr);
				//console.log(sqlArr);
				connection.query(sqlStr, datas, function(err, result) {
					if(err) console.log(err);
					else {
								res.send({ok:1});
								pool.end();
							}
					});
			}
		})
		
});

module.exports = router;