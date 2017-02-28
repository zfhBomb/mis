import React from "react";
//import { Form, Input, Button, Checkbox,Modal } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Select=require("antd/lib/select");
var Checkbox=require("antd/lib/checkbox");
var Modal=require("antd/lib/modal");
var Ajax=require("./common/ajax");
var Reflux=require("reflux");
var IndexAction=require("./actions/indexAction.js");
import Reg from "./reg.js";
var FormItem = Form.Item;
var Option = Select.Option;

var Code=React.createClass({
	mixins:[Ajax],
	getInitialState:function(){
		return {
			data:""
		}
	},
	reRenderCode:function(){
		this.ajax("/login",{});
	},
	componentDidMount:function(){
		this.ajax("/login",{});
	},
	loadSuccess:function(data){
		this.setState({data:data.data});
	},
	render:function(){
		return(
		<div className="codeImg" onClick={this.reRenderCode}>
			<img src={"data:image/png;base64,"+this.state.data} style={{width:80+"px",height:30+"px",backgroundColor:"gray"}}/>
		</div>
		)
	}
});

var Factory=React.createClass({
	mixins:[Ajax],
	getInitialState:function(){
		return {
			data:[]
		}
	},
	componentDidMount:function(){
		this.ajax("/get/factory",{});
	},
	loadSuccess:function(data){
		this.setState({data:data});
	},
	render:function(){
		if(this.state.data.length>0){
			var lists=this.state.data.map(function(list,key){
				return(
					<Option value={list.val} key={key}>{list.name}</Option>
				)
			});
		}else{
			var lists=<Option></Option>
		}
		return (
				<FormItem label="公司" labelCol= {{ span: 6 }} wrapperCol= {{ span: 14 }}>
					<Select {...this.props.getFieldProps("factory")}>
						{lists}
					</Select>
				</FormItem>
		);
	}
});

var Login=React.createClass({
	getInitialState:function(){
		return { 
			visible: false,
			msg:"",
			loginErr:0,
			code:0
		};
	},
	showModal:function() {
	    this.setState({
	      visible: true,
	    });
    },
    handleOk:function(data) {
    	data.state=0;
	    $.ajax({
	    	type:"post",
	    	dataType: "json",
	    	url:"/reg",
	    	async:true,
	    	data:data,
	    	success:(data)=>{
	    		if(data.msg==1){
	    			this.setState({
				      visible: false,
				    });
	    		}else if(data.msg==0){
	    			this.setState({msg:"用户名已存在"});
	    		}else if(data.msg==2){
	    			this.setState({msg:"验证码错误"});
	    		}
			},
			loadError:()=>{
				this.setState({msg:"注册失败"});
			}
	    });
	    
	},
	clearMsg:function(){
		this.setState({msg:""});
	},
    handleCancel:function() {
	    this.setState({
	      visible: false,
	    });
	},
		handleSubmit:function(e) {
		    e.preventDefault();
		    $.ajax({
		    	type:"post",
		    	dataType: "json",
		    	url:"/login",
		    	async:true,
		    	data:this.props.form.getFieldsValue(),
		    	success:(data)=>{
					if(data.ok==1){
						this.setState({loginErr:1},function(){
							this.refs.code.reRenderCode();
						}.bind(this));
					}else if(data.ok==2){
						this.setState({loginErr:2},function(){
							this.refs.code.reRenderCode();
						}.bind(this));
					}else if(data.ok==0){
						IndexAction.getUser(data.user);
					}else if(data.ok==3){
						this.setState({loginErr:3},function(){
							this.refs.code.reRenderCode();
						}.bind(this));
					}
				}
		    });
	    },
	  render:function() {
	    const { getFieldProps } = this.props.form;
	    return (
	    <div className="loginBox">
	    	<h1>电厂缺陷管理系统</h1>
				      <Form horizontal onSubmit={this.handleSubmit} >
				        <FormItem
				          label="账户"
				          validateStatus={this.state.loginErr===1?"error":""}
							help={this.state.loginErr===1?"账户不存在":""}
							labelCol= {{ span: 6 }} wrapperCol= {{ span: 14 }}
				        >
				          <Input placeholder="请输入账户名" maxLength="30"
				            {...getFieldProps('userName')}
				          />
				        </FormItem>
				        <FormItem
				          label="密码"
				          validateStatus={this.state.loginErr===2?"error":""}
							help={this.state.loginErr===2?"密码不正确":""}
							labelCol= {{ span: 6 }} wrapperCol= {{ span: 14 }}
				        >
				          <Input type="password" placeholder="请输入密码" maxLength="30"
				            {...getFieldProps('password')}
				          />
				        </FormItem>
				        <Factory getFieldProps={getFieldProps}/>
				        <FormItem
				        	label="验证码"
				        	validateStatus={this.state.loginErr===3?"error":""}
							help={this.state.loginErr===3?"验证码不正确":""}
							labelCol= {{ span: 6 }} wrapperCol= {{ span: 14 }}
				        	>
				        <div className="codeBox">
							<Input {...getFieldProps('code')} placeholder="请输入右侧验证码"  maxLength="4" />
							<Code ref="code"/>
						</div>
						</FormItem>
				        <Button type="primary" htmlType="submit" style={{margin:0+" "+10+"%",marginLeft:26+"%"}}>登录</Button>
				        <Button onClick={this.showModal} style={{margin:0+" "+10+"%"}}>注册</Button>
				      </Form>
		    <Modal title="用户注册" visible={this.state.visible}
	          onOk={this.handleOk} onCancel={this.handleCancel}
	          footer={null}
	        >
	          <Reg handleOk={this.handleOk} msg={this.state.msg} ref="reg" clearMsg={this.clearMsg}/>
	        </Modal>
	    </div>
	    );
	  },
	});
	
Login = Form.create()(Login);
export default Login


//				        <FormItem>
//				          <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
//				        </FormItem>