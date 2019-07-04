<template>
    <div v-if="order" class="detail scroll">
        <div class="display-flex addr" @click="chooseAddr" v-if="type!=='SC'">
            <div>
                <div class="display-flex">
                    <div class="name">{{order.receiver}}</div>
                    <div class="cellphone">{{order.receiverTel}}</div>
                </div>
                <div class="address-detail line-clamp2">
                    {{order.address}}
                </div>
            </div>
        </div>
        <div class="title-wrap display-flex" v-if="type == 'SC'">
            <div>卡券订单</div>
            <div class="status">{{order.orderStatus|couponOrderStatusFilter}}</div>
        </div>
        <div class="info">
            <div class="order-time">订单编号：{{type == 'SC' ? order.sellCouponOrderNo: order.orderNo}}</div>
            <div class="order-time">下单时间：{{order.createTime}}</div>
            <div v-if="order.payTime" class="order-time">支付时间：{{order.payTime}}</div>
            <div v-if="order.payType" class="order-time">支付方式：{{order.payType}}</div>
        </div>
        <div class="get-way" v-if="type == 'SC'">
            配送方式 &nbsp;&nbsp;&nbsp; <span class="content">付款后自动发放至账户</span>
        </div>
        <div class="child-order" v-if="type !== 'SC'">
            <!-- packageList -->
            <div v-if="order.orderStatus==='WAITDELIVER'||order.orderStatus==='FINISH'"
                 v-for="item in order.packageList" class="border_bottom">
                <ul class="pros">
                    <li @click="seeProDetail(pro.itemId)" v-for="pro in item.productList"
                        track-by="$index" class="display-flex">
                        <div class="pro-img">
                            <img v-src="pro.productImg">
                            <img v-if="order.orderType =='GROUP'" class="groupTag" src="img/icon-groupTag@2x.png">
                        </div>
                        <div>
                            <p class="line-clamp2">{{pro.productName}}</p>
                            <div class="display-flex">
                                <div class="pro-price">{{pro.productPrice | currency '￥'}}</div>
                                <div class="price-num">X{{pro.amount}}</div>
                                <div v-if="(item.packageStatusCode == 'DELIVERED' || item.packageStatusCode == 'RECEIVED' || item.packageStatusCode == 'WAIT_DELIVERED') && pro.canAfterSales == 'Y' && (order.orderType !== 'PRESELL' || (order.orderType === 'PRESELL' && order.prePeriod === 2))"
                                     @click.stop="goAfterServiceApply(pro,item.packageCode)"
                                     class="apply-service">申请售后 >
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="order-status inline_block">{{item.packageStatus}}&nbsp;</div>
                <div class="delivered-wrap inline_block fr" v-if="!isOld">
                    <a v-if="(item.packageStatusCode|isViewLogisticsShow orderStatus) && (order.orderType !== 'PRESELL' || (order.orderType === 'PRESELL' && order.prePeriod === 2))"
                       @click.stop v-link="{ name:'logistics',params:{id:item.packageCode} }"
                       class="al-btn al-btn-primary-hollow al-btn-border-radius">查看物流
                    </a>
                    <button v-if="item.packageStatusCode|isConfirmReceiptShow"
                            @click.stop="receivedOrder(item.packageCode)"
                            class="al-btn al-btn-primary-hollow al-btn-border-radius">确认收货
                    </button>
                    <!-- <a v-if="item.packageStatusCode==='FINISH'"
                       @click.stop="waitComment(order)"
                       class="al-btn al-btn-primary-hollow al-btn-border-radius">去评论
                    </a> -->
                </div>
            </div>
            <!-- detailList -->
            <div v-if="order.orderStatus!=='WAITDELIVER'&&order.orderStatus!=='FINISH'">
                <ul class="pros">
                    <li v-for="pro in order.detailList"
                        @click="seeProDetail(pro.itemCode)"
                        class="display-flex">
                        <div class="pro-img">
                            <img v-src="pro.itemImgUrl">
                            <img v-if="order.orderType =='GROUP'" class="groupTag" src="img/icon-groupTag@2x.png">
                        </div>
                        <div>
                            <p class="line-clamp2">{{pro.itemTitle}}</p>
                            <div class="display-flex">
                                <div class="pro-price">{{pro.salePrice | currency '￥'}}</div>
                                <div class="price-num">X{{pro.buyCount}}</div>
                                <div v-if="(item.packageStatusCode == 'DELIVERED' || item.packageStatusCode == 'RECEIVED' || item.packageStatusCode == 'WAIT_DELIVERED') && pro.canAfterSales == 'Y' && (order.orderType !== 'PRESELL' || (order.orderType === 'PRESELL' && order.prePeriod === 2))"
                                     @click.stop="goAfterServiceApply(pro,pro.packageCode)"
                                     class="apply-service">申请售后 >
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="order-status inline_block">{{order.orderStatus|orderStatusFilter}}&nbsp;</div>
                <div class="delivered-wrap inline_block fr" v-if="!isOld">
                    <!--<a v-if="order.orderStatus==='WAITPAY'"-->
                    <!--@click.stop href="/checkout/pay.html?payNo={{order.orderNo}}"-->
                    <!--class="al-btn al-btn-primary-hollow al-btn-border-radius">立即支付-->
                    <!--</a>-->
                    <template v-if="!isOld">
                        <a v-if="(order.orderStatus | isViewLogisticsShow orderStatus) && (order.orderType !== 'PRESELL' || (order.orderType === 'PRESELL' && order.prePeriod === 2))"
                           @click.stop v-link="{ name:'logistics',params:{id:order.orderNo} }"
                           class="al-btn al-btn-primary-hollow al-btn-border-radius">查看物流
                        </a>
                        <!-- <a v-if="order.orderStatus==='FINISH'"
                           @click.stop="waitComment(order)"
                           class="al-btn al-btn-primary-hollow al-btn-border-radius">去评论
                        </a> -->
                        <a v-if="order.orderStatus==='CLOSE'"
                           @click.stop="reBuy(order)"
                           class="al-btn al-btn-primary-hollow al-btn-border-radius">再次购买
                        </a>
                    </template>
                    <button v-if="order.orderStatus|isConfirmReceiptShow"
                            @click.stop="receivedOrder(order)"
                            class="al-btn al-btn-primary-hollow al-btn-border-radius">确认收货
                    </button>

                </div>
            </div>
        </div>
        <div  class="child-order" v-else>
            <div>
                <ul class="pros">
                    <li class="display-flex">
                        <div class="pro-img">
                            <img v-src="order.mainIcon">
                        </div>
                        <div>
                            <p class="line-clamp2">{{order.title}}</p>
                            <div class="display-flex">
                                <div class="pro-price">{{order.unitPrice | currency '￥'}}</div>
                                <div class="price-num">X{{order.buyNumber}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="delivered-wrap inline_block fr">
                    <!--<a v-if="order.orderStatus==='WAITPAY'"-->
                    <!--@click.stop href="/checkout/pay.html?payNo={{order.payNo}}"-->
                    <!--class="al-btn al-btn-primary-hollow al-btn-border-radius">立即支付-->
                    <!--</a>-->
                </div>
            </div>
        </div>
        <presell-info :order="order"></presell-info>
        <div class="display-flex coupon-fee" v-if="type == 'SC'">
            <div>共{{order.buyNumber}}件商品</div>
            <div class="coupon-pay-wrap">合计：<span class="coupon-pay">{{order.payMoney | currency '￥'}}</span></div>
        </div>
        <div class="fee" v-else>
            <div class="display-flex left-flex">
                <span>商品总额：</span><span>{{order.totalMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex">
                <span>商品件数：</span><span>{{order.totalCount}}</span>
            </div>
            <div class="display-flex left-flex">
                <span>发货运费：</span><span>{{order.freight | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex">
                <span>发货邮税：</span><span>{{order.tallage | currency '￥'}}</span>
            </div>
            <!-- 优惠信息列表 -->
            <div v-if="order.preferentialList.length" v-for="item in order.preferentialList"
                 class="display-flex sales-promotion">
                <div class="left">
                    <span :class="{hidden:$index > 0}">促销活动：</span>
                    <span v-if="item.title" class="activity-name">{{item.activityName}}</span>
                </div>
                <div><span>-{{item.freeMoney| currency '￥'}}</span></div>
            </div>
            <div class="display-flex left-flex" v-if="order.couponMoney > 0">
                <span>优惠券抵扣：</span><span>-{{order.couponMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-if="order.superCouponDiscountFee > 0">
                <span>红包抵扣：</span><span>-{{order.superCouponDiscountFee | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-if="order.prepaidCardMoney > 0">
                <span>预付卡抵扣：</span><span>-{{order.prepaidCardMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-if="order.preCardBenefit > 0">
                <span>预付卡优惠：</span><span>-{{order.preCardBenefit | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-if="order.membersMoney > 0">
                <span>会员卡抵扣：</span><span>-{{order.membersMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex"  v-if="order.orderStatus==='WAITDELIVER'||order.orderStatus==='FINISH'">
                <span>实付金额：</span>
                <span>{{order.payMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-else>
                <span>应付金额：</span>
                <span>{{order.needPay | currency '￥'}}</span>
            </div>
            <div v-if="order.returnPoints > 0" class="display-flex left-flex">
                <span> 获得积分：</span>
                <span>{{order.returnPoints}}</span>
            </div>
            <div v-if="order.preCardBenefit > 0" class="display-flex left-flex">
                <span> 预付卡返现：</span>
                <span>{{order.preCardBenefit}}</span>
            </div>

        </div>

    </div>
</template>
<script type="text/babel">
    import messBox from 'common/mess-box'
    import util from 'common/util'
    import cookie from 'common/cookie'
    import presellInfo from './components/presell-info.vue'

    export default{
        data(){
            return {
                id: undefined,
                order: {},
                curTime: +new Date,
                isOld: false,
                type: undefined,
            }
        },
        components: {
            presellInfo
        },
        methods: {
            seeProDetail(itemCode){
                if (!this.isOld) {
                    location.href = `/item.html#id-${itemCode}`
                }
            },
            receivedOrder(item){
                messBox.confirm('确认已经收到货了吗？').then(()=> {
                    if (this.isOld) {
                        return http.get(gConfig.PROJECT_ORDER+'/api/order/closeOldOrder ', { orderNo: item })
                    }
                    return http.get(gConfig.PROJECT_ORDER+'/api/order/orderSure', { omsPackageCode: item })
                }).then(({ data:{ data, code } })=> {
                    if (code === 1000) {
                        messBox.tips('确认成功')
                        this.getOrder()
                    }
                })
            },
            getOldOrder(){
                this.isOld = true
                http.get(gConfig.PROJECT_ORDER+'/api/order/getOldOrderDetail', { orderNo: this.id }).success(({ data })=> {
                    this.order = data
                })
            },
            getOrder(){
                if (/^\d+$/.test(this.id)) {
                    this.getOldOrder()
                } else {
                    http.get(gConfig.PROJECT_ORDER+'/api/order/orderDetail', { orderNo: this.id }).success(({ data })=> {
                        this.order = data
                    })
                }
            },
            getCouponOrder(){
                http.get(gConfig.PROJECT_MARKETING + '/api/sellCoupon/querySellOrderDetail',{
                    sellCouponOrderNo : this.id
                }).success(({code,data})=>{
                    if(code === 1000){
                        this.order = data
                    }
                })
            },

            reBuy(){ //点击再次购买，传递该订单的所有商品的pid重新添加购物车，数量为1，
                if(this.order.orderType === 'PRESELL' && this.order.detailList instanceof Array && this.order.detailList.length === 1) {
                    var itemCode= this.order.detailList[0].itemCode
                    location.href = `/item.html#id-${itemCode}`
                    return
                }
                var pids = [];
                this.order.detailList.forEach((item)=> {
                    pids.push(item.itemCode);
                });
                this.$http.get(gConfig.PROJECT_PRODUCT+'/api/cart/addCart', {
                    itemCode: pids.join(','),
                    num: 1,
                    pprd: util.getCurPprd(),
                }).success(({ code })=> {
                    if (code === 1000) {
//                        location.href = "/cart-pay.html#!/cart";
                        messBox.tips('再次购买成功');
                    }
                });
            },
            goAfterServiceApply(product, packageCode){
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/appdetail`, {
                    orderNo: this.id,
                    itemCode: product.itemId || product.itemCode,
                    omsPackageCode: packageCode,
                }).success(({ data }) => {
                    // 状态码 0：详情 1:签收且超过7天 2:没发货 3:新增
                    switch (data.statusCode) {
                        case '0':
                            this.$router.go({
                                name: 'after-service-detail',
                                params: {
                                    afterSalesNo: data.afterSalesNo,
                                }
                            })
                            break
                        case '1':
                            messBox.confirm(`您已错过申请售后的时间段（签收后7天内）如需帮助，可拨打客服电话:<a  href="tel:${data.serverPhone}">${data.serverPhone}</a>`,'操作确认',{
                                confirm: '知道了',
                                isCancel: false
                            })
                            break
                        case '2':
                            messBox.tips('商品签收后才能申请售后')
                            break
                        case '3':
                            this.$router.go({
                                name: 'after-service-apply', query: {
                                    orderNo: this.id,
                                    itemCode: product.itemId,
                                    omsPackageCode: packageCode,
                                }
                            })
                            break
                    }
                })
            },
        },
        ready(){
        },
        route: {
            data({ to }){
                this.id = to.params.id
                this.type = util.getParamter('type')
                if(this.type == 'SC') {
                    this.getCouponOrder() //卡券订单详情
                } else if(this.id){
                    this.getOrder() // 订单详情
                }

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .inline_block {
        display: inline-block;
    }

    .border_bottom {
        border-bottom: solid 1px #ddd;
    }

    .over-time-tips {
        line-height: 98px;
        text-align: center;
        font-size: $TH8;
        color: $BC4;
    }
    .title-wrap{
        line-height: 88px;
        background-color: #ffffff;
        margin-bottom: 20px;
        padding: 0 30px;
        font-size: $TH6;
        color: $BC5;
        >div{
            flex:1;
        }
        .status{
            text-align: right;
            color: $BC10;
        }
    }
    .addr {
        padding: 40px 0 10px 30px;
        line-height: 40px;
        background: #fff;
        margin-bottom: 20px;
        > *:first-child {
            flex: 1;
        }
        .name {
            font-size: $TH6;
            color: $BC4;
            margin-right: 30px;
        }
        .address-detail {
            font-size: $TH6;
            color: $BC3;
            height: 1.8em;
            margin-top: 30px;
            max-height: 2.8em;
        }
        .address-icon {
            margin-left: 40px;
        }
    }

    .al-btn-primary-hollow {
        height: 58px;
        line-height: 58px;
        padding: 0 30px;
        border-radius: 2px;
    }

    .padding10 {
        padding: 20px;
    }

    .right-button {
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }

    .re-buy {
        padding: 20px 0 20px 20px;
        border: 1px solid $BC7; /*no*/
        > div {
            flex: 1;
        }
    }

    .detail {
        padding-bottom: 130px;
    }

    .info {
        padding: 30px 0 0 30px;
        color: $BC3;
        font-size: $TH8;
        background-color: #ffffff;
        > div {
            padding-bottom: 30px;
        }
        .order-num {
            margin-bottom: 30px;
        }
    }
    .get-way{
        padding: 30px;
        margin-top: 20px;
        background-color: #ffffff;
        font-size: $TH6;
        color: $BC5;
        .content{
            color: $BC3;
        }
    }
    .child-order {
        background: #fff;
        margin-top: 20px;
        color: $C7;
        .order-status {
            padding-left: 30px;
            line-height: 98px;
            color: $BC3;
            font-size: $TH6;
        }
        .pros {
            margin: 0;
            li {
                border-top: 1px solid $BC7; /*no*/
                .pro-img {
                    position: relative;
                    .groupTag {
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        left: 0;
                        top: 0;
                        border: none;
                    }
                }
                p {
                    color: $C4;
                }
                .apply-service {
                    flex: 1;
                    text-align: right;
                    color: $BC5;
                    font-size: $TH6;
                }
            }
        }
        .idCard-wrap {
            width: 100%;
            line-height: 98px;
            border: 1px solid $BC7; /*no*/
        }
        .delivered-wrap {
            text-align: right;
            margin-top: 18px;
            margin-right: 20px;
            padding-bottom: 10px;
        }
        .btn-right {
            line-height: 78px;
            padding-left: 20px;
            .al-btn {
                line-height: 1em;
            }
        }
    }
    .coupon-fee{
        line-height: 88px;
        background-color: #ffffff;
        margin-bottom: 20px;
        padding: 0 30px;
        font-size: $TH8;
        color: $BC3;
        border-top: 1px solid $BC7; /*no*/
        >div{
            flex:1;
        }
        .coupon-pay-wrap{
            text-align: right;
            .coupon-pay{
                color: $BC10;
            }
        }
    }
    .fee {
        margin-top: 20px;
        padding: 30px;
        background: #fff;
        border-bottom: 1px solid $C8; /*no*/
        font-size: $TH8;
        color: $BC4;
        > div {
            margin-bottom: 20px;
        }
        > :nth-last-child(1) {
           /* font-size: $TH4;*/
            color: $BC3;
            margin-bottom: 0;
        }
        .sales-promotion {
            .hidden {
                visibility: hidden;
            }
            .left {
                flex: 1;
            }
            .activity-name {
                color: $C3;
                border: 1px solid $C3;
            }
        }
    }

    .confirm-card {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 10px;
        text-align: center;
        background: #fff;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: #ffffff;
        line-height: 98px;
        .un-pay-wrap {
            padding: 0 30px;
            > div {
                flex: 1;
            }
            .text-right {
                text-align: right;
            }
            .text {
                font-size: $TH8;
                color: $BC4;
            }
            .total-price {
                font-size: $TH4;
                color: $BC1;
            }
            .cancel {
                margin-right: 20px;
                border: 1px solid $BC4; /*no*/
                color: $BC4;
            }
        }
    }
</style>
