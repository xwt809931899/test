<template>
    <div class="scroll">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
        </header>
        <div class="card">
            <div class="card-info display-flex">
                <div class="display-flex left-flex">
                    <div class="head-img">
                        <img v-src="userInfo.headImgUrl"/>
                    </div>
                    <div>
                        <div>
                            <span class="nick">{{card.name}}</span>
                            <span class="card-type">{{card.cardType}}</span>
                        </div>
                        <div class="card-num">NO：{{card.cardNo}}</div>
                    </div>
                </div>
                <div class="right-flex">
                    <div class="text">当前积分</div>
                    <div class="piont">{{card.effectiveScore}}</div>
                </div>
            </div>
            <div class="tab display-flex">
                <div class="left" v-link="{'name':'point-description'}">积分说明</div>
                <div class="right" v-link="{'name':'point-record',params: {cardNo:card.cardNo}}">积分记录</div>
            </div>
        </div>
        <!--<div v-else v-link="{ name: 'vip-bind' }" class="card-have-not display-flex">-->
        <!--<div>-->
        <!--<img src="./img/bt_add_membercard_default.png">-->
        <!--<div>您还未绑定过会员卡，去绑定</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="info">
            <h4>会员积分</h4>
            <div v-if="card">
                <p>总积分：{{card.effectiveScore}}积分</p>
                <p>有效日期至：{{card.endDate | formatTime 'yyyy年MM月dd日'}}</p>
                <p>最近消费积分：{{card.lastConsumeScore || 0}}</p>
            </div>
            <div v-else>
                <p>总积分：0</p>
                <p>有效日期至：0</p>
                <p>最近消费积分：0</p>
            </div>
        </div>

    </div>
    <div class="footer">
        <div v-link="{'name':'card-discription'}">
            <span class="text">什么是会员卡</span>
            <img class="ic_note-cards" src="img/ic_note-cards.png">
        </div>
    </div>
    <div class="ruleMark display-flex" v-if="isShow">
        <div class="rule-wrap">
            <div class="content-wrap">
                <div class="title">设置密码提醒</div>
                <div class="content">
                    <div>为了您的账户安全，请设置您的</div>
                    <div>支付密码</div>

                </div>
                <div class="btn" @click="set">去设置</div>
            </div>
        </div>
    </div>
</template>
<script>
    import store from 'store'
    export default {
        data() {
            return {
                title: '',
                card: null,
                isShow: false,
            }
        },
        methods: {
            set(){
                location.href = 'user-card.html#!/prepaid-set-pwd'
            },
        },
        route: {
            data({ to }){
                this.title = to.title
                http.get('/bd-user/api/card/vipCardInfo').then(({ data:{code, data} }) => {
                    if (code === 1000) {
                        this.card = data
                    }
                })
                http.get(gConfig.PROJECT_USER + '/api/card/havePayPassword').success(({code, data}) => {
                    if (code === 1000) {
                        if (data.hasPwd == 'N') {
                            this.isShow = true
                        }
                    }
                })
            }
        },
        store,
        vuex: {
            getters: {
                userInfo: ({ user }) => user.info,
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    header {
        background: url('img/bg_scorecard_index.png');
        background-size: 750px 360px;
        width: 750px;
        height: 360px;
        .back {
            color: #ffffff;
        }
        h1 {
            color: #ffffff;
        }
    }

    .card {
        position: relative;
        margin-top: -169px;
        margin-left: 20px;
        margin-right: 20px;
        background: #ffffff;
        width: 710px;
        border-radius: 16px;
        .card-info {
            padding: 40px 0 40px 20px;
            border-bottom: 1px solid $BC6; /*no*/
            .head-img {
                width: 88px;
                height: 88px;
                border-radius: 50%;
                background: $BC7;
                padding: 4px;
                margin-right: 10px;
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
            }
            .nick {
                font-size: $TH6;
                color: $BC3;
                margin-right: 19px;
            }
            .card-type {
                font-size: $TH8;
                color: $BC4;
            }
            .card-num {
                font-size: $TH8;
                color: $BC5;
            }
            .right-flex {
                flex: 1;
                text-align: right;
                padding-right: 30px;
                .text {
                    font-size: $TH8;
                    color: $BC5;
                }
                .piont {
                    font-size: 48px;
                    color: $BC10;
                }
            }
        }
        .tab {
            height: 88px;
            font-size: $TH8;
            color: $BC4;
            text-align: center;
            > div {
                flex: 1;
                height: 88px;
                line-height: 88px;
            }
            .left {
                border-right: 1px solid $BC6; /*no*/
            }
        }
    }

    .card-have-not {
        background: url(./img/bg_membercard_gray.png);
        background-size: cover;
        height: 260px;
        width: 702px;
        margin: 32px auto 32px auto;
        > * {
            flex: 1;
            text-align: center;
            img {
                width: 60px;
                height: 60px;
            }
            div {
                font-size: $H7;
                color: $C4;
                margin-top: 40px;
            }
        }
    }

    .info {
        background: #fff;
        margin-top: 40px;
        > h4 {
            line-height: 88px;
            font-size: $H3;
            font-weight: 500;
            border-bottom: 1px solid $C8; /*no*/
            padding: 0 20px;
            margin: 0;
        }
        > div {
            padding: 16px 0;
            p {
                font-size: $H4;
                color: $C4;
                margin: 0;
                line-height: 64px;
                padding: 0 20px;
            }
        }
    }

    .footer {
        position: absolute;
        width: 100%;
        bottom: 20px;
        text-align: center;
        .text {
            font-size: $H4;
            color: $BC1;
            margin-right: 10px;
        }
        .ic_note-cards {
            width: 43px;
            height: 31px;
            vertical-align: middle;
        }
    }

    .ruleMark {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        .rule-wrap {
            margin: auto;
            width: 646px;
            border-radius: 8px;
            background-color: #ffffff;
            .title {
                text-align: center;
                font-size: $TH4;
                font-weight: bold;
                color: $BC3;
                margin: 40px 0 30px 0;
            }
            .content {
                font-size: $TH6;
                font-weight: bold;
                color: $BC4;
                /*padding-left: 30px;*/
                margin: 60px 0;
                text-align: center;
                > div {
                    margin-bottom: 12px;
                }
            }
            .note {
                font-size: $TH5;
                padding: 36px 0 30px 30px;
                color: $BC4;
            }
            .btn {
                line-height: 98px;
                font-size: $TH4;
                font-weight: bold;
                color: $BC3;
                text-align: center;
                border-top: 1px solid $BC6; /*no*/
            }
        }
    }
</style>
