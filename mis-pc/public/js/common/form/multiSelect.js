define(function(require, exports, module) {

//多选组件
    var MultiSelect=React.createClass({
    	getInitialState:function(){
    		return {
    			value:[]
    		}
    	},
    	componentWillReceiveProps: function(nextProps) {
  			this.setState({
    			value: nextProps.displayText
  			});
		},
    	close:function(num){
     		this.props.close(num);
     	},
    	render:function(){
    		if(this.state.value){
    			var lists=this.state.value.map(function(list,key){
    				return (
    					<MultiSelectList key={key} data={list} close={this.close} num={key}/>
    				);
    			
    			}.bind(this));
    		}else{
    			return "";
    		}
    		
    		return (
    			<ul className="chosen-choices">
    				{lists}
    				<li className="search-field">
    					<input type="text" value=" " className="" autoComplete="off" style={{width: 25+"px"}} />
    				</li>
    			</ul>
    		);
    		
    	}
    });
    
    //多选的列表组件
     var MultiSelectList=React.createClass({
     	close:function(e){
     		e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
     		this.props.close(this.props.num);
     	},
    	render:function(){
    		return (
    			<li className="search-choice">
    				<span>{this.props.data}</span>
    				<a className="search-choice-close" onClick={this.close}></a>
    			</li>
    		);
    		
    	}
    });
    

module.exports=MultiSelect;
});