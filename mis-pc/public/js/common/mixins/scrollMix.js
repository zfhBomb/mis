define(function(require, exports, module) {

    var ScrollMix={
        getDefaultProps:function(){
            return {
                size : '7px',// width in pixels of the scrollbar and rail
                color: '#000',// scrollbar color, accepts any hex/color value
                position : 'right',// scrollbar position - left/right
                distance : '1px',// distance in pixels between the side edge and the scrollbar
                start : 'top',// default scroll position on load - top / bottom / $('selector')
                opacity : .4, // sets scrollbar opacity
                alwaysVisible : true,// enables always-on mode for the scrollbar
                disableFadeOut: false,// check if we should hide the scrollbar when user is hovering over
                railVisible : false,// sets visibility of the rail
                railColor : '#333', // sets rail color
                railOpacity : .2,// sets rail opacity
                railDraggable : true,// whether  we should use jQuery UI Draggable to enable bar dragging
                railClass : 'slimScrollRail', // defautlt CSS class of the slimscroll rail
                barClass : 'slimScrollBar',// defautlt CSS class of the slimscroll bar
                hiddenY:false,//不显示纵向滚动条
                hiddenX:true,//不显示横向滚动条
                barVClass: 'slimeScrollBarV',
                wrapperClass : 'slimScrollDiv', // defautlt CSS class of the slimscroll wrapper
                allowPageScroll : false,// check if mousewheel should scroll the window if we reach top/bottom
                wheelStep : 20, // scroll amount applied to each mouse wheel step
                touchScrollStep : 200, // scroll amount applied when user is using gestures
                borderRadius: '7px', // sets border radius
                railBorderRadius: '7px', // sets border radius of the rail
                releaseScroll:false,
                minBarHeight:45,
                minBarWidth:15
            };
        },

        init:function(){
            this.wrapperStyle={
                position: 'relative',
                overflow: 'hidden',
                height:'100%'
            };
            var barStyle={
                background: this.props.color,
                width: this.props.size,
                position: 'absolute',
                top: 0,
                opacity: this.props.opacity,
                display: this.props.alwaysVisible ? 'block' : 'none',
                'border-radius' :this.props.borderRadius,
                BorderRadius:this.props.borderRadius,
                MozBorderRadius: this.props.borderRadius,
                WebkitBorderRadius:this.props.borderRadius,
                zIndex: 99
            };
            var railStyle={
                width: this.props.size,
                height: '100%',
                position: 'absolute',
                top: 0,
                display: (this.props.alwaysVisible && this.props.railVisible) ? 'block' : 'none',
                'border-radius': this.props.railBorderRadius,
                background: this.props.railColor,
                opacity: this.props.railOpacity,
                zIndex: 90
            };
            var posCss = (this.props.position == 'right') ? { right: this.props.distance } : { left: this.props.distance };
            $.extend(barStyle,posCss);
            $.extend(railStyle,posCss);

            this.wrapClass=this.props.wrapperClass;
            if(this.props.className){
                this.wrapClass+=' '+this.props.className;
            }

            this.rail=<div className={this.props.railClass} style={railStyle}/>;
            this.bar=<div className={this.props.barClass} style={barStyle}/>;

        }
    };
    module.exports=ScrollMix;
});