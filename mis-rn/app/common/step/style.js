import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "box": {
        "flex": 1,
        "flexDirection": "row",
        "minHeight": 80
    },
    "box__left": {
        "flex": 1,
        "alignItems": "center"
    },
    "left__iconBox": {
        "backgroundColor": "#108ee9",
        "width": 20,
        "height": 20,
        "borderRadius": 10
    },
    "left__line": {
        "flex": 1,
        "width": 2,
        "backgroundColor": "#108ee9"
    },
    "box__right": {
        "flex": 7
    },
    "right__title": {
        "fontSize": 18,
        "color": "black"
    }
});