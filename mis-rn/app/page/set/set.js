import React from 'react';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./style.js"

var Set=React.createClass({

	render(){
		return (
				<View style={styles.box}>
					<Text style={styles.text}>设置页</Text>
				</View>
		)
	}
});
export default Set