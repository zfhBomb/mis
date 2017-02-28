/**
 * 文档对象操作 混合函数包
 * @class dom
 * @module common.mixins
 */

    module.exports={
        /**
         * 清楚浏览器窗口中的浮层。
         * @param value
         */
        clearPop:function(value){
            if(!value){
                $(document).one('click',function(){
                    this.setState({
                        openned:false
                    });
                }.bind(this));
            }
        },
        /**
         * 获取div高度
         * @method divHeight
         * @param selector {string} jquery选择器
         */
        divHeight:function(selector){
            return $(selector).height();
        },
        /**
         * 获取div宽度
         * @method divWidth
         * @param selector {string} jquery选择器
         */
        divWidth:function(selector){
            return $(selector).width();
        },
        /**
         * 获取浏览器屏幕高度和宽度
         * @method getScreen
         * @returns {{height:| width:}}
         */
        getScreen:function(){
            var screen={};
            // 获取窗口宽度
            if (window.innerWidth)
                screen.width = window.innerWidth;
            else if ((document.body) && (document.body.clientWidth))
                screen.width = document.body.clientWidth;
            // 获取窗口高度
            if (window.innerHeight)
                screen.height = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))
                screen.height = document.body.clientHeight;
            // 通过深入 Document 内部对 body 进行检测，获取窗口大小
            if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
            {
                screen.height = document.documentElement.clientHeight;
                screen.width = document.documentElement.clientWidth;
            }
            return screen;
        },
        /**
         * 获取屏幕宽度
         * @method getScreenWidth
         * @returns {*}
         */
        getScreenWidth:function(){
            return this.getScreen().width;
        },
        /**
         * 获取屏幕高度
         * @method getScreenHeight
         * @returns {*}
         */
        getScreenHeight:function(){
            return this.getScreen().height;
        },
        /**
         * 提取表单数据，并返回key-value形式的json对象
         * @method getFormData
         * @param form
         * @returns {jsonObj}
         */
        getFormData:function(form){
            var a=form.serializeArray();
            var o={};
            $.each(a, function(index,p) {
            	if(this.value!=""){
            		if(this.value=='on'){
                    	this.value='true';
                	}
                	if (o[this.name]) {
                    	o[this.name]+=(','+p.value);
                	} else {
                    	o[this.name] = this.value || '';
                	}
            	}
                
            });
            return o;
        },
        /**
         * 在id后面追加一个随机数，防止冲突。
         * @param id {string}
         * @returns {string}
         */
        geneId:function(id){
            return id+Math.random()*10000;
        },
        /**
         * 将html中的多class(以空格方式分开的，转换成jquery 或es5能识别的select （空格换成点）
         * @param htmlCss {string} html classes表达式
         * @returns {string}
         */
        switchHtmlClsToJQ:function(htmlCss){
            var sp=htmlCss.split(' ');//按空格拆分htmlCss字符串。
            var newStr='';

            if(sp.length>1){

                $.each(sp,function(index){
                    newStr+='.';
                    newStr+=this;
                });
            }else{
                newStr='.'+htmlCss;
            }
            return newStr;
        }

    }
