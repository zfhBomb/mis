//格式化CST日期的字串
function formatCSTDate(strDate, format) {
	return formatDate(new Date(strDate), format);
}

//格式化日期,
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

module.exports = formatCSTDate;