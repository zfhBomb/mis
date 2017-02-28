define(function(require, exports, module) {
	module.exports={
		getPage:function(datas,nowTab){
			for(var i=0;i<datas.length;i++){
        		if(i==nowTab){
        			var pageUrl=datas[i].content;
        		}
        	}
    		require.async(pageUrl,function(b){
                    b.rend();
                });
    	},
   }
    	
});