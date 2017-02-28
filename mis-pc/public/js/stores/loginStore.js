var Reflux=require("reflux");
var IndexAction=require("../actions/indexAction.js");
var LoginStore=Reflux.createStore({
	items:{
		visible: false,
		msg:"",
		loginErr:0,
		code:0
	},
	listenables: [IndexAction],
	onGetUser:function(data){
		this.items=data;
		this.trigger(this.items);
	}
});
module.exports = Login;