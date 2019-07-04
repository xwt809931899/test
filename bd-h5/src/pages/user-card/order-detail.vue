<template>
    <div class="store-wrap">交易门店：&nbsp;{{data.shopName}}</div>
    <div class="time-wrap">
        <div>交易号：&nbsp;{{data.id}}</div>
        <div class="time">交易时间：&nbsp;&nbsp;{{data.createTime}}</div>
    </div>
    <div class="pro-wrap">
        <div class="title-wrap display-flex">
            <div class="name">商品名称</div>
            <div class="num">数量</div>
            <div class="right">单价</div>
        </div>
        <div v-for=" item in data.splb" class="display-flex item-wrap">
            <div class="name line-clamp2">{{item.spmc}}</div>
            <div class="num">{{item.xssl}}</div>
            <div class="right">￥{{item.spdj | toFixed}}</div>
        </div>
    </div>
    <div class="detail-wrap">
        <div class="display-flex item">
            <div>商品总额：</div>
            <div>￥{{data.xsje | toFixed}}</div>
        </div>
        <div class="display-flex item">
            <div>商品数量</div>
            <div>x&nbsp;{{data.spsl}}</div>
        </div>
        <div class="display-flex item">
            <div>实付金额：</div>
            <div>￥{{data.xsje | toFixed}}</div>
        </div>
        <div class="display-flex item">
            <div>获得积分：</div>
            <div class="score">{{data.score}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                query: {},
                data: {}
            }
        },
        methods: {
            getDetail(){
                http.get(gConfig.PROJECT_USER + '/api/card/getOfflinePointDetail', {
                    onlineFlag: this.query.onlineFlag,
                    isExchangePoint: this.query.isExchangePoint,
                    jysj: this.query.jysj,
                    mdId: this.query.mdId,
                    sktNo: this.query.sktNo,
                    jlbh: this.query.jlbh,
                    hyId: this.query.hyId,
                }).then(({ data:{code, data} }) => {
                    if (code === 1000) {
                        this.data = data
                    }
                })
            }
        },
        route: {
            data({ to }){
                this.query = to.query

                this.getDetail()
            }
        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .store-wrap {
        width: 750px;
        height: 108px;
        line-height: 108px;
        background-color: #ffffff;
        font-size: $TH5;
        color: $BC3;
        text-align: center;
        margin-bottom: 20px;
    }

    .time-wrap {
        padding: 30px;
        background-color: #ffffff;
        margin-bottom: 20px;
        font-size: $TH8;
        color: $BC3;
        .time {
            margin-top: 20px;
        }
    }

    .pro-wrap {
        background-color: #ffffff;
        margin-bottom: 20px;
        .title-wrap {
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid $BC6;
            font-size: $TH8;
            color: $BC5;
            padding: 0 30px;
            justify-content: space-between;
            .name {
                width: 250px;
            }
            .right {
                width: 200px;
                text-align: right;
            }
        }
        .item-wrap {
            height: 108px;
            line-height: 108px;
            margin: 0 30px;
            border-bottom: 1px solid $BC6;
            font-size: $TH8;
            color: $BC3;
            justify-content: space-between;
            &:last-child {
                border: 0
            }
            .name {
                width: 250px;
            }
            .num {
                margin-left: 10px;
            }
            .right {
                width: 200px;
                text-align: right;
            }
        }
    }

    .detail-wrap {
        padding: 30px 30px 10px 30px;
        background-color: #ffffff;
        .item {
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: $TH8;
            color: $BC3;
        }
        .score {
            color: $BC10;
        }
    }
</style>