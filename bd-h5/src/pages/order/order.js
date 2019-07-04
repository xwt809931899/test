import Vue from 'vue'
import Router from 'vue-router'
import appSDK from 'common/app-SDK'
require('./order.scss')
require('./filters.js')(Vue)

Vue.use(Router);
var router = new Router();
router.map({
    '/list/:cmd': {
        title: '我的订单',
        name: 'list',
        component: resolve => require(['./list.vue'], resolve),
        auth: 'all',
    },
    '/detail/:id': {
        title: '订单详情',
        name: 'detail',
        component: resolve => require(['./detail.vue'], resolve),
        auth: 'all',
    },
    '/detail_pay/:id': {
        title: '订单详情',
        name: 'detail_pay',
        component: resolve => require(['./detail_pay.vue'], resolve),
        auth: 'all',
    },
    '/logistics/:id': {
        title: '查看物流',
        name: 'logistics',
        component: resolve => require(['./logistics.vue'], resolve),
        auth: 'all',
    },
    '/after-service-list': {
        title: '退货/退款',
        name: 'after-service-list',
        component: resolve => require(['./after-service-list.vue'], resolve),
        auth: 'all',
    },
    '/after-service-detail/:afterSalesNo': {
        title: '售后单详情',
        name: 'after-service-detail',
        component: resolve => require(['./after-service-detail.vue'], resolve),
        auth: 'all',
    },
    '/after-service-apply': {
        title: '申请售后',
        name: 'after-service-apply',
        component: resolve => require(['./after-service-apply.vue'], resolve),
        auth: 'all',
    },
    '/after-service-reply/:afterSalesNo': {
        title: '请回邮商品',
        name: 'after-service-reply',
        component: resolve => require(['./after-service-reply.vue'], resolve),
        auth: 'all',
    },
})

require('common/router-before')(router)

router.redirect({
    '/list/:cmd/:pageNo': '/list/:cmd',
//    '/list': '/list/0',
    '*': '/list/0',
})
router.start(require('components/common-app.vue'), '#app')
if(appSDK.isApp){
    appSDK.hideShareBtn()
}