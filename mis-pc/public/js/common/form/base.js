define(function(require, exports, module) {
    var ajax=require('../mixins/ajax.js');


    var option=React.createClass({
        render:function(){
            return <option value={this.props.value}>{this.props.label}</option>;
        }
    });

    var select=React.createClass({
        mixins:[ajax],
        loadSuccess:function(data){
            this.setState({data:data});
            if(this.props.handler){
                this.props.handler(data);
            }
        },
        getDefaultProps:function(){
            return {
                valueField:'value',
                labelField:'label'
            }
        },
        componentDidMount:function(){
            if(this.props.url){
                this.ajax(this.props.url,{});
            }else if(this.props.data){
                this.setState({data:this.props.data});
            }
        },
        handleChange:function(event){
            var checked=[];
            var sel=event.target;
            var v;
            for(var i=0;i<sel.length;i++){
                var option=sel.options[i];
                if(option.selected){
                    this.setState({value:option.value});
                    if(this.props.handleChange){
                        this.props.handleChange(v);
                    }
                    break;
                }
            }
        },
        render:function(){
            var commentNodes = this.state.data.map(function(op) {
                return (
                    <option label={op[this.props.labelField]} value={op[this.props.valueField]}/>
                );
            }.bind(this));
            return (
                <select value={this.state.value} onChange={this.handleChange}>
                    {commentNodes}
                </select>
            );
        }
    });

    var input=React.createClass({
        getInitialState:function(){
            var value;
            if(this.props.value || this.props.value==0){
                value=this.props.value;
            }else{
               value=''
            }
            return {value:value};
        },
        handleChange:function(event){
            this.setState({
                value:event.target.value
            });
            if(this.props.changeHandle){
                this.props.changeHandle(event.target.value);
            }
        },
        clearValue:function(){
            this.setState({value:''});
        },
        render:function(){
            return <input type="text" value={this.state.value} onChange={this.handleChange} name={this.props.name}/>
        }
    });

    var checkbox=React.createClass({
        getInitialState:function(){
            return {
                checked:this.props.checked,
                disabled:this.props.disabled
            }
        },
        componentWillReceiveProps: function(nextProps) {
  			this.setState({
    			checked: nextProps.checked
  			});
		},
        changeHandle:function(event){

            this.setState({
               checked:event.target.checked
            });
            if(this.props.changeHandle){
                this.props.changeHandle(event.target.checked,event,this.props.value);
            }
        },
        render:function(){
            return (
                <label>
                    <input  type="checkbox" disabled={this.state.disabled} className="ace"
                            value={this.props.value} checked={this.state.checked}
                            onChange={this.changeHandle} name={this.props.name}
                    />
                    <span className="lbl">{this.props.label}</span>
                </label>
            );
        }
    });

    var radioBox=React.createClass({
        getInitialState:function(){
            return {
                checked:this.props.checked,
                disabled:this.props.disabled,
                value:this.props.value
            }
        },
        componentWillReceiveProps: function(nextProps) {
  			this.setState({
    			checked: nextProps.checked
  			});
		},
        changeHandle:function(event){
            this.setState({
                checked:event.target.checked,
                value:this.props.value
            });
            if(this.props.changeHandle){
                this.props.changeHandle(event.target.checked,event,this.props.value);
            }
        },
        render:function(){
            return (
                <label>
                    <input type="radio" className="ace" disabled={this.state.disabled}
                           value={this.props.value} checked={this.state.checked}
                           onChange={this.changeHandle} name={this.props.name}
                    />
                    <span className="lbl">{this.props.label}</span>
                </label>
            );
        }
    });

    var textarea=React.createClass({
        getInitialState:function(){
            var value;
            if(this.props.value || this.props.value==0){
                value=this.props.value;
            }else{
                value=''
            }
            return {value:value};
        },
        handleChange:function(event){

            this.setState({
                value:event.target.value
            });
            if(this.props.changeHandle){
                this.props.changeHandle(event.target.value);
            }
        },
        render:function(){
            return (
                <textarea placeholder={this.props.dis} className={this.props.className} value={this.state.value} onChange={this.handleChange}></textarea>
            );
        }
    });

    /**
     *
     *
     */
    module.exports={
        SingleSelect:select,
        TextInput:input,
        Checkbox:checkbox,
        Radio:radioBox,
        Textarea:textarea
    }
});