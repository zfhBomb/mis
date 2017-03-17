import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    box: {
        flex:1,
        height:100 * vh,
        marginTop: 10 * vh,
        backgroundColor:'#f4f4f4',
    },
    box__pickerView:{
        marginTop:10,
        marginBottom:10
    },
    style_user_input:{
        backgroundColor:'#fff',
        marginTop:10,
        height:100,
        textAlignVertical: "top"
    },

});