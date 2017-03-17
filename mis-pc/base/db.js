// MySQL数据库联接配置
//module.exports = {
//mysql: {
//  host: '127.0.0.1', 
//  user: 'root',
//  password: 'root',
//  database:'mis', // 前面建的user表位于这个数据库中
//  port: 3306
//}
//};



/* 
nodejs连接mysql数据库支持事物封装 
2016年7月26日14:47:06 
QQ: 452076103 意外金喜 
 */  
var db    = {};  
var mysql = require('mysql');  
var pool  = mysql.createPool({  
  connectionLimit : 10,  
  host            : 'localhost',  
  user            : 'root',  
  password        : '123456',  
  database        : 'nodejs'  
});  
  
//获取连接  
db.getConnection = function(callback){  
    pool.getConnection(function(err, connection) {  
        if (err) {  
            callback(null);  
            return;  
        }  
        callback(connection);  
    });  
}   
module.exports = db;  


var db = require('./mysql.js');  
  var async = require('async');  
  db.getConnection(function(connection){  
    connection.beginTransaction(function(err) {  
      if (err) {   
        console.log(err);  
        return;  
      }  
  
      var task1 = function(callback){  
        connection.query(`insert into user (name) values('a')`, function(err, result) {  
          if (err) {  
            console.log(err);  
            callback(err,null);  
            return;  
          }  
          console.log('第一次插入成功!');  
          callback(null,result);  
        })  
      }  
      var task2 = function(callback){  
        connection.query(`insert into user (name) values('b')`, function(err, result) {  
          if (err) {  
            console.log(err);  
            callback(err,null);  
            return;  
          }  
          console.log('第二次插入成功!');  
          callback(null,result);  
        })  
      }  
      var task3 = function(callback){  
        connection.query(`insert into user (name) values('c')`, function(err, result) {  
          if (err) {  
            console.log(err);  
            callback(err,null);  
            return;  
          }  
          console.log('第三次插入成功!');  
          callback(null,result);  
        })  
      }  
  
      async.series([task1, task2, task3],function(err,result){  
        if (err) {  
          console.log(err);  
          //回滚  
          connection.rollback(function() {  
            console.log('出现错误,回滚!');  
            //释放资源  
            connection.release();  
          });  
          return;  
        }  
        //提交  
        connection.commit(function(err) {  
          if (err) {  
            console.log(err);  
            return;  
          }  
              
          console.log('成功,提交!');  
          //释放资源  
          connection.release();  
        });  
      })  
    });  
  })  