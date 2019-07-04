<template>
    <div class="index scroll" @scroll="onScroll" v-el:scroll>
        <template v-for="item in list">
            <div :key="item" :style="'margin-bottom:'+toRem(item.margin)" :type="item.styleCode">
                <swiper v-if="item.styleCode==='banner_list'" :list="item.list" :params="{observer:false,observeParents:false}"></swiper>

                <horizontal-Two-Act v-if="item.styleCode==='horizontal_two_act'" :item="item"></horizontal-Two-Act>
                <head-Category1 v-if="item.styleCode==='head_category_1'" :item="item"></head-Category1>
                <head-Category2 v-if="item.styleCode==='head_category_2'" :item="item"></head-Category2>
                <head-Category3 v-if="item.styleCode==='head_category_3'" :item="item"></head-Category3>
                <vertical-Acts v-if="item.styleCode==='vertical_acts'" :item="item"></vertical-Acts>
                <product-List-Slide v-if="item.styleCode==='product_list_slide'" :item="item"></product-List-Slide>
                <horizontal-slide-act v-if="item.styleCode==='horizontal_slide_act'" :item="item"></horizontal-slide-act>
                <seckill-act v-if="item.styleCode==='seckill_area'" :item="item"></seckill-act>
                <head-category4 v-if="item.styleCode==='horizontal_four_act'" :item="item"></head-category4>

                <pro-List v-if="item.styleCode==='product_list_rows'" :item="item" :activity-id="item.list[0].activityId"></pro-List>
            </div>
        </template>
        <pager v-if="channe === 'activelist'" :on-data="getData" :start-num="0" :model.sync="list">
        </pager>
    </div>
    <go-to-top></go-to-top>
    <footer-nav v-if="channe === 'activelist'" active="activelist"></footer-nav>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .index {
        padding: 0 0 130px 0;
    }

</style>
<script>
    import footerNav from 'components/footer-nav.vue'
    import swiper from 'components/swiper.vue'
    import goToTop from 'components/go-to-top.vue'
    import proList from '../index/components/pro-list.vue'
    import headCategory1 from '../index/components/head-category1.vue'
    import headCategory2 from '../index/components/head-category2.vue'
    import headCategory3 from '../index/components/head-category3.vue'
    import headCategory4 from '../index/components/head-category4.vue'
    import verticalActs from '../index/components/vertical-acts.vue'
    import horizontalSlideAct from '../index/components/horizontal-slide-act.vue'
    import horizontalTwoAct from '../index/components/horizontal-two-act.vue'
    import productListSlide from '../index/components/product-list-slide.vue'
    import seckillAct from '../index/components/seckill-act.vue'

    export default{
        data(){
            return {
                list: [],
                channe: 'activelist',
            }
        },
        components: {
            footerNav,
            goToTop,
            swiper,
            headCategory1,
            headCategory2,
            headCategory3,
            verticalActs,
            horizontalTwoAct,
            horizontalSlideAct,
            productListSlide,
            proList,
            seckillAct,
            headCategory4,
        },
        methods: {
            onScroll(){
                this.$broadcast("scroll", this.$els.scroll);
            },
            toRem(px){
                return window.baseLib.flexible.px2rem(px) + 'rem'
            },
            getData(params){
                const channe = this.channe
                if (channe === 'activelist') {
                    return http.get(`${gConfig.PROJECT_MARKETING}/api/activity/getActList`, {
                        startNum: params.startNum,
                        pageSize: 10,
                    }).success(({ data }) => {
                        data.list.forEach(item => {
                            if (item.styleCode === 'banner_list') {
                                item.list.forEach(i => {
                                    i.src = i.bannerImg
                                    i.href = i.actLink
                                })
                            }
                        })
                    })
                }
            },
        },
        ready(){

        },
        route: {
            data({ to }){
                const channe = this.channe = to.params.channe
                if (channe === 'activelist') {
                    this.$nextTick(() => {
                        this.$broadcast("loadPage")
                    }, 16)
//                } else if (channe === 'direct_mail' || channe === 'duty_fee') {
                } else {
                    http.get(`${gConfig.PROJECT_MARKETING}/api/activity/getChannelData`, {
                        channelCode: channe,
                    }).success(({ data }) => {
                        data.list.forEach(item => {
                            if (item.styleCode === 'banner_list') {
                                item.list.forEach(i => {
                                    i.src = i.bannerImg
                                    i.href = i.actLink
                                })
                            }
                        })
                        this.list = data.list
                    })
                }
            },
        },
    }
</script>