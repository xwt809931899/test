/**
 * bindzfb
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
        isMobile: function (str) {
            return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
        }
    };

    var Bindzfb = Base.klass.create({

        elements: {
            '.j-input-card': 'elCard',
            '.j-input-trueName': 'elTruename',
            '.j-input-phone': 'elPhone',
            '.j-input-code': 'elCode',

            '.j-act-getcode': 'elGetcode'
        },
        events: {
            'click .j-act-getcode': 'clickGetcode',
            'click .j-act-submit': 'clickSubmit'
        },
        cgi: {
            data: '/api/user/queryBindCard.jsp',
            code: gConfig.PROJECT_REBATE+'/api/rebateuser/bindCardMsg',
            submit: gConfig.PROJECT_REBATE+'/api/rebateuser/boundCash'
        },
        init: function () {
            this.isSubmit = false;
            // 新增页面获取手机号码
            if (Base.url.param('act') !== 'edit') {
                $.ajax({
                    url: gConfig.PROJECT_USER+'/api/users/getPhone',
                    type: 'get',
                    headers: { 'A-CID': gConfig.ACID },
                    success: function (result) {
                        if (result && result.code === 1000) {
                            this.elPhone.val(result.data.phone);
                        }
                    }.bind(this)
                });
            }
            this.initEdit();
        },
        initEdit: function () {
            var isedit = Base.url.param('act');

            if (isedit === 'edit') {
                this.getData();
            }
        },
        clickSubmit: function (e) {
            this.submit();
            e.preventDefault();
        },
        clickGetcode: function () {
            this.getCode();
        },
        getData: function () {
            var params;

            params = {
                op: 3,
                _: new Date - 0
            }

            // $.get(this.cgi.data, params, this.proxy(this.getDataBack));
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/userCash',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });
        },
        getDataBack: function (result) {
            var o,
                $list;

            if (result && +result.code === 1000) {
                o = result.data;

                this.elCard.val(o.account);
                this.elTruename.val(o.userName);
                this.elPhone.val(o.phone);
            }
        },
        getCode: function () {
            var can = true,
                $item = this.elGetcode,
                params;

            if ($item.hasClass('disabled')) return;

            can = can && this.chkPhone();

            if (can) {
                params = {
                    op: 4,
                    phone: this.elPhone.val(),
                    _: new Date - 0
                }

                // $.get(this.cgi.code, params, this.proxy(this.getCodeBack));
                $.ajax({
                    url: gConfig.PROJECT_REBATE+'/api/rebateuser/bindCardMsg',
                    type: 'get',
                    headers: { 'A-CID': gConfig.ACID },
                    data: { phone: this.elPhone.val() },
                    success: function (result) {
                        if (result && result.code === 1000) {
                            this.getCodeBack(result);
                        }
                    }.bind(this)
                });

                $item.addClass('disabled');
            }
        },
        getCodeBack: function (result) {
            var $item = this.elGetcode,
                sec,
                timer;

            if (result && +result.code === 1000) {
                this.elCode.focus();

                sec = 60;

                $item.addClass('disabled').text(sec + '秒');

                timer = setInterval(function () {
                    if (sec === 1) {
                        $item.removeClass('disabled').text('获取');
                        clearInterval(timer);
                    } else {
                        $item.text(--sec + '秒');
                    }
                }, 1000);
            } else {
                tip.show(result.desc);
                $item.removeClass('disabled');
            }
        },
        submit: function () {
            var can = true,
                params;

            // if (this.isSubmit) return;

            can = can && this.chkCard();

            can = can && this.chkTruename();

            can = can && this.chkPhone();

            can = can && this.chkCode();

            if (can) {

                params = {
                    account: this.elCard.val(),
                    boundType: 'ALIPAY',
                    bankName: '支付宝',
                    userName: this.elTruename.val(),
                    phone: this.elPhone.val(),
                    valiCode: this.elCode.val()
                }

                // $.post(this.cgi.submit, params, this.proxy(this.submitBack));
                $.ajax({
                    url: gConfig.PROJECT_REBATE+'/api/rebateuser/boundCash',
                    type: 'get',
                    headers: { 'A-CID': gConfig.ACID },
                    data: params,
                    success: function (result) {
                        if (result && result.code === 1000) {
                            this.submitBack(result);
                        } else {
                            tip.show(result.desc);
                        }
                    }.bind(this)
                });

                // this.isSubmit = true;
            }
        },
        submitBack: function (result) {
            if (result && result.code === 1000) {
                window.location.href = 'user.html';
            } else {
                tip.show(result.desc);
            }

            // this.isSubmit = false;
        },
        chkCard: function () {
            var $e = this.elCard,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请输入支付宝号');
                return false;
            }

            return true;
        },
        chkTruename: function () {
            var $e = this.elTruename,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请输入账户名');
                return false;
            }

            return true;
        },
        chkPhone: function () {
            var $e = this.elPhone,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请输入手机号');
                return false;
            } else if (!Tools.isMobile(val)) {
                this.showErr('手机号码格式错误');
                return false;
            }

            return true;
        },
        chkCode: function () {
            var $e = this.elCode,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请输入验证码');
                return false;
            }

            return true;
        },
        showErr: function (s) {
            tip.show(s);
        }
    });

    tip = new Base.Widget.Tip();

    new Bindzfb();

})(window.Zepto);