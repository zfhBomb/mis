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
	var str = "";
	var sqlArr = [];
	var datas=req.query;
	var factory=req.query.factory;
if(datas.who){
	for(var j=0;j<6;j++){
		sqlArr.push(datas.who);
	}
	if(datas.yiJian){
		for(var i=0;i<datas.yiJian.length;i++){
			if(datas.yiJian.length>1){
				if(i==0){
					str += ' AND (??=?';
				}else if(i==datas.yiJian.length-1){
					str += ' OR ??=?)';
				}else{
					str += ' OR ??=?';
				}
			}else if(datas.yiJian.length==1){
				str += ' AND ??=?';
			}
			sqlArr.push("yiJian");
			sqlArr.push(datas.yiJian[i]);
		}
		
	}
	if(datas.leiXin){
		str+=" AND ??=?";
		sqlArr.push("leiXin");
		sqlArr.push(datas.leiXin);
	}
	if(datas.zhuanYe){
		str+=" AND ??=?";
		sqlArr.push("zhuanYe");
		sqlArr.push(datas.zhuanYe);
	}
	if(datas.sheBei!="所有设备"){
		str+=" AND ??=?";
		sqlArr.push("sheBei");
		sqlArr.push(datas.sheBei);
	}
	if(datas.fuzzy){
		str+=" AND content like ?";
		sqlArr.push("%"+datas.fuzzy+"%");
	}
	if(datas.dateTool) {
		str += ' AND date>? AND date<?';
		sqlArr.push(formatCSTDate(datas.dateTool.startValue, "yyyy-MM-dd hh:mm:ss"));
		sqlArr.push(formatCSTDate(datas.dateTool.endValue, "yyyy-MM-dd hh:mm:ss"));
	}
	
	var pool = mysql.createPool(options);
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				var tableFactory='mistable_'+factory;
				var processFactory='process_'+factory;
				if(sqlArr.length==6){
					var sqlStr = 'SELECT '+tableFactory+'.* FROM '+tableFactory+','+processFactory+' WHERE '+tableFactory+'.who=? OR ('+tableFactory+'.id='+processFactory+'.id AND (who=? OR who0=? OR who1=? OR who2=? OR who3=?)) GROUP BY '+tableFactory+'.id ORDER BY id DESC LIMIT ?,10';
					//SELECT mistable_.* FROM mistable_,process_ WHERE mistable_.who="易初平" OR (mistable_.id=process_.id AND (who="易初平" OR who0="易初平" OR who1="易初平" OR who2="易初平" OR who3="易初平")) GROUP BY mistable_.id
					var numStr = 'SELECT COUNT(*) FROM '+tableFactory+','+processFactory+' WHERE '+tableFactory+'.who=? OR ('+tableFactory+'.id='+processFactory+'.id AND (who=? OR who0=? OR who1=? OR who2=? OR who3=?)) GROUP BY '+tableFactory+'.id';
				}else{
					var sqlStr = 'SELECT '+tableFactory+'.* FROM '+tableFactory+','+processFactory+' WHERE ('+tableFactory+'.who=? OR ('+tableFactory+'.id='+processFactory+'.id AND (who=? OR who0=? OR who1=? OR who2=? OR who3=?)))'+str+' GROUP BY '+tableFactory+'.id ORDER BY id DESC LIMIT ?,10';
					//SELECT mistable_.* FROM mistable_,process_ WHERE mistable_.who="易初平" OR (mistable_.id=process_.id AND (who="易初平" OR who0="易初平" OR who1="易初平" OR who2="易初平" OR who3="易初平")) GROUP BY mistable_.id
					var numStr = 'SELECT COUNT(*) FROM '+tableFactory+','+processFactory+' WHERE ('+tableFactory+'.who=? OR ('+tableFactory+'.id='+processFactory+'.id AND (who=? OR who0=? OR who1=? OR who2=? OR who3=?)))'+str+' GROUP BY '+tableFactory+'.id';
				}
				connection.query(numStr, sqlArr, function(err, result) {
					if(err) console.log(err);
					else {
						var resultNum=result;
						sqlArr.push(datas.nowPage==0?0:datas.nowPage*10);
						connection.query(sqlStr, sqlArr, function(err, result1) {
							if(err) console.log(err);
							else {
								for(var i=0;i < result1.length;i++){
									if(result1[i].date){
										result1[i].date=formatCSTDate(result1[i].date, "yyyy-MM-dd hh:mm:ss")
									}
								}
								if(resultNum[0]){
									result1.push(resultNum.length);
								}else{
									result1.push({pageNum:0});
								}
								res.send(result1);
								pool.end();
							}
						});
					}
				});
			}
		})
	}else{
		res.send([{pageNum:0}]);
	}
});

module.exports = router;


//SELECT mistable_.* FROM mistable_,process_ WHERE mistable_.who="易初平" OR (mistable_.id=process_.id AND (who="易初平" OR who0="易初平" OR who1="易初平" OR who2="易初平" OR who3="易初平")) GROUP BY mistable_.id
//SELECT * FROM mistable_,process_ WHERE (mistable_.who="易初平" OR (mistable_.id=process_.id AND (who="易初平" OR who0="易初平" OR who1="易初平" OR who2="易初平" OR who3="易初平"))) AND zhuanYe="电气专业" GROUP BY mistable_.id