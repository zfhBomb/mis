import React from "react";
import {TextInput,View,Text} from "react-native";
import { Button,Modal } from 'antd-mobile';

var TwoStep=React.createClass({
	peopleCanDo:function(){
		var zy=this.props.zhuanYe.substr(0,2);
		var can=false;
		if(this.props.user.position){
			if(this.props.user.factory=="yiyanggd"&&(this.props.user.position=="专工"||this.props.user.position=="检修")){
				can=true;
			}else if(this.props.user.position==("检修"+zy)||this.props.user.position==("专工"+zy)){
				can=true;
			}else if(this.props.user.position=="管理员"){
				can=true;
			}
		}
		return can;
	},
    okHandler:function(){
        Modal.alert("确认","确定吗？",[{text:'取消'},
            {text:'确定', onPress: ()=>{
                var val={id:this.props.data.id,state:2,who1:this.props.user.chineseName,date1:new Date(),info1:"",yiJian:"正在处理",factory:this.props.user.factory};
                this.props.changeHandle(val);
            }}])
    },
    backHandler:function(){
        if(this.value){
            Modal.alert("确认","退回吗？",[{text:'取消'},
                { text: '确定', onPress: () => {
                    var val={id:this.props.data.id,state:0,info1:this.state.value,who1:this.props.user.chineseName,date1:new Date(),yiJian:"等待值长确认",factory:this.props.user.factory};
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
					<View style={{flex:1}} ref="view">
						<View style={{
                            backgroundColor: '#F0F0F0',
                            padding:2,
                            height:60,
                            borderColor: '#000000',
                            borderWidth: 1 }}
						>
							<TextInput style={{"lineHeight":20,"padding":0,"flex":1}} multiline maxLength={255}
									   placeholder="输入点什么吧" onEndEditing={this.endEdit}
									   underlineColorAndroid="transparent"/>
						</View>
						<View style={{"flexDirection":"row"}}>
							<Button type="primary" style={{"margin":10,"width":100,"height":30}}
									onClick={this.okHandler}>
								确认
							</Button>
							<Button type="warning" style={{"margin":10,"width":100,"height":30}}
									onClick={this.backHandler}>
								退回
							</Button>
						</View>
					</View>
                );
		}else{
			return (
					<Text>等待检修或专工确认</Text>
				);
		}
	},
	render:function(){
		return (
			this.renderHander()
		)
	}
});

export default  TwoStep