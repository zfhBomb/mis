var React=require("react");
//import { Form, Input, Button, Checkbox } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Checkbox=require("antd/lib/checkbox");

var NavList=React.createClass({
	clickHandler:function(){
		this.props.clickHandler(this.props.data);
	},
	render:function(){
		return (
			<Button size="large" type={this.props.nowPage==this.props.data?"primary":"ghost"} onClick={this.clickHandler}>{this.props.data}</Button>
		)
	}
});






var Nav=React.createClass({
	getInitialState:function(){
		return {
			nowPage:"缺陷查询"
		}
	},

	btnClick:function(data){
		this.setState({nowPage:data},function(){
			this.props.navBtnClick(data);
		});
	},
	getDefaultProps:function(){
		return {
			navData:["我的缺陷","缺陷查询","缺陷录入","缺陷统计","用户设置"]
		}
	},
	render:function(){
		var lists=this.props.navData.map(function(list,key){
			return <NavList data={list} key={key} clickHandler={this.btnClick} nowPage={this.state.nowPage}/>
		}.bind(this));
		return (
			<div className="left__nav">
				{lists}
			</div>
		)
	}
});

module.exports = Nav