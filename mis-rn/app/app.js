import React, { Component } from 'react';
import { View,Text,DrawerLayoutAndroid } from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
//const myIcon = (<Icon name="rocket" size={12} color="#900" />)
import HeaderNavigator from "./common/header/header.js";
import styles from "./style.js";
import My from "./page/my/my.js";
import navigatorStore from "./store.js";
import {observer} from 'mobx-react/native';


global.STORE={
	user:{userName:"admin",chineseName:"管理员",position:"管理员",factory:"yiyanggd"},
	navigatorStore:navigatorStore()
};

var main=observer(React.createClass({
		drawerChange(){
			this.drawer.openDrawer();
		},
    render() {
			var navigationView = (
	    <View style={{flex: 1, backgroundColor: '#fff',zIndex:1000}}>
	      <Text style={{margin: 10, fontSize: 35, textAlign: 'left'}}>
	        I'm in the Drawer!sdsadsadsadsadsadsad
	        asdsadsadsadsadsadsadsadsadsadsad
	      </Text>
	    </View>
	  );
        return (
					<View style={styles.app}>
						<DrawerLayoutAndroid
			      drawerWidth={250}
						drawerLockMode="locked-closed"
			      ref={(drawer) => { this.drawer = drawer; }}
			      drawerPosition={DrawerLayoutAndroid.positions.Left}
			      renderNavigationView={() => navigationView}>
							<HeaderNavigator
								initialRoute={{name: global.STORE.navigatorStore.head.title, component: My,menu:true}}
								drawerChange={this.drawerChange}
								/>
						</DrawerLayoutAndroid>
	        </View>
        );
    }
}));
export default main
