define(function (require, exports, module) {

var PageDemo1=React.createClass({
    	getDefaultProps:function(){
    		return {
    			nextUrl:"./pageDemo2.js"
    		}
    	},
    	goTo:function(){
    		this.props.jumpHandler(this.props.nextUrl);
    	},
    	render:function(){
    		return (
    			<div className={this.props.className} style={this.props.style}>
    				<input type="text"/>
    				<button onClick={this.goTo}>点击跳转至下个页面</button>
    				<div>我是最初页面</div>
    			</div>
    		);
    	}
    });
    
    module.exports = PageDemo1;
});