define(function(require, exports, module) {

    //工具栏组件（单个工具图标）。
    var ToolItem=React.createClass({

        clickHandler:function(e){
            if(this.props.handler){
                this.props.handler();
            }

        },

        render:function(){
            return (
                <i className={this.props.className} title={this.props.title} onClick={this.clickHandler}>
                    {this.props.child}
                </i>
            );
        }
    });

    //工具栏组件 表情  颜色
    var ToolBar=React.createClass({
        faceClick:function(){
            this.props.toolClick("face");
        },
        fontClick:function(){
            this.props.toolClick("font");
        },
        render:function(){
            var lists=this.props.data.map(function(list,key){
                return (
                    <ToolItem className={list.className} title={list.title}
                              child={list.child} key={key} handler={list.handler} />
                );
            }.bind(this));

            return (
                <div className="box-chat-tool">
                    {lists}
                </div>
            );
        }
    });

    module.exports=ToolBar;
});