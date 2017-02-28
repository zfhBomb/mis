var React=require("react");
//import { Form, Input, Button, Checkbox } from 'antd';
//var Form=require("antd/lib/form");
//var Input=require("antd/lib/input");
//var Button=require("antd/lib/button");
//var Checkbox=require("antd/lib/checkbox");
//var Row=require("antd/lib/row");
var QueryTool=require("./queryTool.js");
var LookTable=require("./tabel.js");
var Ajax=require("../common/ajax.js");

var LookDefects=React.createClass({
	mixins: [Ajax],
	getInitialState:function(){
		return {
			formData:{}
		}
	},
	componentDidMount:function(){
		var num=this.table.state.nowPage-1;
		this.ajax("/look",{sheBei:this.props.treeValue,nowPage:num,factory:this.props.user.factory});
	},
	getValue:function(val){
		this.table.setState({nowPage:1},()=>{
			this.setState({formData:val},()=>{
				this.submitHandler();
			});
		});	
	},
	submitHandler:function(){
		var subData=Object.assign(this.state.formData);
			for(var key in subData){
				if(key=="dateTool"){
					if(!subData[key].endValue||!subData[key].startValue){
						delete subData[key];
					}
				}else if(!subData[key]){
					delete subData[key];
				}
			}
		var num=this.table.state.nowPage-1;
		subData.sheBei=this.props.treeValue;
		subData.nowPage=num;
		subData.factory=this.props.user.factory;
		this.ajax("/look",subData);
	},
	loadSuccess:function(data){
		var listsNum=Object.values(data[data.length-1])[0];
		
		if(listsNum){
			this.table.setState({data:data,pageNums:listsNum});
		}else{
			
			data.splice(-1,1);
			this.table.setState({data:data});
		}

	},
	render:function(){
		return (
			<div className="right__pageBox">
				<QueryTool getValue={this.getValue}/>
				<LookTable ref={(ref)=>this.table=ref} submitHandler={this.submitHandler} user={this.props.user} tableData={this.props.tableData}/>
			</div>
		)
	}
});

module.exports = LookDefects