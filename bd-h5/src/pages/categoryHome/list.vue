<template>
    <div class="index scroll" @scroll="onScroll" v-el:scroll>
        <prolist :categ-Id="catid" :second-Categ-Id="secondCategId"></prolist>
    </div>
    <go-to-top></go-to-top>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .index {
        padding: 0 0 130px 0;
    }

</style>
<script>
    import goToTop from 'components/go-to-top.vue'
    import wxTool from 'common/wx.tool'
    import prolist from './prolist.vue'

    export default{
        data(){
            return {
                name: null,
                secondCategId: null,
                catid: null,
            }
        },
        components: {
            goToTop, prolist,
        },
        methods: {
            onScroll(){
                this.$broadcast("scroll", this.$els.scroll);
            },
        },
        ready(){
        },
        route: {
            data ({ to }) {
                this.name = to.params.name
                this.secondCategId = to.params.secondCategId
                this.catid = to.params.catid
                wxTool.setTitle(window.decodeURIComponent(this.name))

                window.setTimeout(() => {
//                    this.$broadcast("loadPage")
                }, 16)
            },
        },
    }
</script>