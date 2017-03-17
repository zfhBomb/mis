import React from "react";
import {TextInput,View,Text,Picker} from "react-native";
import { Button,Modal } from 'antd-mobile';
import styles from '../style.js';

var ThreeStep=React.createClass({
	getInitialState:function () {
		return {
			selectVal:""
		}
    },
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
    endEdit(val){
        this.value=val;
    },
    okHandler:function(){
        Modal.alert("确认","确定吗？",[{text:'取消'},
            {text:'确定', onPress: ()=>{
                this.sendObj()
            }}])
    },
	sendObj:function(){
		if(this.state.value&&this.state.selectVal){
			if(this.state.selectVal=="处理完毕"){
				if(this.props.data.block=="运行退回"){
					var val={id:this.props.data.id,state:3,who2:this.props.user.chineseName,
						date2:new Date(),info2:this.state.value,yiJian:"等待验收",factory:this.props.user.factory};
					this.props.changeHandle(val);
				}else{
					var val={id:this.props.data.id,state:3,who2:this.props.user.chineseName,info3:null,date3:null,who3:null,
						date2:new Date(),info2:this.state.value,yiJian:"等待验收",factory:this.props.user.factory};
					this.props.changeHandle(val);
				}
			}else if(this.state.selectVal=="没有备品"){
				var val={id:this.props.data.id,state:2,who2:this.props.user.chineseName,
					date2:new Date(),info2:this.state.value,yiJian:this.state.selectVal,stop:2,factory:this.props.user.factory};
				this.props.changeHandle(val);
			}else{
				var val={id:this.props.data.id,state:5,who2:this.props.user.chineseName,info3:null,date3:null,who3:null,
					date2:new Date(),info2:this.state.value,yiJian:"请求挂起",stop:2,factory:this.props.user.factory};
				this.props.changeHandle(val,this.state.selectVal);
			}
		}else{
			this.showMessage();
		}
	},
	selectHandle:function(val){
		this.setState({selectVal:val});
	},
	getSelect:function(){
		var admin=this.props.user.position=="管理员";
		var zy=this.props.zhuanYe.substr(0,2);
		if(this.props.user.factory=="yiyanggd"){
			if(this.props.user.position=="专工"||admin){
				return (<Picker onValueChange={this.selectHandle} selectedValue={this.state.selectVal} prompt="处理意见">
							<Picker.Item label="处理完毕" value="处理完毕" key="1" />
							<Picker.Item label="没有备品" value="没有备品"  key="2"/>
							<Picker.Item label="大小修处理" value="大小修处理"  key="3"/>
							<Picker.Item label="停机处理" value="停机处理"  key="4"/>
						</Picker>)
			}else if(this.props.user.position=="检修"){
				return (<Picker onValueChange={this.selectHandle} selectedValue={this.state.selectVal} prompt="处理意见">
							<Picker.Item label="处理完毕" value="处理完毕" key="1" />
						</Picker>)
			}
		}else{
			if(this.props.user.position==("专工"+zy)||admin){
				return (<Picker onValueChange={this.selectHandle} selectedValue={this.state.selectVal} prompt="处理意见">
							<Picker.Item label="处理完毕" value="处理完毕" key="1" />
							<Picker.Item label="没有备品" value="没有备品"  key="2"/>
							<Picker.Item label="大小修处理" value="大小修处理"  key="3"/>
							<Picker.Item label="停机处理" value="停机处理"  key="4"/>
						</Picker>)
			}else if(this.props.user.position==("检修"+zy)){
				return (<Picker onValueChange={this.selectHandle} selectedValue={this.state.selectVal} prompt="处理意见">
							<Picker.Item label="处理完毕" value="处理完毕" key="1" />
						</Picker>)
			}
		}
		
	},
	renderHander:function(){
			if(this.peopleCanDo()){
                return (
					<View style={styles.actView__box} ref="view">
						<View>
							{this.getSelect()}
						</View>
						<View style={{padding:2}}>
							<TextInput
								style={{
                                    backgroundColor:'#fff',
                                    marginTop:10,
                                    height:100,
                                    textAlignVertical: "top",
									borderWidth:1
								}}
								placeholder='输入点什么吧'
								maxLength={255}
								multiline={true}
								onChangeText={this.endEdit}
								underlineColorAndroid={'transparent'}
							/>
						</View>
						<View>
							<Button type="primary" style={{"margin":10,"height":30}}
									onClick={this.okHandler}>
								确认
							</Button>
						</View>
					</View>
                );
		}else{
			return (
					<div className="waitInfo">等待检修处理完毕</div>
				);
		}
	},
	render:function(){
		return (
			this.renderHander()
		)
	}
});

module.exports =  ThreeStep