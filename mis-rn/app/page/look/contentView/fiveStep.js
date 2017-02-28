import React from "react";
import {TextInput,View,Text} from "react-native";
import { Button,Modal } from 'antd-mobile';

var FiveStep=React.createClass({
	peopleCanDo:function(){
		var can=false;
		if(this.props.user.position){
			if(this.props.user.factory=="yiyanggd"
				&&(this.props.user.position=="部长"
				||this.props.user.position=="管理员"
				||this.props.user.position=="副总经理"
				||this.props.user.position=="总经理")){
				can=true;
			}else if(this.props.user.position=="发电部长"
				||this.props.user.position=="管理员"
				||this.props.user.position=="副总经理"
				||this.props.user.position=="总经理"){
				can=true;
			}
		}
		return can;
	},
    okHandler:function(){
        Modal.alert("确认","确定吗？",[{text:'取消'},
            {text:'确定', onPress: ()=>{
                var val={id:this.props.data.id,state:2,who3:null,date3:null,info3:null,yiJian:this.props.yiJian,factory:this.props.user.factory};
                this.props.changeHandle(val);
            }}])
    },
    backHandler:function(){
        if(this.value){
            Modal.alert("确认","退回吗？",[{text:'取消'},
                { text: '确定', onPress: () => {
                    var val={id:this.props.data.id,state:2,info3:this.state.value,who3:this.props.user.chineseName,date3:new Date(),yiJian:"挂起退回",stop:5,factory:this.props.user.factory};
                    this.props.changeHandle(val);
                }}])
        }else{
            Modal.alert("消息","请填写原因",[{ text: '确定'}])
        }
    },
    endEdit(event){
        this.value=event.nativeEvent.text;
    },
	renderHander:function(){
			if(this.peopleCanDo()){
			return (
				<Tabs defaultActiveKey="1" onChange={this.callback}>
				    <TabPane tab="确认" key="1"><Button onClick={this.okHandler}>挂起确认</Button></TabPane>
				    <TabPane tab="退回" key="2">
				    	<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} onChange={this.getBackMsg} value={this.state.value} maxLength="255"/>
				    	<Button onClick={this.backHandler}>提交</Button>
				    </TabPane>
				</Tabs>
			);
		}else{
			return (
				<Text>等待挂起确认</Text>
			);
		}
	},
	render:function(){
		return (
			this.renderHander()
		)
	}
});

export default FiveStep