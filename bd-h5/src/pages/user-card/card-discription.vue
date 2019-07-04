<template>
    <div class="pre-card-wrap">
        <div class="title"> 预付卡</div>
        <div class="desc">支付绑定的预付卡有如下四种</div>
        <div class="card-wrap">
            <div class="display-flex">
                <img class="card margin-right70" src="img/1.png">
                <img class="card" src="img/2.png">
            </div>
            <div class="display-flex ">
                <img class="card margin-right70" src="img/3.png">
                <img class="card" src="img/4.png">
            </div>
        </div>
    </div>
    <div class="vip-card-wrap">
        <div class="title"> VIP卡</div>
        <div class="desc">合肥百大集团一卡通会员</div>
        <div class="card-wrap">
            <div class="display-flex">
                <img class="card margin-right70" src="img/vip1.png">
                <img class="card" src="img/vip2.png">
            </div>
            <div class="display-flex">
                <img class="card margin-right70" src="img/vip3.png">
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .pre-card-wrap, .vip-card-wrap {
        padding-bottom: 40px;
        background-color: #fff;
    }

    .vip-card-wrap {
        margin-top: 20px;
    }

    .title {
        height: 88px;
        line-height: 88px;
        font-size: $H1;
        color: $C4;
        border-bottom: 1px solid $C8; /*no*/
        background-color: #fff;
        padding-left: 30px;
        padding-right: 30px;
    }

    .desc {
        font-size: $H4;
        color: $C6;
        margin-top: 30px;
        margin-bottom: 40px;
        padding-left: 30px;
        padding-right: 30px;

    }

    .card-wrap {
        padding-left: 30px;
        padding-right: 30px;
        > div {
            margin-bottom: 50px;
        }
        .card {
            width: 310px;
            height: 196px;
        }
        .margin-right70 {
            margin-right: 70px;
        }
    }

</style>
