/**
 * Created by Administrator on 2017/3/4.
 */

import formatUrl from "../../base/formatUrl.js";

export default {
    fetchFuc(url,data, callBack){
        var u = formatUrl(url, data);
        fetch(u)
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                callBack(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    },
}