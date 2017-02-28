import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "box": {
        "flex": 1,
        "marginTop": 10 * vh,
        "position": "relative"
    },
    "list": {
        "flexDirection": "row",
        "borderBottomWidth": 0.5,
        "borderBottomColor": "gray",
        "backgroundColor": "#fff",
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8
    },
    "content": {
        "flex": 4
    },
    "bottom": {
        "flex": 1
    },
    "list__info": {
        "flex": 5
    },
    "info__content": {
        "flex": 1
    },
    "content__text": {
        "color": "#000",
        "fontSize": 18
    },
    "info__mes": {
        "flex": 1
    },
    "mes__text": {
        "fontSize": 12
    },
    "list__time": {
        "flex": 2
    },
    "list__right": {
        "flex": 1,
        "justifyContent": "center"
    },
    "right__icon": {
        "paddingLeft": 2 * vw
    },
    "text": {
        "fontSize": 18
    },
    "detailBox": {
        "marginTop": 10 * vh,
        "minHeight": 100 * vh,
        "backgroundColor": "white"
    },
    "card": {
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5
    },
    "card__title": {
        "flex": 2
    },
    "card__content": {
        "marginTop": 5,
        "flex": 5,
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15
    },
    "card__footer": {
        "paddingTop": 8,
        "flex": 1
    },
    "stepBox": {
        "marginTop": 15,
        "marginRight": 15,
        "marginBottom": 15,
        "marginLeft": 15
    },
    "actView": {
        "minHeight": 200,
        "alignItems": "center"
    }
});