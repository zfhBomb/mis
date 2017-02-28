import React from "react";
import {render} from "react-dom";
var Reflux=require("reflux");
var IndexStore=require("./stores/indexStore.js");
import { Router, Route, hashHistory,IndexRoute,IndexLink,Link,History,browserHistory } from 'react-router';
import Login from "./login.js";
var Mis=require("./mis.js");
import 'babel-polyfill';

var Main=React.createClass({
	mixins: [Reflux.listenTo(IndexStore,'getUser')],
	getInitialState:function(){
		return {
			user:{userName:""}
		}
	},
	getUser: function (data) {
        this.setState({user: data},function(){
        	for (let [key, value] of Object.entries(data)) {
        		if(key=="chineseName"){
        			document.cookie=`chineseName=${value};`;
        		}else if(key=="position"){
        			document.cookie=`position=${value};`;
        		}else if(key=="userName"){
        			document.cookie=`userName=${value};`;
        		}else if(key=="factory"){
        			document.cookie=`factory=${value};`;
        		}
			}
        	const path = "/";
    		hashHistory.push(path);
        });
        
    },
	renderChildren:function(props){
		return React.Children.map(props.children, child => {
      		return React.cloneElement(child, {
        		//把父组件的props.name赋值给每个子组件
        		user: this.state.user,
        		getUser:this.getUser
      		})
  		})
	},
	render:function(){
		return (
			<div className="mainBox">
				{this.renderChildren(this.props)}
			</div>
		);
	}
});


render(
	<Router history={hashHistory}>
  		<Route path="/" component={Main}>
    		<IndexRoute component={Mis}/>
    		<Route path="/login" component={Login}/>
  		</Route>
	</Router>
	,document.getElementById("main"));
