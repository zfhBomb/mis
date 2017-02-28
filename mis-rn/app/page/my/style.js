import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "box": {
        "flex": 1,
        "marginTop": 10 * vh
    },
    "greenBox": {
        "marginTop": 10 * vh,
        "flex": 1
    },
    "green": {
        "height": 10 * vh,
        "borderBottomWidth": 0.5,
        "borderBottomColor": "gray",
        "backgroundColor": "green"
    },
    "list": {
        "height": 10 * vh,
        "borderBottomWidth": 0.5,
        "borderBottomColor": "gray",
        "backgroundColor": "yellow"
    },
    "content": {
        "flex": 4
    },
    "bottom": {
        "flex": 1
    },
    "text": {
        "fontSize": 20
    }
});