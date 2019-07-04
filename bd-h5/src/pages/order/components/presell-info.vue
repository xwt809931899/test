<template>
    <div class="presell" v-if="order.orderType === 'PRESELL'">
        <div class="display-flex left-flex title">
            <span>预付方式</span><span>先付定金，再结算尾款</span>
        </div>
        <div class="list">
            <div class="display-flex left-flex">
                <span>定金 <span class="focus">{{order.downpayment | currency '￥'}}(可抵{{order.expandMoney | currency
                        '￥'}})</span></span>
                <span :class="{focus: status.down.focus}">{{status.down.msg}}</span>
            </div>
            <div class="display-flex left-flex">
                <span>尾款 <span class="focus">{{order.finalpayment | currency '￥'}}</span></span>
                <span :class="{focus: status.final.focus}">{{status.final.msg}}</span>
            </div>
            <div class="display-flex left-flex">
                <span>尾款{{status.final.meta}}支付时间</span>
                <span>{{status.final.time}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    const PRESELL_STATE = {
        DOWN_NOT_BEGIN: 0, //定金未开始
        DOWN_NOT_END: 1, // 定金开始未结束
        FINAL_NOT_BEGIN: 2, //尾款未开始
        FINAL_NOT_END: 3, //尾款开始未结束
        FINAL_END: 4 //尾款结束
    }
    export default {
        props: ['order'],
        computed: {
            status() {
                var result = {
                    down: {
                        msg: '未开始'
                    },
                    final: {
                        msg: '未开始',
                        meta: '开始',
                        time: this.order.finalpaymentBeginTime
                    }
                }
                if(this.order.orderStatus === 'WAITPAYDEP') {
                    result.down.msg = '已开始'
                } else if(this.order.orderStatus === 'DEPPAYOVER' || this.order.orderStatus === 'WAITPAY') {
                    result.down = {
                        msg: '已支付',
                        focus: true
                    }
                    if(this.order.presellState === PRESELL_STATE.FINAL_NOT_END) {
                        result.final.msg = '已开始'
                    }
                } else if(this.order.orderStatus === 'FINISH' || this.order.orderStatus === 'WAITDELIVER') {
                    result.down = {
                        msg: '已支付',
                        focus: true
                    }
                    result.final = {
                        msg: '已支付',
                        focus: true
                    }
                    // prePeriod：1 表示付了订金未付尾款 2 付了尾款
                    if(this.order.prePeriod === 1) {
                        result.final.msg = '已关闭'
                    }
                } else if(this.order.orderStatus === 'CLOSE') {
                    result.down.msg = '已关闭'
                    result.final.msg = '已关闭'
                }
                if(this.order.presellState > PRESELL_STATE.FINAL_NOT_BEGIN) {
                    result.final.meta = '结束'
                    result.final.time = this.order.finalpaymentEndTime
                }
                return result
            }
        }
    }
</script>
<style lang="scss" scoped>
    .presell {
        background: #fff;
        margin-bottom: 20px;
        font-size: 24px;
        color: #666;
        margin-top: 20px;

        .title {
            padding: 25px 30px;
            font-size: 30px;
            border-bottom: 1px solid #E5E5E5;

            >span:first-child {
                color: #333;
            }

            >span:last-child {
                color: #999;
            }
        }

        .list {
            padding: 30px;

            >div+div {
                margin-top: 20px;
            }

            .focus {
                color: #E72714;
            }
        }
    }
</style>