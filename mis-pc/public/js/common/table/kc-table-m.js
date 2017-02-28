define(function (require, exports, module) {
    var Ajax = require('../mixins/ajax.js');
    var tableMixin = require('./tableMixin');
    var tdMixin = require('./tdMixin');
    var trMixin = require('./trMixin');
    var FormItem = require('../form/base.js');

    var ZTMobileTableTrAction = React.createClass({
        action: function (e) {
            this.props.action(this.props.value, this.props.data, e);
        },
        render: function () {
            var icon;
            var ss = true;
            if (this.props.checkFuc && typeof (this.props.checkFuc == 'function')) {
                if (!this.props.checkFuc(this.props.value, this.props.data)) {
                    ss = false;
                }
            }

            if (this.props.icon) {
                icon = <i className={"icon "+this.props.icon}/>;
            } else {
                icon = this.props.title;
            }
            return (
                (ss) ? <a href="javascript:void(0)"><span>{icon}</span></a> : ''
            );
        }
    });

    //表格行单元格子组件
    var ZTMobileTableTD = React.createClass({
        mixins: [tdMixin],
        render: function () {
            return (
                <li onClick={this.tdClick}>
                    <span className="cards-l">{this.props.column.title}</span>
                    <span className="cards-r">{this.getData(this.props.column.field)}</span>
                </li>
            );
        }
    });

    var ZTMobileTableTr = React.createClass({
        mixins: [tdMixin, trMixin],
        getInitialState: function () {
            return {
                open: false
            }
        },
        rendDefaultColumn: function () {
            var defaultColumns = this.props.columns.map(function (column, index) {
                if (index < this.props.mobileColumnLength) {
                    return (
                        <ZTMobileTableTD {...this.props} key={index} column={column}/>
                    )
                }
            }.bind(this));

            return (
                <ol>{defaultColumns}</ol>
            )
        },

        rendMore: function () {
            var className = (this.state.open) ? 'icon-double-angle-up' : 'icon-double-angle-down';
            return (
                <a href="javascript:void(0)" className="seeMoreBtn" onClick={this._toggleMore}>
                    <span>详情</span>
                    <i className={className}></i>
                </a>
            );
        },

        rendMoreTd: function () {
            var style = {
                display: (this.state.open) ? 'block' : 'none'
            }
            var nodes = this.props.columns.map(function (column, index) {
                if (index > this.props.mobileColumnLength - 1) {
                    return (
                        <ZTMobileTableTD {...this.props} column={column} key={index}/>
                    )
                }
            }.bind(this));
            return (
                <ol style={style}>
                    {nodes}
                </ol>
            );
        },

        rendHeader: function () {
            var check, title;
            if (this.props.selectMode == 'multi') {
                check = this._checkbox();
            } else if (this.props.selectMode == 'radio') {
                check = this._radiobox();
            }
            title = this.getData((this.props.titleField) ? this.props.titleField : this.props.columns[0].field);
            return (
                <dt>
                    <label className="cards-title">
                        {check}
                        <span className="lbl">{title}</span>
                    </label>
                </dt>
            )
        },

        _toggleMore: function (e) {
            e.stopPropagation();
            var open = this.state.open;
            this.setState({open: !open});
        },

        _rendAction: function () {
            var action = null;
            if (this.props.actionColumn) {
                var actionNodes = this.props.actionColumn.map(function (action, index) {
                    return (
                        <ZTMobileTableTrAction key={index} data={this.props.data}
                                               icon={action.icon} title={action.title} checkFuc={action.checkFuc}/>
                    )
                }.bind(this));
                action = <dd>{actionNodes}</dd>
            }

            return action;
        },

        render: function () {
            var openMore, moreTd;

            if (this.props.columns.length > this.props.mobileColumnLength - 1) {
                moreTd = this.rendMoreTd();
                openMore = this.rendMore();
            }

            var classes = 'cards';

            if (this.props.selected) {
                classes += ' select';
            }

            return (
                <div className="col-xs-12 col-md-6">
                    <div className={classes} onClick={this.trClick}>
                        <dl>
                            {this.rendHeader()}
                            {this.rendDefaultColumn()}
                            {moreTd}
                            {openMore}
                            {this._rendAction()}
                        </dl>
                    </div>

                </div>
            )
        }
    });

    //var ReactCSSTransitionGroup = require("../../../../cdn/react/v15.0/react-addons-css-transition-group.js");

    var ZTMobileTable = React.createClass({
        mixins: [Ajax, tableMixin],
        render: function () {
            var nodes = this.state.data.map(function (data, index) {
                var key = (this.props.keyField) ? data[this.props.keyField] : index;
                var selected = false;

                $.each(this.state.selectedItems, function (index, key) {
                    if (key == data[this.props.keyField]) {
                        selected = true;
                        return false;
                    }
                }.bind(this));

                return (
                    <ZTMobileTableTr {...this.props}
                        key={key} selected={selected}
                        data={data} selectClick={this._selectClick}
                    />
                );
            }.bind(this));

            return (
                <div className="row">
                        {nodes}
                </div>
            )
        }
    });

    module.exports = ZTMobileTable;
});