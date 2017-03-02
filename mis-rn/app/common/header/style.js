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
        "flexDirection": "row",
        "justifyContent": "space-between",
        "alignItems": "center",
        "position": "absolute",
        "top": 0
    },
    "tltle": {
        "fontSize": 18,
        "color":"#fff"
    },
    "left": {
        "marginLeft": 2 * vw,
        "width": 8 * vw,
        "height": 5 * vh
    },
    "right": {
        "marginRight": 2 * vw,
        "width": 8 * vw,
        "height": 5 * vh
    }
});