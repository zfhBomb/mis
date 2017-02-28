define(function(require, exports, module) {
var faceDatas=require('./faceData.js');
var Editor=React.createClass({

    	getInitialState:function(){
    		return {
    			toolFace:false,
				toolFont:false,
    			value:""
    		}
    	},
    	getDefaultProps:function(){
    		return {
    			sendBtn:true,
    			height:200+"px",
    			toolClick:function(){},
    			sendClick:function(){}
    		}
    	},
    	onchangeHandler:function(e){
    		this.setState({value:e.target.value});
    	},
		sendClick:function(){
			this.props.sendClick();
		},
		faceListClick:function(val){
			this.setState({toolFace:false});
			var newVal=val.replace(/\\/g, "");
			var msg=this.state.value+newVal;
			this.setState({value:msg});
		},
		toolClick:function(str){
			if(str==="face"){
				this.setState({toolFace:!this.state.toolFace});
			}

			if(str==="font"){
				if(this.state.toolFont){
					this.props.heightHandler(-30);
				}else{
					this.props.heightHandler(30);
				}
				this.setState({toolFont:!this.state.toolFont});
			}
		},
		componentDidMount:function(){
			$(document).on('mousedown', 'body', function(e){
				this.setState({toolFace:false});
			}.bind(this));
		},
    	render:function(){
    		if(this.state.toolFace){
    			var faceView=<Face faceListClick={this.faceListClick}/>;
    		}else{
    			var faceView="";
    		}
			if(this.state.toolFont){
				var fontView=<Font/>;
			}else{
				var fontView="";
			}
    		return (
    			<div className="box-chat-footer" style={this.state.toolFont?{height:this.props.height-30+"px"}:{height:this.props.height+"px"}}>
                    <Tool toolClick={this.toolClick}/>
                    {faceView}
					{fontView}
                    <div className="box-chat-textarea">
                        <textarea onChange={this.onchangeHandler} value={this.state.value}></textarea>
                    </div>
                    <div className="box-chat-bottom">
                        <div className="box-chat-send">
                            {this.props.sendBtn?<span className="box-send-btn" onClick={this.sendClick}>发送</span>:""}
                        </div>
                    </div>
                </div>
    		);
    	}
    });

    //工具栏组件 表情  颜色
    var Tool=React.createClass({
    	faceClick:function(){
    		this.props.toolClick("face");
    	},
		fontClick:function(){
			this.props.toolClick("font");
		},
    	render:function(){
    		var listDatas=[
						{
							className:"iconfont icon-biaoqing",
							title:"选择表情",
							handler:this.faceClick
						},
						{
							className:"iconfont icon-ziti",
							title:"字体",
							handler:this.fontClick
						},
						{
							className:"box-tool-image iconfont icon-tupian",
							title:"上传图片",
							child:<input type="file" name="file"/>
						},
						{
							className:"iconfont icon-jieping",
							title:"截屏"
						},
					]
    		var lists=listDatas.map(function(list,key){
    			
    			return (<ToolList className={list.className} title={list.title} child={list.child} key={key} handler={list.handler} />);
    		}.bind(this));
    		return (
    			<div className="box-chat-tool">
                   {lists}
                </div>
    		);
    	}
    });
    
    var ToolList=React.createClass({
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
    
    
    
    
	var Font=React.createClass({

		render:function(){
			return(
					<div className="layout-box-font" style={{display:"block"}}>
						<div className="box-tool">
							<i className="iconfont icon-ziti  box-tool-ziti" title="字体"></i>
							<div className="chosen-single-contain">
								<div className="chosen-single">
									<span>微软雅黑</span>
									<i className="iconfont icon-ar-down"></i>
								</div>
								<div className="chosen-drop" style={{display:"none"}}>
									<ul className="chosen-results">
										<li className="active-result ">宋体</li>
										<li className="active-result selected">微软雅黑</li>
										<li className="active-result">黑体</li>
									</ul>
								</div>
							</div>
							<div className="chosen-single-contain">
								<div className="chosen-single">
									<span>14</span>
									<i className="iconfont icon-ar-down font-tool"></i>
								</div>
								<div className="chosen-drop">
									<ul className="chosen-results">
										<li className="active-result ">12</li>
										<li className="active-result selected">14</li>
										<li className="active-result">16</li>
										<li className="active-result">18</li>
										<li className="active-result">20</li>
									</ul>
								</div>
							</div>
							<i className="iconfont icon-jiacu-copy  font-tool" title="加粗"></i>
							<i className="iconfont icon-xieti  font-tool selected" title="斜体"></i>
							<i className="iconfont icon-tianjiaxiahuaxian  font-tool" title="下划线"></i>
						</div>
					</div>
			);
		}
	});
    
    var Face=React.createClass({

    	faceListClick:function(val){
    		this.props.faceListClick(val);
    	},

    	render:function(){
    		var lists=faceDatas.map(function(list,key){
    			return (
    				<FaceList data={list} key={key} num={key} faceListClick={this.faceListClick}/>
    			);
    		}.bind(this));

    		return (
    			 <div className="layout-box-face kc-anim" id="layout-layer4" type="tips" style={{display:"block"}}>
                        <div id="" className="layout-kc-content">
                            <ul className="box-face-list">
                               {lists}
                            </ul>
                        </div>
                    </div>
    		);
    	}
    });
    
    var FaceList=React.createClass({

    	clickHandler:function(e){
    		this.props.faceListClick('face'+this.props.data.value);
    	},

    	render:function(){
    		return (
    			<li onMouseDown={this.clickHandler}><img src={this.props.data.icon}/></li>
    		);
    	}
    });
    
 module.exports=Editor;
});