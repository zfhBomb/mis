define(function(require, exports, module) {
    module.exports={
        error:{
            notValidType:'NOT_VALID_TYPE',//不匹配的文件类型
            tooBig:'TOO_BIG',//上传文件体积超标
            serviceError:'SERVICE_ERROR',//服务器端错误
            unexpectedError:'unexpected_error',//未知错误
            imageLoadFailed:'IMAGE_LOAD_FAILED',//图片载入失败
            thumbnailFailed:'THUMBNAIL_FAILED', //绘制预览图失败
            fileLoadFailed:'FILE_LOAD_FAILED', //文件读取失败
            timeOut:'TIME_OUT', //网络请求超时
            netError:'NET_ERROR',//网络未链接,
            uploadError:"UPLOAd_ERROR" //上传传输中错误
        },
        action:{
            uploadCancel:'UPLOAD_CANCEL'//中断文件上传
        }
    }
});