import React from 'react';
import { View,Text,ListView,TouchableOpacity,TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import BottomTools from '../../common/bottomTools/bottomTools.js';
import styles from "./style.js";
import Detail from "./detailsView.js";

var My=React.createClass({
 getInitialState(){
	 var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	 var data=[];
	 for(i=1;i<20;i++){
		 data.push("row"+i);
	 }
	 return {
		  dataSource: ds.cloneWithRows(data),
	 }
 },
 // componentDidMount(){
 //   alert(111);
 // },
 clickHandler(){
	 this.props.navigator.push({
		 name:'缺陷详情',
		 component:Detail,
     hasBefore:true,
     menu:false
	 });
 },
 getRow(rowData){
	 return (
		 <TouchableHighlight underlayColor='#DA5425' onPress={this.clickHandler}>
		 	<View style={styles.list}>
				 <Text style={styles.text}>
					 {rowData}
				 </Text>
		 	</View>
		  </TouchableHighlight>
	 )
 },
	render(){
		return (
				<View style={styles.box}>
					<ListView style={styles.content}
				      dataSource={this.state.dataSource}
				      renderRow={this.getRow}
				  />
          <BottomTools style={styles.bottom} navigator={this.props.navigator}/>
				</View>
		)
	}
});
export default My
