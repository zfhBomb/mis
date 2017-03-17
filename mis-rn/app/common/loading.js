import React from "react";
import {View,Text} from "react-native";
import { Bubbles } from 'react-native-loader';

var LoadingView=React.createClass({
  render(){
      if(this.props.loading){
          return (
              <View style={{zIndex:1000,"flex":1,"justifyContent":"center","alignItems":"center",position:"absolute",
                  height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,0.3)",}}>
                  <View>
                      <Bubbles size={10} color="yellow" />
                  </View>
              </View>
          )
      }else if(this.props.height){
          return (
              <View style={{height:this.props.height,width:this.props.width,backgroundColor:this.props.backgroundColor}}>
                  <View>
                      <Bubbles size={10} color="yellow" />
                  </View>
              </View>
          )
      }else {
          return <View></View>
      }
  }
});

export default LoadingView
