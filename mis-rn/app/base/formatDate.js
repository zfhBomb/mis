function newDate(date) {
    var isoExp, parts;
    isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s(\d\d):(\d\d):(\d\d)\s*$/;
    try {
        parts = isoExp.exec(date);
    } catch(e) {
        return null;
    }
    if (parts) {
        date = new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
    } else {
        return null;
    }
    return date;
}

function formatDate(date, format) {
	var paddNum = function(num) {
			num += "";
			return num.replace(/^(\d)$/, "0$1");
		}
		//指定格式字符
	var cfg = {
		yyyy: date.getFullYear() //年 : 4位
			,
		yy: date.getFullYear().toString().substring(2) //年 : 2位
			,
		M: date.getMonth() + 1 //月 : 如果1位的时候不补0
			,
		MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
			,
		d: date.getDate() //日 : 如果1位的时候不补0
			,
		dd: paddNum(date.getDate()) //日 : 如果1位的时候补0
			,
		hh: paddNum(date.getHours()) //时
			,
		mm: paddNum(date.getMinutes()) //分
			,
		ss: paddNum(date.getSeconds()) //秒
	}
	format || (format = "yyyy-MM-dd hh:mm:ss");
	return format.replace(/([a-z])(\1)*/ig, function(m) {
		return cfg[m];
	});
}
var format={
	//格式化日期,
	formatDate:formatDate,
	//根据时间显示不同内容
	selectFormat:function(strDate){
		var nowTime=new Date();
		var dateTime=newDate(strDate);
		if(nowTime.getFullYear()!=dateTime.getFullYear()){
			return formatDate(dateTime, "yyyy-MM");
		}else if(nowTime.getDate()-dateTime.getDate()==0){
			return formatDate(dateTime, "hh:mm");
		}else{
			return formatDate(dateTime, "MM-dd");
		}
	}
}
export default format
