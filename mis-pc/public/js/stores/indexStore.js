var Reflux=require("reflux");
var IndexAction=require("../actions/indexAction.js");
var IndexStore=Reflux.createStore({
	items:{},
	listenables: [IndexAction],
	onGetUser:function(data){
		this.items=data;
		this.trigger(this.items);
	}
});
module.exports = IndexStore;