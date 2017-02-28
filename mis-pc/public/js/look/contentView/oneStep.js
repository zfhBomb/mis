var React=require("react");
//import {Button,Tabs,Input,message} from 'antd';
var Tabs=require("antd/lib/tabs");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var message=require("antd/lib/message");
var TabPane = Tabs.TabPane;

var OneStep=React.createClass({
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
	okHandler:function(){
		var val={id:this.props.data.id,state:1,who0:this.props.user.chineseName,date0:new Date(),yiJian:"值长确认",factory:this.props.user.factory};
		this.props.changeHandle(val);
	},
	peopleCanDo:function(){
		var can=false;
		if(this.props.user.position){
			if(this.props.user.position=="值长"){
				can=true;
			}else if(this.props.user.position=="管理员"){
				can=true;
			}
		}
		return can;
	},
	backHandler:function(){
		if(this.state.value){
			var val={id:this.props.data.id,state:0,info0:this.state.value,who0:this.props.user.chineseName,date0:new Date(),stop:0,yiJian:"此票作废",factory:this.props.user.factory};
			this.props.changeHandle(val);
		}else{
			this.showMessage();
		}
	},
	renderHander:function(){
		if(this.props.data.stop==0){
			return (
				<div>
					此缺陷作废
				</div>
			);
		}else{
			if(this.peopleCanDo()){
				return (
					<Tabs defaultActiveKey="1" onChange={this.callback}>
					    <TabPane tab="确认" key="1"><Button onClick={this.okHandler}>请值长确认</Button></TabPane>
					    <TabPane tab="作废" key="2">
					    	<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.getBackMsg} value={this.state.value} maxLength="255"/>
					    	<Button onClick={this.backHandler}>提交</Button>
					    </TabPane>
					</Tabs>
				);
			}else{
				return (
					<div className="waitInfo">等待值长确认</div>
				);
			}
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

module.exports =  OneStep