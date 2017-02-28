define(function (require, exports, module) {
	var PageDemo1=require("./pageDemo1.js");
    var GoBack = React.createClass({
    	getInitialState:function(){
    		return {
    			Pages:[
    				{
    					content:PageDemo1,
    					show:true,
    					url:"./pageDemo1.js"
    				}
    			]
    		}
    	},
    	jumpHandler:function(url){
    		var isSame=false;
    		var newPage=this.state.Pages.concat();
                for(var i=0;i<newPage.length;i++){
                	if(newPage[i].url==url){
                		isSame=true;
                		newPage[i].show=true;
                	}else{
                		newPage[i].show=false;
                	}
                }
                 if(!isSame){
                 	require.async(url,function(Page){
	                	newPage.push({
	                		content:Page,
	                		show:true,
	                		url:url
	                	})
	                this.setState({Pages:newPage});
                	}.bind(this));
                }else{
                	this.setState({Pages:newPage});
                }
    	},
    	render:function(){
    		var page=this.state.Pages.map(function(list,key){
    			return (
    				<list.content key={key} jumpHandler={this.jumpHandler} style={list.show?{display:"block"}:{display:"none"}}/>
    			);
    		}.bind(this));
    		return (
    			<div>
    				{page}
    			</div>
    		);
    	}
    });
    
    
    
    
    
    
    
    module.exports = GoBack;
});