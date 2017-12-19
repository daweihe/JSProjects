/**
 * Created by lucky on 2016/4/19.
 */
var utils = {
    listToArray: function (similarArray) {
        /*
         *   try catch js
         * */
        var a = [];
        try {
            a = Array.prototype.slice.call(similarArray);
        } catch (e) {
            alert(); //ie7 和 8 弹出
            var a = [];
            for (var i = 0; i < similarArray.length; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    },
    jsonParse: function (jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    },
    offset: function (ele) {
        var eleLeft = ele.offsetLeft;
        var eleTop = ele.offsetTop;
        var eleParent = ele.offsetParent;
        var left = null;
        var top = null;
        left += eleLeft;
        top += eleTop;
        while (eleParent) {
            //console.log(eleParent);
            /*
             *  ps: ie8中会有一个问题如果在ie8中就不加父级的边框了。因为已经加过了。
             *  判断我的当前浏览器是不是ie8   1 可以用正则 test MSIE 8.0   2 字符串
             *  中的indexOf MSIE 8.0 判断 -1. window.navigator.userAgent
             * */
            if (window.navigator.userAgent.indexOf('MSIE 8.0') !== -1) { //ie8
                left += eleParent.offsetLeft;
                top += eleParent.offsetTop;
            } else {
                left += eleParent.clientLeft + eleParent.offsetLeft;
                top += eleParent.clientTop + eleParent.offsetTop;
            }
            eleParent = eleParent.offsetParent;
        }
        return {left: left, top: top};
    },
    getWin: function (attr, val) { //一个参数的时候是读取，两个参数可以赋值
        if (val !== undefined) {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    getCss: function (curEle, attr) {
        //
        var reg = /^(-?\d+(\.\d+)?)(?:px|em|pt|deg|rem)$/;
        var val = null;
        if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
            //这里处理filter的滤镜问题  alpha(opacity=40);
            if (attr === 'opacity') {
                //alpha(opacity=40)
                val = curEle.currentStyle['filter'];
                var reg1 = /^alpha\(opacity=(\d+(\.\d+)?)\)/;
                return reg1.test(val) ? RegExp.$1 / 100 : 1;
            }
            val = curEle.currentStyle[attr];
        } else {
           val =   attr === 'opacity' ?   window.getComputedStyle(curEle,null)[attr]/1 : window.getComputedStyle(curEle,null)[attr];
        }
        return reg.test(val) ? parseFloat(val) : val; //如果正则验证通过，寿命返回值是带单位的，那么我们就要人为去掉这个单位。否则不变
    }


}
