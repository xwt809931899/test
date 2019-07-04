<template>
    <div class="scroll" @click="isShowSelect= false">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
            <div class="text" v-link="{'name':'point-description'}">积分说明</div>
        </header>
        <div class="title-wrap display-flex">
            <div class="left">
                <div class="date">
                    {{date | formatTime 'yyyy年MM月'}}
                </div>
                <div class="point">
                    <span>当前可用积分</span>
                    <span>{{effectiveScore}}</span>
                </div>
            </div>
            <div class="point-type-wrap">
                <div class="selected" @click.stop="isShowSelect=!isShowSelect">{{pointType=='ONLINE' ? '线上': '线下'}}<i
                        class="iconfont">&#xe61c;</i>
                </div>
                <div class="select-wrap" v-if="isShowSelect">
                    <div class="popup">
                        <span><em></em></span>
                        <div class="select-item border-top-none" :class="{'active': pointType == 'ONLINE'}"
                             @click="changeType('ONLINE')">
                            线上
                        </div>
                        <div class="select-item" :class="{'active': pointType == 'OFFLINE'}"
                             @click="changeType('OFFLINE')">
                            线下
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="total-wrap" v-if="pointType == 'OFFLINE'">近三个月在线下门店消费累计产生积分{{upcomeScore}}</div>
        <div class="total-wrap" v-else>当前您在百大易购消费累计产生积分{{incomeScore}}&nbsp; &nbsp; 消费积分{{expendScore}}</div>
        <pager :on-data="getData" :start-num="0" :model.sync="list" :page-size="20">
            <ul class="record-list">
                <li class="display-flex" @click="goDetail(item)" v-for=" item in list">
                    <div class="display-flex left">
                        <div class="date">{{item.createTime | formatTime 'MM.dd'}}</div>
                        <div>
                            <div class="time">{{item.createTime | formatTime 'hh:mm:ss'}}</div>
                            <div class="place" v-if="pointType == 'OFFLINE'">{{item.shopName}}</div>
                            <div class="place" v-if="pointType == 'ONLINE'">{{item.orderid}}</div>
                        </div>
                    </div>
                    <div v-if='item.score<0' class="num red">{{item.score}}</div>
                    <div v-else class="num">{{item.score}}</div>
                </li>
            </ul>
        </pager>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                title: '积分记录',
                pointType: 'ONLINE',
                isShowSelect: false,
                list: [],
                cardNo: '',
                effectiveScore: '', //有效积分
                incomeScore: 0, //线上总产生积分
                upcomeScore: 0, //线下总产生积分
                expendScore: 0,//总消费积分
                date: new Date(),
            }
        },
        methods: {
            changeType(type){
                this.pointType = type
                this.isShowSelect = false
                this.$broadcast("loadPage");
                this.getCore()
            },
            getData({ startNum, pageSize }){
                return http.get(gConfig.PROJECT_USER + '/api/card/getPointRecordList', {
                    startNum,
                    pageSize,
                    onLineFlag: this.pointType
                });
            },
            getCore(){
                http.get(gConfig.PROJECT_USER + '/api/card/getAllPointScope', {
                    cardNo: this.cardNo,
                    onLineFlag: this.pointType
                }).success(({ data, code }) => {
                    if (code === 1000) {
                        this.effectiveScore = data.effectiveScore
                        this.expendScore = data.expendScore
                        if (this.pointType == 'OFFLINE') {
                            this.upcomeScore = data.incomeScore
                        } else if (this.pointType == 'ONLINE') {
                            this.incomeScore = data.incomeScore
                        }
                    }
                });
            },
            goDetail(item){
                if (this.pointType == 'ONLINE' && item.canJumpOrder === 'Y') { // 线上订单详情
                    if ((/^SCORDER/).test(item.orderid)) { // 卡券订单详情
                        location.href = '/order.html#!/detail/' + item.orderid + '?type=SC'
                    } else {
                        location.href = '/order.html#!/detail/' + item.orderid
                    }
                } else if (this.pointType == 'OFFLINE') {
                    if (item.isExchangePoint == 'Y') { // 线下积分兑换详情
                        this.$router.go({
                            name: 'coupon-exchange',
                            query: {
                                onlineFlag: this.pointType,
                                isExchangePoint: item.isExchangePoint,
                                jlbh: item.id,
                                hyId: item.hyId,
                            }
                        })
                    } else if (item.isExchangePoint == 'N') { // 线下订单详情
                        this.$router.go({
                            name: 'order-detail',
                            query: {
                                onlineFlag: this.pointType,
                                isExchangePoint: item.isExchangePoint,
                                jysj: item.createTime,
                                mdId: item.shopId,
                                sktNo: item.sktNo,
                                jlbh: item.id,
                                hyId: item.hyId,
                            }
                        })
                    }

                }
            },
        },
        route: {
            data({ to }){
                this.title = to.title
                this.cardNo = to.params.cardNo
                setTimeout(() => {
                    this.$broadcast("loadPage");
                });
                this.getCore()

            }
        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .scroll {
        padding-bottom: 100px;
    }

    ul, li {
        margin: 0;
        padding: 0;
    }

    .title-wrap {
        position: relative;
        height: 108px;
        background: #ffffff;
        border-top: 1px solid $BC6; /*no*/
        padding: 24px 20px;
        .left {
            flex: 1;
        }
        .date {
            flex: 1;
            font-size: $TH6;
            color: $BC3;
            margin-bottom: 12px;
        }
        .point {
            font-size: $TH8;
            color: $BC5;
        }
        .point-type-wrap {
            text-align: right;
            .select-wrap {
                position: relative;
                .popup {
                    width: 120px;
                    background: #ffffff;
                    border-radius: 4px;
                    position: absolute;
                    top: 15px;
                    left: 5px;
                    border: 1px solid $BC6; /*no*/
                    span {
                        display: block;
                        width: 0;
                        height: 0;
                        border-width: 0 10px 10px;
                        border-style: solid;
                        border-color: transparent transparent $BC6;
                        position: absolute;
                        top: -10px;
                        left: 50%; /* 三角形居中显示 */
                        margin-left: -10px; /* 三角形居中显示 */
                        em {
                            display: block;
                            width: 0;
                            height: 0;
                            border-width: 0 10px 10px;
                            border-style: solid;
                            border-color: transparent transparent #ffffff;
                            position: absolute;
                            top: 1px;
                            left: -10px;
                        }
                    }
                    .select-item {
                        width: 120px;
                        height: 54px;
                        line-height: 54px;
                        border-top: 1px solid $BC6; /*no*/
                        text-align: center;
                        font-size: $TH8;
                        color: $BC5;
                        &.active {
                            color: $BC10;
                        }
                        &.border-top-none {
                            border-top: 0;
                        }
                    }
                }
            }

            .selected {
                width: 120px;
                height: 48px;
                border-radius: 24px;
                border: 1px solid $BC6; /*no*/
                font-size: $TH8;
                color: $BC5;
                padding: 0 10px;
                .iconfont {
                    font-size: 38px;
                }
            }
        }
    }

    .total-wrap {
        padding: 30px 20px;
        font-size: $TH8;
        color: $BC4;
    }

    .record-list {
        background: #ffffff;
        li {
            height: 108px;
            padding: 20px;
            border-bottom: 1px solid $BC7; /*no*/
            .left {
                flex: 1;
            }
            .date {
                width: 68px;
                height: 68px;
                line-height: 68px;
                text-align: center;
                background: $BC7;
                margin-right: 20px;
                font-size: $TH8;
                color: $BC4;
            }
            .time {
                font-size: $TH6;
                color: $BC3;
            }
            .place {
                font-size: $TH8;
                color: $BC5;
            }
            .num {
                font-size: $TH6;
                color: #5abf43;
                &.red {
                    color: $BC10;
                }
            }
        }
    }
</style>
