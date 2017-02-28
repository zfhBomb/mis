var React=require("react");
//import {Button,Tabs,Input,message} from 'antd';
var Tabs=require("antd/lib/tabs");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var message=require("antd/lib/message");
var TabPane = Tabs.TabPane;

var TwoStep=React.createClass({
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
	getBackMsg:function(e){
		this.setState({value:e.target.value});
	},
	peopleCanDo:function(){
		var zy=this.props.zhuanYe.substr(0,2);
		var can=false;
		if(this.props.user.position){
			if(this.props.user.factory=="yiyanggd"&&(this.props.user.position=="专工"||this.props.user.position=="检修")){
				can=true;
			}else if(this.props.user.position==("检修"+zy)||this.props.user.position==("专工"+zy)){
				can=true;
			}else if(this.props.user.position=="管理员"){
				can=true;
			}
		}
		return can;
	},
	okHandler:function(){
		var val={id:this.props.data.id,state:2,who1:this.props.user.chineseName,date1:new Date(),info1:"",yiJian:"正在处理",factory:this.props.user.factory};
		this.props.changeHandle(val);
	},
	backHandler:function(){
		if(this.state.value){
			var val={id:this.props.data.id,state:0,info1:this.state.value,who1:this.props.user.chineseName,date1:new Date(),yiJian:"等待值长确认",factory:this.props.user.factory};
			this.props.changeHandle(val);
		}else{
			this.showMessage();
		}
	},
	renderHander:function(){
			if(this.peopleCanDo()){
			return (
				<Tabs defaultActiveKey="1" onChange={this.callback}>
				    <TabPane tab="确认" key="1"><Button onClick={this.okHandler}>请检修确认</Button></TabPane>
				    <TabPane tab="退回" key="2">
				    	<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.getBackMsg} value={this.state.value} maxLength="255"/>
				    	<Button onClick={this.backHandler}>提交</Button>
				    </TabPane>
				</Tabs>
			);
		}else{
			return (
					<div className="waitInfo">等待检修或专工确认</div>
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

module.exports =  TwoStep