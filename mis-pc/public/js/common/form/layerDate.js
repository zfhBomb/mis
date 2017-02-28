define(function(require, exports, module) {
	
	/**
     * react封装的jq  layerDate日期插件，参数和原来的一样
     * @module common.form
     * @class layerDate
     */
	
	/**
     *  触发事件
     *  @property event {string}
     *  @default 'click'
     */
    
    /**
     *  日期格式
     *  @property format {string}
     *  @default 'YYYY-MM-DD hh:mm:ss'
     */
     
    /**
     *  是否开启时间选择
     *  @property istime {Booleans}
     *  @default false
     */
     
    /**
     *  是否显示清空
     *  @property isclear {Booleans}
     *  @default true
     */
    
    /**
     *  是否显示今天
     *  @property istoday {Booleans}
     *  @default true
     */
    
    /**
     *  是否显示确认
     *  @property issure {Booleans}
     *  @default true
     */
    
    /**
     *  是否显示节日
     *  @property festival {Booleans}
     *  @default true
     */
     
    /**
     *  最小日期
     *  @property min {string}
     *  @default '1900-01-01 00:00:00'
     */
     
    /**
     *  最大日期
     *  @property max {string}
     *  @default '2099-12-31 23:59:59'
     */
    
    /**
     *  开始日期
     *  @property start {string}
     *  @default '2014-6-15 23:00:00'
     */
       
    /**
     *  是否固定在可视区域
     *  @property fixed {Booleans}
     *  @default false
     */
       
    /**
     *  css z-index 层级 {Number}
     *  @property zIndex
     *  @default 99999999
     */
        
    /**
     *  选择好日期的回调
     *  @property choose {fuc}
     *  @default function(datas){
                    	this.timeChange(datas);
                    	特别提醒：如需要指定回调一定要保留上面“this.timeChange(datas);”
            	}
     */
	var DateSelect=React.createClass({
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
        		choose:function(datas){//选择好日期的回调
                    	this.timeChange(datas);
            	},
        		width:240
            }
        },
		componentDidMount:function(){
			var that=this;
			var ZTDate={
                elem: '#'+this.id, //需显示日期的元素选择器
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
            	choose: this.props.choose.bind(that)
           };
           setTimeout(function(){
                laydate(ZTDate);
		   },100);
		},
		getInitialState:function(){
			return {
				value:this.props.value
			}
		},
		timeChange:function(datas){
			//this.props.callBack(datas);
            this.setState({value:datas});
        },
        clearValue:function(){
            this.setState({value:""});
            $('.dateInput').val('');
        },
		render:function(){
		    this.id=this.props.id+Math.random()*10000;
			return (
					<span className="input-icon input-icon-right">
							<input style={{width:this.props.width+'px'}} className="dateInput" type="text" ref="input" id={this.id} readOnly="readonly" name={this.props.name}/>
							<i className="icon-calendar"></i>
					</span>
			);
		}
	});


module.exports=DateSelect;
});