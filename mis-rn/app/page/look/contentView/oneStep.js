import React from "react";
import {TextInput,View,Text} from "react-native";
import { Button,Modal } from 'antd-mobile';

var OneStep=React.createClass({
	okHandler:function(){
		 Modal.alert("确认","确定吗？",[{text:'取消'},
      {text:'确定', onPress: ()=>{
				var val={id:this.props.data.id,state:1,who0:this.props.user.chineseName,date0:new Date(),yiJian:"值长确认",factory:this.props.user.factory};
				this.props.changeHandle(val);
			}}])
	},
	peopleCanDo:function(){
		var can=false;
		if(this.props.user.position){
			if(this.props.user.position=="值长"){
				can=true;
			}else if(this.props.user.position=="管理员"){
				can=true;
			}
		}
		return can;
	},
	backHandler:function(){
		if(this.value){
			Modal.alert("确认","退回吗？",[{text:'取消'},
			 { text: '确定', onPress: () => {
				 var val={id:this.props.data.id,state:0,info0:this.value,who0:this.props.user.chineseName,date0:new Date(),stop:0,yiJian:"此票作废",factory:this.props.user.factory};
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
		if(this.props.data.stop==0){
			return (
				<Text>此缺陷作废</Text>
			);
		}else{
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
								 underlineColorAndroid="transparent" textAlignVertical="bottom"/>
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
					<Text>等待值长确认</Text>
				);
			}
		}
	},
	render:function(){
		return (
			this.renderHander()
		)
	}
});

export default OneStep
