<template>
    <div class="scroll">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
            <a v-link="{ name: 'prepaid-bind' }" class="right">添加新卡</a>
        </header>
        <pager :on-data="getData" :start-num="0" :model.sync="cardList">
            <div v-if="cardList.length>0" class="total ">
                <div>剩余金额（元）
                    <div>￥{{sumBalance}}</div>
                </div>
            </div>
            <div v-else v-link="{ name: 'prepaid-bind' }" class="total-have-not display-flex">
                <div>请先绑定预付卡</div>
            </div>

            <a v-link="{ name: 'prepaid-set-pwd' }" class="display-flex left-flex set-pwd hide">
                <span>设置支付密码</span>
                <i class="iconfont">&#xe602;</i></a>

            <ul class="card-list">
                <li v-for="item in cardList" :class="{ invalid: item.status === 'invalid' }">
                    <slide-left-wrap>
                        <div class="content">
                            <h5>NO：{{item.cardCode}}</h5>
                            <div>{{item.bindTime | formatTime 'yyyy年MM月dd日hh:mm:ss'}}绑定</div>
                            <span v-if="item.status === 'invalid'">失效</span>
                        </div>
                        <div slot="right" class="delete-btn" @click="unBind(item)">
                            删除
                        </div>
                    </slide-left-wrap>
                </li>
            </ul>

            <p v-if="cardList.length>0" class="tips">您可通过重新绑定失效卡来校验卡是否有效</p>
        </pager>
    </div>

    <div class="footer ">
        <div v-link="{'name':'card-discription'}">
            <span class="text">什么是预付卡</span>
            <img class="ic_note-cards" src="img/ic_note-cards.png">
        </div>
    </div>
    
</template>
<script>
    import slideLeftWrap from 'components/slide-left-wrap.vue'
    import messBox from 'common/mess-box'

    export default {
        data() {
            return {
                title: '',
                cardList: [],
                sumBalance: 0,
                gConfig: gConfig,
            }
        },
        components: { slideLeftWrap },
        methods: {
            unBind(item){
                messBox.confirm('确定删除吗？').then(() => {
                    http.get(gConfig.PROJECT_USER + '/api/card/unBindPreCard', {
                        cardNo: item.cardCode,
                    }).success(({ data, code }) => {
                        if (code === 1000) {
                            this.cardList.$remove(item)
                            this.$broadcast("loadPage");
                        }
                    })
                })
            },
            getData({ startNum, pageSize }){
                return http.get(gConfig.PROJECT_USER + '/api/card/preCardInfo', {
                    startNum,
                    pageSize
                }).success(({ data, code }) => {
                    if (code === 1000) {
                        this.sumBalance = data.sumBalance
                    }
                })
            }
        },
        route: {
            data({ to }){
                this.title = to.title
                setTimeout(() => {
                    this.$broadcast("loadPage");
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .total {
        background: #e65d5d;
        height: 260px;
        color: #fff;
        > * {
            padding: 84px 32px 0;
            > div {
                display: block;
                font-size: 60px;
                margin-top: 24px;
            }
        }
    }

    .total-have-not {
        background: #e65d5d;
        height: 260px;
        color: #fff;
        text-align: center;
        > div {
            flex: 1;
            font-size: $H1;
        }
    }

    .set-pwd {
        background: #fff;
        padding: 0 32px;
        line-height: 90px;
        font-size: $H4;
        color: $C4;
        text-decoration: none;
    }

    .card-list {
        background: #fff;
        margin: 24px 0 0;
        padding: 0;

        > li {
            list-style: none;
            border-bottom: 1px solid $C8; /*no*/
            margin: 0;
            &.invalid {
                .content h5 {
                    color: $C7;
                }
            }
            .content {
                padding: 0 32px;
                height: 120px;
                position: relative;
                h5 {
                    margin: 0;
                    font-size: $H4;
                    color: $C3;
                    font-weight: 500;
                    line-height: 70px;
                }
                div {
                    font-size: $H7;
                    color: $C7;
                }
                span {
                    position: absolute;
                    right: 32px;
                    top: 24px;
                    font-size: $H4;
                    color: $C7;
                }
            }
            .delete-btn {
                background: $BC10;
                line-height: 121px;
                color: #fff;
                width: 140px;
                font-size: $TH5;
                text-align: center;
            }
        }
    }

    .tips {
        font-size: $H7;
        color: $C6;
        margin-top: 32px;
        padding: 0 32px;
    }

    .footer {
        position: absolute;
        width: 100%;
        bottom: 20px;
        text-align: center;
        .text {
            font-size: $H4;
            color: $C3;
            margin-right: 10px;
        }
        .ic_note-cards {
            width: 43px;
            height: 31px;
            vertical-align: middle;
        }
    }

</style>
