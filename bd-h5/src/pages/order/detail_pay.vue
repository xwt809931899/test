<template>
    <div v-if="order" class="detail scroll">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>订单详情</h1>
        </header>
        <div class="close_order" v-if="data.orderStatus !== 'DEPPAYOVER'">
            请在
            <span v-if="order && order.expireTime" v-countdown :act-end-time="order.expireTime" fmt="mm分ss秒"  class="red"></span>
            <span v-if="order && order.valiTime" v-countdown :time="order.valiTime" fmt="mm分ss秒"  class="red"></span>
            内完成支付，超时订单自动关闭
        </div>
        <div class="title-wrap display-flex" v-if="type == 'SC'">
            <div>卡券订单</div>
            <div class="status">待付款</div>
        </div>
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
        <div class="info line-pin-height">
            <div class="order-time">订单编号：{{type == 'SC' ? order.payNo: order.orderNo}}</div>
            <div class="order-time">下单时间：{{order.createTime}}</div>
            <!-- <div v-if="order.payTime" class="order-time">支付时间：{{order.payTime}}</div>
            <div v-if="order.payType" class="order-time">支付方式：{{order.payType|payTypeFilter}}</div> -->
        </div>
        <div class="get-way" v-if="type == 'SC'">
             配送方式 &nbsp;&nbsp;&nbsp; <span class="content">付款后自动发放至账户</span>
        </div>
        <div class="child-order"  v-if="type !== 'SC'">
            <!-- detailList -->
            <div>
                <ul class="pros">
                    <li v-for="pro in order.detailList" class="display-flex"
                        onclick="location.href='{{pro.itemCode | b2cProLink}}'">
                        <div class="pro-img">
                            <img v-src="pro.itemImgUrl">
                            <img v-if="order.orderType =='GROUP'" class="groupTag" src="img/icon-groupTag@2x.png">
                        </div>
                        <div>
                            <p class="line-clamp2">{{pro.itemTitle}}</p>
                            <div class="display-flex">
                                <div class="pro-price">{{pro.salePrice | currency '￥'}}</div>
                                <div class="price-num">X{{pro.buyCount}}</div>
                            </div>
                        </div>
                    </li>
                </ul>

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
            </div>
        </div>

        <presell-info :order="order"></presell-info>

        <div class="display-flex coupon-fee" v-if="type == 'SC'">
            <div>共{{order.buyNumber}}件商品</div>
            <div class="coupon-pay-wrap">合计：<span class="coupon-pay">{{order.payMoney | currency '￥'}}</span></div>
        </div>
        <div v-else class="fee">
            <div class="display-flex left-flex">
                <span>商品总额：</span><span>{{order.totalMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-if="order.orderType === 'PRESELL'">
                <span>膨胀金额：</span><span>-{{order.expandMoney | currency '￥'}}</span>
            </div>
            <div class="display-flex left-flex" v-if="order.orderType === 'PRESELL'">
                <span>预付定金：</span><span>+{{order.downpayment | currency '￥'}}</span>
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
            <div class="display-flex left-flex">
                <span>应付金额：</span><span>{{order.needPay | currency '￥'}}</span>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="display-flex un-pay-wrap">
            <div><span class="text">{{footerInfo.msg}}:</span><span class="total-price">{{type == 'SC' ? order.payMoney : order.needPay | currency '￥'}}</span></div>
            <div class="text-right display-flex">
                <div v-if="type=='SC'" @click="cancelCouponOrder()"
                     class="al-btn al-btn-primary-hollow al-btn-border-radius cancel">
                    取消订单
                </div>
                <div v-else  @click="cancelOrder(item)"
                     class="al-btn al-btn-primary-hollow al-btn-border-radius cancel">
                    取消订单
                </div>
                <a v-if="type=='SC'" @click.stop href="/checkout/common-pay.html?payNo={{order.payNo}}&needPay={{order.payMoney}}#!/index/SC"
                   class="al-btn al-btn-primary-hollow al-btn-border-radius" style="float:right;">立即支付
                </a>
                <a v-else @click.stop="pay"
                   v-click-report ptag="21019.4.1"
                   class="al-btn al-btn-primary-hollow al-btn-border-radius btn{{footerInfo.btnStatus}}" style="float:right;">{{footerInfo.btnText}}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import messBox from 'common/mess-box'
    import util from 'common/util'
    import { showFeePage }from 'common/checkout'
    import presellInfo from './components/presell-info.vue'
    const PRESELL_STATE = {
        DOWN_NOT_BEGIN: 0, //定金未开始
        DOWN_NOT_END: 1, // 定金开始未结束
        FINAL_NOT_BEGIN: 2, //尾款未开始
        FINAL_NOT_END: 3, //尾款开始未结束
        FINAL_END: 4 //尾款结束
    }
    export default{
        data(){
            return {
                id: undefined,
                order: {},
                type: undefined,
            }
        },
        components: {
            presellInfo
        },
        computed: {
            footerInfo() {
                var result = {
                    msg: '应付',
                    btnText: '立即支付'
                }
                if(this.order.orderStatus === 'WAITPAYDEP') {
                    result = {
                        msg: '定金',
                        btnText: '支付定金',
                        btnStatus: 1
                    }
                } else if(this.order.orderStatus === 'DEPPAYOVER' || (this.order.orderStatus === 'WAITPAY' && this.order.orderType === 'PRESELL')) {
                    result = {
                        msg: this.order.orderStatus === 'DEPPAYOVER' ? '尾款' : '应付',
                        btnText: '支付尾款',
                        btnStatus: 1
                    }
                    if(this.order.presellState === PRESELL_STATE.FINAL_NOT_BEGIN || this.order.presellState === PRESELL_STATE.DOWN_NOT_END) {
                        result = {
                            msg: '尾款',
                            btnText: '即将开始',
                            btnStatus: 0
                        }
                    }
                }
                return result
            }
        },
        methods: {
            cancelOrder(item){
                var title = '订单取消之后将无法恢复'
                if (this.order.orderType === 'PRESELL' && (this.order.orderStatus === 'DEPPAYOVER' || this.order.orderStatus === 'WAITPAY')) {
                    title = '取消订单后，您无法支付尾款，且定金将不退还！'
                }
                messBox.confirm(title, '确认取消订单？').then(()=> {
                    return http.get(gConfig.PROJECT_ORDER+'/api/order/orderClose', { orderNo: this.id })
                }).then(({ data:{ data, code } })=> {
                    if (code === 1000) {
                        messBox.tips('取消成功')
                        history.back()
//                        this.$router.go({ name: 'list', params: { cmd: 0 } })
                    }
                })
            },
            cancelCouponOrder(){
                messBox.confirm('订单取消之后将无法恢复', '确认取消订单？').then(()=>{
                   return http.get(gConfig.PROJECT_MARKETING + '/api/sellCoupon/cancelOrder',{
                       sellCouponOrderNo: this.order.sellCouponOrderNo
                   })
                }).then(({data:{data,code}})=>{
                    if(code === 1000){
                        messBox.tips('取消成功')
                        history.back()
                    }
                })
            },
            closeOrder(){
                return http.get(gConfig.PROJECT_ORDER+'/api/order/orderClose', { orderNo: this.id }).then(({ data:{ obj, errCode } })=> {
                    if (obj) {
                        location.reload();
                    }
                })
            },
            getOrder(){
                var This = this;
                http.get(gConfig.PROJECT_ORDER+'/api/order/orderDetail', { orderNo: this.id }).success(({ data })=> {
                    this.order = data
                })
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
            seeProDetail(id){
                location.href = `/sell-coupon.html#!/detail/${id}`
            },
            pay() {
                // 未生成尾款订单，跳确认订单页
                if(this.order.orderStatus === 'DEPPAYOVER') {
                    if(this.order.detailList instanceof Array && this.order.detailList.length === 1) {
                        var params = [{
                            buyNum: this.order.totalCount,
                            itemCode: this.order.detailList[0].itemCode,
                            presellId: this.order.presellId,
                            orderNo: this.order.orderNo,
                            pprd: util.getCurPprd(),
                        }]
                        //跳转到结算页面，带选中的商品参数
                        showFeePage(params);
                    }
                } else if(this.order.orderStatus === 'WAITPAY'){
                    // 跳转支付页
                    location.href = `/checkout/pay.html?orderNo=${this.order.orderNo}&orderType=${this.order.orderType}`
                }
            }
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

    .red {
        color: red;
    }

    .close_order {
        height: 80px;
        line-height: 100px;
        text-align: center;
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
    .line-clamp2 {
        min-height: 0.6rem;
    }

    .line-pin-height {
        line-height: 0.6rem;
    }

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

    .addr {
        padding: 30px;
        line-height: 40px;
        background: #fff;
        margin: 20px 0;
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
            line-height: 40px;
            margin-top: 30px;
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
        margin-top: 0.25rem;
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
            }
        }
        .idCard-wrap {
            width: 100%;
            line-height: 98px;
            border: 1px solid $BC7; /*no*/
        }
        .delivered-wrap {
            flex: 1;
            text-align: right;
            margin-top: 18px;
            margin-right: 20px;
        }
        .btn-right {
            line-height: 78px;
            padding-left: 20px;
            .al-btn {
                line-height: 1em;
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
            font-size: $TH4;
            color: $BC3;
            margin-bottom: 0;
        }
        .sales-promotion {
            .left {
                flex: 1;
            }
            .activity-name {
                color: $C3;
                border: 1px solid $C3;
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
            .btn0 {
                background-color: #999;
                color: #fff;
                pointer-events: none;
                border: #999;
            }
            .btn1 {
                background-color: #E72714;
                color: #fff;
                border-color: #E72714;
            }
        }
    }
</style>
