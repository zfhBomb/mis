import React, { Component } from 'react';
import { View,Text } from 'react-native';
import Drawer from 'react-native-drawer'
import HeaderNavigator from "./common/header/header.js";
import styles from "./style.js";
import My from "./page/my/my.js";
import DrawerPage from "./page/drawer/drawerPage";
import navigatorStore from "./store.js";
import {observer} from 'mobx-react/native';


global.STORE={
	user:{userName:"admin",chineseName:"管理员",position:"管理员",factory:"yiyanggd"},
	navigatorStore:navigatorStore()
};

var main=observer(React.createClass({
		drawerChange(){
			this.drawer.open();
		},
    render() {
        return (
					<View style={styles.app}>
						<Drawer
						  	ref={(drawer) => { this.drawer = drawer; }}
						  	content={<DrawerPage />}
							tapToClose={true}
							openDrawerOffset={100}>
								<HeaderNavigator
									initialRoute={{name: global.STORE.navigatorStore.head.title, component: My,menu:true}}
									drawerChange={this.drawerChange}
								/>
						</Drawer>
	        </View>
        );
    }
}));
export default main
