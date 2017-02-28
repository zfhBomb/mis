var React=require("react");
//import { Form, Input, Button, Checkbox } from 'antd';
var Form=require("antd/lib/form");
var Input=require("antd/lib/input");
var Button=require("antd/lib/button");
var Checkbox=require("antd/lib/checkbox");
var Modal=require("antd/lib/modal");
var IndexAction=require("./actions/indexAction.js");
var router=require("react-router");
var hashHistory = router.hashHistory;
var Link=router.Link;
var Nav=require("./nav.js");
var StatisticalDefects=require("./statistical/statisticalDefects.js");
var LookDefects=require("./look/lookDefects.js");
var MyDefects=require("./my/myDefects.js");
var Set=require("./set/set.js");
var WriteDefects=require("./write/writeDefects.js");
var CollapseBox=require("./collapseBox.js");


var Mis=React.createClass({
	getInitialState:function(){
		return {
			page:"缺陷查询",
			treeValue:"所有设备",
			visible:false
		}
	},
	outClick:function(){
		IndexAction.getUser({id:"",userName:"",pass:"",position:"",chineseName:"",factory:""});
	},
	navBtnClick:function(data){
		this.setState({page:data});
	},
	treeHandler:function(){
		this.refs.tree.setState({open:!this.refs.tree.state.open});
	},
	treeValueGet:function(data){
		if(!data){
			data="所有设备";
		}
		this.setState({treeValue:data});
	},
	getDefaultProps:function(){
	  	if(typeof window !=="undefined"){
	  		return{
	  			tableData:window.data
	  		}
	  	}
    },
	showModal:function() {
	    this.setState({
	      visible: true,
	    });
    },
    handleCancel:function() {
	    this.setState({
	      visible: false,
	    });
	},
	render:function(){
		if(typeof window !=="undefined"){
			var co=document.cookie;
			co=co.replace(/\s+/g,"");
			var arr=co.split(";");
			var user={};
			if(co.indexOf("userName")!=-1){
				for(var i=0;i<arr.length;i++){
					var key=arr[i].split("=")[0];
					var val=arr[i].split("=")[1];
					if(key=="userName"||key=="chineseName"||key=="position"||key=="factory"){
						user[key]=val;
					}
				}
			}else{
				var user=this.props.user;
			}
		}else{
			var user={};
		}
		switch (this.state.page){
			case "我的缺陷":
			var page=<MyDefects treeValue={this.state.treeValue} user={user}/>;
				break;
			case "缺陷查询":
			var page=<LookDefects treeValue={this.state.treeValue} user={user} tableData={this.props.tableData}/>;
				break;
			case "缺陷录入":
			var page=<WriteDefects treeValue={this.state.treeValue} user={user} method={"post"}/>;
				break;
			case "缺陷统计":
			var page=<StatisticalDefects  user={user}/>;
				break;
			case "用户设置":
			var page=<Set  user={user}/>;
				break;
			default:
				break;
		}
		var isLogin=function(){
			if(user.userName){
				return (
					<div className="welcome__info">
						<span style={{color:"white"}}>欢迎</span>
						<span style={{color:"white"}}>用户:{"  "+user.chineseName}</span>
						<span style={{color:"white"}}>职位:{"  "+user.position}</span>
						<a onClick={this.outClick} style={{color:"red"}}>退出</a>
					</div>
				);
			}else{
				return (
					<div className="welcome__info">
						<Link to="/login">亲! 请登录...</Link>
					</div>
				);
			}
			
		}.bind(this);
		if(typeof window !=="undefined"){
			return (
				<div id="misPage">
					<div className="misPage__welcome">
						<div className="welcome__title">
							<h2><i className="iconfont icon-mulu" onClick={this.treeHandler}></i>  电厂缺陷管理系统</h2>
						</div>
						{isLogin()}
					</div>
					<div className="misPage__content">
						<div className="content__left">
							<CollapseBox ref="tree" treeValueGet={this.treeValueGet} user={user}/>
							<Nav navBtnClick={this.navBtnClick}/>
						</div>
						<div className="content__right">
							{page}
						</div>
	
					</div>
	
					<div className="content__bottom">
						<p>如果您有什么疑问或宝贵意见,欢迎联系我们!     QQ:2821230290</p>
						<a onClick={this.showModal}>使用说明</a>
					</div>
					<Modal title="使用说明" visible={this.state.visible}
		          onOk={this.handleOk} onCancel={this.handleCancel}
		          footer={null}
		        >
		          <p>1、请先注册账号,注册时注意选择所属公司</p>
		          <p>2、账号注册以后,必须经过所属公司管理员审核通过后方能登陆</p>
		          <p>3、点击左上角3条横线图标可以打开设备树,可以选择其中一个设备</p>
		          <p>4、如需要根据设备查询缺陷,先选择一个设备然后点击查询按钮</p>
		          <p>5、缺陷录入必需选择一个设备</p>
		          <p>6、缺陷查询时请特别注意所选择的设备</p>
		          <p>7、本系统属于免费使用,本网站尽力保证使用者的信息隐私和数据完整性,但不对其付负任何法律责任</p>
		          <p>8、如果对信息和数据安全有较高要求请联系我们,我们可以提供解决方案</p>
		        </Modal>
				</div>
			)
		}else{
			return (
				<div className="mainBox">
					<div id="misPage">
						<div className="misPage__welcome">
							<div className="welcome__title">
								<h2><i className="iconfont icon-mulu" onClick={this.treeHandler}></i>  电厂缺陷管理系统</h2>
							</div>
							{isLogin()}
						</div>
						<div className="misPage__content">
							<div className="content__left">
								<CollapseBox ref="tree" treeValueGet={this.treeValueGet} user={user}/>
								<Nav navBtnClick={this.navBtnClick}/>
							</div>
							<div className="content__right">
								{page}
							</div>
		
						</div>
		
						<div className="content__bottom">
							<p>如果您有什么疑问或宝贵意见,欢迎联系我们!     QQ:2821230290</p>
							<a onClick={this.showModal}>使用说明</a>
						</div>
						<Modal title="使用说明" visible={this.state.visible}
			          	onOk={this.handleOk} onCancel={this.handleCancel}
			          	footer={null}
			        	>
			          	<p>1、请先注册账号,注册时注意选择所属公司</p>
			          	<p>2、账号注册以后,必须经过所属公司管理员审核通过后方能登陆</p>
			          	<p>3、点击左上角3条横线图标可以打开设备树,可以选择其中一个设备</p>
			          	<p>4、如需要根据设备查询缺陷,先选择一个设备然后点击查询按钮</p>
			          	<p>5、缺陷录入必需选择一个设备</p>
		          		<p>6、缺陷查询时请特别注意所选择的设备</p>
		          		<p>7、本系统属于免费使用,本网站尽力保证使用者的信息隐私和数据完整性,但不对其付负任何法律责任</p>
		          		<p>8、如果对信息和数据安全有较高要求请联系我们,我们可以提供解决方案</p>
			        	</Modal>
					</div>
				</div>
			)
		}
	}
});

module.exports = Mis


//switch (this.state.page){
//			case "我的缺陷":
//				require.ensure([], function(require) {
//			        var MyDefects = require('./my/myDefects.js');
//			        var page=<MyDefects treeValue={this.state.treeValue}/>;
//			        this.setState({pageView:page});
//			    }.bind(this),"myDefects");
//				break;
//			case "缺陷查询":
//				require.ensure([], function(require) {
//			        var LookDefects = require('./look/lookDefects.js');
//			        page=<LookDefects treeValue={this.state.treeValue}/>;
//			    }.bind(this),"lookDefects");
//				break;
//			case "缺陷录入":
//				require.ensure([], function(require) {
//			        var WriteDefects = require('./write/writeDefects.js');
//			        page=<WriteDefects treeValue={this.state.treeValue} method={"post"}/>;
//			    }.bind(this),"writeDefects");
//				break;
//			case "缺陷统计":
//				require.ensure([], function(require) {
//			        var StatisticalDefects = require('./statistical/statisticalDefects.js');
//			        page=<StatisticalDefects/>;
//			    }.bind(this),"statisticalDefects");
//				break;
//			case "用户设置":
//				require.ensure([], function(require) {
//			        var Set = require('./set/set.js');
//			        page=<Set />;
//			    }.bind(this),"set");
//				break;
//			default:
//				break;
//		}