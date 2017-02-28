define(function (require, exports, module) {

var PageDemo2=React.createClass({
    	getDefaultProps:function(){
    		return {
    			nextUrl:"./pageDemo3.js",
    			backUrl:"./pageDemo1.js"
    		}
    	},
    	goTo:function(){
    		this.props.jumpHandler(this.props.nextUrl);
    	},
    	goBack:function(){
    		this.props.jumpHandler(this.props.backUrl);
    	},
    	render:function(){
    		return (
    			<div className={this.props.className} style={this.props.style}>
    				<input type="text"/>
    				<button onClick={this.goTo}>点击我去下个页面</button>
    				<button onClick={this.goBack}>点击我返回上个页面</button>
    				<div>我是第二级页面</div>
    			</div>
    		);
    	}
    });
    
    module.exports = PageDemo2;
});