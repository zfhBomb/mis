define(function(require, exports, module) {
    module.exports={
        getPageParam:function (location){
            var paramObj = {};
            if (location) {
                //表示带了参数 执行相应解析操作
                var tempParas = location.split('&');
                $.each(tempParas, function (key, param) {
                    var p = param.split('=');
                    paramObj[p[0]] = p[1];
                });
            }
            return paramObj;
        }
    };
});