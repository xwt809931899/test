<template>
    <div class="root scroll">
        <header class="top-nav">
            <a class="back" @click="back" href="javascript:;"><i class="iconfont">&#xe603;</i></a>
            <h1>我的售后</h1>
        </header>
         <div class="staTitle">
            
            <ul class="display-flex status">
                <li class="active" >
                    <a>百大易购</a>
                </li>

                <li  @click="goAfu()">
                    <a>阿福到家</a>
                </li>
            </ul>
        </div>
        <div class="not-data" v-if="!$refs.pager.loading && !list.length">
            <img src="./img/noaftersale.png">
            <div>暂无售后申请信息</div>
        </div>
        <pager :on-data="getData" :start-num="0" :model.sync="list" v-ref:pager>
            <ul class="order-list">
                <li v-for="item in list" v-link="{name:'after-service-detail',params:{afterSalesNo:item.afterSalesNo}}">
                    <div class="flex left-flex info">
                        <time>{{item.date}}</time>
                        <div class="status">{{item.statusDesc}}</div>
                    </div>
                    <div class="pro-detail flex">
                        <div>
                            <img v-src="item.img">
                        </div>
                        <div class="flex top-flex">
                            <div>{{item.title}}</div>
                            <div class="num">x {{item.num}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </pager>
    </div>
</template>

<script>
    import appSDK from 'common/app-SDK'
    export default{
        data(){
            return {
                list: null,
            }
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
                window.location.href = '/afu/#/order/myCustorOrders'
            },
            getData({ startNum, pageSize }){
                return http.get(gConfig.PROJECT_ORDER + "/api/aftersales/list", {
                    startNum,
                    pageSize,
                })
            }
        },
        route: {
            activate(transition) {
                if (!appSDK.isApp){

                }else{
                    console.log("nicai")
                    const appJson = {
                        type: 904,
                    }
                    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
                }
                transition.next()
            },
            data ({ to }) {
                this.$nextTick(() => {
                    this.$broadcast('loadPage')
                })
            }
        }
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
        height: 88px;
        border-bottom: 1px solid $BC6; /*no*/
        background-color: #ffffff;
        margin-top:88px;
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
    .root {
    }

    .not-data {
        background: #fff;
        padding: 200px 0;
        text-align: center;
        min-height: 100%;
        img {
            width: 309px;
            height: 248px;
        }
        div {
            margin-top: 40px;
            font-size: $TH6;
            color: $BC5;
        }
    }

    .order-list {
        margin: 0;
        padding: 0 0 20px 0;
        > li {
            list-style: none;
            margin: 0 0 20px 0;
            padding: 0;
            background: #fff;
            .info {
                padding: 0 30px;
                line-height: 98px;
                color: $BC3;
                time {
                    font-size: $TH8;
                }
                .status {
                    font-size: $TH6;
                    font-weight: bold;
                }
            }

            .pro-detail {
                background: #fff;
                color: $BC3;
                border-top: 1px solid $BC7; /*no*/
                font-size: $TH6;
                > *:nth-child(1) {
                    padding: 10px;
                    img {
                        height: 180px;
                        width: 180px;
                    }
                }
                > *:nth-child(2) {
                    flex: 1;
                    padding-right: 30px;
                    height: 130px;
                    .num {
                        color: $BC5;
                    }
                }
            }
        }
    }
</style>