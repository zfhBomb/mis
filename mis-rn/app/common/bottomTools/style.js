import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "box": {
        "width": 100 * vw,
        "height": 10 * vh,
        "backgroundColor": "#1892FF",
        "flexDirection": "row"
    },
    "list": {
        "flex": 1,
        "alignItems": "center",
        "justifyContent": "center"
    },
    "text": {
        "fontSize": 10,
        "color":"#fff",
        "textAlign": "center"
    },
    "actText": {
        "fontSize": 10,
        "color": "#FF511C",
        "textAlign": "center"
    }
});