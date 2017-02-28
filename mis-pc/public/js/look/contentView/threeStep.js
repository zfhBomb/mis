var React=require("react");
//import {Button,Tabs,Input,message,Select} from 'antd';
var Tabs=require("antd/lib/tabs");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var message=require("antd/lib/message");
var Select=require("antd/lib/select");
var TabPane = Tabs.TabPane;
var Option = Select.Option;

var ThreeStep=React.createClass({
	getInitialState:function(){
		return {
			value:"",
			selectVal:""
		}
	},
	showMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.error('请填写完整信息');
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
	getBackMsg:function(e){
		this.setState({value:e.target.value});
	},
	okHandler:function(){
		if(this.state.value&&this.state.selectVal){
			if(this.state.selectVal=="处理完毕"){
				var val={id:this.props.data.id,state:3,who2:this.props.user.chineseName,info3:null,date3:null,who3:null,
					date2:new Date(),info2:this.state.value,yiJian:"等待验收",factory:this.props.user.factory};
				this.props.changeHandle(val);
			}else if(this.state.selectVal=="没有备品"){
				var val={id:this.props.data.id,state:2,who2:this.props.user.chineseName,
					date2:new Date(),info2:this.state.value,yiJian:this.state.selectVal,stop:2,factory:this.props.user.factory};
				this.props.changeHandle(val);
			}else{
				var val={id:this.props.data.id,state:5,who2:this.props.user.chineseName,info3:null,date3:null,who3:null,block:this.state.selectVal,
					date2:new Date(),info2:this.state.value,yiJian:"请求挂起",stop:2,factory:this.props.user.factory};
				this.props.changeHandle(val);
			}
		}else{
			this.showMessage();
		}
	},
	selectHandle:function(val){
		this.setState({selectVal:val});
	},
	getSelect:function(){
		var admin=this.props.user.position=="管理员";
		var zy=this.props.zhuanYe.substr(0,2);
		if(this.props.user.factory=="yiyanggd"){
			if(this.props.user.position=="专工"||admin){
				return (<Select onChange={this.selectHandle}  style={{ width: 200 }}>
						        <Option value="处理完毕">处理完毕</Option>
								<Option value="没有备品">没有备品</Option>
								<Option value="大小修处理">大小修处理</Option>
								<Option value="停机处理">停机处理</Option>
						    </Select>)
			}else if(this.props.user.position=="检修"){
				return (<Select onChange={this.selectHandle}  style={{ width: 200 }}>
						        <Option value="处理完毕">处理完毕</Option>
						    </Select>)
			}
		}else{
			if(this.props.user.position==("专工"+zy)||admin){
				return (<Select onChange={this.selectHandle}  style={{ width: 200 }}>
						        <Option value="处理完毕">处理完毕</Option>
								<Option value="没有备品">没有备品</Option>
								<Option value="大小修处理">大小修处理</Option>
								<Option value="停机处理">停机处理</Option>
						    </Select>)
			}else if(this.props.user.position==("检修"+zy)){
				return (<Select onChange={this.selectHandle}  style={{ width: 200 }}>
						        <Option value="处理完毕">处理完毕</Option>
						    </Select>)
			}
		}
		
	},
	renderHander:function(){
			if(this.peopleCanDo()){
			return (
				<Tabs defaultActiveKey="1" onChange={this.callback}>
				    <TabPane tab="缺陷处理说明" key="1">
				    	{this.getSelect()}
				    	<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.getBackMsg} value={this.state.value} maxLength="255"/>
				    	<Button onClick={this.okHandler}>提交</Button>
				    </TabPane>
				</Tabs>
			);
		}else{
			return (
					<div className="waitInfo">等待检修处理完毕</div>
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

module.exports =  ThreeStep