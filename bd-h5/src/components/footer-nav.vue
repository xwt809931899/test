<template>
    <footer class="footer-nav">
        <slot></slot>
        <nav class="display-flex" v-if="!isChannel">
            <a href="/?" class="home" :class="{active:active==='home'}" pprd="21013.2.1">首页</a>
            <a href="/search.html" class="search" :class="{active:active==='search'}" pprd="21013.2.2">分类</a>
            <!--<a href="/activelist.html" class="activelist" :class="{active:active==='activelist', new : redPoint && redPoint.activity === 1}">活动</a>-->
            <!--<a href="/cart-pay.html#!/cart" class="cart"-->
            <!--:class="{active:active==='cart', new : redPoint.shoppingCart === 1}">购物车</a>-->
            <a href="/cart-pay.html#!/cart" class="cart" :class="{active:active==='cart'}" pprd="21013.2.3">购物车
                <!--<i class="cartnum">{{redPoint.shoppingCart}}</i>-->
            </a>
            <a href="/user.html" class="user" :class="{active:active==='user', 'new' : redPoint && redPoint.personalCenter === 1 }" pprd="21013.2.4">我的</a>
        </nav>
    </footer>
</template>
<script type="text/babel">
    import store from 'store'
    import { getRedPoint } from 'store/actions'
    import { isChannel } from 'common/mixins'
    export default{
        mixins: [isChannel],
        data(){
            return {}
        },
        props: ['active', 'noLoadRed'],
        ready(){
            if (!this.noLoadRed) {
             /*    注释掉小红点接口，后台未提供
             this.getRedPoint()
             */
            }
        },
        store,
        vuex: {
            getters: {
                redPoint: ({ user }) => user.redPoint
            },
//            actions: { getRedPoint }
        }
    }

</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .footer-nav {
        /*-webkit-tap-highlight-color: rgba(0, 0, 0, 0);*/
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 11;
        nav {
            background: #fff;
            width: 100%;
            border-top: 1px solid $C8; /*no*/
            > * {
                text-align: center;
                flex: 1;
                background: url('../img/footicon/bt_com_menu_home_default.png') center 0 no-repeat;
                background-size: 64px 64px;
                padding: 60px 0 10px 0;
                color: #CCCCCC;
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
                    color: $BC1;
                }
                &.home {
                    background-image: url('../img/footicon/bt_com_menu_home_default.png');
                    &.active {
                        background-image: url('../img/footicon/bt_com_menu_home_active.png')
                    }
                }

                &.search {
                    background-image: url('../img/footicon/bt_com_menu_category_default.png');
                    &.active {
                        background-image: url('../img/footicon/bt_com_menu_category_active.png')
                    }
                }

                &.activelist {
                    background-image: url('../img/footicon/bt_com_menu_event_default.png');
                    &.active {
                        background-image: url('../img/footicon/bt_com_menu_event_active.png')
                    }
                }

                &.cart {
                    background-image: url('../img/footicon/bt_com_menu_cart_default.png');
                    &.active {
                        background-image: url('../img/footicon/bt_com_menu_cart_active.png')
                    }
                    .cartnum {
                        position: absolute;
                        top: 0;
                        right: 20px;
                        color: #ffffff;
                        padding: 0 8px;
                        font-size: 14px;
                        font-style: normal;
                        border-radius: 38%;
                        background-color: #f00;
                    }
                }

                &.user {
                    background-image: url('../img/footicon/bt_com_menu_user_default.png');
                    &.active {
                        background-image: url('../img/footicon/bt_com_menu_user_active.png')
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
    }
</style>
