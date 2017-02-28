define(function(require, exports, module) {
    module.exports={
        /**
         * 启用全屏
         * @param element
         */
        launchFullscreen:function(element){
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },
        /**
         * 退出全屏
         */
        exitFullscreen:function(){
            if(document.exitFullscreen) {
                document.exitFullscreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        },
        /**
         * 判断是否全屏
         */
        isInFullscreen:function(){
                return (document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width);
        }


    }
});