/**
 * Created by lred on 2016/1/19.
 */
import Vue from 'vue'
import Router from 'vue-router'
import wxconfig from '../../common/wxconfig.js'
import ajaxloading from '../../components/ajaxloading.vue'
Vue.use(require('vue-resource'));
Vue.use(Router);
Vue.component("ajaxloading", ajaxloading);
Vue.http.options.emulateJSON = true;
Vue.filter('previewItemUrl', function (value) {
    return '/rebate/item.html?hidebtn=1#id-' + value
});

Vue.filter('rate', function (value, rate) {
    value = +value;
    rate = +rate || 0.1;
    return value * rate;
});
Vue.filter('coverPrice', function (s) {
    return +s > 99 ?
        String(s).replace(/(\d+)(\d{2})$/, '$1.$2') :
        +s > 9 ?
        '0.' + s :
        '0.0' + s;
});
Vue.filter('toFixed', (v, n = 2) => {
    if (typeof v !== 'number') {
        return v
    }
    return v.toFixed(2)
})
var _format = function (date, fmt) { //author: meizz
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
Vue.filter("formatTime", function (date, fmt) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
        date = new Date(date)
    }
    return _format(date, fmt);
});
Vue.component("slide-left-btns", require('../../components/slide.left.btns.vue'));
Vue.component("pager", require('../../components/pager.vue'));
wxconfig();

var router = new Router();

router.map({
    //'/': {
    //    component: (resolve)=> {
    //        require.ensure([], (require)=>  resolve(require('../../page/rebate/sharefound/index.vue')));
    //    }
    //},
    //'/:id': {
    //    component: (resolve)=> {
    //        require.ensure([], (require)=>  resolve(require('../../page/rebate/sharefound/index.vue')));
    //    }
    //},
    //新增文案
    '/': {
        component: require('../../page/rebate/sharefound/index.vue')
    },
    //编辑文案
    '/:id': {
        component: require('../../page/rebate/sharefound/index.vue')
    },
    // 预览文案
    '/preview': {
        component: require('../../page/rebate/sharefound/preview.vue')
    },
    // 草稿箱
    '/draft': {
        component: require('../../page/rebate/sharefound/draft.vue')
    },
    //文案详情
    '/details/:id': {
        component: require('../../page/rebate/sharefound/details.vue')
    },
});
router.beforeEach(function ({ to, next }) {
    window.scrollTo(0, 0);
    next()
});
router.redirect({
    '*': '/'
});
router.start(require('../../page/rebate/sharefound/app.vue'), '#app')
