import React from 'react';
import { View,Text,ListView,TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from "./style.js";

export var Step=React.createClass({
  getLeft(str){
    switch (str) {
      case "wait":
        return (
          <View style={{"flex": 1,"alignItems": "center"}}>
            <View style={{"backgroundColor": "gray","width": 20,"height": 20,"borderRadius": 10}}>
              <View><Icon name="dots-three-horizontal" size={20} color="white"/></View>
            </View>
            <View style={{"flex": 1,"width": 2,"backgroundColor": "gray"}}></View>
          </View>
          );
      case "process":
        return (
          <View style={{"flex": 1,"alignItems": "center"}}>
            <View style={{"backgroundColor": "#108ee9","width": 20,"height": 20,"borderRadius": 10}}>
              <View><Icon name="user" size={20} color="white"/></View>
            </View>
            <View style={{"flex": 1,"width": 2,"backgroundColor": "#108ee9"}}></View>
          </View>
          );;
      case "finish":
        return (
          <View style={{"flex": 1,"alignItems": "center"}}>
            <View style={{"backgroundColor": "#fff","width": 20,"height": 20,"borderRadius": 10,"borderWidth": 2,"borderColor":"#108ee9"}}>
              <View><Icon name="check" size={18} color="#108ee9"/></View>
            </View>
            <View style={{"flex": 1,"width": 2,"backgroundColor": "#108ee9"}}></View>
          </View>
          );;
      case "error":
        return (
          <View style={{"flex": 1,"alignItems": "center"}}>
            <View style={{"backgroundColor": "red","width": 20,"height": 20,"borderRadius": 10}}>
              <View><Icon name="cross" size={20} color="white"/></View>
            </View>
            <View style={{"flex": 1,"width": 2,"backgroundColor": "red"}}></View>
          </View>
          );;
      default:
    }
  },
  render(){
    return(
      <View style={styles.box}>
        {this.getLeft(this.props.status)}
        <View style={styles.box__right}>
          <View>
            <Text style={styles.right__title}>{this.props.title}</Text>
          </View>
          <View>
            {this.props.description}
          </View>
        </View>
      </View>
    )
  }
});

var EndIcon=React.createClass({
  render(){
    return(
      <View style={{"flex": 1,"flexDirection": "row","minHeight": 30}}>
        <View style={{"flex": 1,"alignItems": "center"}}>
          <View style={{"backgroundColor": "red","width": 20,"height": 20,"borderRadius": 10}}>
            <View><Icon name="block" size={20} color="white"/></View>
          </View>
        </View>
        <View style={styles.box__right}>
        </View>
      </View>
    )
  }
});

export var Steps=React.createClass({
  render(){
    return(
      <View>
        {this.props.children}
        <EndIcon />
      </View>
    )
  }
});
