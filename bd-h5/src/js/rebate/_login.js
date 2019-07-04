/**
 * rebate/login.js
 */
(function ($) {
    function backSourceUrl(sourceurl) {
        if (Base.Browser.type === 'weixin') {
            // 微信需要获取openid,支付用
            window.location.href = gConfig.PROJECT_USER + '/api/users/getOpenid?sourceurl=' +
                encodeURIComponent(sourceurl)
        } else {
            window.location.href = sourceurl
        }
    }

    var tip;

    // 返利用户升级提示弹窗关闭事件
    $('.j-rule-mark').on('click', function () {
        $(this).hide();
    });

    var Tools = {
        trim: function (str) {
            return String(str).replace(/^\s*|\s*$/g, '');
        },
        isEmpty: function (str) {
            return this.trim(str) === '';
        },
        isPassword: function (str) {
            return /^[a-zA-Z0-9]{6,16}$/.test(str);
        },
        isEmail: function (str) {
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
        },
        isMobile: function (str) {
            return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
        },
        isHKMobile: function (str) {
            return /^[0-9]{8}$/.test(str);
        },
        isPasswordLite: function (str) {
            return /^\S{6,16}$/.test(str);
        }
    };

    var isWeixin = Base.Browser.type === 'weixin';

    var Login = Base.klass.create({
        elements: {
            '.j-username': 'elUsername',
            '.j-password': 'elPassword',
            '.j-wx': 'elWx'
        },
        events: {
            //'change .j-username': 'chkUsername',
            //'change .j-password': 'chkPassword',

            'click .j-confirm': 'confirm',

            'click .j-login-wx': 'loginWx',
            'click .j-pass-switch': 'clickSwitchPass'
        },
        init: function () {
            if (isWeixin) {
                this.elWx.show();
            }
        },
        confirm: function () {
            var self = this,
                can = true,
                $form;

            if (this.isSubmit) return;

            can = can && this.chkUsername();

            can = can && this.chkPassword();

            if (can) {
                $form = this.el.find('form');

                $.ajax({
                    type: 'get',
                    url: gConfig.PROJECT_USER + '/api/users/login',
                    headers: { 'A-CID': gConfig.ACID },
                    data: $form.serialize(),
                    success: this.proxy(this.confirmBack),
                    error: function () {
                        self.isSubmit = false;
                    }
                });

                this.isSubmit = true;
            }
        },
        confirmBack: function (loginResult) {
            var sourceUrl = Base.url.param('sourceurl')
            if (sourceUrl) {
                sourceUrl = decodeURIComponent(sourceUrl)
            } else {
                sourceUrl = window.location.origin + '/rebate/home.html';
            }
            if (loginResult.code === 1000) {
                Base.cookie('sid', loginResult.data.sid);
                Base.cookie('USER_UIN', loginResult.data.uin);
                // 登录成功，判断是商城用户还是返利用户
                $.ajax({
                    type: 'get',
                    url: gConfig.PROJECT_REBATE + '/api/rebateuser/verifyUserExist',
                    headers: { 'A-CID': gConfig.ACID },
                    data: { phone: this.elUsername.val() },
                    success: function (result) {
                        if (result && result.code === 1000) {
                            if (result.data.isRebate === 'Y') {
                                // 是返利用户，去返利首页
                                backSourceUrl(sourceUrl)
//                                window.location.href = sourceUrl;
                            } else if (result.data.isRebate === 'N') {
                                // 不是返利用户，返利升级提示弹窗
                                $('.j-rule-mark').show();
                            }
                        } else {
                            this.showErr(result.data.desc);
                        }
                    }.bind(this)
                });
            } else {
                this.showErr(loginResult.desc);
            }

            this.isSubmit = false;
        },
        loginWx: function () {
            window.location.href = gConfig.PROJECT_USER + '/api/users/h5WxLogin?sourceurl=' + (util.getParamter('sourceurl') || encodeURIComponent(window.location.origin + '/user.html'));
        },
        clickSwitchPass: function (e) {
            e.preventDefault();
            var $showBtn = $(e.currentTarget);
            $showBtn.toggleClass("icon-showed");
            this.elPassword[0].type == 'text' ? this.elPassword[0].type = 'password' : this.elPassword[0].type = 'text';
        },
        chkExists: function () {
            var account = this.elUsername.val(),
                params = {
                    _: new Date() - 0
                };
            $.get('/api/user/isExist.jsp?account=' + account, params, this.proxy(this.chkExistsBack));
            // $.get('json/register.json', params, this.proxy(this.chkExistsBack));
        },
        chkExistsBack: function (result) {
            if (result) {
                if (+result.errCode === 0) {
                    // 帐号不存在
                    if (result.obj === false) {
                        this.showErr('帐号不存在');
                    }
                } else {
                    this.showErr(result.errMsg);
                }
            } else {
                // alert('判断用户名是否存在接口错误。')
            }
        },
        chkUsername: function () {
            var $e = this.elUsername,
                val = $e.val(),
                err;
            if (Tools.isEmpty(val)) {
                err = '请输入账号';
            } else if (!Tools.isEmail(val) && !Tools.isMobile(val)) {
                err = '请输入正确的账号格式，邮箱或手机号码';
            }
            if (err) {
                this.showErr(err);
                return false;
            } else {
                return true;
            }
        },
        chkPassword: function () {
            var $e = this.elPassword,
                val = $e.val(),
                err;
            if (Tools.isEmpty(val)) {
                err = '请输入密码';
            } else if (!Tools.isPasswordLite(val)) {
                err = '密码长度为6-16位';
            }
            if (err) {
                this.showErr(err);
                return false;
            } else {
                return true;
            }
        },
        showErr: function (err) {
            tip.show(err);
        }
    });

    tip = new Base.Widget.Tip();

    new Login({
        el: '.j-login-container'
    });

    Base.url.coverFrom();

})(window.Zepto);