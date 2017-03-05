function urlEncode(param, key, encode) {
    if(param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + (encode ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + '[' + i + ']';
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
}
export default function (url,data){
  var param=urlEncode(data);
  return url+param.replace("&","?")
}
