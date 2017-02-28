define(function(require, exports, module) {
    var errors=require('../../mixins/error.js');
    errors=errors.error;

    module.exports={
        getInitialState:function(){
            return {
                errorType:'none',
                errorMsg:''
            }
        },
        errorProcessing:function(files,msg){
            var file, _i, _len;

            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.status =errors.uploadError;

                this.setState({
                    errorType:errors.uploadError,
                    errorMsg:(msg)?msg:LG.fileUpload.uploadError
                });
            }

            if (this.props.uploadMultiple) {
                this.element.trigger("errormultiple", files, message, xhr);
                this.element.trigger("completemultiple", files);
            }

            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        },
        errorMsg:function(errType,msg){
            this.setState({
                error:errType,
                errorMsg:msg
            });
        }
    }
});