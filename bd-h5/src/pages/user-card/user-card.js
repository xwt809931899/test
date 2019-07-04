import Vue from 'vue'
import Router from 'vue-router'
require('scss/al-from.scss')

Vue.use(Router);
var router = new Router();
router.map({
    'vip-index': {
        title: '积分卡',
        name: 'vip-index',
        component: resolve => require(['./vip-index.vue'], resolve),
        auth: 'all',
    },
    'vip-bind': {
        title: '绑定会员卡',
        name: 'vip-bind',
        component: resolve => require(['./vip-bind.vue'], resolve),
        auth: 'all',
    },
    'prepaid-index': {
        title: '预付卡',
        name: 'prepaid-index',
        component: resolve => require(['./prepaid-index.vue'], resolve),
        auth: 'all',
    },
    'prepaid-bind': {
        title: '预付卡绑定',
        name: 'prepaid-bind',
        component: resolve => require(['./prepaid-bind.vue'], resolve),
        auth: 'all',
    },
    'prepaid-set-pwd': {
        title: '设置支付密码',
        name: 'prepaid-set-pwd',
        component: resolve => require(['./prepaid-set-pwd.vue'], resolve),
        auth: 'all',
    },
    'card-discription': {
        title: '卡片说明',
        name: 'card-discription',
        component: resolve => require(['./card-discription.vue'], resolve),
        auth: 'all',
    },
    'vip-apply': {
        title: '申请百大会员卡',
        name: 'vip-apply',
        component: resolve => require(['./vip-apply.vue'], resolve),
        auth: 'all',
    },
    'point-record/:cardNo': {
        title: '积分记录',
        name: 'point-record',
        component: resolve => require(['./point-record.vue'], resolve),
    },
    'point-description': {
        title: '积分说明',
        name: 'point-description',
        component: resolve => require(['./point-description.vue'], resolve),
    },
    'order-detail': {
        title: '订单详情',
        name: 'order-detail',
        component: resolve => require(['./order-detail.vue'], resolve),
    },
    'coupon-exchange': {
        title: '兑换详情',
        name: 'coupon-exchange',
        component: resolve => require(['./coupon-exchange.vue'], resolve),
    },

})

require('common/router-before')(router)

router.redirect({})
router.start(require('components/common-app.vue'), '#app')
