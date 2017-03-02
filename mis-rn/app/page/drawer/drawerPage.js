/**
 * Created by Administrator on 2017/3/1.
 */
import React from "react";
import {View, Text, ScrollView,TouchableHighlight} from "react-native";
import * as Animatable from 'react-native-animatable';
import styles from "./style.js";
import { Button,List, Radio } from 'antd-mobile';
const RadioItem = Radio.RadioItem;


const leiXinData = [
    { value: "一类缺陷", label: '一类' },
    { value: "二类缺陷", label: '二类' },
    { value: "三类缺陷", label: '三类' },
    { value: "其他", label: '其他' },
];
const zhuanYeData=[
    {label:"无",value:""},
    {label:"汽机专业",value:"汽机专业"},
    {label:"锅炉专业",value:"锅炉专业"},
    {label:"电气专业",value:"电气专业"},
    {label:"化学专业",value:"化学专业"},
    {label:"热控专业",value:"热控专业"}
];
const yiJianData=[
    {label:"正在处理",value:"正在处理"},
    {label:"没有备品",value:"没有备品"},
    {label:"停机处理",value:"停机处理"},
    {label:"大小修处理",value:"大小修处理"},
    {label:"运行退回",value:"运行退回"},
    {label:"等待值长确认",value:"等待值长确认"},
    {label:"值长确认",value:"值长确认"},
    {label:"此票作废",value:"此票作废"},
    {label:"缺陷闭环",value:"缺陷闭环"},
    {label:"请求挂起",value:"请求挂起"},
    {label:"挂起退回",value:"挂起退回"},
    {label:"等待验收",value:"等待验收"}
];

const RadioList=React.createClass({
    getInitialState(){
      return {
          val:"",
          open:false
      }
    },
    leiXinChange(val){
        this.setState({val:val});
    },
    open(){
        this.setState({open:!this.state.open});
    },
    getLeiXin(){
        return lists=this.props.data.map((list,index)=>{
            return (
                <RadioItem key={list.value} checked={this.state.val === list.value} onChange={() => this.leiXinChange(list.value)}>
                    {list.label}
                </RadioItem>
            )
        })
    },
    render(){
        return (
            <View>
                <TouchableHighlight onPress={()=>{this.open()}}>
                    <View style={styles.itemContainer__title}>
                        <Text>{this.props.title}</Text>
                    </View>
                </TouchableHighlight>
                {this.state.open?(<Animatable.View animation="flipInY" style={styles.itemContainer__item}>
                        {this.getLeiXin()}
                    </Animatable.View>):null}
            </View>
        )
    }
});

const DrawerPage=React.createClass({
    getInitialState(){
        return {
            select:0
        }
    },
    ViewSelect(num){
        if(num===this.state.select){
            this.setState({select:0});
        }else{
            this.setState({select:num});
        }
    },
    yiJianChange(){

    },
    dateChange(){

    },
    getZhuanYe(){

    },
    getYiJian(){

    },
    render(){
        return(
            <View style={styles.box}>
                <View style={styles.box__btnView}>
                    <Button style={styles.btnView__btn} type="primary">查询</Button>
                    <Button style={styles.btnView__btn} type="warning">清空</Button>
                </View>
                <ScrollView style={styles.box__queryView}>
                    <View style={styles.queryView__itemContainer}>
                        <RadioList data={leiXinData} title="缺陷类型"/>
                        <RadioList  data={zhuanYeData} title="缺陷专业"/>
                    </View>
                </ScrollView>
            </View>
        )
    }
})

export default DrawerPage