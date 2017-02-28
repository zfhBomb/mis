import React from "react";
import {TextInput,View,Text} from "react-native";
import { Button,Modal } from 'antd-mobile';

var FourStep=React.createClass({
	peopleCanDo:function(){
		var can=false;
		if(this.props.user.position){
			if(this.props.user.factory=="yiyanggd"&&this.props.user.position=="值长"){
				can=true;
			}else if(this.props.user.position.indexOf("主值")>-1){
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
                var val={id:this.props.data.id,state:4,who3:this.props.user.chineseName,date3:new Date(),info3:"",yiJian:"缺陷闭环",factory:this.props.user.factory};
                this.props.changeHandle(val);
            }}])
    },
    backHandler:function(){
        if(this.value){
            Modal.alert("确认","退回吗？",[{text:'取消'},
                { text: '确定', onPress: () => {
                    var val={id:this.props.data.id,state:2,info3:this.state.value,who3:this.props.user.chineseName,date3:new Date(),yiJian:"运行退回",stop:3,factory:this.props.user.factory,block:"运行退回"};
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
				<Text>等运行验收</Text>
			);
		}
	},
	render:function(){
		return (
			this.renderHander()
		)
	}
});

export default FourStep