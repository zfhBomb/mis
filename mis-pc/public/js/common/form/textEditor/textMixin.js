define(function(require, exports, module) {
    var txtChangeEventNames = 'propertychange change click keyup input paste';

    module.exports={
        // 初始化编辑区域
        initText:function () {
            var self = this;

            //var $valueContainer = editor.$valueContainer;
            //var currentValue = editor.getInitValue();
            var $txt=this.textEditor;

            self.$txt=$txt;

            //插入空格和P.
            self.insertEmptyP();

            // 删除时，如果没有内容了，就添加一个 <p><br></p>
            self.contentEmptyHandle();

            // enter时，不能使用 div 换行
            self.bindEnterForDiv();

            // enter时，用 p 包裹 text
            self.bindEnterForText();

            // tab 插入4个空格
            self.bindTabEvent();

            // 处理粘贴内容
            self.bindPasteFilter();

            // $txt.formatText() 方法
            self.bindFormatText();

        },

        // 删除时，如果没有内容了，就添加一个 <p><br></p>
        contentEmptyHandle:function () {
            var self = this;
            var editor = self.editor;
            var $txt=self.$txt;
            var $p;

            $txt.on('keydown', function (e) {
                if (e.keyCode !== 8) {
                    return;
                }
                var txtHtml = $.trim($txt.html().toLowerCase());
                if (txtHtml === '<p><br></p>') {
                    // 如果最后还剩余一个空行，就不再继续删除了
                    e.preventDefault();
                    return;
                }
            });

            $txt.on('keyup', function (e) {
                if (e.keyCode !== 8) {
                    return;
                }
                var txtHtml = $.trim($txt.html().toLowerCase());
                // ff时用 txtHtml === '<br>' 判断，其他用 !txtHtml 判断
                if (!txtHtml || txtHtml === '<br>') {
                    // 内容空了
                    $p = $('<p><br/></p>');
                    $txt.html(''); // 一定要先清空，否则在 ff 下有问题
                    $txt.append($p);
                    editor.restoreSelectionByElem($p.get(0));
                }
            });
        },

        // enter时，不能使用 div 换行
        bindEnterForDiv:function () {
            var tags = this.props.legalTags; // 配置中编辑器要求的合法标签，如 p head table blockquote ul ol 等
            var self = this;
            var editor = self;
            var $txt = self.$txt;
            var $keydownDivElem;

            function divHandler() {
                if (!$keydownDivElem) {
                    return;
                }

                var $pElem = $('<p>' + $keydownDivElem.html() + '</p>');
                $keydownDivElem.after($pElem);
                $keydownDivElem.remove();
            }

            $txt.on('keydown keyup', function (e) {
                if (e.keyCode !== 13) {
                    return;
                }
                // 查找合法标签
                var rangeElem = editor.getRangeElem();
                var targetElem = editor.getLegalTags(rangeElem);
                var $targetElem;
                var $pElem;

                if (!targetElem) {
                    // 没找到合法标签，就去查找 div
                    targetElem = editor.getSelfOrParentByName(rangeElem, 'div');
                    if (!targetElem) {
                        return;
                    }
                    $targetElem = $(targetElem);

                    if (e.type === 'keydown') {
                        // 异步执行（同步执行会出现问题）
                        $keydownDivElem = $targetElem;
                        setTimeout(divHandler, 0);
                    }

                    if (e.type === 'keyup') {
                        // 将 div 的内容移动到 p 里面，并移除 div
                        $pElem = $('<p>' + $targetElem.html() + '</p>');
                        $targetElem.after($pElem);
                        $targetElem.remove();

                        // 如果是回车结束，将选区定位到行首
                        editor.restoreSelectionByElem($pElem.get(0), 'start');
                    }
                }
            });
        },

        // enter时，用 p 包裹 text
        bindEnterForText:function () {
        var self = this;
        var $txt = self.$txt;
        var handle;
        $txt.on('keyup', function (e) {
            if (e.keyCode !== 13) {
                return;
            }
            if (!handle) {
                handle = function() {
                    self.wrapImgAndText();
                };
            }
            setTimeout(handle);
        });
    },

        // tab 时，插入4个空格
        bindTabEvent : function () {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;

        $txt.on('keydown', function (e) {
            if (e.keyCode !== 9) {
                // 只监听 tab 按钮
                return;
            }
            // 如果浏览器支持 insertHtml 则插入4个空格。如果不支持，就不管了
            if (editor.queryCommandSupported('insertHtml')) {
                editor.command(e, 'insertHtml', '&nbsp;&nbsp;&nbsp;&nbsp;');
            }
        });
    },

        // 处理粘贴内容
        bindPasteFilter : function () {
            var self = this;
            var editor = self.editor;
            var resultHtml = '';  //存储最终的结果
            var $txt = self.$txt;
            var legalTags = this.props.legalTags;
            var legalTagArr = legalTags.split(',');

            $txt.on('paste', function (e) {
                if (!editor.config.pasteFilter) {
                    // 配置中取消了粘贴过滤
                    return;
                }

                var currentNodeName = editor.getRangeElem().nodeName;
                if (currentNodeName === 'TD' || currentNodeName === 'TH') {
                    // 在表格的单元格中粘贴，忽略所有内容。否则会出现异常情况
                    return;
                }

                resultHtml = ''; // 先清空 resultHtml

                var pasteHtml, $paste;
                var data = e.clipboardData || e.originalEvent.clipboardData;
                var ieData = window.clipboardData;

                if (editor.config.pasteText) {
                    // 只粘贴纯文本

                    if (data && data.getData) {
                        // w3c
                        pasteHtml = data.getData('text/plain');
                    } else if (ieData && ieData.getData) {
                        // IE
                        pasteHtml = ieData.getData('text');
                    } else {
                        // 其他情况
                        return;
                    }

                    // 拼接为 <p> 标签
                    if (pasteHtml) {
                        resultHtml = '<p>' + pasteHtml + '</p>';
                    }

                } else {
                    // 粘贴过滤了样式的、只有标签的 html

                    if (data && data.getData) {
                        // w3c

                        // 获取粘贴过来的html
                        pasteHtml = data.getData('text/html');
                        if (pasteHtml) {
                            // 创建dom
                            $paste = $('<div>' + pasteHtml + '</div>');
                            // 处理，并将结果存储到 resultHtml 『全局』变量
                            handle($paste.get(0));
                        } else {
                            // 得不到html，试图获取text
                            pasteHtml = data.getData('text/plain');
                            if (pasteHtml) {
                                // 替换特殊字符
                                pasteHtml = pasteHtml.replace(/[ ]/g, '&nbsp;')
                                    .replace(/</g, '&lt;')
                                    .replace(/>/g, '&gt;')
                                    .replace(/\n/g, '</p><p>');
                                // 拼接
                                resultHtml = '<p>' + pasteHtml + '</p>';

                                // 查询链接
                                resultHtml = resultHtml.replace(/<p>(https?:\/\/.*?)<\/p>/ig, function (match, link) {
                                    return '<p><a href="' + link + '" target="_blank">' + link + '</p>';
                                });
                            }
                        }

                    } else if (ieData && ieData.getData) {
                        // IE 直接从剪切板中取出纯文本格式
                        resultHtml = ieData.getData('text');
                        if (!resultHtml) {
                            return;
                        }
                        // 拼接为 <p> 标签
                        resultHtml = '<p>' + resultHtml + '</p>';
                        resultHtml = resultHtml.replace((new RegExp('\n', 'g'), '</p><p>'));
                    } else {
                        // 其他情况
                        return;
                    }
                }

                // 执行命令
                if (resultHtml) {
                    editor.command(e, 'insertHtml', resultHtml);

                    // 删除内容为空的 p 和嵌套的 p
                    self.clearEmptyOrNestP();
                }
            });

            // 处理粘贴的内容
            function handle(elem) {
                if (!elem || !elem.nodeType || !elem.nodeName) {
                    return;
                }
                var $elem;
                var nodeName = elem.nodeName.toLowerCase();
                var nodeType = elem.nodeType;

                // 只处理文本和普通node标签
                if (nodeType !== 3 && nodeType !== 1) {
                    return;
                }

                $elem = $(elem);

                // 如果是容器，则继续深度遍历
                if (nodeName === 'div') {
                    $.each(elem.childNodes, function () {
                        // elem.childNodes 可获取TEXT节点，而 $elem.children() 就获取不到
                        handle(this);
                    });
                    return;
                }

                if (legalTagArr.indexOf(nodeName) >= 0) {
                    // 如果是合法标签之内的，则根据元素类型，获取值
                    resultHtml += getResult(elem);
                } else if (nodeType === 3) {
                    // 如果是文本，则直接插入 p 标签
                    resultHtml += '<p>' + elem.textContent + '</p>';
                } else if (nodeName === 'br') {
                    // <br>保留
                    resultHtml += '<br/>';
                }
                else {
                    // 忽略的标签
                    if (['meta', 'style', 'script', 'object', 'form', 'iframe', 'hr'].indexOf(nodeName) >= 0) {
                        return;
                    }
                    // 其他标签，移除属性，插入 p 标签
                    $elem = $(removeAttrs(elem));
                    // 注意，这里的 clone() 是必须的，否则会出错
                    resultHtml += $('<div>').append($elem.clone()).html();
                }
            }

            // 获取元素的结果
            function getResult(elem) {
                var nodeName = elem.nodeName.toLowerCase();
                var $elem;
                var htmlForP = '';
                var htmlForLi = '';

                if (['blockquote'].indexOf(nodeName) >= 0) {

                    // 直接取出元素text即可
                    $elem = $(elem);
                    return '<' + nodeName + '>' + $elem.text() + '</' + nodeName + '>';

                } else if (['p', 'h1', 'h2', 'h3', 'h4', 'h5'].indexOf(nodeName) >= 0) {

                    //p head 取出 text 和链接
                    elem = removeAttrs(elem);
                    $elem = $(elem);
                    htmlForP = $elem.html();

                    // 剔除 a img 之外的元素
                    htmlForP = htmlForP.replace(/<.*?>/ig, function (tag) {
                        if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
                            return tag;
                        } else {
                            return '';
                        }
                    });

                    return '<' + nodeName + '>' + htmlForP + '</' + nodeName + '>';

                } else if (['ul', 'ol'].indexOf(nodeName) >= 0) {

                    // ul ol元素，获取子元素（li元素）的text link img，再拼接
                    $elem = $(elem);
                    $elem.children().each(function () {
                        var $li = $(removeAttrs(this));
                        var html = $li.html();

                        html = html.replace(/<.*?>/ig, function (tag) {
                            if (tag === '</a>' || tag.indexOf('<a ') === 0 || tag.indexOf('<img ') === 0) {
                                return tag;
                            } else {
                                return '';
                            }
                        });

                        htmlForLi += '<li>' + html + '</li>';
                    });
                    return '<' + nodeName + '>' + htmlForLi + '</' + nodeName + '>';

                } else {

                    // 其他元素，移除元素属性
                    $elem = $(removeAttrs(elem));
                    return $('<div>').append($elem).html();
                }
            }

            // 移除一个元素（子元素）的attr
            function removeAttrs(elem) {
                var attrs = elem.attributes || [];
                var attrNames = [];
                var exception = ['href', 'target', 'src', 'alt', 'rowspan', 'colspan']; //例外情况

                // 先存储下elem中所有 attr 的名称
                $.each(attrs, function (key, attr) {
                    if (attr && attr.nodeType === 2) {
                        attrNames.push(attr.nodeName);
                    }
                });
                // 再根据名称删除所有attr
                $.each(attrNames, function (key, attr) {
                    if (exception.indexOf(attr) < 0) {
                        // 除了 exception 规定的例外情况，删除其他属性
                        elem.removeAttribute(attr);
                    }
                });


                // 递归子节点
                var children = elem.childNodes;
                if (children.length) {
                    $.each(children, function (key, value) {
                        removeAttrs(value);
                    });
                }

                return elem;
            }
        },

        // 绑定 $txt.formatText() 方法
        bindFormatText : function () {
            var self = this;
            var $txt = self.$txt;
            var legalTags = self.props.legalTags;
            var legalTagArr = legalTags.split(',');
            var length = legalTagArr.length;
            var regArr = [];

            // 将 E.config.legalTags 配置的有效字符，生成正则表达式
            $.each(legalTagArr, function (k, tag) {
                var reg = '\>\\s*\<(' + tag + ')\>';
                regArr.push(new RegExp(reg, 'ig'));
            });

            // 增加 li
            regArr.push(new RegExp('\>\\s*\<(li)\>', 'ig'));

            // 增加 tr
            regArr.push(new RegExp('\>\\s*\<(tr)\>', 'ig'));

            // 增加 code
            regArr.push(new RegExp('\>\\s*\<(code)\>', 'ig'));

            // 生成 formatText 方法
            $txt.formatText = function () {
                var $temp = $('<div>');
                var html = $txt.html();

                // 去除空格
                html = html.replace(/\s*</ig, '<');

                // 段落、表格之间换行
                $.each(regArr, function (k, reg) {
                    if (!reg.test(html)) {
                        return;
                    }
                    html = html.replace(reg, function (matchStr, tag) {
                        return '>\n<' + tag + '>';
                    });
                });

                $temp.html(html);
                return $temp.text();
            };
        },

        // 计算高度
        initHeight:function () {
            var editor = this.editor;
            var $txt = this.$txt;
            var valueContainerHeight = editor.$valueContainer.height();
            var menuHeight = editor.menuContainer.height();
            var txtHeight = valueContainerHeight - menuHeight;

            // 限制最小为 50px
            txtHeight = txtHeight < 50 ? 50 : txtHeight;

            $txt.height(txtHeight);

            // 记录原始高度
            editor.valueContainerHeight = valueContainerHeight;

            // 设置 max-height
            this.initMaxHeight(txtHeight, menuHeight);
        },

        // 计算最大高度
        initMaxHeight : function (txtHeight, menuHeight) {
        var editor = this.editor;
        var $menuContainer = editor.menuContainer.$menuContainer;
        var $txt = this.$txt;
        var $wrap = $('<div>');

        // 需要浏览器支持 max-height，否则不管
        if (window.getComputedStyle && 'max-height'in window.getComputedStyle($txt.get(0))) {
            // 获取 max-height 并判断是否有值
            var maxHeight = parseInt(editor.$valueContainer.css('max-height'));
            if (isNaN(maxHeight)) {
                return;
            }

            // max-height 和『全屏』暂时有冲突
            if (editor.menus.fullscreen) {
                E.warn('max-height和『全屏』菜单一起使用时，会有一些问题尚未解决，请暂时不要两个同时使用');
                return;
            }

            // 标记
            editor.useMaxHeight = true;

            // 设置maxheight
            $wrap.css({
                'max-height': (maxHeight - menuHeight) + 'px',
                'overflow-y': 'auto'
            });
            $txt.css({
                'height': 'auto',
                'overflow-y': 'visible',
                'min-height': txtHeight + 'px'
            });

            // 滚动式，菜单阴影
            $wrap.on('scroll', function () {
                if ($txt.parent().scrollTop() > 10) {
                    $menuContainer.addClass('wangEditor-menu-shadow');
                } else {
                    $menuContainer.removeClass('wangEditor-menu-shadow');
                }
            });

            // 需在编辑器区域外面再包裹一层
            $txt.wrap($wrap);
        }
    },

        // 保存选区
        saveSelectionEvent: function () {
            var editor = this;
            var $txt = this.textEditor;

            var timeoutId;
            var dt = Date.now();

            function save() {
                editor.saveSelection();
            }

            // 同步保存选区
            function saveSync() {
                // 100ms之内，不重复保存
                if (Date.now() - dt < 100) {
                    return;
                }

                dt = Date.now();
                save();
            }

            // 异步保存选区
            function saveAync() {
                // 节流，防止高频率重复操作
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(save, 300);
            }

            // txt change 、focus、blur 时随时保存选区
            $txt.on(txtChangeEventNames + ' focus blur', function (e) {
                // 先同步保存选区，为了让接下来就马上要执行 editor.getRangeElem() 的程序
                // 能够获取到正确的 rangeElem
                saveSync();

                // 再异步保存选区，为了确定更加准确的选区，为后续的操作做准备
                saveAync();
            });

            // 鼠标拖拽选择时，可能会拖拽到编辑器区域外面再松手，此时 $txt 就监听不到 click事件了
            $txt.on('mousedown', function () {
                $txt.on('mouseleave.saveSelection', function (e) {
                    // 先同步后异步，如上述注释
                    saveSync();
                    saveAync();

                    // 顺道吧菜单状态也更新了
                    //editor.updateMenuStyle();
                });
            }).on('mouseup', function () {
                $txt.off('mouseleave.saveSelection');
            });

        },

        // 随时更新 value
        updateValueEvent : function () {
        var $txt = this.$txt;
        var editor = this.editor;
        var timeoutId, oldValue;

        // 触发 onchange 事件
        function doOnchange() {
            var val = $txt.html();
            if (oldValue === val) {
                // 无变化
                return;
            }

            // 触发 onchange 事件
            if (editor.onchange && typeof editor.onchange === 'function') {
                editor.onchange.call(editor);
            }

            // 更新内容
            editor.updateValue();

            // 记录最新内容
            oldValue = val;
        }

        // txt change 时随时更新内容
        $txt.on(txtChangeEventNames, function (e) {
            // 初始化
            if (oldValue == null) {
                oldValue = $txt.html();
            }

            // 监控内容变化（停止操作 100ms 之后立即执行）
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(doOnchange, 100);
        });
    },

        // 随时更新 menustyle
        updateMenuStyleEvent : function () {
        var $txt = this.$txt;
        var editor = this.editor;

        // txt change 时随时更新内容
        $txt.on(txtChangeEventNames, function (e) {
            editor.updateMenuStyle();
        });
    },

        // 最后插入试图插入 <p><br><p>
        insertEmptyP : function () {
            var $txt = this.$txt;
            var $children = $txt.children();

            if ($children.length === 0) {
                $txt.append($('<p><br></p>'));
                return;
            }

            if ($.trim($children.last().html()).toLowerCase() !== '<br>') {
                $txt.append($('<p><br></p>'));
            }
        },

        // 将编辑器暴露出来的文字和图片，都用 p 来包裹
        wrapImgAndText : function () {
        var $txt = this.$txt;
        var $imgs = $txt.children('img');
        var txt = $txt[0];
        var childNodes = txt.childNodes;
        var childrenLength = childNodes.length;
        var i, childNode, p;

        // 处理图片
        $imgs.length && $imgs.each(function () {
            $(this).wrap('<p>');
        });

        // 处理文字
        for (i = 0; i < childrenLength; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 3 && childNode.textContent && $.trim(childNode.textContent)) {
                $(childNode).wrap('<p>');
            }
        }
    },

        // 清空内容为空的<p>，以及重复包裹的<p>（在windows下的chrome粘贴文字之后，会出现上述情况）
        clearEmptyOrNestP : function () {
        var $txt = this.$txt;
        var $pList = $txt.find('p');

        $pList.each(function () {
            var $p = $(this);
            var $children = $p.children();
            var childrenLength = $children.length;
            var $firstChild;
            var content = $.trim($p.html());

            // 内容为空的p
            if (!content) {
                $p.remove();
                return;
            }

            // 嵌套的p
            if (childrenLength === 1) {
                $firstChild = $children.first();
                if ($firstChild.get(0) && $firstChild.get(0).nodeName === 'P') {
                    $p.html( $firstChild.html() );
                }
            }
        });
    },

        // 获取 scrollTop
        scrollTop : function (val) {
        var self = this;
        var editor = self.editor;
        var $txt = self.$txt;

        if (editor.useMaxHeight) {
            return $txt.parent().scrollTop(val);
        } else {
            return $txt.scrollTop(val);
        }
    },

        // 鼠标hover时候，显示p、head的高度
        showHeightOnHover : function () {
            var editor = this.editor;
            var $editorContainer = editor.$editorContainer;
            var menuContainer = editor.menuContainer;
            var $txt = this.$txt;
            var $tip = $('<i class="height-tip"><i>');
            var isTipInTxt = false;

            function addAndShowTip($target) {
                if (!isTipInTxt) {
                    $editorContainer.append($tip);
                    isTipInTxt = true;
                }

                var txtTop = $txt.position().top;
                var txtHeight = $txt.outerHeight();

                var height = $target.height();
                var top = $target.position().top;
                var marginTop = parseInt($target.css('margin-top'), 10);
                var paddingTop = parseInt($target.css('padding-top'), 10);
                var marginBottom = parseInt($target.css('margin-bottom'), 10);
                var paddingBottom = parseInt($target.css('padding-bottom'), 10);

                // 计算初步的结果
                var resultHeight = height + paddingTop + marginTop + paddingBottom + marginBottom;
                var resultTop = top + menuContainer.height();

                // var spaceValue;

                // // 判断是否超出下边界
                // spaceValue = (resultTop + resultHeight) - (txtTop + txtHeight);
                // if (spaceValue > 0) {
                //     resultHeight = resultHeight - spaceValue;
                // }

                // // 判断是否超出了下边界
                // spaceValue = txtTop > resultTop;
                // if (spaceValue) {
                //     resultHeight = resultHeight - spaceValue;
                //     top = top + spaceValue;
                // }

                // 按照最终结果渲染
                $tip.css({
                    height: height + paddingTop + marginTop + paddingBottom + marginBottom,
                    top: top + menuContainer.height()
                });
            }

            function removeTip() {
                if (!isTipInTxt) {
                    return;
                }
                $tip.remove();
                isTipInTxt = false;
            }

            $txt.on('mouseenter', 'ul,ol,blockquote,p,h1,h2,h3,h4,h5,table,pre', function (e) {
                addAndShowTip($(e.currentTarget));
            }).on('mouseleave', function () {
                removeTip();
            });
        }
    };
});