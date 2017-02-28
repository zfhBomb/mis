define(function(require, exports, module) {
    var htmlMixin=require('../../mixins/html.js');// Html工具函数包
    var PreviewImg=require('./previewImg.js');// 预览图组件
    var client=require('../../../base/explorer.js');// 浏览器|客户端判断 函数包
    var uploadMixin=require('./uploadMixin.js');// 上传组件 功能函数包


    var ProgressBar=React.createClass({
        getDefaultProps:function(){
            percent:'0%'
        },
        render:function(){
            return (
                <div className="progress" data-percent={this.props.percent}>
                    <div class="progress-bar" style={{width:this.props.percent}}></div>
                </div>
            );
        }
    });


    var AskButtonsGroup=React.createClass({
        setOK:function(){
            this.props.setOK();
        },
        setCancel:function(){
            this.props.setCancel();
        },

        render:function(){
            return (
                <div className="toolB">
                    <span onClick={this.setOK} className="btn btn-success"><i className="icon-ok"></i></span>
                    <span onClick={this.setCancel} className="btn btn-danger"><i className="icon-remove"></i></span>
                </div>
            )
        }
    });

    /**
     * 单文件上传组件
     * @class SingleUpload
     * @module common.form.fileUpload
     */
    var SingleUpload=React.createClass({
        mixins:[htmlMixin,uploadMixin],
        /**
         * 组件的宽度（像素）
         * @property width {int}
         */

        /**
         * 组件的高度（像素）
         * @property height {int}
         */

        /**
         * 组件所在的input的name属性。此属性必须设置
         * @property name {string}
         */

        /**
         * 组件初始状态时（不带有默认值）的情况下 呈现的文字提示信息
         * @property dis
         */

        /**
         * 是否自动提交上传，如果为false,则在选择完文件后，出现 （取消/确认 询问按钮组）。
         * @property autoUpload {boolean}
         * @default true
         */

        /**
         * 是否仅上传图片
         * @property onlyImg {boolean}
         * @default false
         */

        /**
         * 是否支持图片预览，仅当配置了onlyImg为true，且浏览器支持相关技术时时才会生效。
         * @property onlyImg {boolean}
         * @default true
         */

        getDefaultProps:function(){
              return{
                  width:400,
                  height:200,
                  name:"pictureUrl",
                  dis:LG.fileUpload.chooseFile,//控件初始状态时的提示信息文字
                  autoUpload:true,//是否自动提交上传
                  previewImg:true,
                  onlyImg:false,//是否仅上传图片
                  progress:false,
                  multi:false// 特别注意此属性不可写。
              }
        },
        /**
         * <h4>文件组件的上传状态 （动态属性）</h4>
         * <ul><li>默认状态是'none'</li><li> 如果组件带有初始值 则为 uploaded</li>
         * <li>如果组件属性autoUpload为false （非自动提交上传） 则在选择完文件时 ，状态置为'preupload' 此时出现询问按钮 确认或取消</li>
         * <li>如果组件属性autoUpload为true （自动提交上传） 则在选择完文件后，状态置为 ‘uploading' 此时可能出现文件上传进度条。</li>
         * </ul>
         *
         * @property upload {string}
         * @default {string} 'none'
         * @returns {'none'|'uploaded' | 'uploading' | 'preupload'}
         */
        getInitialState:function(){
            return{
                file:(this.props.value)?this.props.value:false,
                upload:(this.props.value)?'uploaded':'none',
                value:(this.props.value)?this.props.value:false
            }
        },

        openFileSelect:function(e){
             var input=$(this.refs.input);
            input.trigger("click");
        },

        getProgress:function(e){
            e.stopPropagation();
            this.setState({upload:'uploading'});
        },

        removeProgress:function(e){
            this.removeFile(e);
        },

        clearValue:function(){
            this.removeFile();
        },

        /**
         * 清除已选择的文件文件
         * @method removeFile
         * @param e
         */
        removeFile:function(e){
            if(e)e.stopPropagation();
            $(this.refs.input).val("");
            this.setState({file:false,upload:'none'},function(){
                //如果配置了删除文件的业务逻辑，将会在这里执行。
                if(this.props.onRemoveFile){
                    this.props.onRemoveFile();
                }

                if((this.props.onlyImg && this.props.previewImg)&&(client.ablity.fileReader && client.ablity.canvas)){
                    this.refs.preview.setState({completeDraw:false});
                }
            }.bind(this));
        },

        prepareUpload:function(){
            var input=$(this.refs.input);
            var file=this.getFiles(input)[0];
            //如果组件配置了自动上传，则将状态变更为上传中。否则状态变更为已准备好上传。
            var upload=(this.props.autoUpload)?'uploading':'preUpload'
            this.setState({
                file:file,
                upload:upload
            },function(){
                if((this.props.onlyImg && this.props.previewImg)&&(client.ablity.fileReader && client.ablity.canvas)){
                    this.refs.preview.drawImage(file);
                }
                if(this.props.autoUpload){
                    this.uploadFiles([file]);
                }

            }.bind(this));
        },

        __showImg:function(){
            if((this.props.onlyImg && this.props.previewImg)&&(client.ablity.fileReader && client.ablity.canvas)){
                return (
                    <PreviewImg  {...this.props} file={this.state.file} ref="preview"/>
                );
            }else{
                var icons='typeIcon';
                if(this.props.value) {
                    icons+=' '+this.getFileTypeIcon(this.state.file);
                }
                return (
                    <i className={icons}></i>
                );
            }
        },

        __drawProgress:function(){
            var progress;
            //当组件状态变为上传中时，开启进度条
            if(this.state.upload=='uploading'){
                propgress=(
                    <ProgressBar percent={this.state.file.progress+'%'}/>
                );
            }
            return progress;
        },

        render:function(){
            var style = {width: this.props.width + "px", height: this.props.height + "px"};
            var removeLink,containerClass;
            var styleDis;
            if (this.state.file) {
                containerClass='file-label hide-placeholder selected';
                removeLink=(
                    <a className="remove" href="javascript:void(0)" onClick={this.removeFile}>
                       <i className="icon-remove"></i>
                    </a>
                );
                styleDis={
                    display:(this.state.upload=='preUpload')?'block':'none'
                };
            }else{
                containerClass='file-label';
                styleDis={
                    display:'none'
                };
            }

            var fileDis=this.template({width:this.props.width,height:this.props.height},this.props.dis);

            return (
                <div className="ace-file-input ace-file-multiple imgFix" style={style}>
                    <input ref="input" type="file" onChange={this.prepareUpload} name="file"/>
                    <label onClick={this.openFileSelect} className={containerClass} data-title={fileDis} style={style}>
                        <span className="file-name" data-title="No File ...">
                            <i className="icon-cloud-upload"></i>
                        </span>
                        {this.__drawProgress()}
                        <div className="toolB" style={styleDis}>
                            <span onClick={this.getProgress} className="btn btn-success"><i className="icon-ok"></i></span>
                            <span onClick={this.removeProgress} className="btn btn-danger"><i className="icon-remove"></i></span>
                        </div>
                        {this.__showImg()}

                        <div className="msg"  data-type="msg" style={{display:'none'}}>
                            asdasdasdasdasd
                        </div>
                    </label>
                     {removeLink}

                </div>
            );
        }
    });

    module.exports=SingleUpload;
});