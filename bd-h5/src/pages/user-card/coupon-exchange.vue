<template>
    <div class="title-wrap">
        <div>积分线下兑换</div>
        <div class="time">兑换日期：{{data.createTime}}</div>
    </div>
    <div class="item-wrap">
        <div class="display-flex item">
            <div>兑换金额：</div>
            <div>￥{{data.xsje | toFixed}}</div>
        </div>
        <div class="display-flex item">
            <div>扣除积分：</div>
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

    .title-wrap {
        width: 750px;
        height: 152px;
        background-color: #ffffff;
        font-size: $TH5;
        color: $BC3;
        text-align: center;
        margin-bottom: 20px;
        padding: 39px 0 40px 0;
        .time {
            font-size: $TH8;
            color: $BC5;
            margin-top: 20px;
        }
    }

    .item-wrap {
        background-color: #ffffff;
        font-size: $TH8;
        color: $BC3;
        .item {
            height: 88px;
            padding: 0 30px;
            border-bottom: 1px solid $BC6;
            justify-content: space-between;
        }
        .score {
            color: $BC10;
        }
    }

</style>