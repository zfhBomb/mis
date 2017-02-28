var React=require("react");
//import { Tree,Collapse } from 'antd';
var Tree=require("antd/lib/tree");
var Collapse=require("antd/lib/collapse");
var Ajax=require("./common/ajax.js");

var TreeNode = Tree.TreeNode;
var Panel = Collapse.Panel;

var CollapseBox=React.createClass({
	mixins: [Ajax],
	getDefaultProps:function() {
	    return {
	      keys: ['0-0']
	    };
	},
	getInitialState:function() {
	    var keys = this.props.keys;
	    return {
	      open:false,
	      data:[]
	    };
	},
	componentDidMount:function(){
		this.ajax("/get/sheBei",{factory:this.props.user.factory});
		this.titleData={};
	},
	loadSuccess:function(data){
		this.setState({data:data});
	},
	onSelect:function(info) {
	    this.props.treeValueGet(this.titleData[info]);
	},
	loadNode:function(d,n){
		
  			var datas=d==this.state.data?this.state.data:d.content;
  			var keyNum=-1;
			var lists=datas.map(function(list){
				keyNum++;
				if(n){
					var treeNum=keyNum;
				}else{
					var treeNum="0-"+keyNum;
				}
				if(list.content!=null){
					var child=this.loadNode(list,n?(n+"-"+treeNum):treeNum);
				}
					return this.getTreeNode(list,n?(n+"-"+treeNum):(treeNum+""),child)
					
				
           }.bind(this))
			
			return (
            		lists
			);
		},
	getTreeNode:function(data,key,child){
		if(child){
			this.titleData[key]=data.title;
            	var list=<TreeNode title={data.title} key={key}>
			            {child}
			    </TreeNode>
            }else{
            	this.titleData[key]=data.title;
            	var list=<TreeNode title={data.title} key={key} />
            }
        return list;
	},
	render:function(){
		if(this.state.data.length>0){
			return (
				<div className={this.state.open?"left__treeBox show":"left__treeBox"}>
					<Tree className="myCls" showLine
				        defaultExpandedKeys={this.props.Keys}
				        defaultSelectedKeys={this.props.Keys}
				        onSelect={this.onSelect}
				      >
				        {this.loadNode(this.state.data)}
				    </Tree>
				</div>  
			);
		}else{
			return (
				<div className={this.state.open?"left__treeBox show":"left__treeBox"}>
				    <div className="collapseBtn" onClick={this.showHandler}><i className="iconfont icon-zuojiantou"></i></div>
				</div>  
			);
		}
		
	}
});


module.exports = CollapseBox