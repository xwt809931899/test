<template>
    <footer class="footer-nav">
        <slot></slot>
        <nav v-if="!isShowShareList" class="display-flex">
            <a href="/rebate/home.html" class="home" :class="{active:active==='home'}">首页</a>
            <a href="/rebate/found.html" class="search" :class="{active:active==='found'}">
                发现<i v-if="newFound" class="icon-new"></i>
            </a>
            <a @click="showShare" class="share"><span class="word">分享</span></a>
            <a href="/rebate/news.html" class="news" :class="{active:active==='news'}">消息</a>
            <a href="/rebate/user.html" class="user"
               :class="{active:active==='user', new : userInfo.cartCount > 0}">我的</a>
        </nav>
        <div v-else class="share-type-layer">
            <div id="j-layerTop" class="layer-top">
                <div class="img">
                    <img src="../img/rebate/icon_releaseShare@2x.png" alt=""/>
                </div>
            </div>
            <div id="j-shareListWrap" class="share-list-wrap">
                <ul>
                    <li class="share-goods">
                        <a href="/search.html#/rebate">
                            <p class="title">分享单品</p>
                            <p class="info">单品推荐，只为Ta们所需</p>
                        </a>
                    </li>
                    <li class="share-essay">
                        <a href="/rebate/share_found.html">
                            <p class="title">分享文案</p>
                            <p class="info">用文章/故事来传递精选好物</p>
                        </a>
                    </li>
                    <li class="share-list">
                        <a href="/rebate/account.html#!/share-list?eid=0">
                            <p class="title">分享清单</p>
                            <p class="info">一键传递您全部的分享清单</p>
                        </a>
                    </li>
                    <li class="share-mall">
                        <a href="/rebate/share_homecard.html">
                            <p class="title">分享商城</p>
                            <p class="info">一键分享{{gConfig.siteNameZH}}商城全部商品</p>
                        </a>
                    </li>
                </ul>
                <a @click="close" class="close-layer"><i class="close"></i></a>
            </div>
        </div>
    </footer>
</template>
<script type="es6">
    export default{
        data(){
            return {
                userInfo: {},
                isShowShareList: false,
                newFound: false,
                gConfig: gConfig,
            }

        },
        props: ['active'],
        methods: {
            showShare(){
                this.isShowShareList = true;
            },
            close(){
                this.isShowShareList = false;
            },
        },
        ready(){
            /* http.get('/api/user/getSimpleUserInfo.jsp').success(({ obj }) => {
             this.userInfo = obj
             })*/
            http.get(gConfig.PROJECT_REBATE+'/api/essay/discoverCount').success(({ code, data })=> {
                if (code === 1000 && data.result > 0) {
                    this.newFound = true;
                }
            })
        },
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .footer-nav {
        position: absolute;
        bottom: 0;
        width: 100%;
        nav {
            background: #fff;
            width: 100%;
            padding-top: 10px;
            border-top: 1px solid $C8; /*no*/
            .icon-new {
                width: 12px;
                height: 12px;
                position: absolute;
                top: 6px;
                right: 40px;
                background-color: red;
                border-radius: 50%;
            }
            > * {
                text-align: center;
                flex: 1;
                /*background: url('../img/footicon/btn_main_home_checked.png') center top no-repeat;*/
                background-size: 60px 60px;
                padding: 60px 0 10px 0;
                color: #000;
                text-decoration: none;
                font-size: $H6;
                position: relative;
                &.new {
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 42px;
                        width: 12px;
                        height: 12px;
                        background: #f00;
                        border-radius: 50%;
                    }
                }
                &.active {
                    color: #af1c40;
                }
                &.home {
                    background: url('../img/rebate/footicons/dist_ic_home_normal.png') top center no-repeat;
                    background-size: 60px;
                    &.active {
                        background-image: url('../img/rebate/footicons/dist_ic_home_active.png');
                    }
                }

                &.search {
                    background: url('../img/rebate/footicons/dist_ic_find_normal.png') top center no-repeat;
                    background-size: 60px;
                    &.active {
                        background: url('../img/rebate/footicons/dist_ic_find_active.png') top center no-repeat;
                        background-size: 60px;
                    }
                }

                &.share {
                    margin-top: -80px;
                    height: 120px;
                    background: url('../img/rebate/footicons/dist_ic_share_normal.png') top center no-repeat;
                    background-size: 100px;
                    .word {
                        position: absolute;
                        top: 111px;
                        left: 50px;
                    }
                }

                &.news {
                    background: url('../img/rebate/footicons/dist_ic_message_normal.png') top center no-repeat;
                    background-size: 60px;
                    &.active {
                        background: url('../img/rebate/footicons/dist_ic_message_active.png') top center no-repeat;
                    }
                }

                &.user {
                    background: url('../img/rebate/footicons/dist_ic_user_normal.png') top center no-repeat;
                    background-size: 60px;
                    &.active {
                        background: url('../img/rebate/footicons/dist_ic_user_active.png') top center no-repeat;
                        background-size: 60px;
                    }

                    &.new {
                        &:before {
                            content: '';
                            right: 50px;
                        }
                    }

                }

            }
        }
        .layer-top {
            text-align: center;
        }
        .layer-top img {
            width: 50%;
            height: auto;
            max-width: 400px;
            margin-top: 100px;
        }
        .share-type-layer {
            position: fixed;
            width: 100%;
            height: 100%;
            z-index: 10;
            top: 0;
            left: 0;
            background-color: #ffffff;
        }

        .share-list-wrap {
            position: absolute;
            width: 100%;
            height: auto;
            left: 0;
            bottom: 0;
            background: #fff;
        }

        .share-list-wrap ul {
            line-height: 22px;
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .share-list-wrap li {
            padding: 20px 20px 20px 200px;
            border-top: 1px solid #E5E5E5; /*no*/
            background-size: 120px;
            background-position: 20px center;
            background-repeat: no-repeat;
            a {
                text-decoration: none;
            }
        }

        .share-list-wrap li.share-goods {
            background-image: url('../img/rebate/icon_singleItem@2x.png');
        }

        .share-list-wrap li.share-essay {
            background-image: url('../img/rebate/icon_releaseCopywrite-@2x.png');
        }

        .share-list-wrap li.share-list {
            background-image: url('../img/rebate/icon_releaseHome@2x.png');
        }

        .share-list-wrap li.share-mall {
            background-image: url('../img/rebate/icon_businessCard@2x.png');
        }

        .share-list-wrap .title {
            font-size: $H4;
            color: #333333;
        }

        .share-list-wrap .info {
            font-size: $H5;
            color: #999999;
        }

        .close-layer {
            display: block;
            padding: 26px 0;
            text-align: center;
            background-color: #ffffff;
            border-top: 1px solid #E5E5E5; /*no*/
        }

        .close-layer .close {
            display: inline-block;
            width: 36px;
            height: 36px;
            vertical-align: top;
            background: url("../img/rebate/btn_ClosereleaseShare@2x.png") no-repeat center center;
            background-size: 36px;
        }
    }
</style>
