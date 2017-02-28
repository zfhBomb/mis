define(function(require, exports, module) {
    module.exports={
        getData:function(field){
            var html;
            if(this.props.rendHandler){
                var value;
                if(field){
                    value=this.props.data[field];
                }

                html=this.props.rendHandler(value,this.props.data,this.props.num);
            }else{
                html=this.props.data[field];
            }
            return html;
        },
        tdClick:function(){
            if(this.props.tdClick){
                var value;
                if(this.props.field){
                    value=this.props.data[this.props.field];
                }
                this.props.tdClick(value,this.props.data,this.props.num);
            }
        }
    }
});