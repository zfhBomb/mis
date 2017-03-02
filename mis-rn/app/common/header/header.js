import React from 'react';
import { View,Text,TouchableOpacity,Navigator } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./style.js";
import {observer} from 'mobx-react/native';
import { Popover } from 'antd-mobile';

var HeaderNavigator=React.createClass({
	onDidFocus(route){
		if(this.props.onDidFocus){
			this.props.onDidFocus(route)
		}
	},
	onWillFocus(route){
		const store=global.STORE;
		if(this.props.onDidFocus){
			this.props.onWillFocus(route)
		}else{
			if(route.hasBefore){
				store.navigatorStore.changeHeadLeft(<Icon name="chevron-left" size={30} color="gray"/>);
			}else{
		    store.navigatorStore.changeHeadLeft(null);
			}
			if(route.menu){
				store.navigatorStore.changeHeadRight(<Icon name="menu" size={30} color="#fff"/>);
			}else{
				store.navigatorStore.changeHeadRight(null);
			}
				store.navigatorStore.changeHeadTitle(route.name);
		}
	},
	configureScene(route, routeStack){
		if(route.sceneConfig){
			return route.sceneConfig
		}else{
			var conf=Navigator.SceneConfigs.PushFromRight;
			conf.gestures=null;
			return conf
		}
	},
	render(){
		var renderScene=(route, navigator) =><route.component navigator={navigator} {...route}/>
		return (
			<Navigator
				initialRoute={this.props.initialRoute}
				configureScene={this.configureScene}
				navigationBar={<Header navigator={navigator} drawerChange={this.props.drawerChange}/>}
				renderScene={this.props.renderScene?this.props.renderScene:renderScene}
				onDidFocus={this.onDidFocus}
				onWillFocus={this.onWillFocus}
				/>
		)
	}
});

var Header=observer(React.createClass({
	breakClick(){
		const store=global.STORE;
		var num=this.props.navigator.getCurrentRoutes().length-2;
		var title=this.props.navigator.getCurrentRoutes()[num].name;
		store.navigatorStore.changeHeadTitle(title);
		this.props.navigator.pop();
	},
	clickMenu(){
		this.props.drawerChange();
	},
	render(){
		var navigatorStore=global.STORE.navigatorStore;
		return (
			<View style={styles.box}>
				<View style={styles.left}>
					<TouchableOpacity onPress={this.breakClick}>
						{navigatorStore.head.left}
					</TouchableOpacity>
				</View>
				<Text style={styles.tltle}>{navigatorStore.head.title}</Text>
				<View style={styles.right}>
					<Popover
						overlay={[
                            (<Popover.Item key="1" value="scan"  >扫一扫</Popover.Item>),
                            (<Popover.Item key="2" value="special" >我的二维码</Popover.Item>),
                            (<Popover.Item key="3" value="button ct" >帮助</Popover.Item>),
                        ]}
					>
						<TouchableOpacity onPress={this.clickMenu}>
							{navigatorStore.head.right}
						</TouchableOpacity>
					</Popover>
				</View>
			</View>
			 )
	}
}));


export default HeaderNavigator
