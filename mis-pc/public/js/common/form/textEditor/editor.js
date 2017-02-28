define(function (require, exports, module) {
    var ToolBar = require('./toolbar.js');
    var Faces = require('./faces.js');
    var Fonts = require('./fonts.js');
    //wangeEditor版本的混合函数包
    var commandMixin=require('./commandMixin.js');
    var selectMixin=require('./selectMixin.js');
    //wangEditor 的 一些dom对象支持函数
    var editorMixin=require('./editorMixin.js');

    //wysiwyg的混合函数包--经验证 谷歌和IE都不能在正确位置插入表情。仅火狐有效。
    //var editorMixin=require('./wysiwygMixin.js');

    //textmixin 插入在EditorText文本编辑区域中的函数集合
    var textMixin=require('./textMixin.js');
    //undo and redo
    var undoMixin=require('./undoMixin.js');


    var Editor = React.createClass({
        mixins:[editorMixin,selectMixin,commandMixin,textMixin,undoMixin],
        getInitialState: function () {
            return {
                toolFace: false,
                toolFont: false,
                value: ""
            }
        },

        getDefaultProps: function () {
            var me = this;
            return {
                sendBtn: true,
                height: 200,
                legalTags : 'p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre,span' //允许的html标签
            }
        },

        componentDidMount:function(){
            this.textEditor= $(ReactDOM.findDOMNode(this.refs.editor));
            this.initText();
            this.initSelection();
            this.saveSelectionEvent();
            //this.bindEvent();
        },

        __clearPop: function (popKey) {
            $(document).one('click', function () {
                var t={};
                t[popKey]=false;
                this.setState(t);
            }.bind(this));
        },

        __clickFace: function () {
            var toolFace=!this.state.toolFace;
            //this.textEditor.get(0).focus();
            //this.saveSelection(this.currentRange());
            this.setState({
                toolFace:toolFace
            });
            this.__clearPop('toolFace');
        },

        __clickFont: function () {
            var toolFont=!this.state.toolFont;
            this.setState({
                toolFont:toolFont
            });
        },

        onchangeHandler: function (e) {
            this.setState({value: e.target.value});
        },

        sendClick: function () {
            this.props.sendClick();
        },
		fontColorSet:function(data,e){
			 this.command(e, 'ForeColor', data);
		},
		fontSizeSet:function(data,e){
			 this.command(e, 'FontSize', data);
		},
		fontFamilySet:function(data,e){
			 this.command(e, 'FontName', data);
		},
		shapeSet:function(data,e){
			console.log(data);
				if(data==1){
					this.command(e, 'Bold');
				}
				if(data==2){
					this.command(e, 'Italic');
				}
				if(data==3){
					this.command(e, 'Underline');
				}
			 
		},
        faceListClick: function (e,val) {

            var newVal = val.replace(/\\/g, "");
            //var msg = this.state.value + newVal;
            //this.setState({value: msg});
            this.command(e, 'insertHtml', '<span>' + newVal + '</span>');
            e.preventDefault();

            this.setState({toolFace: false});

        },

        __menuClick:function(e){

        },

        //获取富文本框默认的工具
        __getDefaultTools: function () {
            return [
                {
                    className: "iconfont icon-biaoqing",
                    title: "选择表情",
                    handler:function(){
                        this.__clickFace();
                    }.bind(this)
                },
                {
                    className: "iconfont icon-ziti",
                    title: "字体",
                    handler:function(){
                        this.__clickFont();
                    }.bind(this)
                },
                {
                    className: "box-tool-image iconfont icon-tupian",
                    title: "上传图片",
                    child: <input type="file" name="file"/>
                },
                {
                    className: "iconfont icon-jieping",
                    title: "截屏"
                }
            ];
        },

        render: function () {
            var tools;
            if (this.props.tools) {
                tools = this.props.tools;
            } else {
                tools = this.__getDefaultTools();
            }

            return (
                <div className="box-chat-footer" style={{height:this.props.height+"px"}}>
                    <ToolBar ref="toolbar" data={tools}/>
                    <Faces faceListClick={this.faceListClick} show={this.state.toolFace}/>
                    <Fonts show={this.state.toolFont} colorSet={this.fontColorSet} 
                    fontSizeSet={this.fontSizeSet} fontFamilySet={this.fontFamilySet} shapeSet={this.shapeSet}/>
                    <div className="box-chat-textarea" >
                        <div className="textarea" contentEditable="true" ref="editor" style={{height:'100%',width:'100%'}}>
                        </div>
                    </div>
                    <div className="box-chat-bottom">
                        <div className="box-chat-send">
                            {this.props.sendBtn ?
                                <span className="box-send-btn" onClick={this.sendClick}>发送</span> : ""}
                        </div>
                    </div>
                </div>
            );
        }
    });

    module.exports = Editor;
});