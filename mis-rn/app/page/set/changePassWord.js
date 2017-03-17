/**
 * Created by Administrator on 2017/3/11.
 */

import React from "react";
import { Text, View, TextInput,TouchableOpacity} from 'react-native';
import { Button,Modal } from 'antd-mobile';
import styles from "./style.js";


export default ChangePassWord=React.createClass({
    getInitialState(){
        return {
            leiXin:"三类缺陷",
            zhuanYe:"锅炉专业"
        }
    },
    submitHandler(){
        if(this.state.leiXin&&this.state.zhuanYe&&this.content){
            Modal.alert("提示","确认提交？",[{text:'取消'},
                {text:'确定', onPress: ()=>{

                }}]
            );
        }else{
            Modal.alert("警告","请填写完整信息");
        }
    },
    textHandler(val){
        this.content=val;
    },
    render() {
        return (
            <View style={styles.box}>
                <View style={{"flex":1,"padding":5}}>
                    <TextInput
                        style={styles.style_user_input}
                        placeholder='原始密码'
                        numberOfLines={1}
                        autoFocus={true}
                        secureTextEntry={true}
                        underlineColorAndroid={'transparent'}
                    />
                    <View
                        style={{height:1,backgroundColor:'#f4f4f4'}}
                    />
                    <TextInput
                        style={styles.style_pwd_input}
                        placeholder='新密码'
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                    />
                    <View
                        style={{height:1,backgroundColor:'#f4f4f4'}}
                    />
                    <TextInput
                        style={styles.style_pwd_input}
                        placeholder='确认密码'
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                    />
                    <Button style={{marginTop:50}} onClick={this.submitHandler} type="primary">
                        提交
                    </Button>
                </View>
            </View>
        );
    }
})


