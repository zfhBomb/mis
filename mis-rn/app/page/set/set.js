import React from 'react';
import { View,Text,TouchableWithoutFeedback,Image } from 'react-native';
import BottomTools from '../../common/bottomTools/bottomTools.js';
import Icon from 'react-native-vector-icons/Entypo';
import { List, Button } from 'antd-mobile';
import ChangePassWord from "./changePassWord.js";
import Version from "./version.js";
const Item = List.Item;
const Brief = Item.Brief;
import styles from "./style.js";

var Set=React.createClass({
	render(){
		return (
			<View style={styles.box}>
				<View style={{"flex":1,"padding":5}}>
					<List renderHeader={() => ''}>
						<Item align="top" thumb={<Image style={{height:50,width:50,marginRight:20}} source={require("../../img/logo.png")}/>} multipleLine>
							{global.STORE.user.chineseName} <Brief>{global.STORE.user.position}</Brief>
						</Item>
					</List>
					<List renderHeader={() => ''}>
						<Item
							thumb={<Icon name="cog" size={26} color="red" style={{marginRight:10}}/>}
							arrow="horizontal"
							onClick={() => {this.props.navigator.push({
								name:"密码修改",
                                component:ChangePassWord,
                                hasBefore:true,
                                menu:false})}}
						>
							修改密码
						</Item>
						<Item extra="1.0.0" thumb={<Icon name="text-document" size={26} color="green" style={{marginRight:10}}/>} arrow="horizontal"
							  onClick={() => {this.props.navigator.push({
                                  name:"关于软件",
                                  component:Version,
                                  hasBefore:true,
                                  menu:false})}}
						>
							关于软件
						</Item>
					</List>
					<View style={styles.box__btnView}>
						<Button type="warning" onClick={()=>{this.props.loginout()}}>退出登录</Button>
					</View>
				</View>
				<BottomTools navigator={this.props.navigator}/>
			</View>
		)
	}
});
export default Set
