var React=require("react");
//import {Button,Tabs,Input,message,Select} from 'antd';
var Tabs=require("antd/lib/tabs");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var message=require("antd/lib/message");
var Select=require("antd/lib/select");
var TabPane = Tabs.TabPane;

var FiveStep=React.createClass({
	getInitialState:function(){
		return {
			value:""
		}
	},
	showMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.success('输入内容不能为空');
	},
	peopleCanDo:function(){
		var can=false;
		if(this.props.user.position){
			if(this.props.user.factory=="yiyanggd"
				&&(this.props.user.position=="部长"
				||this.props.user.position=="管理员"
				||this.props.user.position=="副总经理"
				||this.props.user.position=="总经理")){
				can=true;
			}else if(this.props.user.position=="发电部长"
				||this.props.user.position=="管理员"
				||this.props.user.position=="副总经理"
				||this.props.user.position=="总经理"){
				can=true;
			}
		}
		return can;
	},
	getBackMsg:function(e){
		this.setState({value:e.target.value});
	},
	okHandler:function(){
		var val={id:this.props.data.id,state:2,who3:null,date3:null,info3:null,yiJian:this.props.data.block,factory:this.props.user.factory};
		this.props.changeHandle(val);
	},
	backHandler:function(){
		if(this.state.value){
			var val={id:this.props.data.id,state:2,info3:this.state.value,who3:this.props.user.chineseName,date3:new Date(),yiJian:"挂起退回",stop:5,factory:this.props.user.factory};
			this.props.changeHandle(val);
		}else{
			this.showMessage();
		}
	},
	renderHander:function(){
			if(this.peopleCanDo()){
			return (
				<Tabs defaultActiveKey="1" onChange={this.callback}>
				    <TabPane tab="确认" key="1"><Button onClick={this.okHandler}>挂起确认</Button></TabPane>
				    <TabPane tab="退回" key="2">
				    	<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.getBackMsg} value={this.state.value} maxLength="255"/>
				    	<Button onClick={this.backHandler}>提交</Button>
				    </TabPane>
				</Tabs>
			);
		}else{
			return (
				<div className="waitInfo">等待挂起确认</div>
			);
		}
	},
	callback:function(key) {
	  //console.log(key);
	},
	render:function(){
		return (
			this.renderHander()
		)
	}
});

module.exports =  FiveStep