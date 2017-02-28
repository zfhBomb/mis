define(function(require, exports, module) {
    exports.config={
        bucketUrl_files:'http://filesfiles.knooc.com',
        bucketUrl_files_dev:'http://7xo1cs.com1.z0.glb.clouddn.com',
        bucketUrl_common:'http://filescommon.knooc.com',
        bucketUrl_static:'http://filesstatic.knooc.com',
        bucketUrl_temp:'http://filestemp.knooc.com',
        fileApp:'/fileSystem/',
        COMMONImg:'defaultImg',
        COMMONFile:"commonFile"
    };

    exports.shareConfig={
        cs:"f/cs/",//产品
        course:"f/course/",//课程
        ts:"f/ts/",//服务
        ttc:"f/ttc/",//教学主题
        tbc:"f/tbc/",//教材主题课件
        te:"f/te/"//老师
    }

    exports.getToken=function(paramData){
        var token = "";
        $.ajax({
            async: false,
            type:"get",
            url : "http://fish.knooctest.cn:8157/fileSystem/uploadFile/createToken",
            data: paramData,
            success: function(data){
                token = data.uptoken;
            }
        });
        return token;
    }

});