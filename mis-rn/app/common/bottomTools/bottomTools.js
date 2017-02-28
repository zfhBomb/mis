import React from 'react';
import { View,Text,TouchableWithoutFeedback,Navigator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./style.js";
import {observer} from 'mobx-react/native';
import CustomTransitions from "../CustomTransitions/CustomTransitions.js";

var ToolList=React.createClass({
	clickHandler(){
		this.props.listClick(this.props.data);
	},
	render(){
		var iconColor="gray";
		var textSty=styles.text;
		if(this.props.act==this.props.data.name){
			iconColor="green";
			textSty=styles.actText;
		}
		return (
			<TouchableWithoutFeedback onPress={this.clickHandler}>
				<View style={styles.list}>
						<View>
							<Icon name={this.props.data.icon} size={25} color={iconColor} />
							<Text style={textSty}>{this.props.data.text}</Text>
						</View>
				</View>
			</TouchableWithoutFeedback>
		)
	}
});


var BottomTools=observer(React.createClass({
	listClick(data){
		global.STORE.navigatorStore.changeActive(data.name);
		var pages=this.props.navigator.getCurrentRoutes();
		var has=false;
			for(i=0;i<pages.length;i++){
				if(data.title==pages[i].name){
					has=pages[i];
					break;
				}
			}
		if(has){
			this.props.navigator.jumpTo(has);
		}else{
			this.props.navigator.push({
				name:data.title,
				component:data.component,
				sceneConfig:CustomTransitions.NONE,
				hasBefore:false,
				menu:true
			})
		}
	},
	render(){
		var lists=global.STORE.navigatorStore.page.map((list,key)=>{
			return <ToolList data={list} key={key} act={global.STORE.navigatorStore.active}
								listClick={this.listClick} />
		})
		return (
      <View style={styles.box}>
			     {lists}
			</View>
			 )
	}
}));


export default BottomTools
