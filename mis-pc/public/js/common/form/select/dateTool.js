define(function(require, exports, module) {
	var LayerDate=require("../layerDate.js");

var DateTool=React.createClass({
	getDefaultProps:function(){
            return {
                id:"ztDate", //需显示日期的元素选择器
        		event: 'click', //触发事件
        		format: 'YYYY-MM-DD hh:mm:ss', //日期格式
        		istime: false, //是否开启时间选择
        		isclear: true, //是否显示清空
        		istoday: true, //是否显示今天
        		issure: true, //是否显示确认
        		festival: true, //是否显示节日
        		min: '1900-01-01 00:00:00', //最小日期
        		max: '2099-12-31 23:59:59', //最大日期
        		start: '2014-6-15 23:00:00',    //开始日期
        		fixed: false, //是否固定在可视区域
        		zIndex: 99999999, //css z-index
        		width:170
            }
        },
	componentDidMount:function(){
            var t=this;
            var start = {
            	elem: '#'+this.id+"start", //需显示日期的元素选择器
        		event: this.props.event,
        		format: this.props.format,
        		istime: this.props.istime,
        		isclear: this.props.isclear,
        		istoday: this.props.istoday,
        		issure: this.props.issure,
        		festival: this.props.festival,
        		min: this.props.min,
        		max: this.props.max,
        		start: this.props.start,
        		fixed: this.props.fixed,
        		zIndex: this.props.zIndex,
                choose: function(datas){
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                    this.timeChange();
                }.bind(t)
            };
            var end = {
                elem: '#'+this.id+"end", //需显示日期的元素选择器
        		event: this.props.event,
        		format: this.props.format,
        		istime: this.props.istime,
        		isclear: this.props.isclear,
        		istoday: this.props.istoday,
        		issure: this.props.issure,
        		festival: this.props.festival,
        		min: this.props.min,
        		max: this.props.max,
        		start: this.props.start,
        		fixed: this.props.fixed,
        		zIndex: this.props.zIndex,
                choose: function(datas){
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }.bind(t)
            };
            setTimeout(function(){
                laydate(start);
                laydate(end);
            },100);
        },
        clearValue:function(){
        	$('#'+this.id+"start").val('');
        	$('#'+this.id+"end").val('');
        },
        timeChange:function(){
            var start=this.refs.start.value;
            var end=this.refs.end.value;
            var time={
                start:start,
                end:end
            }
            if(this.props.timeChange){
            	this.props.timeChange(time);
            }
            
        },
        render:function(){
        	this.id=Math.random()*10000;
            return (
            	<div>
	                <span className="input-icon input-icon-right">
	                    <input  style={{width:this.props.width+'px'}} className="dateInput" type="text" ref="start" id={this.id+"start"} readOnly="readonly" name={this.props.name}/>
	                    <i className="icon-calendar"></i>
	                </span> —
	                <span className="input-icon input-icon-right">
	                    <input  style={{width:this.props.width+'px'}} className="dateInput" ref="end" type="text"  id={this.id+"end"} readOnly="readonly" name={this.props.name} />
	                    <i className="icon-calendar"></i>
	                </span>
	            </div>
            )
        }
        
});






module.exports=DateTool;
});