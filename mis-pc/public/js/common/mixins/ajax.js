define(function(require, exports, module) {
    /**
     * 依赖jquery.已做禁用缓存处理
     * <p>mixins专用ajax混合体</p>
     * <p>异步获取数据</p>
     *
     * @module common.mixins
     * @class ajax
     *
     */
    module.exports={
        getInitialState:function(){
            return {
                loading:false,
                loaded:false
            }
        },
        propTypes:{
            method:React.PropTypes.string,
            dataType:React.PropTypes.string,
            url:React.PropTypes.string,
        },
        getDefaultProps:function(){
            return {
                method:'get',
                async: true,
                dataType:'json',
                contentType:"application/x-www-form-urlencoded;charset=utf-8",
                beforeSend:function(req){
                    req.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
                }
            }
        },
        loaded:function(data){
            this.setState({
                loading:false,
                loaded:true
            },function(){
                this.loadSuccess(data);
            }.bind(this));
        },
        __loadError:function(){
            this.setState({
                loading:false
            })
        },
        ajax:function(url,data){
            this.setState({
                loading:true,
                loaded:false
            },function(){
                $.ajax({
                    url:url,
                    data:data,
                    dataType:this.props.dataType,
                    beforeSend:this.props.beforeSend,
                    contentType:this.props.contentType,
                    method:this.props.method,
                    success:this.loaded,
                    error:this.__loadError
                });
            });
        }
    }

});