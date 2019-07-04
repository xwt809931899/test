<template>
    <div class="logistics">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>查看物流</h1>
        </header>
        <advert :type="3" v-if="!isChannel"></advert>
        <div v-if="order.company&&order.trackNo" class="info">
            <span>物流公司：{{order.company}}</span><br>
            <span>物流单号：{{order.trackNo}}</span><br>
        </div>

        <!--  <ul class="pros">
             <li v-for="pro in order.items" class="display-flex" onclick="location.href='{{pro.pid | b2cProLink}}'">
                 <div><img :src="pro.logourl"></div>
                 <div>
                     <p>{{pro.name}}</p>

                     <div class="price-num"><span>数量：{{pro.num}}</span><span>单价：￥{{pro.price | coverPrice}}</span>
                     </div>
                 </div>
             </li>
         </ul> -->
        <div class="display-flex logistics-title">
            <div>物流跟踪</div>
        </div>
        <ul class="logistics-list">
            <li v-for="item in order.dataList" class="display-flex">
                <div><i class="iconfont">&#xe605;</i></div>
                <div>
                    {{item.remark}}
                    <div class="date">{{item.trackTime}}</div>
                </div>
            </li>
        </ul>

    </div>
</template>
<script>
    import advert from 'components/advert.vue'
    import { isChannel } from 'common/mixins'

    export default{
        mixins: [isChannel],
        data(){
            return {
                id: undefined,
                order: {},
            }
        },
        components: {
            advert
        },
        ready(){
        },
        methods: {
            getOrder(){
                http.get(gConfig.PROJECT_ORDER+'/api/order/orderLogistics', { omsPackageCode: this.id }).success(({ code, data })=> {
                    if (code === 1000) {
                        this.order = data
                    }
                })
            },
        },
        route: {
            data({ to }){
                this.id = to.params.id
                this.getOrder()
            }
        }
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .info {
        background: #fff;
        border-bottom: 1px solid $C8;
        line-height: px2rem(50);
        padding: px2rem(28) px2rem(20);
        color: $C4;
        font-size: $H7;
        margin-top: px2rem(30);
    }

    .pros {
        background: #fff;
        margin: 0;
        color: $C7;
        border-bottom: 1px solid #e5e5e5; /*no*/
        p {
            color: $C4;
        }
        > li:nth-last-child(1) {
            border: 0;
        }

    }

    .logistics-title {
        padding: 20px 20px;
        margin: 0;
        background-color: #ffffff;
        font-size: $H4;
        > div {
            flex: 1;
        }
        .logistics-num {
            text-decoration: underline;
        }
    }

    .logistics-list {
        padding: 0 px2rem(20);
        margin: 0;
        > li {
            border-bottom: 1px solid $C8;
            padding: px2rem(30) 0;
            font-size: $H7;
            .date {
                color: $C7;
                margin-top: px2rem(20);
            }
            > *:nth-child(1) {
                margin-right: px2rem(30);
                font-size: px2rem(35);
                color: $C7;
            }
        }
    }
</style>
