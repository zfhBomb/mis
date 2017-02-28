var React=require("react");
//import { Steps,Popover } from 'antd';
var Steps=require("antd/lib/steps");
var Popover=require("antd/lib/popover");
var QueryTool=require("./queryTool.js");
var LookTable=require("./tabel.js");
var Ajax=require("../common/ajax.js");
var OneStep=require("./contentView/oneStep.js");
var TwoStep=require("./contentView/twoStep.js");
var ThreeStep=require("./contentView/threeStep.js");
var FourStep=require("./contentView/fourStep.js");
var FiveStep=require("./contentView/fiveStep.js");
var Step = Steps.Step;


var StepItem=React.createClass({
	//this.props.time=="1970-01-01 08:00:00"?"":
	render:function(){
		var item=null;
            if(this.props.info){
                item=<Popover placement="top" content={this.props.info} trigger="click">
				    	<p>{this.props.info}</p>
				    </Popover>
               }
        var list=this.props.info?item:<p>{this.props.state}</p>;
		return (
			<div>
				{list}
				<p>{this.props.who}</p>
				<p>{this.props.time}</p>
			</div>
		)
	}
});



var ActView=React.createClass({
	mixins: [Ajax],
	getInitialState:function(){
		return {
			status:"wait",
			changeData:{},
			lastId:this.props.data.id
		}
	},
	componentDidMount:function(){
		this.ajax("/change",{id:this.props.data.id,factory:this.props.user.factory});
	},
	componentDidUpdate:function(){
		if(this.state.lastId==this.props.data.id){
			
		}else{
			this.setState({lastId:this.props.data.id},()=>{
				this.ajax("/change",{id:this.props.data.id,factory:this.props.user.factory});
			})
		}
	},
	loadSuccess:function(data){
		this.setState({changeData:data},()=>{
			this.props.reLoad();
		});
	},
	changeHandle:function(data){
		this.ajax("/change",data);
	},
	getActContent:function(){
		var data=this.state.changeData;
		switch (data.state) {
                case 0:
                    return <OneStep user={this.props.user} changeHandle={this.changeHandle} 
                    data={data} zhuanYe={this.props.data.zhuanYe}/>;
                case 1:
                    return <TwoStep user={this.props.user} changeHandle={this.changeHandle} 
                    data={data} zhuanYe={this.props.data.zhuanYe}/>;
                case 2:
                    return <ThreeStep user={this.props.user} changeHandle={this.changeHandle} 
                    data={data} zhuanYe={this.props.data.zhuanYe}/>;
                case 3:
                    return <FourStep user={this.props.user} changeHandle={this.changeHandle} 
                    data={data} zhuanYe={this.props.data.zhuanYe}/>;
                case 5:
                    return <FiveStep user={this.props.user} changeHandle={this.changeHandle} 
                    data={data} zhuanYe={this.props.data.zhuanYe}/>;
                default:
                    return "";
       }
		
	},
	getStep:function(){
		var data=this.state.changeData;
		if(data.state==5||data.stop==5){
			return (<Step title="缺陷挂起" description={<StepItem state={data.state==5?"挂起待确认":"挂起已确认"} info={data.info3} who={data.who3} time={data.date3}/>} />)
		}else{
			return (<Step title="运行验收" description={<StepItem state={data.state>=4?"运行已验收":"待运行验收"} info={data.info3} who={data.who3} time={data.date3}/>} />)
		}
		
	},
	render:function(){
		var data=this.state.changeData;
		var current=data.state==5?3:data.state;
		return (
			<div className="tableActView">
				<div className="actViewLook">
					<span>缺陷信息</span>
					 <Steps current={current} status={data.state==data.stop?"error":""}>
					    <Step title="值长确认" description={<StepItem state={data.state>=1?"值长已确认":"待值长确认"} info={data.info0} who={data.who0} time={data.date0}/>} />
					    <Step title="检修确认" description={<StepItem state={data.state>=2?"检修已接收":"待检修接收"} info={data.info1} who={data.who1} time={data.date1}/>} />
					    <Step title="检修结果" description={<StepItem state={data.state>=3?"缺陷已处理":"缺陷待处理"} info={data.info2} who={data.who2} time={data.date2}/>} />
					    {this.getStep()}
					  </Steps>
				</div>
				<div className="actViewAction">{this.getActContent()}</div>
			</div>
		)
	}
});

module.exports = ActView