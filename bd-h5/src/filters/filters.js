/**
 * Created by lred on 2016/3/10.
 */
import Vue from 'vue'

Vue.filter('coverPrice', function (s) {
    return +s > 99 ?
        String(s).replace(/(\d+)(\d{2})$/, '$1.$2') :
        +s > 9 ?
        '0.' + s :
        '0.0' + s;
});

var _format = function (date,fmt) { //author: meizz
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Vue.filter("formatTime",function(date,fmt){
    if(Object.prototype.toString.call(date)!=="[object Date]"){
        date = new Date(date)
    }
    return _format(date,fmt);
});

// Vue.filter("substr", (v, start, end) => {
//     if (isNull(v)) return ''
//     return String.prototype.substr.call(v, start, end)
// })

// Vue.filter('countdown', (function () {
//     function fix(i) {
//         return i < 10 ? '0' + i : i;
//     }
//
//     return function (time, curTime, fmt = 'hh:mm:ss', noDay = false) {
//         if (time < curTime) return '0'
//
//         var remain = (time - curTime) / 1000,
//             h = parseInt(remain / 3600),
//             m = parseInt(remain / 60 % 60),
//             s = parseInt(remain % 60),
//             day = 0
//
//         if (!noDay && h >= 24) {
//             day = parseInt(h / 24)
//             h = h % 24
//         }
//
//         const fmtData = {
//             dd: fix(day),
//             hh: fix(h),
//             mm: fix(m),
//             ss: fix(s),
//         }
//
//         let r = fmt
//         for (const k in fmtData) {
//             r = r.replace(new RegExp(k, 'g'), fmtData[k])
//         }
//
//         return r
//     }
// })())
