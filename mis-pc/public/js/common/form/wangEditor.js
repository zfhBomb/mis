define(function(require, exports, module) {
    var domMix=require('../mixins/dom.js');
    /**
     * react封装的jq  wangEditor富文本框插件，参数和原来的一样
     * @module common.form
     * @class wangEditor
     */
	
	/**
     *  获取文本框内容（通过ref调用）
     *  @property getText {fuc}
     *  
     */
    
    /**
     *  追加内容（通过ref调用）
     *  @property appendText {fuc}
     *  
     */
    
    /**
     *  清空内容（通过ref调用）
     *  @property clearText {fuc}
     *  
     */
    
    /**
     *  监听文本框输入onChange
     *  @property changeHander {fuc}
     *  
     */
    
    /**
     *  禁用
     *  @property disable {Booleans}
     *  @default false
     */
    
    /**
     *  需要移除的功能配置项
     *  @property removeConfig {arr}
     *  @default []
     */
    
    /**
     *  语言配置，en 为英语
     *  @property language {string}
     *  @default 'ch'
     */
    
    /**
     *  设置菜单栏吸顶状态 false关闭   可以输入一个数字设置距离浏览器顶部像素
     *  @property language {Number}
     *  @default false
     */
    var WangEditor=React.createClass({
        mixins:[domMix],
        getDefaultProps:function(){
            return {
                id:"ztEditor",//需要显示文本框元素的id
                disable:false,
                removeConfig:[],
                language:'ch',
                fixed:false
            }
        },
        componentDidMount:function(){
            this.editor = new wangEditor(this.id);
            //配置工具栏项目
            this.editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
            	for(var i=0;i<this.props.removeConfig.length;i++){
            		if (item === this.props.removeConfig[i]) {
                		return null;
            		}
            	}
            	return item;
        	}.bind(this));
        	//配置语言
        	if(this.props.language==="en"){
        		this.editor.config.lang = wangEditor.langs['en'];
        	}
        	//配置工具栏吸顶
        	this.editor.config.menuFixed = this.props.fixed;
        	//表情包
        	this.editor.config.emotions = {
    			'default': {
        					title: '默认',  // 组名称
        					data: '../../data/expression.json'  // data 可以是一个url地址，访问该地址要能返回表情包的json文件
        				}
    		};
    		// 上传图片
    		this.editor.config.uploadImgUrl = '/upload';
            var change=this.props.changeHander;
            this.editor.onchange = function () {
        		// 编辑区域内容变化时，实时打印出当前内容
        		change(this.$txt.text());
    		};
            this.editor.create();
            if(this.props.disable){
            	this.editor.disable();
            }
        },
        getText:function(){
        	return this.editor.$txt.formatText();
        },
        appendText:function(content){
        	return this.editor.$txt.append(content);
        },
        clearText:function(){
        	this.editor.$txt.html('<p><br></p>');
        },
        render:function(){
            this.id=this.props.id+parseInt(Math.random()*10000);
            return (
                <textarea className="col-xs-10 col-sm-8"  rows="10" name="signature" id={this.id} placeholder="请输入个人介绍..."></textarea>
            );
        }
    });
    module.exports=WangEditor;

});