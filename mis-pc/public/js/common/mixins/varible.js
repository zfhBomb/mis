
    /**
     * 变量/对象操作支持函数集合
     * @class varible
     * @module common.mixins
     */
    module.exports={
        /**
         * 判断一个对象是否是一个数组
         * @method isArray
         * @param obj
         * @returns {boolean}
         */
        isArray:function(obj){
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        __slice:[].slice,
        /**
         * 为函数绑定参数和作用域
         * 第一个参数是函数名，后面的参数就是该函数的参数。将自动给函数的作用域绑定为当前组件的作用域。并自动执行后返回值
         * 常用语通过一个函数来表达组件的属性 （动态值）
         * @method resolveOption
         * @returns {*}
         */
        resolveOption:function(){
            var args, option;
            option = arguments[0], args = 2 <= arguments.length ? this.__slice.call(arguments, 1) : [];
            if (typeof option === 'function') {
                return option.apply(this, args);
            }
            return option;
        }
    }
