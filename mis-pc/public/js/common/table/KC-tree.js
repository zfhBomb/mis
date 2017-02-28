define(function (require, exports, module) {
    var Ajax = require('../mixins/ajax.js');
    var KCTree = React.createClass({
        mixins: [Ajax],
        componentDidMount: function () {
            if (this.props.url) {
                this.ajax(this.props.url, {});
            }
        },
        loadSuccess: function (data) {
            if (this.isMounted()) {
                this.setState({data: data});
            }
            if (this.props.onLoadSuccess) {
                this.props.onLoadSuccess(data);
            }
        },

        render: function () {
            return (
                <div className="treeBox">
                    <h4>
                        {this.props.title}
                    </h4>
                    <KCTreeContent data={this.state.data}/>
                </div>
            );
        }
    });


    var KCTreeContent = React.createClass({
        getInitialState: function () {
            return {
                open: [],
                openNum: null,
                treeClass: {
                    treeContent: "tree tree-selectable",
                    treeFolder: "tree-folder",
                    treeFolderHeader: "tree-folder-header",
                    treeFolderName: "tree-folder-name",
                    childList: "tree-item",
                    openIcon: "icon-minus",
                    closeIcon: "icon-plus",
                    listIcon: "icon-file-text",
                    child: "child",
                    childOn: "tree-folder-content",
                    childListName: "tree-item-name"
                }
            }
        },
        openClick: function (n) {
            var isTrue = false;
            var num = null;
            var nums = [];
            if (this.state.open.length > 0) {
                for (var i = 0; i < this.state.open.length; i++) {
                    if (n == this.state.open[i]) {
                        isTrue = true;
                        num = i;
                        break;
                    }
                }
                nums = this.state.open;
                if (isTrue) {
                    nums.splice(num, 1);
                } else {
                    nums.push(n);
                }
                this.setState({open: nums, openNum: n});
            } else {
                nums.push(n);
                this.setState({open: nums, openNum: n});
            }

        },
        classHandle: function () {
            if (this.props.treeClass) {
                for (var x in this.state.treeClass) {
                    for (var y in this.props.treeClass) {
                        if (x === y) {
                            this.state.treeClass[x] = this.props.treeClass[y];
                        }
                    }
                }
            }

            return this.state.treeClass;
        },
        loadNode: function (d, n) {
            var datas = d == this.props.data ? this.props.data : d.file;
            var keyNum = 0;
            var lists = datas.map(function (list) {
                keyNum++;
                if (list.title != null) {
                    var child = this.loadNode(list, n ? (n + "-" + keyNum) : keyNum);
                }

                return (
                    <KCTreeList data={list} child={child} key={n?(n+"-"+keyNum):keyNum} treeClass={this.classHandle()}
                                openClick={this.openClick} num={n?(n+"-"+keyNum):(keyNum+"")}
                                openNum={this.state.openNum} open={this.state.open}/>
                );

            }.bind(this))
            return (
            {lists}
            );
        },
        render: function () {
            return (
                <div className={this.state.treeClass.treeContent}>
                    {this.loadNode(this.props.data)}
                </div>
            );
        }
    });

    var KCTreeList = React.createClass({
        getInitialState: function () {
            return {
                listNum: this.props.num
            }
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            function isTrue(openNum, listNum) {
                var render = false;
                if (openNum.length < 2) {
                    render = openNum == listNum;
                } else {
                    if (openNum.substr(0, 1)) {

                    }
                    render = isTrue(openNum.substr(0, openNum.length - 2), listNum) || openNum == listNum;
                }
                return render;
            }

            return isTrue(nextProps.openNum, this.state.listNum);

        },
        titleClick: function () {
            this.props.openClick(this.props.num);
        },
        render: function () {
            var isOpen = false;
            this.props.open.map(function (n) {
                if (n == this.state.listNum) {
                    isOpen = true;
                }
            }.bind(this));
            if (this.props.child) {
                var list = this.props.data.title ?
                    <div className={this.props.treeClass.treeFolder}>
                        <div className={this.props.treeClass.treeFolderHeader} onClick={this.titleClick}>
                            <i className={isOpen?this.props.treeClass.openIcon:this.props.treeClass.closeIcon}></i>
                            <p className={this.props.treeClass.treeFolderName}>{this.props.data.title}</p>
                        </div>
                        <div className={isOpen?this.props.treeClass.childOn:this.props.treeClass.child}>{this.props.child}</div>
                    </div> :
                    this.props.child;
            } else {
                var list = <div className={this.props.treeClass.childList}>
                    <i className={this.props.treeClass.listIcon}></i>
                    <p className={this.props.treeClass.childListName}>{this.props.data}</p>
                </div>
            }
            return list;
        }
    });
    module.exports = KCTree;
});