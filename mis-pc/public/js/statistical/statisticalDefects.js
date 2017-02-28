var React=require("react");
var QueryTool=require("./queryTool.js");
var Ajax=require("../common/ajax.js");
var message=require("antd/lib/message");


var StatisticalDefects=React.createClass({
	mixins:[Ajax],
	getInitialState:function(){
		return {
			data:{}
		}
	},
	showErrMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.error('请填写完整时间');
	},
	getValue:function(val){
		if(val.dateTool.startValue&&val.dateTool.endValue){
			this.ajax("/statistical",{time:val.dateTool,factory:this.props.user.factory})
		}else{
			this.showErrMessage();
		}	
	},
	loadSuccess:function(data){
		this.setState({data:data},function(){
			this.renderCharts();
		}.bind(this));
	},
	renderCharts:function(){
		require.ensure([], function(require) {
			    var echarts = require('../../cdn/echarts.min.js');
			    var myChart1 = echarts.init(this.refs.charts1);
				var option1 = {
			    title : {
			        text: '缺陷类型统计',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['一类缺陷','二类缺陷','三类缺陷']
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {
			                show: true, 
			                type: ['pie', 'funnel'],
			                option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
			            },
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    calculable : true,
			    series : [
			        {
			            name:'缺陷类型',
			            type:'pie',
			            radius : '55%',
			            center: ['50%', '60%'],
			            data:[
			                {value:this.state.data["一类缺陷"], name:'一类缺陷'},
			                {value:this.state.data["二类缺陷"], name:'二类缺陷'},
			                {value:this.state.data["三类缺陷"], name:'三类缺陷'}
			            ]
			        }
			    ]
			};			
			myChart1.setOption(option1); 
			
			
			var myChart2 = echarts.init(this.refs.charts2);
            var	option2 = {
			    color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {
			                show: true, 
			                type: ['bar', 'funnel'],
			                option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
			            },
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['锅炉', '汽机', '电气', '化水', '热控'],
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'缺陷数量',
			            type:'bar',
			            barWidth: '60%',
			            data:[this.state.data["锅炉专业"], this.state.data["汽机专业"], this.state.data["电气专业"], this.state.data["化学专业"], this.state.data["热控专业"]]
			        }
			    ]
			};

			myChart2.setOption(option2);
			
			
			var myChart3 = echarts.init(this.refs.charts3);
            var	option3 = {
			    color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            magicType : {
			                show: true, 
			                type: ['bar', 'funnel'],
			                option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
			            },
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : ['正在处理', '没有备品', '大小修处理', '运行退回', '等待值长确认',"此票作废","缺陷闭环","值长确认","等待验收"],
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'缺陷数量',
			            type:'bar',
			            barWidth: '60%',
			            data:[this.state.data["正在处理"], this.state.data["没有备品"], this.state.data["大小修处理"], this.state.data["运行退回"], this.state.data["等待值长确认"],this.state.data["此票作废"],this.state.data["缺陷闭环"],this.state.data["值长确认"],this.state.data["等待验收"]]
			        }
			    ]
			};

			myChart3.setOption(option3);
			
		}.bind(this),"charts");	
	},
	render:function(){
		return (
			<div className="right__pageBox">
				<QueryTool getValue={this.getValue}/>
				<div ref="charts3" className="pageBox__charts3" ></div>
				<div ref="charts2" className="pageBox__charts2" ></div>
				<div ref="charts1" className="pageBox__charts1" ></div>
			</div>
		)
	}
});

module.exports = StatisticalDefects