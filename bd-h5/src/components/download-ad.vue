<template>
    <div class="download display-flex" v-if="!hide  && showDownLayer">
        <a :href="gConfig.appDownloadUrl"></a>
        <a @click="closeDown"></a>
    </div>
</template>
<script type="es6">
    import localStore from 'common/local.store'
    import cookie from 'common/cookie'
    export default{
        data(){
            return {
                showDownLayer: false,
                gConfig: gConfig,
                hide: false,
            }
        },
        methods: {
            closeDown(){
                this.showDownLayer = false
                localStore.set('showDownLayer', false)
            }
        },
        ready(){
            var val = localStore.get('showDownLayer')
            this.showDownLayer = typeof val !== 'undefined' ? val : true
            // debugger
            var mhah = cookie.get('act_chan');
            if (mhah == 'MHAH') {
                this.hide = true
            }
        },
    }


</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .download {
        position: relative;
        width: 750px;
        height: 100px;
        background: url(../img/app2/bdpic_xiazai@2x.png);
        background-size: cover;
        > * {
            height: 100%;

        }
        > *:first-child {
            flex: 1;
        }
        > *:nth-last-child(1) {
            width: 65px;
        }
    }
</style>
