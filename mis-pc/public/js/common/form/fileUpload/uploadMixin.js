

define(function(require, exports, module) {
    var client=require('../../../base/explorer.js');
    var tools=require('../../mixins/varible.js');
    var events=require('../../mixins/error.js');

    /**
     * 上传文件函数支撑包
     * @class uploadMixin
     * @module common.form.fileUpload
     */
    module.exports={
        getDefaultProps:function(){
            return {
                method:'POST'
            }
        },
        /**
         * 获取文件图标种类
         * @method getFileTypeIcon
         * @param file {string} 文件名
         * @returns {string}
         */
        getFileTypeIcon:function(file){
            var filename = typeof file === "string" ? file : $.trim(file.name);
            var index = filename.lastIndexOf("\\") + 1;
            if (index == 0)index = filename.lastIndexOf("/") + 1;
            filename = filename.substr(index);

            var fileIcon = 'icon-file';
            if ((/\.(jpe?g|png|gif|svg|bmp|tiff?)$/i).test(filename)) {
                fileIcon = 'icon-picture';
            }
            else if ((/\.(mpe?g|flv|mov|avi|swf|mp4|mkv|webm|wmv|3gp)$/i).test(filename)) fileIcon = 'icon-film';
            else if ((/\.(mp3|ogg|wav|wma|amr|aac)$/i).test(filename)) fileIcon = 'icon-music';

            return fileIcon;
        },
        /**
         * 获取input file 所选取的文件
         * @method getFiles
         * @param element
         * @returns {Array}
         */
        getFiles:function(element){
            var files=[];

            if(client.ablity.fileList){
                files=element.get(0).files;
            }else{
                var name = $.trim(element.attr('value'));
                if(name && name.length > 0) {

                    files.push(name);
                }
            }

            return files;
        },
        /**
         * 上传文件
         * @method  uploadFiles
         */
        uploadFiles:function(files){
            var file, formData,handleError, headerName, headerValue,  i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;


            xhr = new XMLHttpRequest();
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                file.status='added';
                file.xhr = xhr;
            }

            var me=this;
            method = tools.resolveOption(this.props.method, files);
            url = tools.resolveOption(this.props.url, files);
            xhr.open(method, url, true);

            xhr.withCredentials = !!this.props.withCredentials;
            response = null;



            updateProgress = function(e){
                    var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;

                    if (e != null) {
                        progress = Math.floor(100 * e.loaded / e.total);

                        for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                            file = files[_j];
                            file.upload = {
                                progress: progress,
                                total: e.total,
                                bytesSent: e.loaded
                            };
                        }

                } else {
                    allFilesFinished = true;
                    progress = 100;

                    for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
                        file = files[_k];

                        if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                            allFilesFinished = false;
                        }

                        file.upload.progress = progress;
                        file.upload.bytesSent = file.upload.total;
                    }

                    /*if (allFilesFinished) {
                        me.element.trigger(events.upload.allSuccess);
                        return;
                    }*/
                }

                if(this.props.multi){
                    this.setState({
                        files:files
                    });
                }else{
                    this.setState({
                        file:files[0]
                    });
                }
            }.bind(this);

            xhr.onload= $.proxy(function(e){
                var _ref;

                if (files[0].status === events.action.uploadCancel) {
                    return;
                }

                if (xhr.readyState !== 4) {
                    return;
                }

                response = xhr.responseText;

                if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {

                    try {
                        response = JSON.parse(response);
                    } catch (_error) {
                        e = _error;
                        response = "Invalid JSON response from server.";
                    }

                }

                updateProgress(e);

                if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
                    //避免后台返回的错误信息太长，覆盖页面，影响体验，暂时这样处理。
                    response=LG.fileUpload.serviceError;
                    return $.proxy(function(){handleError(response)},this);

                } else {

                    if(response.isSuccess==true||response.success==true){
                        //return _this._finished(files, response, e);
                    }else if(response.isSuccess==false||response.success==false){
                        response=response.message;
                        this.errorProcessing(files,response);
                    }else{
                        //return _this._finished(files, response, e);
                    }

                }

            },this);

            xhr.onerror = $.proxy(function(){
                if (files[0].status === errors.action.uploadCancel) {
                    return;
                }

                this.errorProcessing(files);
            },this);


            progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
            progressObj.onprogress = updateProgress;


            for (headerName in this.props.headers){
                headerValue = this.props.headers[headerName];
                xhr.setRequestHeader(headerName, headerValue);
            }

            if(client.ablity.formData) {
                formData = this.__getFormData(files);
                xhr.send(formData);
            }else{
                //for older browsers that don't support FormData and uploading files via ajax
                //we use an iframe to upload the form(file) without leaving the page
                /*
                var deferred = new $.Deferred;
                me.uploading=layer.load(2, {time: me.opts.timeOut});

                var iframe_id = 'temporary-iframe-'+(new Date()).getTime()+'-'+(parseInt(Math.random()*1000));
                me.form.after('<iframe id="'+iframe_id+'" data-id="upload" name="'+iframe_id+'" frameborder="0" width="0" height="0" src="about:blank" style="position:absolute;z-index:-1;"></iframe>');
                me.form.append('<input type="hidden" name="temporary-iframe-id" value="'+iframe_id+'" />');
                me.form.next().data('deferrer' , deferred);//save the deferred object to the iframe

                if(me.opts.qiniu){
                    me.opts.qiniu.token.returnUrl=me.opts.returnUrl;
                    var token=qiniuServ.getToken(me.opts.qiniu.token);
                    me.form.append('<input type="hidden" name="token" value="'+token+'"/>');
                }

                me.form.attr({'method' : 'POST', 'enctype' : 'multipart/form-data',
                    'target':iframe_id, 'action':url});

                deferred.done(function(result){
                    clearTimeout(me.closeFuc);
                    var iframe = document.getElementById(iframe_id);
                    if(iframe != null) {
                        iframe.src = "about:blank";
                        //$(iframe).remove();
                    }
                    layer.close(me.uploading);
                    me.element.trigger(events.upload.singleSuccess);
                }).fail(function(res){
                    me.element.trigger(events.error.timeOut,{msg:res.message});
                });

                me.form.trigger('submit');

                //if we don't receive the response after 60 seconds, declare it as failed!
                me.closeFuc=setTimeout(function(){
                    var iframe = document.getElementById(iframe_id);
                    if(iframe != null) {
                        iframe.src = "about:blank";
                        //$(iframe).remove();

                        deferred.reject({'status':'fail','message':'Timeout!'});
                    }
                } , me.opts.timeOut);*/
            }
        },
        /**
         * 私有方法，拼装FormData数据包 提交表单。
         * @method __getFormData
         * @param files {array} 上传的文件
         * @private
         */
        __getFormData:function(files){
            var me=this;
            //var formData = new FormData(me.form.get(0));
            var form=$(this.refs.input.getDOMNode()).closest('form').get(0);
            var formData=new FormData(form);

            //formData.append('file',files);

            if (this.props.params){
                var _ref1 =this.props.params;
                for (key in _ref1) {
                    value = _ref1[key];
                    formData.append(key, value);
                }
            }

            if(this.props.qiniu){
                var token=qiniuServ.getToken(this.props.qiniu.token);
                formData.append('token',token);
            }

            return formData;
        }
    }
});