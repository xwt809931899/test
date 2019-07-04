import Vue from 'vue'
import Router from 'vue-router'
require('./index.scss')

Vue.use(Router)
var router = new Router()
router.map({
    '/index/:channe': {
        title: gConfig.siteTitile,
        name: 'index',
//        component: resolve => require(['./index.vue'], resolve),
        component: require('./index.vue'),
    },
    '/preview/:channe': {
        title: gConfig.siteTitile,
        name: 'preview',
        component: require('./index.vue'),
    },
})

require('common/router-before')(router)

router.redirect({
    '*': '/index/activelist',
})
router.start(require('components/common-app.vue'), '#app')
