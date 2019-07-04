<template>
    <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe60a;</i></a>
    <div class="big-img flex">
        <swiper :list="store.imgUrl" :params="swiperParams" :cur-index="store.imgIndex">
        </swiper>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .back {
        position: absolute;
        font-size: 60px;
        color: #000;;
        z-index: 11;
        padding-top: 20px;
        padding-left: 20px;
        text-decoration: none;
    }

    .big-img {
        height: 100%;
        background: #fff;
    }

</style>
<script type="text/babel">
    import wxTool from 'common/wx.tool'
    import store from './store'
    export default{
        data(){
            return {
                store,
                swiperParams: {
                    autoplay: false,
                },
            }
        },
        ready(){
        },
        methods: {},
        components: {
            'swiper': require('components/swiper.vue')
        },
        route: {
            data(){
                if (!store.imgUrl) history.back()
            }
        }
    }
</script>