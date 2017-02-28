
    var ajax=require('../mixins/ajax.js');
    var dom=require('../mixins/dom.js');
    var varible=require('../mixins/varible.js');
    var QueryItem=require('./queryItem.js');

    /**
     * 查询筛选用表单
     * @module common.form
     * @class QueryForm
     */
    var QueryForm=React.createClass({
        mixins:[ajax,dom,varible],
        getInitialState:function(){
            this.init=false;
        },
        componentDidMount:function(){
            this.init=true;
            if(this.props.autoQuery){
                this.doQuery();
            }
        },

        /**
         * 是否进入页面时，自动提交查询
         * @property autoQuery {boolean}
         * @default true
         */

        /**
         * <p>查询筛选模组 ，内置附加业务逻辑函数
         * 用以如配置内部 两个下拉框的联动这样的需求</p>
         * @property backHandler
         */
		
		/**
         * 清除所有数据按钮点击事件发布
         * @property clearAll {fuc}
         */
		
        /**
         * 初始查询参数
         * @property queryParam {}
         */

        /**
         * @property showQuery
         */

        /**
         * @property showClear
         */

        getDefaultProps:function(){
            return {
                queryParam:{},
                autoQuery:true,
                showQuery:true,
                showClear:true
            }
        },

        /**
         * 执行查询
         * @method doQuery
         */

        doQuery:function(value){
        	var formDom=ReactDOM.findDOMNode(this.refs.form);
            var form=$(formDom);
            var query=this.getFormData(form);
            if(typeof(value)==='number'){
            	var queryParam=$.extend({},this.props.queryParam,query,{curPageNo:value});
            	console.log(queryParam);
            	this.ajax(this.props.url,queryParam);
            }else{
            	var queryParam=$.extend({},this.props.queryParam,query);
            	console.log(queryParam);
            	this.ajax(this.props.url,queryParam);
            }
            
        },
        /**
         * 清除当前表单中的查询筛选条件。注意 默认的查询参数是不会被清清除的
         * @method clearQuery
         */
        clearQuery:function(){
            for(var i in this.refs){
                if(i!='form'){
                    this.refs[i].clearValue();
                }
            }
        },
        loadSuccess:function(data){
            if(this.props.backHandler){
                this.props.backHandler(data);
            }
        },
       

        render:function(){
            var items=this.props.queryItems.map(function(queryItem,key){
                var qItem=$.extend({},queryItem,{});
                //this.__bindChangeHandler(qItem);
                return <QueryItem {...qItem} ref={qItem.name} key={key}/>
            }.bind(this));

            return (
                <div className="pageTools">
                    <form ref="form" className="query-toolbar queries">
                        {items}
                        <button type="button" className="btn btn-query btn-xs m0" onClick={this.doQuery}>查询<i className="icon-fangdajing"></i></button>
						<label className="middle"><a href="javascript:void(0);" className="removeProperty" onClick={this.clearQuery}>清除已选属性<i className="icon-remove"></i></a></label>
                    </form>
                </div>
            );
        }
    });
    export default QueryForm;