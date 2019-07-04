import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
var router = new Router();
var messStore = {
    messInfo: null
}
Vue.mixin({
    created(){
        this.$set('messStore', messStore)
        this.messBox = {
            tips(option) {
                messStore.messInfo = option;
                return new Promise((resolve, reject) => {
                    messStore.boxBackCall = (success) => {
                        if (success) {
                            resolve()
                        } else {
                            reject()
                        }
                    }
                })
            },

        }
    }
})

router.map({
    '/brand-details/:brandId': {
        title: '品牌主页',
        name: 'brand-details',
        component: resolve => require(['./brand-details.vue'], resolve)
    },
    '/brand-list': {
        title: '关注的品牌',
        name: 'brand-list',
        component: resolve => require(['./brand-list.vue'], resolve)
    },
})

require('common/router-before')(router)

router.redirect({
    '/brand-details/:brandId/:pageNo': '/brand-details/:brandId',
})
router.start(require('components/common-app.vue'), '#app')
