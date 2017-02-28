define(function(require, exports, module) {
    var faceData=require('./faceData.js');

    //表情工具 表情成员 （单个表情组件渲染）
    var FaceItem=React.createClass({

        clickHandler:function(e){
            this.props.faceListClick(e,'face'+this.props.data.value);
        },

        render:function(){
            return (
                <li onMouseDown={this.clickHandler}><img src={this.props.data.icon}/></li>
            );
        }
    });

    //用户表情选择。
    var Faces=React.createClass({
        getInitialState:function(){
            return {
                data:[]
            }
        },
        faceListClick:function(e,val){
            this.props.faceListClick(e,val);
        },

        render:function(){
            var lists=faceData.map(function(list,key){
                return (
                    <FaceItem data={list} key={key} num={key} faceListClick={this.faceListClick}/>
                );
            }.bind(this));

            return (
                <div className="layout-box-face kc-anim" id="layout-layer4" type="tips" style={{display:(this.props.show)?'block':'none'}}>
                    <div id="" className="layout-kc-content">
                        <ul className="box-face-list">
                            {lists}
                        </ul>
                    </div>
                </div>
            );
        }
    });

    module.exports=Faces;
});