<template>
    <div v-if="showAlert">
        <div v-show="messStore.messInfo.type === 'tips'" class="tips-wrap">
            <div class="bounceInDown content display-flex">
                <div class="icon"><i class="iconfont">&#xe609;</i></div>
                <div class="text">{{messStore.messInfo.content}}</div>
            </div>
        </div>
        <div v-show="messStore.messInfo.type === 'longTips'" class="long-tips-wrap">
            <div class="bounceInDown content">
                <div class="icon"><i class="iconfont">&#xe609;</i></div>
                <div class="text">{{messStore.messInfo.content}}</div>
            </div>
        </div>
        <div v-show="messStore.messInfo.type === 'confirm'" class="confirm-wrap">
            <div class="main undefined"><h4>{{messStore.messInfo.title}}</h4>
                <div class="sub-title">{{messStore.messInfo.subTitle}}</div>
                <div class="content">{{messStore.messInfo.content}}</div>
                <div class="btns flex">
                    <a class="cancel" @click="cancel">{{messStore.messInfo.cancel}}</a>
                    <a class="confirm" @click="confirm">{{messStore.messInfo.confirm}}</a>
                </div>
            </div>
        </div>
        <div v-show="messStore.messInfo.type === 'inputConfirm'" class="input-confirm-wrap">
            <div class="main undefined"><h4>{{messStore.messInfo.title}}</h4>
                <div class="sub-title">{{messStore.messInfo.subTitle}}</div>
                <div class="input-wrap"><input class="input"></div>
                <div class="btns flex">
                    <a class="cancel" @click="cancel">{{messStore.messInfo.cancel}}</a>
                    <a class="confirm" @click="confirm">{{messStore.messInfo.confirm}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    export default{
        data(){
            return {
                showAlert: true,
            }
        },
        methods: {
            cancel(){
                this.showAlert = false;
                this.messStore.boxBackCall(false)
            },
            confirm(){
                this.showAlert = false;
                this.messStore.boxBackCall(true)
            },
        },
        ready(){
        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .confirm-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, .8);
        .main {
            animation-duration: 0.5s;
            top: 200px;
            position: absolute;
            background: #fff;
            margin: 104px;
            width: 590px;
            left: ((750-590)/2) px;
            border-radius: 8px;
            text-align: center;
            .img {
                width: 80px;
                height: 80px;
            }
            h4 {
                margin-top: 40px;
                font-size: $TH4;
                color: $BC3;
            }
            .sub-title {
                font-size: $TH8;
                color: $BC4;
            }
            .content {
                margin: 30px 50px 40px 50px;
                font-size: $TH8;
                color: $BC4;
                line-height: 36px;
            }
            .btns {
                border-top: 1px solid $BC6; /*no*/
                > * {
                    &:nth-child(1) {
                        border-right: 1px solid $C8; /*no*/
                        color: $BC3;
                        font-size: $TH4;
                    }
                    flex: 1;
                    height: 98px;
                    line-height: 98px;
                    color: $BC4;
                    font-size: $TH4;
                }
            }

        }
    }

    .input-confirm-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, .8);
        .main {
            animation-duration: 0.5s;
            top: 200px;
            position: absolute;
            background: #fff;
            margin: 104px;
            width: 590px;
            left: ((750-590)/2) px;
            border-radius: 8px;
            text-align: center;
            .img {
                width: 80px;
                height: 80px;
            }
            h4 {
                margin-top: 40px;
                font-size: $TH4;
                color: $BC3;
            }
            .sub-title {
                font-size: $TH8;
                color: $BC4;
            }
            .input-wrap {
                margin: 40px 50px 30px 50px;
                .input {
                    width: 100%;
                    padding: 0 10px;
                    height: 58px;
                    border: 1px solid $BC5;
                }
            }
            .btns {
                border-top: 1px solid $BC6; /*no*/
                > * {
                    &:nth-child(1) {
                        border-right: 1px solid $C8; /*no*/
                        color: $BC3;
                        font-size: $TH4;
                    }
                    flex: 1;
                    height: 98px;
                    line-height: 98px;
                    color: $BC4;
                    font-size: $TH4;
                }
            }

        }
    }

    .tips-wrap {
        position: absolute;
        z-index: 100;
        top: 40%;
        text-align: center;
        pointer-events: none;
        background: #000;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        height: 100px;
        line-height: 100px;
        margin: 0 154px;
        padding: 0 50px;
        border-radius: 8px;
        .content {
            margin: 0 104px;
            width: 100%;
            height: 100%;
            .icon {
                margin-right: 10px;
                width: 12px;
                height: 13px;
                line-height: 13px;
            }
            .text {
                margin-left: 10px;
                font-size: $TH4;
            }
        }

    }

    .long-tips-wrap {
        position: absolute;
        z-index: 100;
        top: 40%;
        text-align: center;
        pointer-events: none;
        background: #000;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        margin: 0 154px;
        padding: 40px 50px;
        border-radius: 8px;
        .content {
            .icon {
                width: 12px;
                height: 13px;
                margin: auto;
            }
            .text {
                font-size: $TH8;
                line-height: 32px;
                margin-top: 30px;
            }
        }

    }
</style>