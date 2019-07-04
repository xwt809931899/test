import Vue from 'vue'
import Router from 'vue-router'
Vue.component("footer-nav", require('components/footer-nav.vue'))
Vue.use(Router)
var router = new Router()
router.map({
    '/home': {
        title: '',
        name: 'home',
        component: require('./home.vue'),
    },
    '/list/:catid/:secondCategId/:name': {
        title: '列表',
        name: 'list',
        component: resolve => require(['./list.vue'], resolve),
    },
})

require('common/router-before')(router)

router.redirect({
    '*': '/home',
})
router.start(require('components/common-app.vue'), '#app')
