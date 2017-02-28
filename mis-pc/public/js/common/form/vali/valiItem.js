define(function(require, exports, module) {
    var Msg=require('./validMsg.js');
    var formMix=require('../formMixin.js');
    var varible=require('../../mixins/varible.js');

    var ValiItem=React.createClass({
        mixins:[formMix,varible],
        getDefaultProps:function(){
            return{
                require:false
            }
        },
        getInitialState:function(){
            return{
                errorType:'none'
            }
        },
        rendVali:function(){
            if(this.state.errorType!="none"){
                return (
                    <Msg {...this.props.validate} type={this.state.errorType}/>
                );
            }
        },
        validate:function(){
            var errorType='none';
            var value=this.refs[this.props.name].state.value;
            if(this.props.validate){
                if(this.props.validate.require) {
                    if ((!value && value !== 0) || (this.isArray(value) && value.length == 0)) {
                        errorType = 'require';
                    }
                }
                if(this.props.validate.phone){
                    if(!(/^1\d{10}$/.test(value))) {
                        errorType = 'phone';
                    }
                }
                if(this.props.validate.number){
                    if(!(/^[1-9]\d*$/.test(value))){
                        errorType='number';
                    }
                }
            }

            this.setState({
                errorType:errorType
            });
            return errorType=='none';
        },
        //清除数据
        clearValue:function(){
            this.refs[this.props.name].clearValue();
        },
        render:function(){
            var labelClasses='col-xs-12 col-sm-3 control-label';
            if(this.props.validate && 'require' in this.props.validate){
                labelClasses+=' required';
            }
            return (
                <div className="form-group">
                    <label className={labelClasses}>{this.props.label}</label>
                    <div className="col-xs-12 col-sm-9 itemContainer">
                        {this.rendItem((this.state.errorType!='none')?'error':'')}
                        {this.rendVali()}
                    </div>
                </div>
            );
        }
    });
    module.exports=ValiItem


});