<template>
    <div v-if="item.saleInfoDetail">
        <div class="rightmoule" v-if="item.saleInfoDetail && item.saleInfoDetail.hasUpperRightMoule == 1">{{item.saleInfoDetail.upperRightText}}</div>
        <div class="saleinfo" v-if="item.saleInfoDetail && item.saleInfoDetail.hasBottomModule == 1">
            <div class="bottommoulebg" v-if="item.saleInfoDetail && item.saleInfoDetail.bottomBgImg" :style="{'background-image': 'url(' + item.saleInfoDetail.bottomBgImg + ')', 'color': '#'+item.saleInfoDetail.bottomFontColor}">
                {{item.saleInfoDetail.bottomActText?item.saleInfoDetail.bottomActText:''}}
            </div>
            <div class="bottomsubtext"  v-if="item.saleInfoDetail && item.saleInfoDetail.hasBottomSubModule == 1">{{item.saleInfoDetail.bottomSubText?item.saleInfoDetail.bottomSubText:''}}</div>
            <div class="bottomtext" v-if="item.saleInfoDetail && item.saleInfoDetail.bottomAssistText">{{item.saleInfoDetail.bottomAssistText?item.saleInfoDetail.bottomAssistText:''}}</div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
            }
        },
        props: ['item'],
        components: {
        },
        methods: {},
        ready(){
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .saleinfo{
        position: absolute;
        bottom: 6px;
        left: 0;
        width: 100%;
        background: #E72714;
        border-radius:0px 24px 0px 0px;
        font-size: 20px;
        padding: 5px 0;
    }
    .rightmoule{
        position: absolute;
        top: 0;
        right: 20px;
        background: #E72714;
        color: #fff;
        padding: 2px 5px;
    }
    .bottommoulebg{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        text-align: center;
        line-height: 110px;
        position: absolute;
        left: 10px;
        bottom: 0;
        overflow: hidden;
    }
    .bottomsubtext{
        padding-left: 100px;
        line-height: 1.3;
        color: #fff;
    }
    .bottomtext{
        padding-left: 100px;
        line-height: 1.3;
        color: #fff;
    }

</style>