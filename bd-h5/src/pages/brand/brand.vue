<template>
    <mob-share></mob-share>
    <http-intercept></http-intercept>
    <alert></alert>
    <div id="wrapper" :class="{'is-app':isApp}">
        <router-view
                class="view"
                keep-alive>
        </router-view>
    </div>
</template>

<script type="es6">
    import appSDK from 'common/app-SDK'
    import alert from 'components/alert.vue'
    export default{
        computed: {
            isApp(){
                return appSDK.isApp
            }
        },
        components:{alert}
    }
</script>