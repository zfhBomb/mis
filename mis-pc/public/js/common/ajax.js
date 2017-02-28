var React=require("react");
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
//      getInitialState:function(){
//          return {
//              data:(this.props.data)?this.props.data:[]
//          }
//      },
        propTypes:{
            method:React.PropTypes.string,
            dataType:React.PropTypes.string,
            url:React.PropTypes.string,
        },
        getDefaultProps:function(){
            return {
                method:'get',
                async: true,
                contentType:"application/x-www-form-urlencoded;charset=utf-8",
                beforeSend:function(req){
                    req.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
                }
            }
        },

        ajax:function(url,data){
            $.ajax({
                url:url,
                data:data,
                dataType:"json",
                beforeSend:this.props.beforeSend,
                contentType:this.props.contentType,
                type:this.props.method,
                success:this.loadSuccess,
                error:this.loadError
            });
        }

    }
