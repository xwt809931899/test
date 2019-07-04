import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
var router = new Router()
router.map({
    '/home/:uid': {
        title: '特邀用户',
        name: 'home',
        component: resolve => require(['./home.vue'], resolve),
        auth: 'all'
    },
    '/bigImg': {
        title: '大图',
        name: 'bigImg',
        component: resolve => require(['./bigImg.vue'], resolve),
        auth: 'all'
    },
})

require('common/router-before')(router)

router.redirect({
})
router.start(require('components/common-app.vue'), '#app')
