define(function(require, exports, module) {
    var ajax = require('../mixins/ajax.js');
    var dom=require('../mixins/dom.js');
    var ValiItem=require('./vali/valiItem.js');

    /**
     *
     */
    var ValiForm=React.createClass({
        mixins:[dom],
        getDefaultProps:function(){
            return {
                inDialog:true,
                okLabel:LG.btns.okLabel,
                cancelLabel:LG.btns.cancelLabel
            }
        },
        getData:function(){
            var data={};
            for(var i in this.refs){
                if(i!='form'){
                    data[i]=this.refs[i].refs[i].state.value;
                }
            }
            return data;
        },
        submit:function(){
            if(this.validate()){
                var data=this.getData();
                $.ajax({
                    url:this.props.url,
                    data:data,
                    method:'POST',
                    success:function(){
                        this.props.submit();
                    }.bind(this),
                    error:function(){

                    }
                });
            }
        },
        validate:function(){
            var validate=true;
            for(var i in this.refs){
                if(i!='form'){
                    if(!this.refs[i].validate()){
                        validate=false;
                    }
                }
            }
            return validate;
        },
        //绑定表单元素change事件
        __bindValidHandler:function(elem){
            if(elem.validate){
                if(elem.type=='text' || elem.type=='date'){
                    elem.onBlur=function(e){
                        this.refs[elem.name].validate();
                    }.bind(this);
                }else if(elem.type=='checkbox'){
                    elem.changeHandler=function(){
                        this.refs[elem.name].validate();
                    }.bind(this);
                }
            }
        },
        reset:function(){
            for(var i in this.refs){
                if(i!='form'){
                    this.refs[i].clearValue();
                }
            }
        },

        __rendButtons:function(){
            return (
                <div className="form-group">
                    <label className="col-xs-12 col-sm-3 control-label"></label>
                    <div className="col-xs-12 col-sm-9 itemContainer">
                        <a className="btn m0 btn-small btn-ghost-success mR10" onClick={this.submit}>{this.props.okLabel}</a>
                        <a className="btn m0 btn-small btn-ghost-grey" onClick={this.reset}>{this.props.cancelLabel}</a>
                    </div>
                </div>
            )
        },

        render:function(){
            var items=this.props.items.map(function(item,key){
                this.__bindValidHandler(item);
                return(
                    <ValiItem {...item} ref={item.name} key={key}/>
                );
            }.bind(this));
            var buttons;
            if(this.props.showButton){
                buttons=this.__rendButtons();
            }
            return (
                <div className="p20_30">
                    <div className="row">
                        <div className="col-xs-12">
                            <form ref="form" encType="multipart/form-data">
                                {items}
                                {buttons}
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    });
    module.exports=ValiForm
});