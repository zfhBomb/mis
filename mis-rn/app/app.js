import React, { Component } from 'react';
import { View,Text } from 'react-native';
import navigatorStore from "./mobxStore/navigatorStore.js";
import lookStore from "./mobxStore/lookStore.js";
import myLookStore from "./mobxStore/myLookStore.js";
import Drawer from 'react-native-drawer'
import HeaderNavigator from "./common/header/header.js";
import styles from "./style.js";
import My from "./page/my/my.js";
import DrawerPage from "./page/drawer/drawerPage";
import {observer} from 'mobx-react/native';


global.STORE={
	user:{userName:"admin",chineseName:"管理员",position:"管理员",factory:"yiyanggd"},
	navigatorStore:navigatorStore(),
    lookStore:lookStore(),
	myLookStore:myLookStore()
};

var main=observer(React.createClass({
	closeDrawer(){
        this.drawer.close();
	},
	drawerChange(){
		this.drawer.open();
	},
    render() {
		let title=global.STORE.navigatorStore.head.title;
        return (
					<View style={styles.app}>
						<Drawer
						  	ref={(drawer) => { this.drawer = drawer; }}
						  	content={<DrawerPage drawerChange={this.closeDrawer} nowView={title}/>}
							tapToClose={true}
							openDrawerOffset={0.2}>
								<HeaderNavigator
									initialRoute={{name: title, component: My,menu:true}}
									drawerChange={this.drawerChange}
								/>
						</Drawer>
	        </View>
        );
    }
}));
export default main
