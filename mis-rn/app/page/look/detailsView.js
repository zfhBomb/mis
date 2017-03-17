import React from 'react';
import {
    View, Text, ListView, TouchableHighlight, ScrollView,
    InteractionManager, Keyboard
} from 'react-native';
import {Card} from 'antd-mobile';
import {Step, Steps} from "../../common/step/step.js";
import Icon from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import OneStep from "./contentView/oneStep.js";
import TwoStep from "./contentView/twoStep.js";
import ThreeStep from "./contentView/threeStep.js";
import FourStep from "./contentView/fourStep.js";
import FiveStep from "./contentView/fiveStep.js";
import Loading from "../../common/loading.js";
import formatUrl from "../../base/formatUrl.js";
import styles from "./style.js"

var StepItem = React.createClass({
    //this.props.time=="1970-01-01 08:00:00"?"":
    render: function () {
        var item = null;
        if (this.props.info) {
            item = <Text>{this.props.info}</Text>
        }
        var list = this.props.info ? item : <Text>无</Text>;
        return (
            <Animatable.Text animation="zoomInUp">
                {list}{'\n'}
                <Text>{this.props.who}{'\n'}</Text>
                <Text>{this.props.time}</Text>
            </Animatable.Text>
        )
    }
});
var MyStep = React.createClass({
    render(){
        var data = this.props.data,
            status0 = "wait",
            status1 = "wait",
            status2 = "wait",
            status3 = "wait";
        if (data.state >= 0) {
            if (data.state == 0) {
                status0 = "process";
            } else {
                status0 = "finish";
            }
            if (data.state == 0 && data.stop == 0) {
                status0 = "error";
            }
        }
        if (data.state >= 1) {
            if (data.state == 1) {
                status1 = "process";
            } else {
                status1 = "finish";
            }
            // if(data.state==2&&data.stop==2){
            //   status1="error";
            // }
        }
        if (data.state >= 2) {
            if (data.state == 2) {
                status2 = "process";
            } else {
                status2 = "finish";
            }
            if (data.stop == 2) {
                status2 = "error";
            }
        }
        if (data.state >= 3) {
            if (data.state == 3) {
                status3 = "process";
            } else {
                status3 = "finish";
            }
            if (data.stop == 3) {
                status3 = "error";
            }
        }
        return (
            <View style={this.props.style}>
                <Steps>
                    <Step status={status0} title={data.state >= 1 ? "值长已确认" : "待值长确认"}
                          description={<StepItem info={data.info0} who={data.who0} time={data.date0}/>}/>
                    <Step status={status1} title={data.state >= 2 ? "检修已接收" : "待检修接收"}
                          description={<StepItem info={data.info1} who={data.who1} time={data.date1}/>}/>
                    <Step status={status2} title={data.state >= 3 ? "缺陷已处理" : "缺陷待处理"}
                          description={<StepItem info={data.info2} who={data.who2} time={data.date2}/>}/>
                    <Step status={status3} title={data.state >= 4 ? "运行已验收" : "待运行验收"}
                          description={<StepItem info={data.info3} who={data.who3} time={data.date3}/>}/>
                </Steps>
            </View>
        )
    }
});

var ActionView = React.createClass({
    getActContent: function () {
        var data = this.props.data;
        var user = global.STORE.user;
        var submitHandler = this.props.submitHandler;
        var zhuanYe = this.props.zhuanYe;
        switch (data.state) {
            case 0:
                return (<OneStep user={user} changeHandle={submitHandler}
                                 data={data} zhuanYe={zhuanYe}/>);
            case 1:
                return (<TwoStep user={user} changeHandle={submitHandler}
                                 data={data} zhuanYe={zhuanYe}/>);
            case 2:
                return (<ThreeStep user={user} changeHandle={submitHandler}
                                   data={data} zhuanYe={zhuanYe}/>);
            case 3:
                return (<FourStep user={user} changeHandle={submitHandler}
                                  data={data} zhuanYe={zhuanYe}/>);
            case 5:
                return (<FiveStep user={user} changeHandle={submitHandler}
                                  data={data} zhuanYe={zhuanYe} yiJian={this.props.yiJian}/>);
            default:
                return <Text>缺陷闭环</Text>;
        }
    },
    render(){
        return (
            <View style={styles.actView}>
                {this.getActContent()}
            </View>
        )
    }
});

var Detail = React.createClass({
    getInitialState(){
        return {
            data: {}
        }
    },
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    },
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    },
    _keyboardDidShow () {
        this.refs.view.setNativeProps({
            style: {"position": "relative", top: -200}
        })
    },
    _keyboardDidHide () {
        this.refs.view.setNativeProps({
            style: {"position": "relative", top: 0}
        })
    },
    submitHandler(){
        alert("提交");
    },
    componentDidMount(){
        this.fetchFuc({id: this.props.data.id, factory: "yiyanggd"}, (responseJson) => {
            setTimeout(() => {
                this.setState({data: responseJson})
            },2000)
        });
    },
    fetchFuc(data, callBack){
        var url = formatUrl('http://192.168.1.166/change', data);
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                callBack(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    render(){
        return (
            <ScrollView style={styles.detailBox} ref="view">
                <Card style={styles.card}>
                    <Card.Header
                        title={(<View style={styles.card__title}>
                            <Text style={{color: "black", fontSize: 14}}>{this.props.data.yiJian}</Text>
                            <Text style={{
                                color: "gray",
                                fontSize: 14
                            }}>{this.props.data.who + " 填写于 " + this.props.data.date}</Text>
                        </View>)}
                    />
                    <Card.Body>
                        <View style={styles.card__content}>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                lineHeight: 25
                            }}>{"专业：" + this.props.data.zhuanYe}</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                lineHeight: 25
                            }}>{"类型：" + this.props.data.leiXin}</Text>
                            <Text style={{
                                color: "black",
                                fontSize: 16,
                                lineHeight: 25
                            }}>{"内容：" + this.props.data.content}</Text>
                        </View>
                    </Card.Body>
                    <Card.Footer content={(
                        <View style={styles.card__footer}>
                            <Text>{"设备：" + this.props.data.sheBei}</Text>
                        </View>
                    )}/>
                </Card>
                {this.state.data.id ? <MyStep style={styles.stepBox} data={this.state.data}/> :
                    <Loading width={200} height={200} backgroundColor="#f4f4f4"/>}
                {(this.state.data.state||this.state.data.state===0)? <ActionView data={this.state.data} zhuanYe={this.props.data.zhuanYe}
                                                     submitHandler={this.submitHandler}
                                                     yiJian={this.props.data.yiJian}/> :
                    <Loading width={200} height={200} backgroundColor="#f4f4f4"/>}
            </ScrollView>
        )

    }
});
export default Detail
