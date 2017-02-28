define(function (require, exports, module) {
    var http = "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/";
    var faceDatas = [
        {
            icon: http + "7a/shenshou_thumb.gif",
            value: "\\[草泥马\\]"
        },
        {
            icon: http + "60/horse2_thumb.gif",
            value: "\\[神马\\]"
        },
        {
            icon: http + "bc/fuyun_thumb.gif",
            value: "\\[浮云\\]"
        },
        {
            icon: http + "c9/geili_thumb.gif",
            value: "\\[给力\\]"
        },
        {
            icon: http + "f2/wg_thumb.gif",
            value: "\\[围观\\]"
        },
        {
            icon: http + "70/vw_thumb.gif",
            value: "\\[威武\\]"
        },
        {
            icon: http + "6e/panda_thumb.gif",
            value: "\\[熊猫\\]"
        },
        {
            icon: http + "81/rabbit_thumb.gif",
            value: "\\[兔子\\]"
        },
        {
            icon: http + "bc/otm_thumb.gif",
            value: "\\[奥特曼\\]"
        }, {
            icon: http + "15/j_thumb.gif",
            value: "\\[囧\\]"
        }, {
            icon: http + "89/hufen_thumb.gif",
            value: "\\[互粉\\]"
        }, {
            icon: http + "c4/liwu_thumb.gif",
            value: "\\[礼物\\]"
        }, {
            icon: http + "ac/smilea_thumb.gif",
            value: "\\[呵呵\\]"
        }, {
            icon: http + "0b/tootha_thumb.gif",
            value: "\\[嘻嘻\\]"
        }, {
            icon: http + "6a/laugh.gif",
            value: "\\[哈哈\\]"
        }, {
            icon: http + "14/tza_thumb.gif",
            value: "\\[可爱\\]"
        }, {
            icon: http + "af/kl_thumb.gif",
            value: "\\[可怜\\]"
        }, {
            icon: http + "a0/kbsa_thumb.gif",
            value: "\\[挖鼻屎\\]"
        }, {
            icon: http + "f4/cj_thumb.gif",
            value: "\\[吃惊\\]"
        }, {
            icon: http + "6e/shamea_thumb.gif",
            value: "\\[害羞\\]"
        }, {
            icon: http + "c3/zy_thumb.gif",
            value: "\\[挤眼\\]"
        }, {
            icon: http + "29/bz_thumb.gif",
            value: "\\[闭嘴\\]"
        }, {
            icon: http + "71/bs2_thumb.gif",
            value: "\\[鄙视\\]"
        }, {
            icon: http + "6d/lovea_thumb.gif",
            value: "\\[爱你\\]"
        }, {
            icon: http + "9d/sada_thumb.gif",
            value: "\\[泪\\]"
        }, {
            icon: http + "19/heia_thumb.gif",
            value: "\\[偷笑\\]"
        }, {
            icon: http + "8f/qq_thumb.gif",
            value: "\\[亲亲\\]"
        }, {
            icon: http + "b6/sb_thumb.gif",
            value: "\\[生病\\]"
        }, {
            icon: http + "58/mb_thumb.gif",
            value: "\\[太开心\\]"
        }, {
            icon: http + "17/ldln_thumb.gif",
            value: "\\[懒得理你\\]"
        }, {
            icon: http + "98/yhh_thumb.gif",
            value: "\\[右哼哼\\]"
        }, {
            icon: http + "6d/zhh_thumb.gif",
            value: "\\[左哼哼\\]"
        }, {
            icon: http + "a6/x_thumb.gif",
            value: "\\[嘘\\]"
        }, {
            icon: http + "af/cry.gif",
            value: "\\[衰\\]"
        }, {
            icon: http + "73/wq_thumb.gif",
            value: "\\[委屈\\]"
        }, {
            icon: http + "9e/t_thumb.gif",
            value: "\\[吐\\]"
        }, {
            icon: http + "f3/k_thumb.gif",
            value: "\\[打哈欠\\]"
        }, {
            icon: http + "27/bba_thumb.gif",
            value: "\\[抱抱\\]"
        }, {
            icon: http + "7c/angrya_thumb.gif",
            value: "\\[怒\\]"
        }, {
            icon: http + "5c/yw_thumb.gif",
            value: "\\[疑问\\]"
        }, {
            icon: http + "a5/cza_thumb.gif",
            value: "\\[馋嘴\\]"
        }, {
            icon: http + "70/88_thumb.gif",
            value: "\\[拜拜\\]"
        }, {
            icon: http + "e9/sk_thumb.gif",
            value: "\\[思考\\]"
        }, {
            icon: http + "24/sweata_thumb.gif",
            value: "\\[汗\\]"
        }, {
            icon: http + "7f/sleepya_thumb.gif",
            value: "\\[困\\]"
        }, {
            icon: http + "6b/sleepa_thumb.gif",
            value: "\\[睡觉\\]"
        }, {
            icon: http + "90/money_thumb.gif",
            value: "\\[钱\\]"
        }, {
            icon: http + "0c/sw_thumb.gif",
            value: "\\[失望\\]"
        }, {
            icon: http + "40/cool_thumb.gif",
            value: "\\[酷\\]"
        }, {
            icon: http + "8c/hsa_thumb.gif",
            value: "\\[花心\\]"
        }, {
            icon: http + "49/hatea_thumb.gif",
            value: "\\[哼\\]"
        }, {
            icon: http + "36/gza_thumb.gif",
            value: "\\[鼓掌\\]"
        }, {
            icon: http + "d9/dizzya_thumb.gif",
            value: "\\[晕\\]"
        }, {
            icon: http + "1a/bs_thumb.gif",
            value: "\\[悲伤\\]"
        }, {
            icon: http + "62/crazya_thumb.gif",
            value: "\\[抓狂\\]"
        }, {
            icon: http + "91/h_thumb.gif",
            value: "\\[黑线\\]"
        }, {
            icon: http + "6d/yx_thumb.gif",
            value: "\\[阴险\\]"
        }, {
            icon: http + "89/nm_thumb.gif",
            value: "\\[怒骂\\]"
        }, {
            icon: http + "40/hearta_thumb.gif",
            value: "\\[心\\]"
        }, {
            icon: http + "ea/unheart.gif",
            value: "\\[伤心\\]"
        }, {
            icon: http + "58/pig.gif",
            value: "\\[猪头\\]"
        }, {
            icon: http + "d6/ok_thumb.gif",
            value: "\\[ok\\]"
        }, {
            icon: http + "d9/ye_thumb.gif",
            value: "\\[耶\\]"
        }, {
            icon: http + "d8/good_thumb.gif",
            value: "\\[good\\]"
        }, {
            icon: http + "c7/no_thumb.gif",
            value: "\\[不要\\]"
        }, {
            icon: http + "d0/z2_thumb.gif",
            value: "\\[赞\\]"
        }, {
            icon: http + "40/come_thumb.gif",
            value: "\\[来\\]"
        }, {
            icon: http + "d8/sad_thumb.gif",
            value: "\\[弱\\]"
        }, {
            icon: http + "91/lazu_thumb.gif",
            value: "\\[蜡烛\\]"
        }, {
            icon: http + "6a/cake.gif",
            value: "\\[蛋糕\\]"
        }, {
            icon: http + "d3/clock_thumb.gif",
            value: "\\[钟\\]"
        }, {
            icon: http + "1b/m_thumb.gif",
            value: "\\[话筒\\]"
        }
    ];
    module.exports = faceDatas;
});