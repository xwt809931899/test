<template>
    <div class="scroll">
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
        </header>

        <form @submit.prevent="sub" class="al-from">
            <div class="form-item">
                <input type="text" v-model="realName" placeholder="请输入用户名">
            </div>
            <div class="form-item">
                <input type="text" v-model="cardNo" placeholder="请输入会员卡号">
            </div>
            <div class="form-item">
                <input type="tel" v-model="cellPhone" placeholder="请输入你在VIP卡里预留的手机号码">
            </div>
            <div class="form-item img-code">
                <input v-model="imgCode" type="text" placeholder="请输入图形验证码">
                <img @click="reloadCode"
                     src="{{gConfig.PROJECT_USER}}/api/imageCode/showImageCode?imageCodeId={{codeId}}">
            </div>
            <div class="form-item phone-code">
                <input v-model="phoneCode" type="text" placeholder="请输入短信验证码">
                <get-code-btn @get-code="getPhoneCode"></get-code-btn>
            </div>

            <div class="btn">
                <button class="al-btn al-btn-clear al-btn-block al-btn-big al-btn-border-radius">立即绑定</button>
            </div>
        </form>

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

                cardNo: '',
                realName: '',

//                user: {},

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
                this.$http.get(gConfig.PROJECT_USER + '/api/message/bindVipCard', {
                    phone: this.cellPhone,
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
            preCheck(){
                if (!this.realName) {
                    messBox.tips("请输入用户名");
                    return false;
                } else if (!this.cardNo) {
                    messBox.tips("请输入会员卡号");
                    return false;
                } else if (!this.phoneCode) {
                    messBox.tips("请输入短信验证码");
                    return false;
                }
                return true;
            },
            sub(){
                if (this.preCheck()) {
                    this.$http.get(gConfig.PROJECT_USER + '/api/card/bindVipCard', {
                        cardNo: this.cardNo,
                        name: this.realName,
                        phone: this.cellPhone,
                        vCode: this.phoneCode,
                    }).success(({ code }) => {
                        if (code === 1000) {
                            messBox.tips('绑定成功');
                            window.history.back()
//                        this.$router.replace({ name: 'vip-index' })
                        }
                    })
                }
            }
        },
        ready(){
//            this.$http.get('/api/user/queryUser.jsp?op=1').success(({ obj }) => {
//                this.user = obj;
//            });
        },
        route: {
            data({ to }){
                this.title = to.title
                this.reloadCode()
                http.get(gConfig.PROJECT_USER + '/api/card/havePayPassword').then(({ data:{code, data} }) => {
                    if (code === 1000 && data.hasPwd === 'N') {
                        messBox.tips('您还没有设置支付密码，请先设置支付密码')
                        this.$router.replace({ name: 'prepaid-set-pwd' })
                    }
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    header {
        border-bottom: 1px solid $C8; /*no*/
    }
</style>
