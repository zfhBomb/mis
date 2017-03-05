/**
 * Created by Administrator on 2017/3/1.
 */
import React from "react";
import {View, Text, ScrollView,TouchableHighlight} from "react-native";
import * as Animatable from 'react-native-animatable';
import styles from "./style.js";
import { Button, Radio,Checkbox,Modal } from 'antd-mobile';
import DatePicker from 'react-native-datepicker'
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;


const leiXinData = [
    { value: "", label: '无' },
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
        this.setState({val:val},()=>{
            this.props.dataChange(this.props.label,val);
        });
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

const DateView=React.createClass({
    getInitialState(){
        this.startMin="2000-01-01";
        this.startMax="2050-01-01";
        this.endMin="2000-01-01";
        this.endMax="2050-01-01";
        return {
            startValue:"",
            open:false,
            endValue:""
        }
    },
    open(){
        if((this.state.startValue&&this.state.endValue)||(!this.state.startValue&&!this.state.endValue)){
            this.setState({open:!this.state.open});
        }else{
            Modal.alert("警告","请选择完整时间");
        }
    },
    clear(){
        this.setState({startValue:"",endValue:""},()=>{
            this.props.dataChange("dateTool",{startValue:"",endValue:""});
        })
    },
    changeHandler(str,date){
        if(str==="start"){
            this.endMin=date;
            console.log(this.endMin);
        }else {
            this.startMax=date;
        }
        this.setState({[str+"Value"]: date},()=>{
            this.props.dataChange("dateTool",{startValue:this.state.startValue,endValue:this.state.endValue});
        })
    },
    getLeiXin(){
        console.log(this.endMin);
            return (
                <View style={styles.item__dateBox}>
                    <View style={styles.dateBox__date}>
                        <DatePicker style={{width: 200}} mode="date" date={this.state.startValue}
                            placeholder="开始时间" format="YYYY-MM-DD 00:00:00" minDate={this.startMin} maxDate={this.startMax}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {this.changeHandler("start",date)}}
                        />
                    </View>
                    <View style={styles.dateBox__date}>
                        <DatePicker style={{width: 200}} mode="date"  date={this.state.endValue}
                                    placeholder="结束时间" format="YYYY-MM-DD 23:59:59" minDate={this.endMin} maxDate={this.endMax}
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(date) => {this.changeHandler("end",date)}}
                        />
                    </View>
                </View>

            )
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
                        <View style={styles.dateItem__btn}>
                            <Button onClick={this.clear} type="warning">清除</Button>
                        </View>
                    </Animatable.View>):null}
            </View>
        )
    }
});

const CheckboxView=React.createClass({
    getInitialState(){
        return {
            val:[],
            open:false
        }
    },
    yiJianChange(val){
        let newData=this.state.val.concat();
        let has=newData.findIndex((value, index, arr)=>{
            return value === val;
        })
        if(has===-1){
            newData.push(val);
        }else{
            newData.splice(has,1);
        }
        this.setState({val:newData},()=>{
            this.props.dataChange("yiJian",newData);
        });

    },
    open(){
        this.setState({open:!this.state.open});
    },
    getYiJian(){
        return lists=this.props.data.map((list,index)=>{
            let has=this.state.val.findIndex(function(value, index, arr) {
                return value === list.value;
            })
            return (
                <CheckboxItem key={list.value} checked={has!==-1} onChange={() => this.yiJianChange(list.value)}>
                    {list.label}
                </CheckboxItem>
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
                        {this.getYiJian()}
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
    componentDidMount(){
        this.data={};
    },
    submitHandler(){
        let date=this.data.dateTool;
        if(!date||(date.startValue&&date.endValue)||(!date.startValue&&!date.endValue)){
            var subData=Object.assign({},this.data);
            for(var key in subData){
                if(key=="dateTool"){
                    if(!subData[key].endValue||!subData[key].startValue){
                        delete subData[key];
                    }
                }else if(!subData[key]){
                    delete subData[key];
                }
            }
            let store=global.STORE;
            subData.sheBei="所有设备";
            subData.nowPage=0;
            subData.factory=store.user.factory;
            if(this.props.nowView==="我的缺陷"){
                store.myLookStore.changeData(subData,true);
            }else if(this.props.nowView==="查看缺陷"){
                store.lookStore.changeData(subData,true);
            }
            this.props.drawerChange();
        }else{
            Modal.alert("警告","请选择完整时间");
        }
    }

    ,
    clearHandler(){
        this.refs.lxView.setState({val:""});
        this.refs.yjView.setState({val:[]});
        this.refs.zyView.setState({val:""});
        this.refs.dtView.setState({startValue:"",endValue:""});
        this.data={};
    },
    dataChange(key,val){
        this.data[key]=val;
    },
    render(){
        return(
            <View style={styles.box}>
                <View style={styles.box__btnView}>
                    <Button style={styles.btnView__btn} onClick={this.submitHandler} type="primary">查询</Button>
                    <Button style={styles.btnView__btn} onClick={this.clearHandler} type="warning">清空</Button>
                </View>
                <ScrollView style={styles.box__queryView}>
                    <View style={styles.queryView__itemContainer}>
                        <RadioList data={leiXinData} title="缺陷类型" ref="lxView"
                                   dataChange={this.dataChange} label="leiXin"/>
                        <RadioList  data={zhuanYeData} title="所属专业" ref="zyView"
                                    dataChange={this.dataChange} label="zhuanYe"/>
                        <DateView title="查询时间" dataChange={this.dataChange} ref="dtView"/>
                        <CheckboxView title="处理意见" data={yiJianData} dataChange={this.dataChange} ref="yjView" />
                    </View>
                </ScrollView>
            </View>
        )
    }
})

export default DrawerPage