define(function(require, exports, module) {
    var Ajax=require('../../mixins/ajax.js');
    var DomMix=require('../../mixins/dom.js');
	var Form=require('../../form/base.js');
	var MultiSelect=require('./multiSelect.js');
	var SelectMix=require("./selectMixin.js");
    /**
     * 选择项子类
     * @class SelectItem
     * @module common.form.select
     */

    /**
     * 选择项文字信息
     * @property text {string}
     */

    /**
     * 选择项值
     * @property value {string}
     */

    /**
     *  选择项图标
     *  @property icon {string}
     */

    /**
     *  外层select组件当前的值
     *  @property curValue {string}
     */
    var SelectItem=React.createClass({
        onClick:function(e){
            if(this.props.value!=this.props.curValue){
                this.props.changeHandler(this.props.value,e);
            }
        },
        render:function(){
        	var isTrue=false;
        	if(this.props.choose){
        		for(var i=0;i<this.props.choose.length;i++){
            		if(this.props.choose[i]==this.props.value)
            		{
            			isTrue=true;
            			break;
            		}
            	}
        	}
            var className='active-result';
            var icon;
            if(this.props.icon){
                icon= <i className={this.props.icon}/>
            }
            if(this.props.value==this.props.curValue||isTrue){
                className+=' result-selected';
            }
            return (
                <li className={className} data-value={this.props.text} onClick={this.onClick}>{icon}{this.props.text}</li>
            );
        }
    });


	//搜索框
    var Search=React.createClass({
    	render:function(){
    		return (
    			<div className="chosen-search">
                	<Form.TextInput name={this.props.name} changeHandle={this.props.changeHandle} onClick={this.props.onClick}/>
            	</div>
    		);
    		
    	}
    });
    
    
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

    var Select=React.createClass({
        mixins:[Ajax,DomMix,SelectMix],
        getDefaultProps:function(){
            return {
                width:100,
                queryAble:false,
                labelField:'label',
                valueField:'value',
                dis:LG.select.dis,
                queryKey:"name",
                multi:false
            }
        },
        getInitialState:function(){
            return {
                data:(this.props.data)?this.props.data:[],
                openned:false
            }
        },
		
        toggleOpen:function(){
            var open=this.state.openned;
            this.clearPop(open);
            this.setState({openned:!open});
        },

        /**
         * 清空下拉选择框的数值
         * @method clearValue
         *
         */
		textClick:function(e){
            e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
        },
        textChange:function(val){
            console.log(val);
            var querykey=this.props.queryKey;
            this.ajax(this.props.url,{querykey:val});
            /*for(var i=0;i<this.props.data.length;i++){
            	
            }*/
        },
        render:function(){
            var items=this.state.data.map(function(item,key){
                return (
                    <SelectItem key={key} text={item[this.props.labelField]} curValue={this.state.value}
                    value={item[this.props.valueField]} changeHandler={this.changeHandler} choose={this.props.multi?this.state.value:[]}/>
                );
            }.bind(this));

            var className=this.props.multi?'chosen-container chosen-container-multi':'chosen-container chosen-container-single';
            var iconClass;
            if(this.state.openned){
                className+=' chosen-container-active chosen-with-drop';
                iconClass='iconfont icon-ar-up';
            }else{
                iconClass='iconfont icon-ar-down';
            }

            //得到下拉组件里面默认显示的文字内容。
            var displayText=this.props.multi?[]:this.props.dis;
            var labelField=this.props.labelField;
            var valueField=this.props.valueField;
            if(this.state.value){
            	if(this.props.multi){
                		for(var i=0;i<this.state.value.length;i++){
                			for(var j=0;j<this.state.data.length;j++){
                				if(this.state.data[j][valueField]==this.state.value[i]){
                        			displayText.push(this.state.data[j][labelField]);
                    			}
                			}
                		}
                		
                }else{
                	$.each(this.state.data,function(index,item){
                		if(item[this.props.valueField]==this.state.value){
                        	displayText=item[this.props.labelField];
                        	return false;
                   		}
                	}.bind(this));
                }
                
            }
            return (
                <div onClick={this.toggleOpen} className={className} style={{width:this.props.width+'px'}}>
                	<input type="hidden" value={this.state.value} name={this.props.name} />
                    {this.props.multi?<MultiSelect displayText={displayText} close={this.closeClick} iconClass={iconClass}/>:<OneSelect displayText={displayText} iconClass={iconClass} value={this.state.value}/>}
                    <div className="chosen-drop">
                    	{this.props.queryAble&&!this.props.multi?<Search name={this.props.name} changeHandle={this.textChange} onClick={this.textClick}/>:""}
                        <ul className="chosen-results">
                            <SelectItem value="" text={this.props.dis} changeHandler={this.changeHandler}/>
                            {items}
                        </ul>
                    </div>
                </div>
            );
        }
    });
    
    
    module.exports=Select;
});