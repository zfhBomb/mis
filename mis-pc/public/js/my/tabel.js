import React from "react";
import { Table } from 'antd';
import Ajax from "../common/ajax.js";

var LookTabel=React.createClass({
		mixins: [Ajax],
		getInitialState:function(){
				return{
					data:[],
					pageNums:1,
					nowPage:1
				}
		},
		componentDidMount:function(){
			if(this.props.url){
				this.ajax(this.props.url,{});
			}
		},
		loadSuccess:function(data){
			this.setState({datas:data});
		},
		getDefaultProps:function(){
				const columns = [{
				  title: '编号',
				  dataIndex: 'id',
				}, {
				  title: '缺陷内容',
				  dataIndex: 'content',
				},
				{
				  title: '消缺专业',
				  dataIndex: 'zhuanYe',
				},
				{
				  title: '记录人',
				  dataIndex: 'who',
				},
				{
				  title: '记录时间',
				  dataIndex: 'date',
				},
				{
				  title: '缺陷类型',
				  dataIndex: 'leiXin',
				},
				{
				  title: '处理意见',
				  dataIndex: 'yiJian',
				}];
				return{
					columns:columns
				}
		},
		render:function(){
			const pagination = {
			  total: this.state.pageNums,
			  pageSize:10,
			  showQuickJumper:true,
			  onChange:(current)=> {
			    this.setState({nowPage:current},()=>{
			    	this.props.submitHandler();
			    });
			  },
			};
			return (
				<div className="pageBox__table">
					<Table columns={this.props.columns} dataSource={this.state.data} bordered={true} pagination={pagination} />
				</div>
			)
		}
});

export default LookTabel