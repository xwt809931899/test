<template>
    <div class="scroll">
        <div class="form">
            <div class="display-flex">
                <div class="left">手机号码</div>
                <div>
                    <input type="text" v-model="cellPhone.phone" disabled>
                </div>
            </div>
            <div class="display-flex">
                <div class="left">姓名</div>
                <div>
                    <input v-model="name" type="text" placeholder="请输入姓名">
                </div>
            </div>
            <div class="display-flex">
                <div class="left">性别</div>
                <div class="sex-wrap">
                    <select v-model="sex">
                        <option selected="selected" style="display:none">请选择您的性别</option>
                        <option value="0">男</option>
                        <option value="1">女</option>
                    </select>
                    <!--<i class="iconfont">&#xe602;</i>-->
                </div>
            </div>
            <div class="display-flex">
                <div class="left">身份证</div>
                <div>
                    <input v-model="idCard" type="text" placeholder="请输入您的身份证号码">
                </div>
            </div>
        </div>
        <div class="button" @click="submit">完成</div>
        <div class="desc">
            说明：<br />
            百大易购用户在完成该页面的信息填写后即可升级成为百大集团会员。报手机号即可在百大门店享受会员折扣，参与积分等福利。
        </div>
    </div>
</template>
<script>
    import store from 'store'
    import { getCellphone } from 'store/actions/user'
    import messBox from 'common/mess-box'
    import util from 'common/util'
    export default{
        data(){
            return {
                isVip: false,
                name: '',
                sex: undefined,
                idCard: '',
                from: '',
            }
        },
        methods: {
            check(){
                if (!this.name) {
                    messBox.tips('请输入姓名')
                    return false
                } else if (this.sex == undefined) {
                    messBox.tips('请选择您的性别')
                    return false
                } else if (!this.idCard) {
                    messBox.tips('请输入您的身份证号码')
                    return false
                }
                return true
            },
            submit(){
                if (this.check()) {
                    var url = gConfig.PROJECT_USER + '/api/card/registerBDVip'
                    if (this.isVip) {
                        url = gConfig.PROJECT_USER + '/api/card/completeVipInfo'
                    }
                    http.get(url, {
                        name: this.name,
                        sex: this.sex,
                        idcard: this.idCard
                    }).success(({ data }) => {
                        if (data.result === 'Y') {
                            if(this.from == 'cart'){
                                location.href = '/cart-pay.html#!/cart'
                            }else{
                                location.href = '/user-card.html#!/vip-index'
                            }
                        }
                    })
                }
            }
        },
        ready(){
            this.getCellphone()
        },
        route: {
            data({ to }){
                this.isVip = util.getParamter('isVip')
                this.from = util.getParamter('from')
            }
        },
        store,
        vuex: {
            getters: {
                cellPhone: ({ user }) => user.cellPhone
            },
            actions: {
                getCellphone
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .form {
        background-color: #ffffff;
        > div {
            padding: 0 30px;
            border-bottom: 1px solid $BC7; /*no*/
            line-height: 88px;
            .left {
                font-size: $TH5;
                color: $BC3;
                margin-right: 20px;
            }
            input {
                font-size: $TH5;
                color: $BC5;
                outline: none;
                background-color: #ffffff;
            }
            .tips {
                font-size: $TH5;
                color: $BC5;
            }
        }
        .sex-wrap {
            flex: 1;
            select{
                width: 250px;
                color: $BC5;
            }
        }
        input, select {
            border: none;
        }
    }

    .button {
        line-height: 88px;
        margin: 60px 30px 78px 30px;
        background-color: $BC10;
        color: #ffffff;
        text-align: center;
        font-size: $TH4;
    }

    .desc {
        padding: 0 30px;
        font-size: $TH8;
        color: $BC4;
    }
</style>