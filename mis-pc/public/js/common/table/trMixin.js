define(function(require, exports, module) {
    var FormItem=require('../form/base.js');

    module.exports={
        _radiobox:function(){
            return (
                <FormItem.Radio ref="checkbox" name="selected"
                                checked={this.props.selected} value={this.props.num} changeHandle={this._selectClick}/>
            );
        },
        _checkbox:function(){
            return (<FormItem.Checkbox ref='checkbox' checked={this.props.selected} changeHandle={this._selectClick}/>);
        },
        _selectClick:function(value,event){
            this.props.selectClick(value,this.props.data[this.props.keyField]);
        },
        shouldComponentUpdate:function(nextProps,nextState){
            if(this.state && 'open' in this.state && this.state.open!=nextState.open){
                return true;
            }
            if(this.props.selected!=nextProps.selected){
                if(this.props.selectMode=='multi' || this.props.selectMode=='radio'){
                    this.refs.checkbox.setState({checked:nextProps.selected});
                }
                return true;
            }else{
                return false;
            }
        },
        trClick:function(){
            this.props.selectClick(!this.props.selected,this.props.data[this.props.keyField]);
            if(this.props.trClick){
                this.props.trClick(this.props.data);
            }
        }
    }
});