var React=require("react");
//import { Form, Input, Button,Select, Checkbox,message } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Checkbox=require("antd/lib/checkbox");
var Select=require("antd/lib/select");
var message=require("antd/lib/message");
var Ajax=require("../common/ajax.js");
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;


var WriteDefects=React.createClass({
	mixins:[Ajax],
	handleReset(e) {
	    e.preventDefault();
	    this.props.form.resetFields();
	},
	showMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.success('录入成功');
	},
	componentDidMount:function(){
	    if(!this.props.user.userName){
	        alert("本系统免费使用，但需要公司开户才能登陆使用，开户请联系QQ:2821230290");
	    }
	},
	showErrMessage:function(){
		message.config({
			  top: 200,
			  duration: 2,
			});
		message.error('请选择设备或填写完整信息');
	},
	handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((errors, values) => {
	    	if (!!errors) {
	        	console.log('Errors in form!!!');
	        	return;
	     }else if(values.content&&values.leiXin&&values.zhuanYe&&this.props.treeValue!="所有设备"){
	      	values.date=new Date();
	    	values.who=this.props.user.chineseName;
	    	values.sheBei=this.props.treeValue;
	    	values.yiJian="等待值长确认";
	      	values.factory=this.props.user.factory;
	      	this.ajax("/write",values);
	      }else{
	      	this.showErrMessage();
	      }	
	    });
	  },
	loadSuccess:function(data){
		if(data.ok==1){
			this.showMessage();
		}
		this.props.form.resetFields();
	},
	render:function(){
		if(this.props.user.userName){
			var getFieldProps= this.props.form.getFieldProps;
		return (
			<div className="right__pageBox">
				<div className="pageBox__wHeader">
					<span>设备选择</span>
					<p>{this.props.treeValue!="所有设备"?(`选择设备为：${this.props.treeValue}`):"请选择设备"}</p>
				</div>
				<div className="pageBox__wContent">
					<h3>缺陷信息录入</h3>
					<Form horizontal>
						<FormItem
				          label="缺陷内容"
				        >
				          <Input {...getFieldProps("content")} type="textarea" placeholder="请输入缺陷内容" maxLength="255"/>
				        </FormItem>
				        <FormItem
				          label="缺陷类型"
				        >
				          <Select {...getFieldProps("leiXin")} style={{ width: 200 }}>
						      <Option value="一类缺陷">一类缺陷</Option>
						      <Option value="二类缺陷">二类缺陷</Option>
						      <Option value="三类缺陷">三类缺陷</Option>
						      <Option value="其他">其他</Option>
				          </Select>
				        </FormItem>
				        <FormItem
				          label="所属专业"
				        >
				          <Select {...getFieldProps("zhuanYe")} style={{ width: 200 }}>
						    <Option value="汽机专业">汽机专业</Option>
						    <Option value="锅炉专业">锅炉专业</Option>
						    <Option value="电气专业">电气专业</Option>
						    <Option value="化学专业">化学专业</Option>
						    <Option value="热控专业">热控专业</Option>
				          </Select>
				        </FormItem>
				        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
				          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
				          &nbsp;&nbsp;&nbsp;
				          <Button type="ghost" onClick={this.handleReset}>重置</Button>
				        </FormItem>
					</Form>
				</div>
			</div>
		)
		}else{
			return (
				<div>请登录!</div>
			);
		}
		
	}
});

WriteDefects = createForm()(WriteDefects);

module.exports = WriteDefects