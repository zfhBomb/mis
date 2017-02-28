var React=require("react");
//import { Table,Modal } from 'antd';
var Table=require("antd/lib/table");
var Button=require("antd/lib/button");
var Modal=require("antd/lib/modal");
var Ajax=require("../common/ajax.js");
var ActView=require("./actView.js");

var LookTabel=React.createClass({
		mixins: [Ajax],
		getInitialState:function(){
				return{
					data:this.props.tableData?this.props.tableData:[],
					pageNums:1,
					nowPage:1,
					visible: false,
					modalData:null
				}
		},
		showModal:function(data) {
		    this.setState({
		      visible: true,
		      modalData:data
		    });
	    },
	    handleCancel:function() {
		    this.setState({
		      visible: false,
		    });
		},
		componentDidMount:function(){
			if(this.props.url){
				this.ajax(this.props.url,{});
			}
		},
		loadSuccess:function(data){
			this.setState({datas:data});
		},
		rowClick:function(data){
			this.showModal(data);
		},
		reLoad:function(){
			this.props.submitHandler();
		},
		tableOut:function(){
			window.location = "/look/exlData?factory="+this.props.user.factory;
		},
		getFooter:function(){
			return <Button onClick={this.tableOut}>表格导出</Button>
		},
		getDefaultProps:function(){
				var columns = [{
				  title: '编号',
				  dataIndex: 'id',
				}, {
				  title: '缺陷内容',
				  dataIndex: 'content',
				  width:500
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
				  title: '所属设备',
				  dataIndex: 'sheBei',
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
			var pagination = {
			  total: this.state.pageNums,
			  pageSize:10,
			  showQuickJumper:true,
			  current:this.state.nowPage,
			  onChange:function(current){
			    this.setState({nowPage:current},function(){
			    	this.props.submitHandler();
			    }.bind(this));
			  }.bind(this),
			};
			return (
				<div className="pageBox__table">
					<Table columns={this.props.columns} dataSource={this.state.data}
					bordered={true} pagination={pagination} onRowClick={this.rowClick} footer={this.getFooter}/>
					<Modal title="缺陷信息" visible={this.state.visible}
			          onOk={this.handleOk} onCancel={this.handleCancel}
			          footer={null} width={800}
			        >
			          <ActView handleOk={this.handleOk} data={this.state.modalData} reLoad={this.reLoad} user={this.props.user}/>
			        </Modal>
				</div>
			)
		}
});

module.exports = LookTabel