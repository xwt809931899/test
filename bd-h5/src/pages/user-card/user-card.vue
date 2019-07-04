<template>
    <http-intercept></http-intercept>
    <div id="wrapper" :class="{'is-app':isApp}">
        <router-view
                class="view"
                keep-alive>
        </router-view>
    </div>
</template>

<script type="es6">
    import appSDK from 'common/app-SDK'
    export default{
        computed: {
            isApp(){
                return appSDK.isApp
            }
        },
    }
</script>