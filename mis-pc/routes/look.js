var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodeExcel = require('excel-export');
var fs=require('fs');
var formatCSTDate=require("../base/formatDate.js");


var options = {
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'mis',
		port: '3306',
		multipleStatements: true
	};
router.get('/exlData', function(req, res, next) {
	var conf = {};
	conf.stylesXmlFile = "./styles.xml";
    conf.name = "mysheet";
	var factory=req.query.factory?req.query.factory:"";
	conf.cols = [
	   {caption:'编号', type:'number'},
	   {caption:'缺陷内容', type:'string'},
	   {caption:'缺陷类型', type:'string'},
	   {caption:'消缺专业', type:'string'},
	   {caption:'处理意见', type:'string'},
	   {caption:'记录时间', type:'string'},
	   {caption:'记录人', type:'string'},
	   {caption:'所属设备', type:'string'}
	];
	var pool = mysql.createPool(options);
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				connection.query('SELECT * FROM mistable_'+factory, function(err, result) {
					if(err) console.log(err);
					else {
						conf.rows = [];
						for(var i=0;i<result.length;i++){
							var datas=[];
							for(var key in result[i]){
								if(key=="date"){
									datas.push(formatCSTDate(result[i][key], "yyyy-MM-dd hh:mm:ss"))
								}else{
									datas.push(result[i][key])
								}
								
							}
							conf.rows.push(datas);
						}
						//console.log(conf.rows);
						var data = nodeExcel.execute(conf);
						res.setHeader('Content-Type', 'application/vnd.openxmlformats');
          				res.setHeader("Content-Disposition", "attachment; filename=data.xls");
						res.end(data,'binary');
						pool.end();
					}
				});
			}
	});
})

/* GET users listing. */
router.get('/', function(req, res, next) {
	var str = "";
	var sqlArr = [];
	var datas=req.query;
	var factory=req.query.factory;
	if(datas.sheBei!="所有设备"||datas.fuzzy||datas.leiXin||datas.yiJian||datas.zhuanYe||datas.dateTool){
		str+=' WHERE';
		var num=0;
		for(var key in datas){
			if(key=="fuzzy"){
				if(num==0){
					num++;
					str += ' content like ?';
				}else{
					str += ' AND content like ?';
				}
				sqlArr.push("%"+datas.fuzzy+"%");
			}else if(key=="yiJian"){
				for(var i=0;i<datas.yiJian.length;i++){
					if(num==0){
						num++;
						if(datas.yiJian.length==1){
							str += ' ??=?';
						}else{
							str += ' (??=?';
						}
					}else{
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
					}
					sqlArr.push(key);
					sqlArr.push(datas[key][i]);
				}
			}else
			if(key=="dateTool") {
				if(num==0){
					num++;
					str += ' date>? AND date<?';
				}else{
					str += ' AND date>? AND date<?';
				}
				sqlArr.push(formatCSTDate(datas.dateTool.startValue, "yyyy-MM-dd hh:mm:ss"));
				sqlArr.push(formatCSTDate(datas.dateTool.endValue, "yyyy-MM-dd hh:mm:ss"));
			}else
			if(key!="nowPage"&&key!="factory"&&datas[key]!="所有设备"){
				if(num==0){
					num++;
					str += ' ??=?';
				}else{
					str += ' AND ??=?';
				}
				sqlArr.push(key);
				sqlArr.push(datas[key]);
			}
		}
	}
	str+=" ORDER BY id DESC LIMIT ?,10";
	if(datas.nowPage==0){
		sqlArr.push(0);
	}else{
		sqlArr.push(datas.nowPage*10);
	}

	var pool = mysql.createPool(options);
	pool.getConnection(function(err, connection) {
			if(err) console.log("与数据库连接失败");
			else {
				var sqlStr = 'SELECT * FROM mistable_'+factory + str;
				var numStr = 'SELECT COUNT(*) FROM mistable_'+factory + str;
				connection.query(numStr, sqlArr, function(err1, result) {
					if(err1) console.log(err1);
					else {
						var resultNum=result;
						connection.query(sqlStr, sqlArr, function(err2, result1) {
							if(err2) console.log(err2);
							else {
								for(var i=0;i < result1.length;i++){
									if(result1[i].date){
										result1[i].date=formatCSTDate(result1[i].date, "yyyy-MM-dd hh:mm:ss")
									}
								}
								if(resultNum[0]){
									result1.push(resultNum[0]);
								}else{
									result1.push({pageNum:false});
								}
								res.send(result1);
								pool.end();
							}
						});
					}
				});
			}
		})
		
});

module.exports = router;