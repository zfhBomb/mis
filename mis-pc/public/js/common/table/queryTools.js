define(function(require, exports, module) {
	var Ajax=require('../mixins/ajax.js');
	/**
     * 条件查询组件
     * @module table.queryTools
     * @class queryTools
     */

    /**
     * ajax请求地址
     * @property url
     */

    /**
     *  ajax获取数据成功后调用函数刷新table
     *  @property setReLoad {fuc}
     *  
     */

    /**
     *  调用者的this
     *  @proerty that {obj}
     *  
     */

    /**
     * 需要加入的搜索组件（text,select）
     * @property tools {Array}
     * 		@property tool 需要传入的组件
     * 		@property label 需要传入的组件的标题
     *      @property ref 需要传入的组件的ref
     */
    var QueryTools=React.createClass({
    	mixins:[Ajax],
    	componentDidMount:function(){
    		
    	},
    	getDefaultProps:function(){
    		
    	},
    	sendClick:function(){
    		var meg={};
    		this.props.tools.map(function(list){
    			var listRef=list.ref;
    			meg[list.label]=this.props.that.refs[listRef].state.value;
    		}.bind(this));
    		this.ajax(this.props.url,meg);
    	},
    	loadSuccess:function(data){
    		this.props.setReLoad(data);
    	},
    	clearClick:function(){
    		this.props.tools.map(function(list){
    			this.props.that.refs[list.ref].clearValue();
    		}.bind(this));
    	},
        render:function(){
        	var tool=this.props.tools.map(function(list){
        		return (
        			<span className="group">
						<label className="ldis">{list.label}</label>
						{list.tool}
					</span>
        		);
        	}.bind(this));
        	return (
        		<div className="query-toolbar queries">
					{tool}
					<button type="button" className="btn btn-query btn-xs m0" onClick={this.sendClick}>查询<i className="icon-fangdajing"></i></button>
					<label className="middle"><a href="javascript:void(0);" className="removeProperty" onClick={this.clearClick}>清除已选属性<i className="icon-remove"></i></a></label>
				</div>
        	);
			
        }
    });


	module.exports=QueryTools;

});