var React=require("react");
//import {Button,Tabs,Input,message,Select} from 'antd';
var Tabs=require("antd/lib/tabs");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var message=require("antd/lib/message");
var Select=require("antd/lib/select");
var TabPane = Tabs.TabPane;

var FourStep=React.createClass({
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
			if(this.props.user.factory=="yiyanggd"&&this.props.user.position=="值长"){
				can=true;
			}else if(this.props.user.position.indexOf("主值")>-1){
				can=true;
			}else if(this.props.user.position=="管理员"){
				can=true;
			}
		}
		return can;
	},
	getBackMsg:function(e){
		this.setState({value:e.target.value});
	},
	okHandler:function(){
		var val={id:this.props.data.id,state:4,who3:this.props.user.chineseName,date3:new Date(),info3:"",yiJian:"缺陷闭环",factory:this.props.user.factory};
		this.props.changeHandle(val);
	},
	backHandler:function(){
		if(this.state.value){
			var val={id:this.props.data.id,state:2,info3:this.state.value,who3:this.props.user.chineseName,date3:new Date(),yiJian:"运行退回",stop:3,factory:this.props.user.factory};
			this.props.changeHandle(val);
		}else{
			this.showMessage();
		}
	},
	renderHander:function(){
			if(this.peopleCanDo()){
			return (
				<Tabs defaultActiveKey="1" onChange={this.callback}>
				    <TabPane tab="确认" key="1"><Button onClick={this.okHandler}>请运行确认</Button></TabPane>
				    <TabPane tab="退回" key="2">
				    	<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.getBackMsg} value={this.state.value} maxLength="255"/>
				    	<Button onClick={this.backHandler}>提交</Button>
				    </TabPane>
				</Tabs>
			);
		}else{
			return (
				<div className="waitInfo">等运行验收</div>
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

module.exports =  FourStep