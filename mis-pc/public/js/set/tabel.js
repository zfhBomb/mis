var React=require("react");
//import { Table,Modal } from 'antd';
var Table=require("antd/lib/table");
var Button=require("antd/lib/button");

var AdminTabel=React.createClass({
		reLoad:function(){
			this.props.submitHandler();
		},
		okHandler:function(){
			this.props.submitHandler("ok");
		},
		clearHandler:function(){
			this.props.submitHandler("clear");
		},
		getDefaultProps:function(){
				var columns = [
				{
				  title: '序号',
				  dataIndex: 'id',
				},
				{
				  title: '用户名',
				  dataIndex: 'userName',
				},
				{
				  title: '真实姓名',
				  dataIndex: 'chineseName'
				},
				{
				  title: '职位',
				  dataIndex: 'position',
				}];
				return{
					columns:columns
				}
		},
		onSelectChange(selectedRowKeys) {
			this.props.onSelectChange(selectedRowKeys);
	    },
		render:function(){
			var pagination = {
			  total: this.props.pageNums,
			  pageSize:10,
			  showQuickJumper:true,
			  current:this.props.nowPage,
			  onChange:(current)=> {
			  	this.props.pageChange(current);
			  },
			};
			var rowSelection={selectedRowKeys:this.props.selectedRowKeys,onChange: this.onSelectChange};
			return (
				<div className="pageBox__adminTable">
					<Button type="primary" onClick={this.okHandler} disabled={this.props.selectedRowKeys.length<=0}
					>确认</Button>
					<Button type="primary" onClick={this.clearHandler} disabled={this.props.selectedRowKeys.length<=0}
					>清除</Button>
					<Table columns={this.props.columns} dataSource={this.props.data}
					bordered={true} pagination={pagination} rowSelection={rowSelection}/>
				</div>
			)
		}
});

module.exports= AdminTabel;