var React=require("react");
//import { Table,Modal } from 'antd';
var Table=require("antd/lib/table");
var Button=require("antd/lib/button");
var Ajax=require("../common/ajax.js");
var QueryTool=require('./queryTool.js');

var AdminTabel=React.createClass({
	mixins:[Ajax],
	getInitialState:function(){
		return{
			data:[],
			pageNums:1,
			nowPage:1,
			selectedRowKeys: [],// 这里配置默认勾选列
			queryStr:""
		}
	},
	componentDidMount:function(){
		this.ajax('/adminSet',{page:1,factory:this.props.user.factory});
	},
	onSelectChange:function(selectedRowKeys) {
		this.setState({ selectedRowKeys:selectedRowKeys });
	},
	submitHandler:function(str){
		if(typeof(str)=="string"){
			var data=[];
			for(var i=0;i<this.state.selectedRowKeys.length;i++){
				data.push(this.state.data[this.state.selectedRowKeys[i]].id);
			}
			this.ajax('/adminSet',{do:str,value:data,page:1,factory:this.props.user.factory});
		}else if(typeof(str)=="number"){
			this.ajax('/adminSet',{queryStr:this.state.queryStr,page:str,factory:this.props.user.factory});
		}else if(typeof(str)=="object"){
			this.ajax('/adminSet',{queryStr:str[0].value,page:1,factory:this.props.user.factory});
		}
		
	},
	getValue:function(val){
		this.setState({queryStr:val[0].value,nowPage:1},function(){
			this.submitHandler(val);
		}.bind(this));
	},
	loadSuccess:function(data){
		this.setState({data:data.data,selectedRowKeys: [],pageNums:data.pageNums});
	},
	okHandler:function(){
		this.submitHandler("ok");
	},
	clearHandler:function(){
		this.submitHandler("clear");
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
	pageChange:function(current){
		this.setState({nowPage:current},function(){
			this.submitHandler(this.state.nowPage);
		}.bind(this));
	},
	render:function(){
		var pagination = {
			total: this.state.pageNums,
			pageSize:10,
			showQuickJumper:true,
			current:this.state.nowPage,
			onChange:(current)=> {
				this.pageChange(current);
			},
		};
		var rowSelection={selectedRowKeys:this.state.selectedRowKeys,onChange: this.onSelectChange};
		return (
			<div className="pageBox__adminTable">
				<QueryTool getValue={this.getValue}/>
				<Button type="primary" onClick={this.okHandler} disabled={this.state.selectedRowKeys.length<=0}
				>确认</Button>
				<Button type="primary" onClick={this.clearHandler} disabled={this.state.selectedRowKeys.length<=0}
				>清除</Button>
				<Table columns={this.props.columns} dataSource={this.state.data}
				bordered={true} pagination={pagination} rowSelection={rowSelection}/>
			</div>
		)
	}
});

module.exports= AdminTabel;