<template>
    <div class="scroll">
        <header class="app-show-header">
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
        </header>

        <form @submit.prevent="sub" class="al-from">
            <div class="form-item">
                <input type="tel" v-model="account" disabled placeholder="手机号">
            </div>
            <div class="form-item img-code">
                <input v-model="imgCode" type="text" placeholder="请输入图形验证码">
                <img @click="reloadCode" src="{{gConfig.PROJECT_USER}}/api/imageCode/showImageCode?imageCodeId={{codeId}}">
            </div>

            <div class="btn">
                <get-code-btn @get-code="getPhoneCode" class="al-btn-big al-btn-border-radius"></get-code-btn>
            </div>

            <div class="form-item">
                <input v-model="phoneCode" type="text" placeholder="请输入验证码">
            </div>
            <div class="form-item">
                <input v-model="payPwd" type="password" placeholder="请输入支付密码（6位数字）">
            </div>
            <div class="form-item">
                <input v-model="payPwd2" type="password" placeholder="确认密码">
            </div>

            <div class="btn">
                <button class="al-btn al-btn-clear al-btn-block al-btn-big al-btn-border-radius">确定</button>
            </div>
        </form>
        <div class="footer">
            <div class="text display-flex">什么是支付密码？</div>
            <div class="desc">提交订单时，如果您要使用积分卡进行支付，需要输入支付密码来确保账户安全；</div>
        </div>
    </div>
</template>
<script>
    import getCodeBtn from 'components/get.code.btn.vue'
    import messBox from 'common/mess-box'
    export default {
        data() {
            return {
                gConfig: gConfig,
                title: '',
                account: '',
                codeId: '',
                imgCode: '',
                phoneCode: '',
                user: {},
                payPwd: '',
                payPwd2: ''
            }
        },
        components: { getCodeBtn },
        methods: {
            reloadCode(){
                this.$http.get(gConfig.PROJECT_USER + '/api/imageCode/createImageCode').success(({ data, code }) => {
                    if (code === 1000) {
                        this.codeId = data.imageCodeId
                    }
                })
            },
            getPhoneCode(){
                if (this.imgCode.length < 1) {
                    messBox.tips("请输入图形验证码")
                    return
                }
                this.$http.get('/bd-user/api/message/setPayPassword', {
                    phone: this.user.phone,
                    imageCodeId: this.codeId,
                    imageCode: this.imgCode,
                }).success(({ code }) => {
                    if (code !== 1000) {
                        this.reloadCode()
                        return
                    }

                    this.$broadcast("setGetCodeDisabled");
                })
            },
            sub(){
                if (!this.preCheck()) return
                http.get('/bd-user/api/card/setPayPassword', {
                    vCode: this.phoneCode,
                    payPassword: this.payPwd,
                    phone: this.account,
                }).then(({ data:{code, data} }) => {
                    if (code === 1000 && data) {
                        window.history.back()
                    }
                })
            },
            preCheck(){
                if (!this.phoneCode) {
                    messBox.tips('请输入短信验证码')
                    return false
                } else if (!/^\d{6}$/.test(this.payPwd)) {
                    messBox.tips('请输入支付密码（6位数字）')
                    return false
                } else if (this.payPwd !== this.payPwd2) {
                    messBox.tips('两次输入的密码不一致')
                    return false
                }
                return true
            },
        },
        ready(){
            this.$http.get(`${gConfig.PROJECT_USER}/api/users/getPhone`, {}, { noTips: true }).then(({ data:{code, data} }) => {
                if (code === 1000) {
                    this.user = data
                    this.account = data.phone
                }
            });
        },
        route: {
            data({ to }){
                this.title = to.title
                this.reloadCode()
            }
        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    header {
        border-bottom: 1px solid $C8; /*no*/
    }
    .app-show-header{
        display:block!important;
    }
    .footer {
        width: 100%;
        text-align: center;
        .text {
            font-size: $TH8;
            color: $BC4;
            padding: 0 20px;
            &:before {
                content: '';
                flex: 1;
                display: block;
                border-bottom: 1px solid $BC6; /*no*/
                position: relative;
                top: -10px;
                margin-right: 20px;
                height: 20px;
            }
            &:after {
                content: '';
                flex: 1;
                display: block;
                border-bottom: 1px solid $BC6; /*no*/
                position: relative;
                top: -10px;
                margin-left: 20px;
                height: 20px;
            }
        }
        .desc {
            text-align: center;
            padding: 40px 30px 60px 30px;
            font-size: $TH8;
            color: $BC5;
        }
    }
</style>
