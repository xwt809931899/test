<template>
    <template v-if="tag">
        <img v-if="tagType == 'proList'" v-src="tag" class="tag-img tag-pro-list">
        <img v-if="tagType == 'proDetail' && index == 0" v-src="tag" class="tag-img tag-detail">
        <img v-if="tagType == 'proSlide'" v-src="tag" class="tag-img tag-slide">
    </template>
</template>
<script>
    import util from 'common/util'
    import cookie from 'common/cookie'
    export default {
        data() {
            return {}
        },
        props: {
            tagType: {
                type: String,
            },
            tag: {
                type: String
            },
            index: {
                type: Number
            }
        },
        methods: {},
        ready(){
        },
        route: {
            data({ to }){
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .tag-img {
        position: absolute;
        top: 0;
        left: 0;
    }

    .tag-detail {
        width: 160px;
        height: 80px;
        left: 30px;
    }

    .tag-slide {
        width: 80px;
        height: 40px;
    }

    .tag-pro-list {
        width: 88px;
        height: 44px;
    }
</style>