define(function(require, exports, module) {
    /**
     * 表格组件  （移动端/PC端 通用接口定义)
     * @class ZTReactTable
     * @module common.table
     * @version 1.0
     */

    module.exports={
        /**
         * 默认已选中的行记录,数组里面包含的是各行记录的主键 键值
         * @property selectedItems {array}
         */

        /**
         * 表格操作栏相关配置
         * @property actionColumn {array}
         *      @param actionColumn.title {string}
         *      @param actionColumn.icon {string}
         *      @param actionColumn.action {function}
         *      @param actionColumn.checkFuc {boolean|function} 验证此操作行是否具备此操作的权限。
         */

        /**
         * 表格操作栏标题文字
         * @property actionColumnTitle {str}
         */

        /**
         * 表格行选中模式 none|multi|radio|normal
         * @property selectMode {string}
         * @default 'none'
         */

        /**
         * 表格列属性
         * @property columns {array columnObj}
         */

        /**
         * 表格主键
         * @property keyField {string}
         */

        /**
         * 是否被全选中
         * @property selectAll {boolean}
         */

        /**
         * 表格当前数据源
         * @property data {array}
         */

        /**
         * 表格数据地址
         * @property url {string}
         */

        /**
         * 移动端表格默认显示的列数  默认是3
         * @property mobileColumnLength {int}
         */

        /**
         * 移动端卡片标题字段,不配置的话，会从第一个column中的field获取数据。
         * 为防止columns设置时的缺陷，建议配置此属性。
         * @property titleField {str}
         */

        propTypes:{
            selectedItems:React.PropTypes.array,
            selectMode:React.PropTypes.oneOf(['none', 'multi','radio','normal']),
            columns:React.PropTypes.array,
            actionColumnTitle:React.PropTypes.string,
            keyField:React.PropTypes.string,
            onLoadSuccess:React.PropTypes.func,
            actionColumn:React.PropTypes.array,
            mobileColumnLength:React.PropTypes.number,
            titleField:React.PropTypes.string
        },
        getDefaultProps:function(){
            return {
                selectMode:'none',
                actionColumnTitle:LG.table.actionColumnName,
                mobileColumnLength:3
            }
        },
        getInitialState:function(){
            var selectedItems=(this.props.selectedItems)?this.props.selectedItems:[];
            if(this.props.selectMode=='multi' && this.props.isSelectAll && this.props.data && this.props.keyField){
                selectedItems=[];
                $.each(this.props.data,function(index,dt){
                    selectedItems.push(dt[this.props.keyField]);
                }.bind(this));
            }
            return {
                selectedItems:selectedItems,
                data:(this.props.data)?this.props.data:[]
            }
        },
        componentDidMount:function(){
            if (this.props.url && this.state.loaded==false){
                this.ajax(this.props.url, {});
            }
        },
        loadSuccess:function(data){
            this.setState({data:data});
            if(this.props.onLoadSuccess){
                this.props.onLoadSuccess(data);
            }
        },
        //单行数据检测
        _selectClick:function(isSelected,value){
            var selectedItems=this.state.selectedItems;
            var index=selectedItems.indexOf(value);

            if(this.props.selectMode=='multi'){
                if(isSelected){
                    if(index==-1){
                        selectedItems.push(value);
                    }
                }else{
                    if(index!=-1){
                        selectedItems.splice(index,1);
                    }
                }
                this.setState({
                    selectedItems:selectedItems
                });
            }else if(this.props.selectMode=='radio' || this.props.selectMode=='normal'){
                if(isSelected){
                    selectedItems=[value];
                }else{
                    selectedItems=[];
                }
                this.setState({
                    selectedItems:selectedItems
                });
            }
        },
        //全选数据检测
        _selectAll:function(isSelected){
            var selectedItems=[];
            if(isSelected){
                $.each(this.state.data,function(index,d){
                    selectedItems.push(d[this.props.keyField]);
                }.bind(this));
            }

            this.setState({
                selectAll:isSelected,
                selectedItems:selectedItems
            });
        },
        /**
         * 获取所选中的行数据
         * @method getSelectItems {array|obj}
         * @return array|obj.
         */
        getSelectItems:function(){
            var selectItems=[];
            if(this.props.selectMode !='none') {
                selectItems = [];
                $.each(this.state.selectedItems, function (index, key) {
                    $.each(this.state.data, function (index2, dt) {
                        if (dt[this.props.keyField] == key) {
                            selectItems.push(dt);
                            if (this.props.selectMode != 'multi') {
                                return false;
                            }
                        }
                    }.bind(this));
                }.bind(this));
            }
            return selectItems;
        },
        /**
         * 添加表格行数据
         * @method addItem
         * @param item {obj} 表格行数据对象
         * @param toLast {boolean} 是否添加到表格最后,默认是添加到表格最前
         */
        addItem:function(item,toLast){
            var data=this.state.data;
            //是否添加到表格最后
            if(toLast){
                data.push(item);
            }else{
                data.unshift(item);
            }
            //视图渲染
            this.setState({data:data});
        },
        /**
         * 更新表格行数据
         * @param key
         * @param item
         */
        updateItem:function(item){
            var data=this.state.data;
            $.each(data,function(index,tr){
                if(tr[this.props.keyField]==item[this.props.keyField]){
                    data[index]=item;
                    this.setState({data:data});
                    this.refs.tableBody.refs[item[this.props.keyField]].forceUpdate();
                    return false;
                }
            }.bind(this));
        }
    }
});