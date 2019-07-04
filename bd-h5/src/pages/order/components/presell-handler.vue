<template>
    <a v-if="item.orderStatus === 'WAITPAYDEP'" @click.stop href="/checkout/pay.html?orderNo={{item.orderNo}}&orderType={{item.orderType}}"
        class="al-btn al-btn-primary-hollow al-btn-border-radius">支付定金</a>

    <span class="finalpay-time" v-if="item.orderStatus === 'DEPPAYOVER' || (item.orderStatus === 'WAITPAY' && item.orderType === 'PRESELL')">
        尾款支付{{ item.presellState === 1 || item.presellState === 2 ? '开始' : '结束' }}：{{ item.presellState === 1 ||
        item.presellState === 2 ? item.finalpaymentBeginTime : item.finalpaymentEndTime }}
    </span>

    <a v-if="item.orderStatus === 'DEPPAYOVER' || (item.orderStatus === 'WAITPAY' && item.orderType === 'PRESELL')"
        @click.stop="finalPay(item)" class="al-btn al-btn-primary-hollow al-btn-border-radius" :class="{disabled: item.presellState === 1 || item.presellState === 2}">{{item.presellState
        === 1 || item.presellState === 2 ? '即将开始' : '支付尾款' }}</a>
</template>
<script>
    import util from 'common/util'
    import { showFeePage }from 'common/checkout'

    export default {
        props: ['item'],
        methods: {
            finalPay(item) {
                // 未生成尾款订单，跳确认订单页
                if(item.orderStatus === 'DEPPAYOVER') {
                    if(item.detailList instanceof Array && item.detailList.length === 1) {
                        // 预售只能单个购买
                        var params = [{
                            buyNum: item.totalCount,
                            itemCode: item.detailList[0].itemCode,
                            presellId: item.presellId,
                            orderNo: item.orderNo,
                            pprd: util.getCurPprd(),
                        }]
                        //跳转到结算页面，带选中的商品参数
                        showFeePage(params);
                    }
                } else if(item.orderStatus === 'WAITPAY'){
                    // 跳转支付页
                    location.href = `/checkout/pay.html?orderNo=${item.orderNo}&orderType=${item.orderType}`
                }
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";
    .finalpay-time {
        padding-left: 20px;
        float: left;
        font-size: $TH8;
        color: $BC3;
    }

    .disabled {
        background-color: #999;
        color: #fff;
        border: none;
        pointer-events: none;
    }

    .al-btn-primary-hollow {
        height: 58px;
        line-height: 58px;
        padding: 0 30px;
        border-radius: 2px;
    }
</style>
