import React from 'react';
import { View,Text,ListView,TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./style.js"

var Detail=React.createClass({
  getInitialState(){
 	 var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 	 var data=[];
 	 for(i=1;i<1000;i++){
 		 data.push("bbbbbbbbbbbbbbb"+i);
 	 }
 	 return {
 		  dataSource: ds.cloneWithRows(data),
 	 }
  },
clickHandler(){
  //this.drawer.openDrawer();
},
 getRow(rowData){
  return (
    <TouchableHighlight onPress={this.clickHandler}>
      <View style={styles.green}>
   			 <Text style={styles.text}>
   				 {rowData}
   			 </Text>
   	 	</View>
    </TouchableHighlight>
  )
 },
	render(){
		return (
        <View style={styles.greenBox}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.getRow}
          />
        </View>
		)
	}
});
export default Detail
