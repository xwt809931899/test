<template>
    <div class="go-to-top" v-show="isShow" @click="toTop">
        <img src="../img/ic_back_top.png">
    </div>
</template>
<script>
    import util from '../common/util'
    export default{
        data(){
            return {
                isShow: false
            }
        },
        methods: {
            toTop(){
                util.goToTop()
            }
        },
        ready(){
            this.$on("scroll", (el)=> {
                this.isShow = el.scrollTop >= window.screen.height;
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .go-to-top {
        position: absolute;
        bottom: 145px;
        right: 20px;

        img {
            width: 88px;
            height: 88px;
        }
    }
</style>
