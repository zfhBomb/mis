define(function (require, exports, module) {
    module.exports={
        editor:this.textEditor,
        toolBar:this.toolBar,
        //selectedRange,
        //options:this.props,
        //toolbarBtnSelector,

        //这个地方用react的state来实现。

        /*updateToolbar:function () {
            var options=this.props;
            if (this.options.activeToolbarClass) {
                this.toolBar.find(toolbarBtnSelector).each(function () {
                    try {
                        var command = $(this).data(options.commandRole);
                        if (document.queryCommandState(command)) {
                            $(this).addClass(options.activeToolbarClass);
                        } else {
                            $(this).removeClass(options.activeToolbarClass);
                        }
                    } catch(e){}
                });
            }
        },*/

        execCommand :function (commandWithArgs, valueArg) {
            var commandArr = commandWithArgs.split(' '),
                command = commandArr.shift(),
                args = commandArr.join(' ') + (valueArg || '');

            document.execCommand(command, 0, args);
                //updateToolbar();
        },

        //热键命令，后期再补上。
        bindHotkeys:function (hotKeys) {
            $.each(hotKeys, function (hotkey, command) {
                editor.keydown(hotkey, function (e) {
                    if (editor.attr('contenteditable') && editor.is(':visible')) {
                        e.preventDefault();
                        e.stopPropagation();
                        execCommand(command);
                    }
                }).keyup(hotkey, function (e) {
                    if (editor.attr('contenteditable') && editor.is(':visible')) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            });
        },

        //获取当前选中的光标位置。
        getCurrentRange : function () {
            try {
                var sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    return sel.getRangeAt(0);
                }
            } catch(e){}
        },

        //保存选区
        saveSelection: function () {
            this.selectedRange = this.getCurrentRange();
        },

        restoreSelection : function () {
            try {
                var selection = window.getSelection();
                if (this.selectedRange) {
                    try {
                        selection.removeAllRanges();
                    } catch (ex) {
                        document.body.createTextRange().select();
                        document.selection.empty();
                    }

                    selection.addRange(selectedRange);
                }
            } catch(e){}
        },

        bindEvent:function(){
            var editor=this.textEditor.parent();
            editor.on('mouseup keyup mouseout', function (){
                this.saveSelection();
                //this.updateToolbar();
            }.bind(this));
            $(window).bind('touchend', function (e) {
                var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
                    currentRange = this.getCurrentRange(),
                    clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
                if (!clear || isInside) {
                    this.saveSelection();
                    //updateToolbar();
                }
            }.bind(this));
        }
    };
});