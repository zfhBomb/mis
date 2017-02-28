define(function(require, exports, module) {
    var formMix=require('./formMixin.js');
	/**
     * 查询筛选用表单子组件
     * @module common.form
     * @class QueryItem
     */
    
    /**
    * 组件类型
    * @property type {string}
    * text文字输入框，  checkbox多选框，  radio单选框，  date日期选择，  select下拉框
    */
    
    var QueryItem = React.createClass({
        mixins:[formMix],
        componentDidMount:function(){
        	//清除按钮点击事件监听

        },
        //清除数据
        clearValue:function(){
            this.refs[this.props.name].clearValue();
        },
        render: function(){
        	console.log(this.props.children);
            var label, item
            if (this.props.label) {
                label = <label className="ldis">{this.props.label}</label>;
            }
            item = this.rendItem();
            return (
                <span className="group">
                    {label}
                    {this.props.children}
                    {item}
                </span>
            );
        }
    });
    

    
    module.exports=QueryItem;
});