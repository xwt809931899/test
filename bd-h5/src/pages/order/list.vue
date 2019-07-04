<template>

    <div class="list">
        <header class="top-nav">
            <a class="back" @click="back" href="javascript:;"><i class="iconfont">&#xe603;</i></a>
            <h1>我的订单</h1>
        </header>
        <div class="staTitle">
            <ul class="display-flex status">
                <li :class="{'active' : scope}" @click="changeTab">
                    <a>百大易购</a>
                </li>
                <li :class="{'active' : !scope}" @click="changeTab">
                    <a>卡券</a>
                </li>
                <li  @click="goAfu()">
                    <a>阿福到家</a>
                </li>
            </ul>
        </div>
        <advert :type="1" v-if="!isChannel"></advert>
        <order-pager :on-data="getData" :on-old-data="getOldData" :start-num.sync="startNum" :model.sync="list">
            <ul v-if="scope" class="order-list">
                <!-- 查询所有订单 -->
                <li v-for="item in list" v-if="cmd===0" class="wait">
                    <!-- 解析detailList -->
                    <div @click="detail(item)"
                         v-if="item.orderStatus==='WAITPAY' || item.orderStatus==='CLOSE' || item.orderStatus === 'WAITPAYDEP' || item.orderStatus === 'DEPPAYOVER' || (item.isOld && (item.orderStatus==='WAIT_DELIVERED' || item.orderStatus==='FINISH'))">
                        <div class="createtime btn-right display-flex">
                            <span>{{item.createTime}}</span>
                            <span class="order-status">{{item.orderStatus|orderStatusFilter}}</span>
                        </div>
                        <div v-if="item.detailList.length>1" class="pinfos pros">
                            <img v-for="pinfo in item.detailList" v-src="pinfo.itemImgUrl">
                            <img v-if="item.orderType == 'GROUP'" class="groupTag"
                                 src="img/icon-groupTag@2x.png">
                        </div>
                        <div v-else>
                            <ul class="pros">
                                <li v-for="pro in item.detailList" class="display-flex">
                                    <div class="pro-img">
                                        <img v-src="pro.itemImgUrl">
                                        <img v-if="item.orderType == 'GROUP'" class="groupTag"
                                             src="img/icon-groupTag@2x.png">
                                    </div>
                                    <div>
                                        <p class="line-clamp2 name">{{pro.itemTitle}}</p>
                                        <div class="display-flex">
                                            <div class="pro-price">{{pro.salePrice | currency '￥'}}</div>
                                            <div class="price-num">X{{pro.buyCount}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="real btn-right">
                            <div class="display-flex price-num-wrap">
                                <div>共 {{item.totalCount}} 件商品</div>
                                <span v-if="item.orderStatus==='WAITPAY' || item.orderStatus === 'CLOSE'" class="price">应付: {{item.needPay | currency '￥'}}</span>
                                <span v-if="item.orderStatus==='WAITDELIVER'||item.orderStatus==='FINISH' || item.orderStatus === 'WAIT_DELIVERED'"
                                      class="price">实付: {{item.payMoney | currency '￥'}}</span>
                            </div>
                        </div>
                        <!-- 操作 -->
                        <div class="display-flex">
                            <div class="right-button">
                                <a v-if="item.orderStatus==='WAITPAY' && item.orderType !== 'PRESELL'"
                                   @click.stop
                                   href="/checkout/pay.html?orderNo={{item.orderNo}}&orderType={{item.orderType}}"
                                   class="al-btn al-btn-primary-hollow al-btn-border-radius"
                                   v-click-report ptag="21019.3.1"
                                >立即支付
                                </a>

                                <presell-handler :item="item"></presell-handler>

                            </div>
                        </div>
                    </div>
                    <!-- 解析packageList -->
                    <div @click="detail(item,packItem.packageCode)" v-for="packItem in item.packageList"
                         track-by="$index" v-if="item.orderStatus==='WAITDELIVER'||item.orderStatus==='FINISH'">
                        <div v-if="$index!=0" class="havebacline"></div>
                        <div class="createtime btn-right display-flex">
                            <span>{{item.createTime}}</span>
                            <span class="order-status">{{packItem.packageStatus}}</span>
                        </div>
                        <div v-if="packItem.productList.length>1" class="pinfos pros">
                            <img v-for="pinfo in packItem.productList" v-src="pinfo.productImg">
                            <img v-if="item.orderType == 'GROUP'" class="groupTag"
                                 src="img/icon-groupTag@2x.png">
                        </div>
                        <div v-else>
                            <ul class="pros">
                                <li v-for="pro in packItem.productList" track-by="$index" class="display-flex">
                                    <div class="pro-img">
                                        <img v-src="pro.productImg">
                                        <img v-if="item.orderType =='GROUP'" class="groupTag"
                                             src="img/icon-groupTag@2x.png">
                                    </div>
                                    <div>
                                        <p class="line-clamp2 name">{{pro.productName}}</p>
                                        <div class="display-flex">
                                            <div class="pro-price">{{pro.productPrice | currency '￥'}}</div>
                                            <div class="price-num">X{{pro.amount}}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="real btn-right">
                            <div class="display-flex price-num-wrap">
                                <div>共 {{packItem.totalCount}} 件商品</div>
                                <span v-if="item.orderStatus==='WAITDELIVER'||item.orderStatus==='FINISH' || item.orderStatus === 'WAIT_DELIVERED'"
                                      class="price">实付: {{packItem.totalFee | currency '￥'}}</span>
                            </div>
                        </div>
                        <!-- 操作 -->
                        <div class="display-flex">
                            <div class="right-button">
                                <template v-if="!item.isOld">
                                    <a v-if="(packItem.packageStatusCode | isViewLogisticsShow orderStatus) && (item.orderType !== 'PRESELL' || (item.orderType === 'PRESELL' && item.prePeriod === 2))"
                                       @click.stop v-link="{ name:'logistics',params:{id:packItem.packageCode} }"
                                       class="al-btn al-btn-primary-hollow al-btn-border-radius">查看物流
                                    </a>
                                </template>
                                <button v-if="packItem.packageStatusCode=='DELIVERED'"
                                        @click.stop="receivedOrder(packItem.packageCode)"
                                        class="al-btn al-btn-primary-hollow al-btn-border-radius">确认收货
                                </button>
                                <!--<a v-if="packItem.packageStatusCode==='RECEIVED'"-->
                                <!--@click.stop="waitComment(item)"-->
                                <!--class="al-btn al-btn-primary-hollow al-btn-border-radius">去评论-->
                                <!--</a>-->
                            </div>
                        </div>
                    </div>
                </li>

                <!-- 待付款|待收货|已完成|待评价 -->
                <li v-for="item in list" @click="detail(item)" v-if="cmd!==0" class="wait">
                    <div class="createtime btn-right display-flex">
                        <span>{{item.createTime}}</span>
                        <span class="order-status">{{item.orderStatus|orderStatusFilter}}</span>
                    </div>
                    <div v-if="item.detailList.length>1" class="pinfos pros">
                        <img v-for="pinfo in item.detailList" v-src="pinfo.itemImgUrl">
                        <img v-if="item.orderType == 'GROUP'" class="groupTag"
                             src="img/icon-groupTag@2x.png">
                    </div>
                    <div v-else>
                        <ul class="pros">
                            <li v-for="pro in item.detailList" class="display-flex">
                                <div class="pro-img">
                                    <img v-src="pro.itemImgUrl">
                                    <img v-if="item.orderType =='GROUP'" class="groupTag"
                                         src="img/icon-groupTag@2x.png">
                                </div>
                                <div>
                                    <p class="line-clamp2 name">{{pro.itemTitle}}</p>
                                    <div class="display-flex">
                                        <div class="pro-price">{{pro.salePrice | currency '￥'}}</div>
                                        <div class="price-num">X{{pro.buyCount}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="real btn-right">
                        <div class="display-flex price-num-wrap">
                            <div>共 {{item.totalCount}} 件商品</div>
                            <span v-if="item.orderStatus==='WAITPAY'"
                                  class="price">应付: {{item.needPay | currency '￥'}}</span>
                            <span v-if="item.orderStatus==='WAITDELIVER'||item.orderStatus==='FINISH'||item.orderStatus==='RECEIVED' || item.orderStatus === 'WAIT_DELIVERED' || item.orderStatus ==='DELIVERED'"
                                  class="price">实付: {{item.payMoney | currency '￥'}}</span>
                        </div>
                    </div>
                    <!-- 操作 -->
                    <div class="display-flex">
                        <div class="right-button">
                            <a v-if="item.orderStatus==='WAITPAY' && item.orderType !== 'PRESELL'"
                               @click.stop
                               href="/checkout/pay.html?orderNo={{item.orderNo}}&orderType={{item.orderType}}"
                               v-click-report ptag="21019.3.1"
                               class="al-btn al-btn-primary-hollow al-btn-border-radius">立即支付
                            </a>
                            <template v-if="!item.isOld">
                                <a v-if="(item.orderStatus|isViewLogisticsShow orderStatus) && (item.orderType !== 'PRESELL' || (item.orderType === 'PRESELL' && item.prePeriod === 2))"
                                   @click.stop v-link="{ name:'logistics',params:{id:item.omsPackageCode} }"
                                   class="al-btn al-btn-primary-hollow al-btn-border-radius">查看物流
                                </a>
                                <button v-if="item.orderStatus|isConfirmReceiptShow"
                                        @click.stop="receivedOrder(item.omsPackageCode)"
                                        class="al-btn al-btn-primary-hollow al-btn-border-radius">确认收货
                                </button>
                            </template>
                            <template v-else>
                                <button v-if="item.orderStatus === 'DELIVERED'"
                                        @click.stop="receivedOrder(item.orderNo,true)"
                                        class="al-btn al-btn-primary-hollow al-btn-border-radius">确认收货
                                </button>
                            </template>

                            <presell-handler :item="item"></presell-handler>

                            <!--<a v-if="item.orderStatus==='FINISH'||item.orderStatus==='RECEIVED'"-->
                            <!--@click.stop="waitComment(item)"-->
                            <!--class="al-btn al-btn-primary-hollow al-btn-border-radius">去评论-->
                            <!--</a>-->
                            <!--<a v-if="item.orderStatus==='CLOSE'"-->
                            <!--@click.stop="waitComment(item)"-->
                            <!--class="al-btn al-btn-primary-hollow al-btn-border-radius">重新购买-->
                            <!--</a>-->

                            <!-- <a v-if="item.orderStatus==='FINISH'"
                                @click.stop="waitComment(item)"
                               class="al-btn al-btn-primary-hollow al-btn-border-radius">追加评论
                            </a> -->
                            <!-- <a  v-if="item.orderStatus!=='FINISH'"
                                @click.stop="waitComment(item)"
                               class="al-btn al-btn-primary-hollow al-btn-border-radius">特邀评论
                            </a> -->
                        </div>
                    </div>
                </li>
            </ul>
            <ul v-else class="order-list">
                <li v-for="item in list" class="wait">
                    <div @click="cardDetail(item)">
                        <div class="createtime btn-right display-flex">
                            <span>{{item.createTime}}</span>
                            <span class="order-status">{{item.orderStatus|couponOrderStatusFilter}}</span>
                        </div>
                        <ul class="pros">
                            <li class="display-flex">
                                <div class="pro-img">
                                    <img v-src="item.mainIcon">
                                </div>
                                <div>
                                    <p class="line-clamp2 name">{{item.title}}</p>
                                    <div class="display-flex">
                                        <div class="pro-price">{{item.unitPrice | currency '￥'}}</div>
                                        <div class="price-num">X{{item.buyNumber}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div class="real btn-right">
                            <div class="display-flex price-num-wrap">
                                <div>共 {{item.buyNumber}} 件商品</div>
                                <span v-if="item.orderStatus==='WAITPAY' || item.orderStatus === 'CLOSE'" class="price">应付: {{item.payMoney | currency '￥'}}</span>
                                <span v-if="item.orderStatus === 'WAITDELIVER' || item.orderStatus === 'FINISH' || item.orderStatus === 'WAIT_DELIVERED'" class="price">实付: {{item.payMoney | currency '￥'}}</span>

                            </div>
                        </div>
                        <!-- 操作 -->
                        <div class="display-flex">
                            <div class="right-button">
                                <a v-if="item.orderStatus==='WAITPAY'"
                                   @click.stop href="/checkout/common-pay.html?payNo={{item.payNo}}&needPay={{item.payMoney}}#!/index/SC"
                                   class="al-btn al-btn-primary-hollow al-btn-border-radius">立即支付
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="not-have-data" v-if="list.length<1">
                没有相关数据
            </div>
        </order-pager>
    </div>
</template>
<script>
    import messBox from 'common/mess-box'
    import util from 'common/util'
    import wxTool from 'common/wx.tool.js'
    import orderPager from './components/order-pager.vue'
    import appSDK from 'common/app-SDK'
    import advert from 'components/advert.vue'
    import { isChannel } from 'common/mixins'
    import PresellHandler from './components/presell-handler.vue'

    var enumCmd = {
        全部订单: 0,
        待支付: 1,
        已发货: 2,
        待发货: 3,
        已完成: 4,
        待评价: 5,
    };
    _.forEach(enumCmd, (value, key) => {
        enumCmd[value] = key
    })
    export default{
        mixins: [isChannel],
        data(){
            return {
                cmd: 0,
                orderStatus: '',  //订单状态
                list: [],
                startNum: 0,
                curTime: +new Date,
                enumCmd: enumCmd,
                sorderId: null,
                scope: 1, //1 百大易购，0卡券
            }
        },
        components: {
            orderPager,
            advert,
            PresellHandler
        },
        methods: {
            back() {
                if (!appSDK.isApp){
                    window.history.go(-1)
                }else{
                    const appJson = {
                        type: 909,
                    }
                    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
                }
            },
            goAfu() {
                let cmd = this.$route.params.cmd
                if(cmd==1) {
                    window.location.href = '/afu/#/order/myOrders?type=100'
                } else if(cmd==2) {
                    window.location.href = '/afu/#/order/myOrders?type=110'
                } else if(cmd==4) {
                    window.location.href = '/afu/#/order/myOrders?type=150'
                } else {
                    window.location.href = '/afu/#/order/myOrders'
                }
            },
            getData({ startNum }){
                if (this.scope) { // 易购列表
                    //订单状态 WAITPAY=待付款 WAITDELIVER=已付款/待发货 FINISH=已完成 ALL=我的全部订单
                    switch (this.cmd) {
                        case 0:  //全部订单
                            this.orderStatus = 'ALL'
                            break;
                        case 1: //待支付
                            this.orderStatus = 'WAITPAY'
                            break;
                        case 2:
                        case 3: //待收货  待处理
                            this.orderStatus = 'WAITDELIVER'
                            break;
                        case 4: //已完成
                            this.orderStatus = 'FINISH'
                            break;
                        case 5: //待评价
                            this.orderStatus = ''
                            break;
                    }
                    if (this.cmd == 5) {
                        // 请求待评价订单信息
                        return http.get('/api/comment/commentCenter.jsp', {
                            startNum,
                            sorderid: this.sorderId
                        })
                    } else {
                        // 请求订单信息
                        return http.get(gConfig.PROJECT_ORDER + "/api/order/orderList", {
                            startNum,
                            orderStatus: this.orderStatus
                        })
                        // this.$broadcast("loadPage");
                    }
                } else {
                    switch (this.cmd) {
                        case 0:  //全部 卡券
                            this.orderStatus = 'ALL'
                            break;
                        case 1: //待付款卡券
                            this.orderStatus = 'WAITPAY'
                            break;
                        case 2:
                        case 3: //已付款卡券
                            this.orderStatus = 'WAITDELIVER'
                            break;
                        case 4: //已发放卡券
                            this.orderStatus = 'FINISH'
                            break;
                    }
                    return http.get(gConfig.PROJECT_MARKETING + "/api/sellCoupon/querysellOrderList", {
                        startNum,
                        orderStatus: this.orderStatus,
                        businessType: 'SC'
                    })
                }
            },
            getOldData({ startNum }){
                //订单状态 WAITPAY=待付款 WAITDELIVER=已付款/待发货 FINISH=已完成 ALL=我的全部订单
                if (!this.scope) { // 卡券接口没有老接口
                    return
                }
                switch (this.cmd) {
                    case 0:  //全部订单
                        this.orderStatus = 'ALL'
                        break;
                    case 1: //待支付
                        this.orderStatus = 'WAITPAY'
                        break;
                    case 2:
                    case 3: //待收货  待处理
                        this.orderStatus = 'WAITDELIVER'
                        break;
                    case 4: //已完成
                        this.orderStatus = 'FINISH'
                        break;
                    case 5: //待评价
                        this.orderStatus = ''
                        break;
                }
                if (this.cmd === 1) { // 待处理页面不需要调用老接口
                    return;
                }
                if (this.cmd == 5) {
                    // 请求待评价订单信息
                    return http.get('/api/comment/commentCenter.jsp', {
                        startNum: 9999999,  // 没有待评价订单
                        sorderid: this.sorderId
                    })
                } else {
                    // 请求订单信息
                    return http.get(`${gConfig.PROJECT_ORDER}/api/order/getOldOrderList`, {
                        startNum,
                        orderStatus: this.orderStatus
                    }).success(({ data }) => {
                        if(data.list) { //兼容 data:{} 情况
                            data.list.forEach(item => {
                                item.isOld = data.isOld
                            })
                        }
                    })
                }
            },
            cancelOrder(item){
                messBox.confirm('订单取消之后将无法恢复', '确认取消订单？').then(() => {
                    return http.get(gConfig.PROJECT_ORDER + '/api/order/orderCancle', { orderNo: item.orderid })
                }).then(({ data }) => {
                    if (data.code === 1000) {
                        this.list.$remove(item)
                        messBox.tips('取消成功')
                    }
                })
            },
            receivedOrder(item, isOld){
                messBox.confirm('确认已经收到货了吗？').then(() => {
                    if (isOld) {
                        return http.get(gConfig.PROJECT_ORDER + '/api/order/closeOldOrder ', { orderNo: item })
                    }
                    return http.get(gConfig.PROJECT_ORDER + '/api/order/orderSure', { omsPackageCode: item })
                }).then(({ data:{ data, code } }) => {
                    if (code === 1000) {
                        messBox.tips('确认成功')
                        this.$broadcast("loadPage");
                    }
                })
            },
            detail(item, pckCode){
                if (item.orderStatus == 'WAITPAY' || item.orderStatus == 'WAITPAYDEP' || item.orderStatus == 'DEPPAYOVER') {
                    this.$router.go({
                        name: 'detail_pay',
                        params: { id: item.orderNo },
                        query: { pckCode }
                    })
                } else {
                    this.$router.go({
                        name: 'detail',
                        params: { id: item.orderNo },
                        query: { pckCode }
                    })
                }
            },
            cardDetail(item){
                if (item.orderStatus == 'WAITPAY') {
                    this.$router.go({
                        name: 'detail_pay',
                        params: { id: item.sellCouponOrderNo },
                        query: { type: 'SC' }
                    })
                } else {
                    this.$router.go({
                        name: 'detail',
                        params: { id: item.sellCouponOrderNo },
                        query: { type: 'SC' }
                    })
                }
            },
            waitComment(item){
                //订单信息存sessionStorage
                window.sessionStorage.setItem('order', JSON.stringify(item));
                if (this.cmd === enumCmd.待评价) {//带评论是显示所有的单个的待评论列表，所以点击按钮直接跳到提交评论页面
                    location.href = "write-comment.html";
                } else if (this.cmd === enumCmd.已完成) {
                    if (item.pinfos.length > 1) {//父订单有多个子订单，跳到对应的子订单的待评论列表
                        location.href = `order.html?sorderid=${item.orderid}#!/list/5/1`;
                    } else if (item.pinfos.length === 1) {//父订单只有一个子订单，直接跳到提交评论页面
                        location.href = "write-comment.html";
                    }
                }
            },
            changeTab(){
                this.scope = !this.scope
                this.$broadcast("loadPage");
            }
        },
        ready(){
            setInterval(o => {
                this.curTime = +new Date
            }, 1000)
        },
        route: {
            data ({ to }) {
                this.cmd = parseInt(to.params.cmd);
                if (util.getParamter('scope') && !this._isReady) { //通过URL的scope参数可以直接跳到卡券列表
                    this.scope = parseInt(util.getParamter('scope'))
                }
                switch (this.cmd) {
                    case 0:
                        wxTool.setTitle('全部订单')
                        break;
                    case 1:
                        wxTool.setTitle('待处理')
                        break;
                    case 2:
                        wxTool.setTitle('待收货')
                        break;
                    case 3:
                        wxTool.setTitle('待收货')
                        break;
                    case 4:
                        wxTool.setTitle('已完成')
                        break;
                }
                if (this.cmd === 5) {
                    this.sorderId = util.getParamter("sorderid");
                }
                setTimeout(() => {
                    this.$broadcast("loadPage");
                });
            }
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";
    .top-nav{
        border-bottom: 1px solid $BC6; /*no*/
        position:fixed;
        left:0;
        top:0;
        display:block!important;
        width:100%;
        z-index: 1;
        h1{
            font-weight:normal;
            font-size:31px;
        }
     }
    .staTitle {
        margin-top:89px;
        height: 88px;
        border-bottom: 1px solid $BC6; /*no*/
        background-color: #ffffff;
        ul {
            padding: 0;
            margin: 0;
            &.status {
                text-align: center;
                font-size: $TH6;
                color: $BC5;
                li {
                    flex: 1;
                    height: 88px;
                    line-height: 88px;
                }
                .active {
                    a {
                        display: inline-block;
                        height: 85px;
                        border-bottom: 4px $BC1 solid; /*no*/
                        color: $BC1;
                    }

                }
            }
        }
    }

    .al-btn-primary-hollow {
        height: 58px;
        line-height: 58px;
        padding: 0 30px;
        border-radius: 2px;
    }

    .idCard-wrap {
        height: 98px;
        padding: 10px 0 10px 20px;
        color: #999999;
    }

    .tips {
        font-size: 12px;
    }

    .right-button {
        flex: 1;
        text-align: right;
        padding-right: 20px;
        font-size: $TH8;
        color: $BC3;
        line-height: 98px;
    }

    .price {
        color: $BC1;
        font-size: $TH8;
    }

    .order-list {
        padding: 0;
        margin: 0;
        > li {
            list-style: none;
            background: #fff;;
            margin-bottom: 20px;
        }
        > li.wait {

            .createtime {
                color: $BC3;
                line-height: 98px;
                border-bottom: 1px solid $BC7; /*no*/
                padding: 0 30px;
                .order-status {
                    color: $BC3;
                    font-size: $TH6;
                    font-weight: bolder;
                }
            }
            .pinfos {
                position: relative;
                border-bottom: 1px solid $C8; /*no*/
                padding: 20px;
                overflow: auto;
                white-space: nowrap;
                img {
                    width: 160px;
                    height: 160px;
                    margin-right: 20px;
                    border: 1px solid $BC7; /*no*/
                }
            }

            .real {
                padding: 0 30px;
                line-height: 88px;
                font-size: $TH8;
                color: $BC3;
                border-bottom: 1px solid $BC7; /*no*/
                border-top: 1px solid $BC7; /*no*/
                .price-num-wrap {
                    font-size: $TH8;
                    color: $BC1;
                    .price {
                        flex: 1;
                        text-align: right;
                    }
                }
                .pay-wrap {
                    padding: 10px 0;
                }
            }

            .status {
                padding: 0 20px;
                line-height: 78px;
                color: $C2;
                text-align: right;
            }

            .waitpay {
                padding: 0 30px;
                line-height: 98px;
                font-size: $TH8;
                color: $BC4;
            }

        }
        li.wait-take {
            color: $C7;
            .status {
                padding-left: 20px;
                line-height: 78px;
            }
        }
    }

    .havebacline {
        height: 20px;
        background: $C10;
    }
</style>
