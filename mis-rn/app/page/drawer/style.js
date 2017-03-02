/**
 * Created by Administrator on 2017/3/1.
 */
import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "box": {
        "flex": 1,
        "backgroundColor": '#38454E'
    },
    "box__btnView":{
        "marginTop":10 * vh,
        "marginBottom":5 * vh,
        "flexDirection": "row",
        "justifyContent":"space-around"
    },
    "btnView__btn":{
        "width":80,
        "height":30
    },
    "box__queryView":{

    },
    "queryView__itemContainer":{

    },
    "itemContainer__title":{
        "height":50,
        "backgroundColor": "#fff",
        "borderBottomWidth": 0.5,
        "borderBottomColor": "gray",
        "paddingLeft":15,
        "flexDirection": "row",
        "alignItems": "center"
    },
    "itemContainer__item":{

    }
});