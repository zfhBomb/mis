define(function (require, exports, module) {
    var Ajax = require('../mixins/ajax.js');
    var tableMixin = require('./tableMixin');
    var tdMixin = require('./tdMixin');
    var trMixin = require('./trMixin');
    var FormItem = require('../form/base.js');
    var Loading = require('../ui/loading.js');

    //表格操作栏操作项子组件
    var ZTReactTableAction = React.createClass({
        /**
         * 验证函数 .验证此操作是否被允许出现在此行记录中
         * @property checkFuc
         * @param data  当前行数据
         */
        propTypes: function () {
            checkFuc:React.PropTypes.func
        },
        action: function (e) {
            this.props.action(this.props.data, e);
        },
        render: function () {
            var icon;
            var ss = true;//是否显示该按钮。

            if (this.props.checkFuc && typeof (this.props.checkFuc == 'function')) {
                if (!this.props.checkFuc(this.props.data)) {
                    ss = false;
                }
            }

            if (this.props.icon) {
                icon = <i className={"icon "+this.props.icon}/>;
            } else {
                icon = this.props.title;
            }

            return (
                (ss) ? <a title={this.props.title} className="action" onClick={this.action}>{icon}</a> : ''
            );
        }
    });

    //表格行单元格子组件
    var ZTReactTableTD = React.createClass({
        mixins: [tdMixin],
        render: function () {
            return (
                <td width={this.props.width} onClick={this.tdClick}>{this.getData(this.props.field)}</td>
            );
        }
    });


    //表格行子组件
    var ZTReactTableTr = React.createClass({
        mixins: [trMixin],
        _rendSelectMode: function () {
            var selectTd = null;
            if (this.props.selectMode == 'multi') {
                selectTd = <td>{this._checkbox()}</td>
            } else if (this.props.selectMode == 'radio') {
                selectTd = <td>{this._radiobox()}</td>
            }
            return selectTd;
        },
        _rendAction: function () {
            var action = null;
            if (this.props.actionColumn) {
                var actionNodes = this.props.actionColumn.map(function (action, key) {
                    return (
                        <ZTReactTableAction key={key} num={key} data={this.props.data} icon={action.icon}
                                            title={action.title} checkFuc={action.checkFuc}
                                            action={action.action} keyField={this.props.keyField}
                        />
                    )
                }.bind(this));
                action = <td className="actions">{actionNodes}</td>
            }
            return action;
        },
        render: function () {
            var data = this.props.data;
            var commentNodes = this.props.columns.map(function (comment, index) {
                return (
                    <ZTReactTableTD
                        width={comment.width} key={index} data={data} field={comment.field}
                        rendHandler={comment.rendHandler} tdClick={this.props.tdClick}
                    />
                );
            }.bind(this));

            return (
                <tr onClick={this.trClick} className={(this.props.selected==true)?'tr--selected':''}>
                    {this._rendSelectMode()}
                    {commentNodes}
                    {this._rendAction()}
                </tr>
            );
        }
    });

    //表格body子组件
    var ZTReactTableBody = React.createClass({
        render: function () {
            var columns = this.props.columns;
            var commentNodes = this.props.data.map(function (dt, index) {
                var selected = false;
                var key = (this.props.keyField) ? dt[this.props.keyField] : index;

                if (this.props.selectedItems) {
                    $.each(this.props.selectedItems, function (index, key) {
                        if (key == dt[this.props.keyField]) {
                            selected = true;
                            return false;
                        }
                    }.bind(this));
                }
                return (
                    <ZTReactTableTr
                        {...this.props} ref={key} key={key} num={key} data={dt} selected={selected}
                    />
                );
            }.bind(this));
            return (
                <tbody>

                {commentNodes}
                </tbody>
            );
        }
    });

    //表格header子组件
    var ZTReactTableHeader = React.createClass({
        shouldComponentUpdate: function (nextProps, nextState) {
            var r1 = this.props.data.length == this.props.selectedItems.length;
            var r2 = nextProps.data.length == nextProps.selectedItems.length;
            return (r1 != r2);
        },
        componentWillReceiveProps: function (nextProps) {
            if (this.props.selectMode == 'multi') {
                this.refs.checkAll.setState({checked: nextProps.data.length > 0 && nextProps.data.length == nextProps.selectedItems.length});
            }
        },
        render: function () {
            var selectTh = null;
            var action = null;

            if (this.props.selectMode == 'multi') {
                var selectAll = (this.props.data.length > 0 && this.props.data.length == this.props.selectedItems.length);
                selectTh =
                    <th><FormItem.Checkbox ref="checkAll" label={LG.table.checkAll} changeHandle={this.props.selectAll}
                                           checked={selectAll}/></th>;
            } else if (this.props.selectMode == 'radio') {
                selectTh = <th></th>
            }

            var commentNodes = this.props.columns.map(function (comment, index) {
                return (
                    <th key={index} width={comment.width} className={comment.extendClass}>{comment.title}</th>
                );
            });

            if (this.props.actionColumn) {
                action = <th>{this.props.actionColumnTitle}</th>
            }
	
            return (
                <thead>
                <tr>
                    {selectTh}
                    {commentNodes}
                    {action}
         
                </tr>
                </thead>
            );
        }
    });

    //表格容器组件
    var ZTReactTable = React.createClass({
        mixins: [Ajax, tableMixin],
        render: function () {

            var loading;
            if (this.state.loading) {
                loading = <Loading/>
            }

            return (
            	<div style={{position:"relative"}}>
            		{loading}
                <table className="tableDiv">
                
                    <ZTReactTableHeader
                        {...this.props} selectAll={this._selectAll} data={this.state.data}
                                        selectedItems={this.state.selectedItems}
                    />
                    <ZTReactTableBody ref="tableBody" {...this.props} data={this.state.data}
                                      selectClick={this._selectClick} selectedItems={this.state.selectedItems}
                    />
                </table>
                </div>
            );
        }
    });

    module.exports = ZTReactTable;
});