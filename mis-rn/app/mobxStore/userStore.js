/**
 * Created by Administrator on 2017/3/12.
 */
import React from 'react';
import mobx from 'mobx';

mobx.useStrict(true);
var store=function(){
    var storeData={
        setUser:mobx.action(function(data){
            storeData.user.userName=data.userName;
            storeData.user.position=data.position;
            storeData.user.chineseName=data.chineseName;
            storeData.user.factory=data.factory;
        }),
        login:mobx.action(function(data,callBack){
            fetch('http://192.168.1.166/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: data.userName,
                    password: data.passWord,
                    factory:data.factory
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    callBack(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    };
    mobx.extendObservable(storeData, {
        user: {
            userName:"",
            position:"",
            chineseName:"",
            factory:""
        }
    });

    return storeData;
};
export default store
