var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var React=require("react");
var ReactDOMServer=require("react-dom/server");
var Mis=require("../public/js/mis.js");
var IndexPage=React.createFactory(Mis);
var formatCSTDate=require("../base/formatDate.js");

var options = {
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'mis',
		port: '3306',
		multipleStatements: true
	};

/* GET home page. */
router.get('/', function(req, res, next) {
	var pool = mysql.createPool(options);
	var factory=req.query.factory?req.query.factory:"";
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				connection.query('SELECT * FROM mistable_'+factory+' ORDER BY id DESC', function(err, result) {
					if(err) console.log(err);
					else {
						for(var i=0;i<result.length;i++){
							result[i].date=formatCSTDate(result[i].date, "yyyy-MM-dd hh:mm:ss")
						}
						res.render("index",{ react: ReactDOMServer.renderToString(IndexPage({tableData:result})),data:result });
						pool.end();
					}
				});
			}
	});
  
});


module.exports = router;
