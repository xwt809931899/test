<template>
    <div>
        <ul class="list">
            <li v-for="item in list" :key="item.itemCode">
                <a :href="item.itemCode | proItemUrl" v-pv ptag="{{pprd}}{{$index+1}}">
                    <div class="img-wrap">
                        <div class="img-ratio-wrap">
                            <img v-src="item.itemLogoUrl" />
                            <tag :tag-type="'proList'" :tag="item.iconUrl"></tag>
                            <div class="sale-badge-wrap" v-if="item.isPresell === 'Y'"><span class="sale-badge" >预售{{item.salesTitle ? '-'+item.salesTitle : ''}}</span></div>
                        </div>
                        <div class="finished" v-if="item.inventory === 0 || item.maxBuyCount === 0">
                            <div class="finished-text">售罄</div>
                        </div>
                        <saleinfo :item="item"></saleinfo>
                    </div>
                    <div class="name line-clamp2">{{item.itemTitle}}</div>
                    <div v-if="item.isPresell !== 'Y'" class="sale-badge-wrap2">
                        <span class="sale-badge sale-badge-radius" v-if="item.salesTitle">{{item.salesTitle}}</span>
                        <span class="sale-badge sale-badge-radius" v-if="item.couponTitle">{{item.couponTitle}}</span>
                    </div>
                    <div class="display-flex price-origin">
                        <div class="price">￥{{item.salePrice | toFixed}}</div>
                        <div class="origin">{{item.country}}</div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    import tag from 'components/tag.vue'
    import saleinfo from 'components/saleinfo.vue'
    export default{
        data(){
            return {
            }
        },
        props: ['list', 'pprd'],
        components: {
            tag,
            saleinfo,
        },
        methods: {},
        ready(){
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .list {
        list-style: none;
        margin: 0;
        padding: 0;
        position: relative;
        background-color: $BC7;
        width: 750px;
        display: flex;
        flex-flow: row wrap;
        li {
            display: inline-block;
            margin: 0;
            position: relative;
            background-color: #ffffff;
            width: 374px;
            a {
                text-decoration: none;
            }
            .img-wrap {
                width: 100%;
                padding: 40px 50px;
                position: relative;
                .finished {
                    position: absolute;
                    top: 107px;
                    left: 107px;
                    div.finished-text {
                        width: 160px;
                        height: 160px;
                        line-height: 160px;
                        background: rgba(0, 0, 0, .8);
                        color: #fff;
                        border-radius: 50%;
                        text-align: center;
                        font-size: 44px;
                    }
                }
            }
            &:nth-child(2n-1) {
                border-right: 2px solid $BC7; /*no*/
                border-top: 2px solid $BC7; /*no*/
            }
            &:nth-child(2n) {
                border-top: 2px solid $BC7; /*no*/
            }
            .pic {
                position: relative;
                padding-top: 40px;
                .mask {
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, .3);
                    width: 338px;
                    height: 338px;
                }
                .choosen {
                    position: absolute;
                    z-index: 3;
                    top: 137px;
                    left: 137px;
                    img {
                        width: 64px;
                        height: 64px;
                    }

                }
            }
            .name {
                margin: 0 40px 10px 40px;
                font-size: $TH8;
                color: $BC4;
            }
            .price-origin {
                margin-left: 30px;
                margin-bottom: 40px;
                .price {
                    font-size: $TH5;
                    color: $BC1;
                }
                .origin {
                    flex: 1;
                    font-size: $TH8;
                    color: $BC4;
                    margin-right: 40px;
                    text-align: right;
                }
            }
            .sale-badge-wrap{
                position: absolute;
                bottom: 0;
                left: 0;
            }   
            .sale-badge {
                background-color: #E72714;
                border-radius:2px;
                font-size: 22px;
                color: #fff;
                padding: 1px 10px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                display: inline-block;
            }
            .sale-badge-wrap2{
                margin-left: 30px;
                height: 40px;
            }
            .sale-badge-radius{
                border-radius: 16px;
                margin-right: 5px;
                background-color: #FFDEDB;
                color: #E72714;
            }
        }
    }

</style>