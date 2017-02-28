define(function(require, exports, module) {
   
    module.exports={
    	getInitialState:function(){
    		if(this.props.multi){
        		var val=(this.props.value)?this.props.value:[];
        	}else{
        		var val=(this.props.value)?this.props.value:"";
        	}
    		return {
    			value:val
    		}
    	},
    	componentDidMount:function(){
        	if(this.props.url){
        		this.ajax(this.props.url,{querykey:this.props.keyField});
        	}
        },
        loadSuccess:function(data){
            this.setState({data:data});
            if(this.props.handler){
                this.props.handler(data);
            }
        },
        changeHandler:function(value){
        	/*for(var i=0;i<this.props.data.length;i++){
        		if(this.props.data[i].value==value){
        			var val=this.props.data[i].label;
        		}
        	}*/
        	//console.log(val);
        	if(this.props.multi){
        		var newData=this.state.value;
        			var isTrue=false;
        			for(var i=0;i<newData.length;i++){
        				if(newData[i]==value){
        					isTrue=true;
        					break;
        				}
        			}
        			if(!isTrue){
        				newData.push(value);
        			}
        		this.setState({value:newData},function(){
        			if(this.props.changeHandler){
                		this.props.changeHandler(newData);
            		}
        		});
        	}else{
        		this.setState({value:value},function(){
        			if(this.props.changeHandler){
                		this.props.changeHandler(value);
            		}
        		});
        	}
            
        },
        clearValue:function(){
        	if(this.props.multi){
        		this.setState({value:[]});
        	}else{
        		this.setState({value:''});
        	}
        },
        closeClick:function(num){
        	var newData=this.state.value;
     		newData.splice(num,1);
     		this.setState({value:newData});
        }
    };
});