import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import BottomTools from '../../common/bottomTools/bottomTools.js';
import styles from "./style.js"
import Detail from "./detailsView.js";
import format from "../../base/formatDate.js";
import Loading from "../../common/loading.js";
import {RefreshControl, ListView, SearchBar} from 'antd-mobile';
import {observer} from 'mobx-react/native';

var Look = observer(React.createClass({
    // mixins: [fetchFuc],
    // getInitialState(){
    //     var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     this.data = [];
    //     return {
    //         dataSource: dataSource,
    //         nowPage: 0,
    //         isRefreshing: false
    //     }
    // },
    // getDataSource(newData){
    //     this.data = this.data.concat(newData);
    //     return this.state.dataSource.cloneWithRows(this.data);
    // },
    componentDidMount(){
            global.STORE.lookStore.changeData({sheBei: "所有设备", factory: "yiyanggd"});
            // this.setState({isRefreshing: true}, () => {
            //     this.fetchFuc('http://www.fangyuanzhijian.com/look',
            //         {sheBei: "所有设备", nowPage: this.state.nowPage, factory: "yiyanggd"},
            //         (responseJson) => {
            //         responseJson.splice(-1, 1);
            //         var page = this.state.nowPage + 1;
            //         this.setState({dataSource: this.getDataSource(responseJson), nowPage: page, isRefreshing: false})
            //     });
            // });
    },
    loadMore() {
        global.STORE.lookStore.changeData();
        // this.setState({isRefreshing: true}, () => {
            // this.fetchFuc('http://www.fangyuanzhijian.com/look',
            //     {sheBei: "所有设备", nowPage: this.state.nowPage, factory: "yiyanggd"},
            //     (responseJson) => {
            //     responseJson.splice(-1, 1);
            //     var page = this.state.nowPage + 1;
            //     this.setState({dataSource: this.getDataSource(responseJson), nowPage: page, isRefreshing: false})
            // });
        //});
    },
    reached(){
        // this.setState({isRefreshing: true}, () => {
        //     this.fetchFuc('http://www.fangyuanzhijian.com/look',
        //         {sheBei: "所有设备", nowPage: 0, factory: "yiyanggd"},
        //         (responseJson) => {
        //         responseJson.splice(-1, 1);
        //         var arr = responseJson;
        //         var page = this.state.nowPage + 1;
        //         this.setState({dataSource: this.getDataSource(arr), nowPage: page, isRefreshing: false});
        //     });
        // });
    },
    getRow(rowData, sectionID, rowID, highlightRow){
        return (
            <TouchableHighlight underlayColor='#DA5425' onPress={()=>{
       this.props.navigator.push({
    		 name:'缺陷详情',
    		 component:Detail,
         hasBefore:true,
         menu:false,
         data:rowData
    	 });
     }}>
                <View style={styles.list}>
                    <View style={styles.list__info}>
                        <View style={styles.info__content}>
                            <Text numberOfLines={2} style={styles.content__text}>
                                {rowData.content}
                            </Text>
                        </View>
                        <View style={styles.info__yiJian}>
                            <Text numberOfLines={1} style={styles.yiJian__text}>
                                {"处理意见：" + rowData.yiJian}
                            </Text>
                        </View>
                        <View style={styles.info__mes}>
                            <Text numberOfLines={1} style={styles.mes__text}>
                                {rowData.leiXin + "," + rowData.zhuanYe + "," + rowData.sheBei + "," + rowData.who}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.list__time}>
                        <Text style={styles.text}>
                            {format.selectFormat(rowData.date)}
                        </Text>
                    </View>
                    <View style={styles.list__right}>
                        <Icon name="chevron-right" size={26} color="gray" style={styles.right__icon}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    },
    searchChange(){
        alert(111);
    },
    render(){
        let store=global.STORE.lookStore;
        return (
            <View style={styles.box}>
                <View style={styles.content}>
                    {store.nowPage > 0 ? <ListView
                            dataSource={ store.data }
                            renderRow={ this.getRow }
                            scrollRenderAheadDistance={100}
                            refreshControl={
                              <RefreshControl
                                onRefresh={this.reached}
                                refreshing={store.isRefreshing}
                                progressViewOffset={200}
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                              />
                            }
                            onEndReached={this.loadMore}
                            onEndReachedThreshold={10}
                            pageSize={10}
                            renderHeader={()=><SearchBar
                            showCancelButton
                            onCancel={this.searchChange}
                            placeholder='搜索内容' />}
                        /> : <Loading width={200} height={200}/>}
                </View>
                <BottomTools style={styles.bottom} navigator={this.props.navigator}/>
            </View>
        )
    }
}));
export default Look
