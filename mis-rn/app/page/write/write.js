import React from "react";
import { Text, View, TextInput,Picker,TouchableOpacity} from 'react-native';
import BottomTools from '../../common/bottomTools/bottomTools.js';
import { Button,Modal } from 'antd-mobile';
import styles from "./style.js";

const leiXinData = [
    { value: "一类缺陷", label: '一类' },
    { value: "二类缺陷", label: '二类' },
    { value: "三类缺陷", label: '三类' },
    { value: "其他", label: '其他' },
];
const zhuanYeData=[
    {label:"汽机专业",value:"汽机专业"},
    {label:"锅炉专业",value:"锅炉专业"},
    {label:"电气专业",value:"电气专业"},
    {label:"化学专业",value:"化学专业"},
    {label:"热控专业",value:"热控专业"}
];


export default Write=React.createClass({
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
                    fetch('http://192.168.1.166/write', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({leiXin:this.state.leiXin,zhuanYe:this.state.zhuanYe,
                            content:this.content,yiJian:"等待值长确认",who:global.STORE.user.chineseName,
                            sheBei:"所有设备",factory:global.STORE.user.factory})
                    })
                        .then((response) => {
                            return response.json()
                        })
                        .then((responseJson) => {
                            alert(responseJson.ok);
                        })
                        .catch((error) => {
                            console.error(error);
                        })
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
        let leiXinLists=leiXinData.map((list,index)=>{
            return <Picker.Item label={list.label} value={list.value} key={index} />
        });
        let zhuanYeLists=zhuanYeData.map((list,index)=>{
            return <Picker.Item label={list.label} value={list.value} key={index} />
        });
        return (
			<View style={styles.box}>
                <View style={{"flex":1,"padding":5}}>
                    <TextInput
                        style={styles.style_user_input}
                        placeholder='这里是缺陷的具体描述'
                        autoFocus={true}
                        multiline={true}
                        onChangeText={this.textHandler}
                        underlineColorAndroid={'transparent'}
                    />
                    <View style={styles.box__pickerView}>
                        <Picker
                            prompt="缺陷类型"
                            selectedValue={this.state.leiXin}
                            onValueChange={(val) => this.setState({leiXin: val})}>
                            {leiXinLists}
                        </Picker>
                    </View>
                    <View style={styles.box__pickerView}>
                        <Picker
                            prompt="所属专业"
                            selectedValue={this.state.zhuanYe}
                            onValueChange={(val) => this.setState({zhuanYe: val})}>
                            {zhuanYeLists}
                        </Picker>
                    </View>
                    <Button onClick={this.submitHandler} type="primary">
                        提交
                    </Button>
                </View>
				<BottomTools navigator={this.props.navigator}/>
			</View>
        );
    }
})

