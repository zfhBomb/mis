define(function(require, exports, module) {
    var Ajax=require('../../mixins/ajax.js');
    var DomMix=require('../../mixins/dom.js');
	var Form=require('../../form/base.js');
	var MultiSelect=require('./multiSelect.js');
	var SelectMix=require("./selectMixin.js");

    /**
     * 美化后的下拉选择框组件，带有查询条件。支持动态拉取数据，支持动态指定数据源
     * @module common.form
     * @class select
     */

    /**
     * 控制下拉框的开启状态（动态属性）
     * @property openned
     */

    /**
     *  文字信息对应的数据字段
     *  @property valueField
     *  @default 'value'
     */

    /**
     *  值信息对应的数据字段
     *  @proerty labelField {string}
     *  @default ‘label’
     */

    /**
     * 下拉选择框的默认文字信息 （未选中任何选中项时）
     * @property dis {string}
     * @default "请选择"
     */

    /**
     * 指定下拉框组件的宽度
     * @property width {int}
     * @default 100px
     */
	
	/**
     * 开启多选模式
     * @property multi {Boolean}
     * @default false
     */
	
	/**
     * 开启多选搜索
     * @property search {Boolean}
     * @default true
     */
	
    /**
     * 组件会生成一个名字指定为name 的 input hidden 。作为表单提交时的值。
     * @property name
     */


	 
    //单选组件
    var OneSelect=React.createClass({
    	render:function(){
    		return (
    			<a className="chosen-single">
                    <span>{this.props.displayText}</span>
                    <div><i className={this.props.iconClass}/></div>
                </a>
    		);
    		
    	}
    });



    var AddPlus=React.createClass({
        mixins:[Ajax,DomMix,SelectMix],
        getDefaultProps:function(){
            return {
                width:100,
                queryAble:false,
                labelField:'label',
                valueField:'value',
                dis:LG.select.dis,
                queryKey:"name",
                search:true,
                multi:false
            }
        },
        getInitialState:function(){
            
        },
		openDialog:function(){
			ZT.DiaMgr.openDialog({
                shadow:{},
                isForm:false,
                width:600,height:400,
                url:'../../../earth/ctrl/demo/address.js',
                title:'地址选择',
                ok:function(obj){
                	this.setState({value:obj});
					return true;
                }.bind(this)
            });
		},
        /**
         * 清空下拉选择框的数值
         * @method clearValue
         *
         */
        
        render:function(){
//          var items=this.state.data.map(function(item,key){
//              return (
//                  <SelectItem key={key} text={item[this.props.labelField]} curValue={this.state.value}
//                  value={item[this.props.valueField]} changeHandler={this.changeHandler} choose={this.props.multi?this.state.value:[]}/>
//              );
//          }.bind(this));

            var className=this.props.multi?'chosen-container chosen-container-multi':'chosen-container chosen-container-single';
            var iconClass='icon icon-plus';
            //得到下拉组件里面默认显示的文字内容。
            var displayText=this.props.multi?[]:this.props.dis;
            var labelField=this.props.labelField;
            var valueField=this.props.valueField;
            if(this.state.value){
            	if(this.props.multi){
                		for(var i=0;i<this.state.value.length;i++){
                        	displayText.push(this.state.value[i].address);               			
                		}
                		
               }else{
                        	displayText=this.state.value.address;
                }
                
            }
            return (
                <div onClick={this.openDialog} className={className} style={{width:this.props.width+'px'}}>
                	<input type="hidden" value={this.state.value} name={this.props.name} />
                    {this.props.multi?<MultiSelect displayText={displayText} close={this.closeClick} iconClass={iconClass}/>:<OneSelect displayText={displayText} iconClass={iconClass} value={this.state.value}/>}
                </div>
            );
        }
    });
   
   
    module.exports=AddPlus;
});