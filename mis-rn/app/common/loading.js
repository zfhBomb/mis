import React from "react";
import {View,Text} from "react-native";


var LoadingView=React.createClass({
  render(){
    return (
      <View style={{"flex":1,"justifyContent":"center","alignItems":"center",
        "width":this.props.width,"height":this.props.height}}>
        <View>
          <Text style={{"color":"gray","fontSize":20}}>
            正在努力加载中...
          </Text>
        </View>
      </View>
    )
  }
});

export default LoadingView
