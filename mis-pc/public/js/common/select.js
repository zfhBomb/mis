import React from "react";
import { Select } from 'antd';
const Option = Select.Option;
import Ajax from "./ajax.js"

var Selected=React.createClass({
	mixins:[Ajax],
	componentDidMount:function(){
		if(this.props.url){
			this.ajax(this.props.url,{})
		}
	},
	handleChange:function(value) {
	  console.log(`selected ${value}`);
	},
	loadSuccess:function(data) {
	  this.setState({data:data});
	},
	render:function(){
		return (
			<div>
				<label>{this.props.title}</label>
			    <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
			      <Option value="jack">Jack</Option>
			      <Option value="lucy">Lucy</Option>
			      <Option value="disabled" disabled>Disabled</Option>
			      <Option value="yiminghe">yiminghe</Option>
			    </Select>
  			</div>
		);
	}
});

export default Selected