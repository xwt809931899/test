<template>
    <div class="content">
        <div class="tips">关联您的手机号，为安心购物保驾护航</div>
        <div class="display-flex user-wrap">
            <img class="user-icon" src="img/ic_login_number.png">
            <!--<div class="user-icon"><i class="iconfont">&#xe605;</i></div>-->
            <input v-else placeholder="点击输入手机号码" v-model="account" type="tel">
            <img v-if="account" @click="clear" class="clear" src="img/ic_login_close.png">
        </div>
        <div class="display-flex code-wrap">
            <img class="code-icon" src="img/ic_login_codes.png">
            <!--<div class="code-icon"><i class="iconfont">&#xe605;</i></div>-->
            <input v-model="imgCode" type="text" placeholder="请输入右侧图片中的内容">
            <img @click="reloadCode" class="img-code"
                 src="{{gConfig.PROJECT_USER}}/api/imageCode/showImageCode?imageCodeId={{codeId}}">
        </div>
        <div class="display-flex msg-wrap">
            <img class="code-icon" src="img/ic_login_message.png">
            <!--<div class="code-icon"><i class="iconfont">&#xe605;</i></div>-->
            <input v-model="phoneCode" type="text" placeholder="请输入短信验证码">
            <div class="button" @click="getPhoneCode">获取</div>
        </div>
        <div v-if="!hasPwd" class="display-flex pass-wrap">
            <img class="pass-icon" src="img/ic_login_password.png">
            <!--<div class="pass-icon"><i class="iconfont">&#xe605;</i></div>-->
            <input v-el:el-password placeholder="请设置密码（6-16位英文或数字）" v-model="password" type="password">
            <span @click="passSwitch" class="toggle-pass" :class="{'icon-showed':isShowPass}"></span>
        </div>
        <div v-if="!hasPwd" class="display-flex pass-wrap">
            <!--<div class="pass-icon"><i class="iconfont">&#xe605;</i></div>-->
            <img class="pass-icon" src="img/ic_login_password.png">
            <input v-el:el-password2 placeholder="请再次输入确认密码" v-model="password2" type="password">
            <span @click="pass2Switch" class="toggle-pass" :class="{'icon-showed':isShowPass2}"></span>
        </div>
        <div class="service-wrap">
            <i v-if="isSelected" class="iconfont" @click="isChecked(false)">&#xe609;</i>
            <i v-else class="iconfont" @click="isChecked(true)">&#xe60e;</i>
            <a href="all-service.html#!/b2c-service">{{gConfig.siteNameZH}}服务条款</a>
        </div>
        <div class="save" @click="sub">完成</div>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .tips {
        width: 650px;
        font-size: $TH5;
        color: #ffffff;
        text-align: left;
        margin-bottom: 80px;
    }

    .content {
        height: 100%;
        overflow-y: auto;
        padding: 70px 50px 0 50px;
        text-align: center;
        background: url('img/img_login_bg.png');
        background-size: 750px 1334px;
    }

    .user-wrap, .code-wrap, .msg-wrap, .pass-wrap {
        width: 650px;
        padding-bottom: 16px;
        border-bottom: 1px solid $BC6; /*no*/
        margin-top: 60px;
        .user-icon {
            margin-right: 30px;
            width: 28px;
            height: 28px;
        }
        input {
            flex: 1;
            height: 100%;
            border: 0;
            font-size: $TH5;
            color: $BC5;
            outline: none;
            background: transparent;
        }
        .clear {
            width: 28px;
            height: 28px;
        }
        .code-icon {
            width: 36px;
            height: 36px;
            margin-right: 30px;
        }
        .img-code {
            width: 122px;
            height: 50px;
        }
    }

    .pass-wrap {
        margin-top: 60px;
        .pass-icon {
            margin-right: 30px;
            width: 36px;
            height: 36px;
        }
        .toggle-pass {
            width: 36px;
            height: 20px;
            background: url(img/ic_login_eye-close.png) no-repeat;
            background-size: cover;
        }
        .icon-showed {
            width: 36px;
            height: 20px;
            background: url(img/ic_login_eye.png) no-repeat;
            background-size: cover;
        }
    }

    .msg-wrap {
        .button {
            width: 100px;
            height: 50px;
            line-height: 50px;
            border: 1px solid $BC6; /*no*/
            color: #ffffff;
        }
    }

    .service-wrap {
        text-align: left;
        margin-top: 20px;
        color: $BC1;
        .iconfont {
            margin-right: 30px;
        }
        a {
            text-decoration: none;
            color: $BC1;
        }
    }

    .save {
        height: 98px;
        line-height: 98px;
        background-color: #ffffff;
        font-size: $TH4;
        border-radius: 2px;
        margin-top: 138px;
    }


</style>
<script>
    import getCodeBtn from 'components/get.code.btn.vue'
    import messBox from 'common/mess-box'
    import cookie from 'common/cookie'
    import util from 'common/util'

    export default{
        data(){
            return {
                account: '',
                codeId: '',
                imgCode: '',
                phoneCode: '',
                password: '',
                password2: '',
                hasPwd: true, //已经注册过了，有密码
                isSelected: true, // 默认选中服务条款
                isShowPass: false,
                isShowPass2: false,
                gConfig: gConfig,
            }
        },
        methods: {
            clear(){
                this.account = '';
            },
            passSwitch(){
                var ctype = this.$els.elPassword.type;
                this.isShowPass = !this.isShowPass;
                this.$els.elPassword.type = (ctype == 'password') ? 'text' : 'password'
            },
            pass2Switch(){
                var ctype = this.$els.elPassword2.type;
                this.isShowPass2 = !this.isShowPass2;
                this.$els.elPassword2.type = (ctype == 'password') ? 'text' : 'password'
            },
            isChecked(status){
                this.isSelected = status;
            },
            reloadCode(){
                this.$http.get(`${gConfig.PROJECT_USER}/api/imageCode/createImageCode`).success(({ data, code }) => {
                    if (code === 1000) {
                        this.codeId = data.imageCodeId;
                    }
                });
            },
            getPhoneCode(){
                if (util.check.cellPhone(this.account)) {
                    messBox.tips("请输入正确的手机号码");
                    return;
                }
                if (this.imgCode.length < 1) {
                    messBox.tips("请输入图形验证码");
                    return;
                }
                this.$http.get(`${gConfig.PROJECT_USER}/api/message/bindWexin`, {
                    phone: this.account,
                    imageCodeId: this.codeId,
                    imageCode: this.imgCode,
                }).success(({ data, code }) => {
                    if (code !== 1000) {
                        this.reloadCode();
                        return;
                    }
                    if (code === 1000 && data.result) {
                        messBox.tips("短信验证码发送成功");
                    }
                    this.hasPwd = data.isRegist;

                    this.$broadcast("setGetCodeDisabled");

                });
            },
            chkPassword (str) {
                if (!/^[a-zA-Z0-9]{6,16}$/.test(str)) {
                    messBox.tips("密码长度为6-16位，只能包含英文、数字");
                    return false;
                }
                return true;
            },
            sub(){
                if (!this.isSelected) {
                    messBox.tips("请选中" + gConfig.clauseName);
                    return;
                }
                if (util.check.cellPhone(this.account)) {
                    messBox.tips("请输入正确的手机号码");
                    return;
                }
                if (this.phoneCode.length < 1) {
                    messBox.tips("请输入短信验证码");
                    return;
                }
                if (!this.hasPwd) {
                    // 没有密码，要求设置登录密码

                    if (!this.chkPassword(this.password)) return;
                    if (this.password2 !== this.password) {
                        messBox.tips("两次输入的密码不一致");
                        return;
                    }
                }
                http.get(`${gConfig.PROJECT_USER}/api/users/wxBindPhone`, {
                    phone: this.account,
                    bindCode: this.phoneCode,
                    pwd: this.password
                }).success(({ data, code }) => {
                    if (code === 1000) {
                        cookie.set('sid', data.sid, {
                            path: '/',
                            expires: 90,
                        })
                        cookie.set('USER_UIN', data.uin, {
                            path: '/',
                            expires: 30
                        });
                        window.location.href = util.getParamter('sourceurl') ?
                            decodeURIComponent(util.getParamter('sourceurl')) :
                            window.location.origin + '/user.html'
                    }
                })
            }
        },
        components: { getCodeBtn },
        ready(){
            this.reloadCode()
        }
    }
</script>