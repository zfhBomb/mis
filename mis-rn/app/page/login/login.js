import React from "react";
import { StyleSheet, Text, Picker, View, TextInput, TouchableOpacity} from 'react-native';
import { Modal } from 'antd-mobile';
import Loading from "../../common/loading.js";

export default Login=React.createClass({
    getInitialState(){
        return {
            loading:false,
            factory:"yiyanggd"
        }
    },
  loginHandler(){
      if(this.userName&&this.passWord&&this.state.factory){
          this.setState({loading:true},()=>{
              global.STORE.userStore.login({userName:this.userName,passWord:this.passWord,factory:this.state.factory},(responseJson)=>{
                  this.setState({loading:false},()=>{
                      if(responseJson.ok==1){
                          Modal.alert("警告","用户不存在");
                      }else if(responseJson.ok==2){
                          Modal.alert("警告","密码错误");
                      }else if(responseJson.ok==0){
                          this.props.loginHandler(responseJson.user);
                      }
                  })
              })

          })
      }else{
          Modal.alert("提示","请填写完整信息");
      }
  },
  userNameChange(val){
      this.userName=val;
  },
  passWordChange(val){
      this.passWord=val;
  },
    factoryChange(val){
        this.setState({factory:val});
    },
  render() {
    return (
      <View style={{backgroundColor:'#f4f4f4',flex:1}}>
          <View style={{flex:1,justifyContent:"center"}}>
              <TextInput
                  style={styles.style_user_input}
                  placeholder='输入账号'
                  numberOfLines={1}
                  autoFocus={true}
                  onChangeText={this.userNameChange}
                  underlineColorAndroid={'transparent'}
              />
              <TextInput
                  style={styles.style_pwd_input}
                  placeholder='输入密码'
                  numberOfLines={1}
                  onChangeText={this.passWordChange}
                  underlineColorAndroid={'transparent'}
                  secureTextEntry={true}
              />
              <View style={{marginLeft:10}}>
                  <Text>选择公司：</Text>
              </View>
              <Picker
                  style={styles.style_pwd_input}
                  selectedValue={this.state.factory}
                  onValueChange={this.factoryChange}>
                  <Picker.Item label="光大环保能源（益阳）有限公司" value="yiyanggd" />
                  <Picker.Item label="鄱阳凯迪电厂" value="poyangkd" />
              </Picker>
              <TouchableOpacity onPress={this.loginHandler}>
                  <View style={styles.style_view_commit}>
                      <Text style={{color:'#fff'}}>
                          登录
                      </Text>
                  </View>
              </TouchableOpacity>
          </View>
          <Loading loading={this.state.loading}/>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  style_user_input:{
      backgroundColor:'#fff',
      margin:10,
      height:35,
      borderWidth:1,
      borderColor:"#e0e0e0"
  },
   style_pwd_input:{
      backgroundColor:'#fff',
      height:35,
      borderWidth:1,
      margin:10,
      borderColor:"#e0e0e0"
  },
   style_view_commit:{
      marginTop:15,
      marginLeft:10,
      marginRight:10,
      backgroundColor:'#63B8FF',
      height:35,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center',
  }
});
