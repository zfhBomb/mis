define(function(require, exports, module) {
    /**
     * html文字处理函数集合
     * @class html
     * @module common.mixins
     */

    module.exports={
        /**
         * 输出模板信息
         * @method template
         * @param data {obj} 模板输入数据
         * @param template {string} 字符串变量形式存储的模板
         * @param handler {function} 渲染完成后的回调函数
         * @returns {*|XML|string|void}
         */
        template:function(data,template,handler){//模板渲染方法
            return  template.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
                var value;
                if(!isNaN(Number(name))){//支持数字序列
                    value=data[Number(name)];
                }else if(name.indexOf('.')!=-1){
                    value=eval('data.'+name);
                }else{
                    value=data[name];
                }

                if(handler && handler[name]){
                    return handler[name](value,data);
                }else{
                    return (value===undefined)?'':value;
                }
            });
        }
    }
});