<template>
    <data-report></data-report>
    <mob-share></mob-share>
    <http-intercept></http-intercept>
    <div id="wrapper" :class="{'is-app':isApp}">
        <router-view keep-alive></router-view>
    </div>

</template>

<script>
    import appSDK from '../common/app-SDK'
    import Vue from 'vue'
    import 'common/fast-click'

    require('../scss/common.scss')
    require('../common/flexible.js')()
    require('../common/filters.js')(Vue)
    require('../common/directives.js')(Vue)
    Vue.component('pager',require('./pager.vue'))
    Vue.use(require('vue-resource'))
    Vue.http.options.emulateJSON = true
    window.http = Vue.http

    export default{
        computed: {
            isApp(){
                return appSDK.isApp
            }
        },
        components: {
            'data-report': require('./data-report.vue'),
            'mob-share': require('./mob-share.vue'),
            'http-intercept': require('./http-intercept.vue'),
            'mess-box': require('./mess-box.vue'),
        }
    }
</script>
