var React=require("react");
//import { Form, Input, Button, Checkbox } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Tabs=require("antd/lib/tabs");
var TabPane = Tabs.TabPane;
var FormItem = Form.Item;
var Ajax=require("../common/ajax.js");
var message=require("antd/lib/message");
var RegTabel=require("./regTabel.js");
var PeopleTabel=require("./peopleTabel.js");
var QueryTool=require('./queryTool.js');


var Set=React.createClass({
	getInitialState:function(){
		return {
			loginErr:0
		}
	},
	showMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.success('修改成功');
	},
	showErrMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.error('请输入新密码');
	},
	handleSubmit:function(e) {
		e.preventDefault();
		var formData=this.props.form.getFieldsValue();
		if(formData.newPass!=formData.checkPass){
			this.setState({loginErr:1});
		}else if(!formData.newPass){
			this.showErrMessage();
		}else{
			$.ajax({
		    	type:"post",
		    	dataType: "json",
		    	url:"/login",
		    	async:true,
		    	data:{userName:this.props.user.userName,password:formData.oldPass,newPass:formData.newPass,factory:this.props.user.factory},
		    	success:this.loadSuccess,
				loadError:()=>{
					this.setState({msg:"修改失败"});
				}
		    });
			//this.ajax("/login",{userName:this.props.user.userName,password:formData.oldPass,newPass:formData.newPass});
		}
	},
	loadSuccess:function(data){
		if(data.ok==0){
			this.setState({loginErr:0},()=>{
				this.showMessage();
				this.props.form.resetFields();
			});
		}else if(data.ok==2){
			this.setState({loginErr:2});
		}
	},
	render:function(){
		var getFieldProps= this.props.form.getFieldProps;
		return (
			<div className="right__pageBox">
				<div className='pageBox__set'>
				      <Form horizontal onSubmit={this.handleSubmit} >
				        <FormItem
				          label="原密码"
				          validateStatus={this.state.loginErr===2?"error":""}
							help={this.state.loginErr===2?"密码错误":""}
				        >
				          <Input placeholder="请输入原密码" type="password"
				            {...getFieldProps('oldPass')}
				          />
				        </FormItem>
				        <FormItem
				          label="新密码"
				        >
				          <Input type="password" placeholder="请输入密码"
				            {...getFieldProps('newPass')}
				          />
				        </FormItem>
				        <FormItem
				          label="确认新密码"
				          validateStatus={this.state.loginErr===1?"error":""}
							help={this.state.loginErr===1?"两次密码不一致":""}
				        >
				          <Input type="password" placeholder="请输入密码"
				            {...getFieldProps('checkPass')}
				          />
				        </FormItem>
				        <Button type="primary" htmlType="submit" style={{margin:0+" "+10+"%"}}>确定</Button>
				      </Form>
				</div>
			</div>
		)
	}
});

Set = Form.create()(Set);

var AdminSet=React.createClass({
	render:function(){
		return (
			<div className="right__pageBox">
				<Tabs defaultActiveKey="1">
					<TabPane tab="注册批准" key="1">
						<RegTabel user={this.props.user}/>
					</TabPane>
					<TabPane tab="用户管理" key="2">
						<PeopleTabel user={this.props.user}/>
					</TabPane>
				</Tabs>
			</div>
		);
	}
});

var SetBox=React.createClass({
	componentDidMount:function(){
	    if(!this.props.user.userName){
	        alert("本系统免费使用，但需要公司开户才能登陆使用，开户请联系QQ:2821230290");
	    }
	},
	render:function(){
		if(this.props.user.userName.indexOf("admin")>-1)
		{
			return (
				<AdminSet {...this.props} />
			);
		}else if(this.props.user.userName){
			return (
				<Set {...this.props} />
			);
		}else{
			return (
				<div>请登录~~~~~</div>
			);
		}
		
	}
});



module.exports = SetBox