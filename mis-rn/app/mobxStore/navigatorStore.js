import React from 'react';
import mobx from 'mobx';
import Icon from 'react-native-vector-icons/Entypo';
import My from "../page/my/my.js";
import Setting from "../page/set/set.js";
import Look from "../page/look/look.js";
import Charts from "../page/charts/charts.js";
import Write from "../page/write/write.js";

mobx.useStrict(true);
var store=function(){
	var storeData={
		changeHeadLeft:mobx.action(function(component){
				storeData.head.left=component;
		}),
		changeHeadTitle:mobx.action(function(str){
				storeData.head.title=str;
		}),
		changeHeadRight:mobx.action(function(component){
				storeData.head.right=component;
		}),
		changeActive:mobx.action(function(name){
			storeData.active=name;
			for(var i=0;i<storeData.page.length;i++){
				if(name==storeData.page[i].name){
					storeData.head.title=storeData.page[i].title;
					break;
				}
			}
		})
	};
	mobx.extendObservable(storeData, {
       	head: {
          left:null,
          title:"我的缺陷",
          right:<Icon name="menu" size={26} color="gray"/>
        },
        page:[
					{
						name:"My",
						text:"我的",
						icon:"star",
						component:My,
						title:"我的缺陷"
					},
					{
						name:"Look",
						text:"查看",
						icon:"list",
						component:Look,
						title:"查看缺陷"
					},
					{
						name:"Write",
						text:"填写",
						icon:"pencil",
						component:Write,
						title:"录入缺陷"
					},
					{
						name:"Charts",
						text:"统计",
						icon:"area-graph",
						component:Charts,
						title:"缺陷统计"
					},
					{
						name:"Setting",
						text:"设置",
						icon:"tools",
						component:Setting,
						title:"我的设置"
					}
				],
        active:"My"
    });

    return storeData;
};
export default store
