import React, { Component } from 'react';
import { View,Text } from 'react-native';
import navigatorStore from "./mobxStore/navigatorStore.js";
import lookStore from "./mobxStore/lookStore.js";
import myLookStore from "./mobxStore/myLookStore.js";
import userStore from "./mobxStore/userStore.js";
import Drawer from 'react-native-drawer'
import HeaderNavigator from "./common/header/header.js";
import styles from "./style.js";
import My from "./page/my/my.js";
import DrawerPage from "./page/drawer/drawerPage";
import {observer} from 'mobx-react/native';
import Login from "./page/login/login.js";
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: null
})

global.STORE={
	navigatorStore:navigatorStore(),
    lookStore:lookStore(),
	myLookStore:myLookStore(),
    userStore:userStore()
};

var Main=observer(React.createClass({

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
									loginout={this.props.loginout}
								/>
						</Drawer>
	        </View>
        );
    }
}));

const App=React.createClass({
	getInitialState(){
		return {
			isLogin:1
		}
	},
	loginHandler(user){
        global.STORE.user={userName:"admin",chineseName:"管理员",position:"管理员",factory:"yiyanggd"};
        //console.log(user);
        storage.save({
        	key:"users",
            rawData:{userName:"admin",chineseName:"管理员",position:"管理员",factory:"yiyanggd"},
            expires: null
        });
		this.setState({isLogin:3});
	},
	componentDidMount(){
        this.loadUser();
	},
	loginout(){
        storage.remove({
            key: 'users'
        });
        this.setState({isLogin:2});
	},
	loadUser(){
        storage.load({
            key: 'users',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            global.STORE.user=ret;
            this.setState({isLogin:3});
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    this.setState({isLogin:2})
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
	},
    render(){
		if(this.state.isLogin==3){
            return (
				<Main loginout={this.loginout}/>
            );
		}else if(this.state.isLogin==2){
            return (
				<Login loginHandler={this.loginHandler}/>
            );
		}else if(this.state.isLogin==1){
			return <View></View>
		}
    }
});

export default App
