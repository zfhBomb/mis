import React from 'react';
import { View,Text,TouchableWithoutFeedback } from 'react-native';
import BottomTools from '../../common/bottomTools/bottomTools.js';
import styles from "./style.js"

var Charts=React.createClass({

	render(){
		return (
			<View style={styles.box}>
				<View style={{"flex":1,"padding":5}}>
					<Text style={styles.text}>对不起，手机端图表暂不支持，正在开发中~~~~~</Text>
				</View>
				<BottomTools navigator={this.props.navigator}/>
			</View>
		)
	}
});
export default Charts
