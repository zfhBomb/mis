/**
 * Created by Administrator on 2017/3/4.
 */
import mobx from 'mobx';
import React from 'react';
import {ListView,InteractionManager} from 'react-native';
import formatUrl from "../base/formatUrl.js";



mobx.useStrict(true);
var store=function(){
    let newData=[];
    let queryData={};
    var storeData={
        changeData:mobx.action(function(data,clear) {
            storeData.isRefreshing = true;
            if(data){
                if(!data.nowPage&&data.nowPage!==0){
                    data.nowPage = storeData.nowPage;
                }else{
                    storeData.nowPage=data.nowPage;
                }
                queryData=data;
            }else{
                queryData.nowPage=storeData.nowPage;
            }
            queryData.who=global.STORE.user.chineseName;
            console.log(queryData);

            var u = formatUrl('http://www.fangyuanzhijian.com/myLook', queryData);
            InteractionManager.runAfterInteractions(() => {
                fetch(u)
                    .then((response) => {
                        return response.json()
                    })
                    .then((responseJson) => {
                        storeData.loaded(responseJson, clear);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
        }),
        loaded:mobx.action(function (responseJson,clear) {
            responseJson.splice(-1, 1);
            let page = storeData.nowPage + 1;
            if(clear){
                let dataSource=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                storeData.data = dataSource.cloneWithRows(responseJson);
                newData=[];
            }else{
                newData = newData.concat(responseJson);
                storeData.data = storeData.data.cloneWithRows(newData);
            }
            storeData.nowPage = page;
            storeData.isRefreshing = false;
        })
    };
    mobx.extendObservable(storeData, {
        data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        nowPage:0,
        isRefreshing:false,
        newData:[]
    });

    return storeData;
};
export default store
