define(function(require, exports, module) {
    var ValidMsg=React.createClass({
        getDefaultProps:function(){
            return{
                requireMsg:LG.validMsg.require,
                numberMsg:LG.validMsg.number,
                phoneMsg:LG.validMsg.phone
            }
        },
        getMsg:function(){
            switch (this.props.type){
                case 'require':
                    return this.props.requireMsg;
                case 'number':
                    return this.props.numberMsg;
                case 'phone':
                    return this.props.phoneMsg;
                default:
                    return this.props.customMsg;
            }
        },

        render:function(){
                return (
                    <label className="error" style={{display:'inlineBlock'}}>{this.getMsg()}</label>
                )
        }
    });
    module.exports=ValidMsg;
});