import React from "react";
//import { Form, Input, Button,Cascader } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Cascader=require("antd/lib/cascader");
var Select=require("antd/lib/select");
var message=require("antd/lib/message");
import Ajax from "./common/ajax.js"
var Option = Select.Option;
var FormItem = Form.Item;


var Code=React.createClass({
	mixins:[Ajax],
	getInitialState:function(){
		return {
			data:""
		}
	},
	reRenderCode:function(){
		this.ajax("/reg",{});
	},
	componentDidMount:function(){
		this.ajax("/reg",{});
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
	changeHandler:function(val){
		this.props.changeHandler(val);
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
					<Select {...this.props.getFieldProps("factory")} onSelect={this.changeHandler}>
						{lists}
					</Select>
				</FormItem>
		);
	}
});

var FormList=React.createClass({
	getInitialState:function(){
		return { 
			textNull:false
		};
	},
	textCheck:function(e){
  	if(e.target.value==""){
  		this.setState({textNull:true});
  	}else{
  		this.setState({textNull:false});
  	}
  },
	render:function(){
		var that=this;
			const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    let getFieldProps=this.props.getFieldProps;
    	if(this.props.data.ctype=="text"){
    		var list=<Input type={this.props.data.type} onBlur={this.textCheck} {...getFieldProps(this.props.data.key, { initialValue: '' })} placeholder={this.props.data.placeholder} />;
    	}else if(this.props.data.ctype=="cascader"){
    		var list=<div>
    					<Cascader options={this.props.data.options} expandTrigger={this.props.data.expandTrigger} onChange={this.props.data.onChange}/><Input type="hidden" {...getFieldProps(this.props.data.key, { initialValue: this.props.data.selectData})} />
    					</div>;
    	}
		return (
			<FormItem
			    {...formItemLayout}
			    label={this.props.data.title}
				validateStatus={this.state.textNull?"error":""}
				help={this.state.textNull?"填写内容不能为空":""}
			    >
			    {list}
			</FormItem>
		);
	}
});




var Reg = React.createClass({
	mixins:[Ajax],
	getInitialState:function(){
		return { 
			datas: [],
			positionData:"",
		};
	},
	showErrMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.error('请填写完整信息');
	},
  handleSubmit:function(e) {
    e.preventDefault();
    var data=this.props.form.getFieldsValue();
    var d=Object.values(data);
    var isNull=false;
    for(let i=0;i<d.length;i++){
    	if(d[i]==""){
    		isNull=true;
    	}
    }
    if(!isNull){
    	this.props.handleOk(data);
    }else{
    	this.showErrMessage();
    }
  },
//  componentDidMount:function(){
//  		this.ajax("/get/position",{})
//  },
  loadSuccess:function(data){
  	this.setState({datas:data});
  },
  factorySelect:function(val){
		this.ajax("/get/position",{factory:val});
	},
  CascaderChange:function(val){
  	let data="";
  	for (let [index, elem] of val.entries()) {
		  data+=elem;
	}
  	this.setState({positionData:data});
  },
  render:function() {
    const { getFieldProps } = this.props.form;
    const options = this.state.datas;
    var list=[
				{title:"用户名",type:"text",ctype:"text",key:'userName',placeholder:"请输入账户名"},
				{title:"密码",type:"password",ctype:"text",key:'pass',placeholder:"请输入密码"},
				{title:"真实姓名",type:"text",ctype:"text",key:'chineseName',placeholder:"请输入真实姓名"},
				{title:"职位",ctype:"cascader",options:options,expandTrigger:"hover",onChange:this.CascaderChange,key:'position',selectData:this.state.positionData}
			];
    var lists=list.map((list,key)=>{
    	return <FormList data={list} key={key} getFieldProps={getFieldProps}/>
    });
    return (
    	<div>
			      <Form horizontal onSubmit={this.handleSubmit}>
			        {lists}
			        <Factory getFieldProps={getFieldProps} changeHandler={this.factorySelect}/>
			        <FormItem
			        		labelCol= {{ span: 6 }}
	      					wrapperCol= {{ span: 14 }}
			        		label="验证码"
				        	validateStatus={this.state.loginErr===3?"error":""}
							help={this.state.loginErr===3?"验证码不正确":""}
				        	>
				        <div className="codeBox">
							<Input {...getFieldProps('code')} placeholder="请输入右侧验证码" />
							<Code ref="code"/>
						</div>
					</FormItem>
					<FormItem wrapperCol={{ span: 16, offset: 9 }} style={{ margin: -15,color:"red" }}>
			          {this.props.msg}
			        </FormItem>
			        <FormItem wrapperCol={{ span: 16, offset: 9 }} style={{ marginTop: 24 }}>
			          <Button type="primary" htmlType="submit">确定</Button>
			        </FormItem>
			      </Form>
	    </div>
    );
  },
});

Reg = Form.create()(Reg);

export default Reg
