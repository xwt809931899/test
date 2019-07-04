/**
 * rebate/register.js
 */
(function ($) {

    var tip;

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
        isCode: function (str) {
            return /^[0-9]{6}$/.test(str);
        }
    };

    function backSourceUrl(sourceurl) {
        if (Base.Browser.type === 'weixin') {
            // 微信需要获取openid,支付用
            window.location.href = gConfig.PROJECT_USER + '/api/users/getOpenid?sourceurl=' +
                encodeURIComponent(sourceurl)
        } else {
            window.location.href = sourceurl
        }
    }

    // 返利注册
    var Register = Base.klass.create({
        elements: {
            '.j-username': 'elUsername',
            '.j-password': 'elPassword',
            '.j-act-getcode': 'elGetCode',
            '.j-code': 'elCode',
            '.j-picCode': 'elPicCode',
            '.j-service': 'elService',
            '#j-codePicWrap': 'elCodePicWrap'
        },
        events: {
            //'change .j-password': 'chkPassword',
            //'change .j-code': 'chkCode',
            'change .j-username': 'chkUsername',
            'click .j-act-getcode': 'getCode',
            'click .j-confirm': 'confirm',
            'click .j-pass-switch': 'clickSwitchPass',
            'click #j-codePicWrap': 'getPicCode'
        },
        cgi: {
            getCodeIdURI: gConfig.PROJECT_USER + '/api/imageCode/createImageCode',
            showCodeURI: gConfig.PROJECT_USER + '/api/imageCode/showImageCode'
        },
        init: function () {
            this.asyncData = {};
            this.getPicCode();
        },
        getPicCode: function () {
            $.get(this.cgi.getCodeIdURI, {}, this.proxy(this._getPicCodeIdCall));
        },
        _getPicCodeIdCall: function (result) {
            var codeImg;
            if (result && result.code === 1000) {
                //this.elCodePicWrap.
                codeImg = new Image();
                codeImg.src = this.cgi.showCodeURI + '?imageCodeId=' + result.data.imageCodeId;
                this.asyncData.codeId = result.data.imageCodeId;
                this.elCodePicWrap.html(codeImg);
            } else {
                tip.show(result.desc);
            }
        },
        confirm: function () {
            var self = this,
                can = true,
                params;

            if (this.isSubmit) return;

            if (!this.chkService()) return;

            can = this.chkUsername() && can;

            can = this.chkPassword() && can;

            can = this.chkCode() && can;

            if (can) {
                params = {
                    type: 'NEW', // 新用户注册
                    phone: this.elUsername.val(),
                    pwd: this.elPassword.val(),
                    vCode: this.elCode.val()
                };

                var gc = Base.url.param('g_chan');
                if (gc) params.g_chan = gc;

                $.ajax({
                    type: 'get',
                    url: gConfig.PROJECT_REBATE + '/api/rebateuser/regiestRebate',
                    headers: { 'A-CID': gConfig.ACID },
                    data: params,
                    success: this.proxy(this.confirmBack),
                    error: function () {
                        self.isSubmit = false;
                        tip.show('网络连接异常');
                    }
                });

                this.isSubmit = true;
            }
        },
        confirmBack: function (result) {
            if (result.code === 1000) {
                Base.cookie('sid', result.data.sid);
                Base.cookie('USER_UIN', result.data.uin);
                // 成功后跳到的页面
                //兼容从悦客活动页面过来回到悦客活动页面
                var sourceUrl = Base.url.param('sourceurl')
                var source = Base.url.param('source')
                if (sourceUrl && source == 'activity') {
                    backSourceUrl(decodeURIComponent(sourceUrl))
                } else {
                    backSourceUrl(window.location.origin + '/rebate/home.html')
                }
                // backSourceUrl(window.location.origin + '/rebate/home.html')
                // window.location.href = Base.url.param('sourceurl') ? decodeURIComponent(Base.url.param('sourceurl')) : 'regsuc3.html';
            } else {
                tip.show(result.desc);
            }

            this.isSubmit = false;
        },
        clickSwitchPass: function (e) {
            e.preventDefault();
            var $showBtn = $(e.currentTarget);
            $showBtn.toggleClass("icon-showed");
            this.elPassword[0].type == 'text' ? this.elPassword[0].type = 'password' : this.elPassword[0].type = 'text';
        },
        chkService: function () {
            var $e = this.elService,
                is = $e.attr('checked');

            if (!is) {
                tip.show('请同意' + gConfig.rebateService);
                return false;
            }

            return true;
        },
        chkUsername: function () {
            var $e = this.elUsername,
                $item = $e.closest('li'),
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                err = '请输入手机号';
            } else if (!Tools.isMobile(val)) {
                err = '请输入正确的手机号码';
            }

            if (err) {
                this.showErr($item, err);
                return false;
            } else {
                this.hideErr($item);
                this.getVerifyUser();
                return true;
            }
        },
        chkPassword: function () {
            var $e = this.elPassword,
                $item = $e.closest('li'),
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                err = '请输入密码';
            } else if (!Tools.isPassword(val)) {
                err = '密码只能包含英文、数字，长度为6-16位';
            }

            if (err) {
                this.showErr($item, err);
                return false;
            } else {
                this.hideErr($item);
                return true;
            }
        },
        chkPicCode: function () {
            var $e = this.elPicCode,
                $item = $e.closest('li'),
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                err = '请输入图片验证码';
            }

            if (err) {
                this.showErr($item, err);
                return false;
            } else {
                this.hideErr($item);
                return true;
            }
        },
        chkCode: function () {
            var $e = this.elCode,
                $item = $e.closest('li'),
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                err = '请输入验证码';
            } else if (!Tools.isCode(val)) {
                err = '请输入正确的验证码';
            }

            if (err) {
                this.showErr($item, err);
                return false;
            } else {
                this.hideErr($item);
                return true;
            }
        },
        getCode: function () {
            var $getCode,
                params,
                can;

            if (this.elGetCode.hasClass('disabled')) return;

            if (!this.chkService()) return;

            can = true;

            can = this.chkUsername() && can;

            can = this.chkPicCode() && can;

            if (can) {

                $getCode = this.elGetCode;

                params = {
                    phone: this.elUsername.val(),
                    imageCode: this.elPicCode.val(),
                    imageCodeId: this.asyncData.codeId,
                    _: new Date() - 0
                };

                $.ajax({
                    type: 'GET',
                    url: gConfig.PROJECT_REBATE + '/api/rebateuser/regiestRebateMsg',
                    data: params,
                    headers: { 'A-CID': gConfig.ACID },
                    success: this.proxy(this.getCodeBack),
                    error: function () {
                        $getCode.removeClass('disabled').text('获取验证码');
                        tip.show('网络连接异常');
                    }
                });
                this.elGetCode.addClass('disabled').text('获取中...');
            }
        },
        getCodeBack: function (result) {
            var $getCode,
                sec,
                timer;

            $getCode = this.elGetCode;

            if (result && result.code === 1000) {
                this.elCode.focus();

                sec = 60;

                $getCode.addClass('disabled').text(sec + 's');

                timer = setInterval(function () {
                    if (sec === 1) {
                        $getCode.removeClass('disabled').text('获取验证码');
                        clearInterval(timer);
                    } else {
                        $getCode.text(--sec + 's');
                    }
                }, 1000);
            } else {
                this.getPicCode();
                tip.show(result.desc);

                $getCode.removeClass('disabled').text('获取验证码');
            }
        },
        getVerifyUser: function () {
            params = {
                phone: this.elUsername.val(),
                _: new Date() - 0
            };

            $.ajax({
                type: 'GET',
                url: gConfig.PROJECT_REBATE + '/api/rebateuser/verifyUserExist',
                data: params,
                headers: { 'A-CID': gConfig.ACID },
                success: this.proxy(this.getVerifyUserBack),
                error: function () {
                    // nothing
                }
            });
        },
        getVerifyUserBack: function (result) {
            var username = this.elUsername.val();
            // 判断未注册，老用户未升级返利，与已注册用户
            if (result && result.data && result.data.isExist === 'Y') {
                if (result.data.isRebate === 'N') {
                    $('.j-register-container').addClass('hide');
                    $('.j-upgrade-container').removeClass('hide').find('.j-username').val(username);
                    $('.j-tips-txt').text('升级成为' + gConfig.rebateName + '，赚钱、购物两不误！');
                } else {
                    var dom = '该账号已是' + gConfig.rebateName + '，登录<a href="' + gConfig.appDownloadUrl + '" target="_blank">' + gConfig.siteNameZH + 'APP</a>开启佣金模式！';
                    $('.j-tips-txt').html(dom);
                }
            }
        },
        showErr: function ($item, err) {
            var $tip = $item.find('.j-tip');
            $item.addClass('err-bor');
            $tip.addClass('err-txt').html(err);
        },
        hideErr: function ($item) {
            var $tip = $item.find('.j-tip');
            $item.removeClass('err-bor');
            $tip.removeClass('err-txt').html($tip.attr('data-tip') || '');
        }
    });

    var Upgrade = Base.klass.create({
        elements: {
            '.j-username': 'elUsername',
            '.j-password': 'elPassword',
            '.j-service': 'elService'
        },
        events: {
            //'change .j-username': 'chkUsername',
            //'change .j-password': 'chkPassword',
            'click .j-confirm': 'confirm',
            'click .j-pass-switch': 'clickSwitchPass'
        },
        confirm: function () {
            var self = this,
                can = true,
                params;

            if (this.isSubmit) return;

            if (!this.chkService()) return;

            can = this.chkUsername() && can;

            can = this.chkPassword() && can;

            if (can) {

                params = {
                    type: 'OLD', // 老用户升级
                    phone: this.elUsername.val(),
                    pwd: this.elPassword.val()
                };

                var gc = Base.url.param('g_chan');
                if (gc) params.g_chan = gc;

                $.ajax({
                    type: 'get',
                    url: gConfig.PROJECT_REBATE + '/api/rebateuser/regiestRebate',
                    headers: { 'A-CID': gConfig.ACID },
                    data: params,
                    success: this.proxy(this.confirmBack),
                    error: function () {
                        self.isSubmit = false;
                        tip.show('网络连接异常');
                    }
                });

                this.isSubmit = true;
            }
        },
        confirmBack: function (result) {
            if (result.code === 1000) {
                Base.cookie('sid', result.data.sid);
                Base.cookie('USER_UIN', result.data.uin);
                // 成功后跳到的页面
                //兼容从悦客活动页面过来回到悦客活动页面
                var sourceUrl = Base.url.param('sourceurl')
                var source = Base.url.param('source')
                if (sourceUrl && source == 'activity') {
                    backSourceUrl(decodeURIComponent(sourceUrl))
                } else {
                    backSourceUrl(window.location.origin + '/rebate/home.html')
                }
                // backSourceUrl(window.location.origin + '/rebate/home.html')
//                window.location.href = 'regsuc3.html';
                // window.location.href = Base.url.param('sourceurl') ? decodeURIComponent(Base.url.param('sourceurl')) : 'regsuc3.html';
            } else {
                tip.show(result.desc);
            }

            this.isSubmit = false;
        },
        clickSwitchPass: function (e) {
            e.preventDefault();
            var $showBtn = $(e.currentTarget);
            $showBtn.toggleClass("icon-showed");
            this.elPassword[0].type == 'text' ? this.elPassword[0].type = 'password' : this.elPassword[0].type = 'text';
        },
        chkService: function () {
            var $e = this.elService,
                is = $e.attr('checked');

            if (!is) {
                tip.show('请同意' + gConfig.rebateService);
                return false;
            }

            return true;
        },
        chkUsername: function () {
            var $e = this.elUsername,
                $item = $e.closest('li'),
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                err = '请输入手机号';
            } else if (!Tools.isMobile(val) && !Tools.isEmail(val)) {
                err = '请输入正确的手机号码或邮箱';
            }

            if (err) {
                this.showErr($item, err);
                return false;
            } else {
                this.hideErr($item);
                this.getVerifyUser();
                return true;
            }
        },
        chkPassword: function () {
            var $e = this.elPassword,
                $item = $e.closest('li'),
                val = Tools.trim($e.val()),
                err;

            $e.val(val);

            if (Tools.isEmpty(val)) {
                err = '请输入密码';
            } else if (!Tools.isPassword(val)) {
                err = '密码只能包含英文、数字，长度为6-16位';
            }

            if (err) {
                this.showErr($item, err);
                return false;
            } else {
                this.hideErr($item);
                return true;
            }
        },
        getVerifyUser: function () {
            params = {
                phone: this.elUsername.val(),
                _: new Date() - 0
            };

            $.ajax({
                type: 'GET',
                url: gConfig.PROJECT_REBATE + '/api/rebateuser/verifyUserExist',
                data: params,
                headers: { 'A-CID': gConfig.ACID },
                success: this.proxy(this.getVerifyUserBack),
                error: function () {
                    // nothing
                }
            });
        },
        getVerifyUserBack: function (result) {
            var username = this.elUsername.val();
            if (result && result.data && result.data.isExist === 'Y') {
                if (result.data.isRebate === 'Y') {
                    var dom = '该账号已是' + gConfig.rebateName + '，登录<a href="' + gConfig.appDownloadUrl + '" target="_blank">' + gConfig.siteNameZH + 'APP</a>开启佣金模式！';
                    $('.j-tips-txt').html(dom);
                } else {
                    $('.j-tips-txt').text('升级成为' + gConfig.rebateName + '，赚钱、购物两不误！');
                }
            } else {
                $('.j-register-container').removeClass('hide').find('.j-username').val(username);
                $('.j-upgrade-container').addClass('hide');
                $('.j-tips-txt').text('5秒快速注册，领取15元现金红包！');
            }
        },
        showErr: function ($item, err) {
            var $tip = $item.find('.j-tip');
            $item.addClass('err-bor');
            $tip.addClass('err-txt').html(err);
        },
        hideErr: function ($item) {
            var $tip = $item.find('.j-tip');
            $item.removeClass('err-bor');
            $tip.removeClass('err-txt').html($tip.attr('data-tip') || '');
        }
    });

    tip = new Base.Widget.Tip();

    new Register({
        el: '.j-register-container'
    });

    new Upgrade({
        el: '.j-upgrade-container'
    });

    Base.klass.single({
        elements: {
            '.j-register-container': 'elRegisterContainer',
            '.j-upgrade-container': 'elUpgradeContainer',
            '.j-reg-icon': 'elRegIcon',
            '.j-upg-icon': 'elUpgIcon'
        },
        events: {
            'click .j-radio-type': 'clickType',
            'click .check-icon': 'clickSerlab'
        },
        clickType: function (e) {
            var $e = $(e.currentTarget),
                val = +$e.val();

            if (val === 1) {
                this.elRegisterContainer.removeClass('hide');
                this.elUpgradeContainer.addClass('hide');
                this.elRegIcon.addClass('radio-icon-chk');
                this.elUpgIcon.removeClass('radio-icon-chk');
            } else if (val === 2) {
                this.elRegisterContainer.addClass('hide');
                this.elUpgradeContainer.removeClass('hide');
                this.elRegIcon.removeClass('radio-icon-chk');
                this.elUpgIcon.addClass('radio-icon-chk');
            }
        },
        clickSerlab: function (e) {
            var $e = $(e.currentTarget);
            var chkbox = $e.next('input.j-service');
            var val = chkbox.attr('checked');
            chkbox.attr('checked', val ? '' : 'checked');
            if (val) {
                $e.removeClass('check-icon-chk');
            } else {
                $e.addClass('check-icon-chk');
            }
        }
    });

    Base.url.coverFrom();

})(window.Zepto);