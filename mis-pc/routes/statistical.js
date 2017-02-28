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
	var sqlArr = {};
	var datas=req.query;
	var pool = mysql.createPool(options);
	var sqlDate={};
	datas.time.startValue=formatCSTDate(datas.time.startValue, "yyyy-MM-dd hh:mm:ss");
	datas.time.endValue=formatCSTDate(datas.time.endValue, "yyyy-MM-dd hh:mm:ss");
	//缺陷类型查询
	function queryDataLength(res,key,arr,sqlStr,sqlArr,time,connection,callBack){
		connection.query(sqlStr,[key,arr[0],time.endValue,time.startValue], function(err, result) {
			if(err) console.log(err);
			else {
					sqlArr[arr[0]]=result[0]["COUNT(*)"];
					arr.splice(0,1);
					if(arr.length==0){
						if(callBack&&callBack.callBack){
							queryDataLength(callBack.res,callBack.key,callBack.arr,callBack.sqlStr,callBack.sqlArr,callBack.time,callBack.connection,callBack.callBack);
						}else if(callBack){
							queryDataLength(callBack.res,callBack.key,callBack.arr,callBack.sqlStr,callBack.sqlArr,callBack.time,callBack.connection);
						}else{
							res.send(sqlArr);
							pool.end();
						}
					}else{
						queryDataLength(res,key,arr,sqlStr,sqlArr,time,connection,callBack)
					}
			}
		});
	}
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				queryDataLength(res,"leiXin",["一类缺陷","二类缺陷","三类缺陷"],'SELECT COUNT(*) FROM mistable_'+datas.factory+' WHERE ??=? AND date<? AND date>?',sqlArr,datas.time,connection,
				{res:res,key:"zhuanYe",arr:["锅炉专业","汽机专业","电气专业","化学专业","热控专业"],sqlStr:'SELECT COUNT(*) FROM mistable_'+datas.factory+' WHERE ??=? AND date<? AND date>?',sqlArr:sqlArr,time:datas.time,connection:connection,callBack:{
					res:res,key:"yiJian",arr:["正在处理","没有备品","停机处理","大小修处理","运行退回","等待值长确认","此票作废","缺陷闭环","值长确认","等待验收"],sqlStr:'SELECT COUNT(*) FROM mistable_'+datas.factory+' WHERE ??=? AND date<? AND date>?',sqlArr:sqlArr,time:datas.time,connection:connection
				}});
				
			}
		})
		
});

module.exports = router;