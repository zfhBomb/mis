define(function(require, exports, module) {
	module.exports={
		toBottom:function(id,_this){
			var oDiv=document.getElementById(id);
            oDiv.onscroll=function(){
            	if(oDiv.scrollHeight-oDiv.offsetHeight==oDiv.scrollTop){
            		//模拟加载等待时间
            		setTimeout(function(){
            			this.ajax(this.props.url,{});
            		}.bind(this),2000)
            		
            	}
            	//console.log(oDiv.scrollHeight);
            }.bind(_this);
    	},
    	newData:function(_this,data){
    		var newdata=_this.state.datas;
        		data.map(function(d){
        			newdata.push(d);
        		});
//      		if(newdata.length>=50){
//      			newdata.splice(0,10);
//      		}
        		_this.setState({datas:newdata});
    	}
   }
    	
});