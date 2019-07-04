/**
 * bindbank
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

    var Bindbank = Base.klass.create({

        elements: {
            '.j-input-card': 'elCard',
            '.j-input-trueName': 'elTruename',
            '.j-input-phone': 'elPhone',
            '.j-input-code': 'elCode',
            '.j-select-banklist': 'elBanklist',

            '.j-act-getcode': 'elGetcode'
        },
        events: {
            'click .j-act-getcode': 'clickGetcode',
            'click .j-act-submit': 'clickSubmit'
        },
        cgi: {
            data: '/api/user/queryBindCard.jsp',
            code: gConfig.PROJECT_REBATE+'/api/rebateuser/bindCardMsg',
            bankList: gConfig.PROJECT_REBATE+'/api/rebateuser/bankList',
            submit: gConfig.PROJECT_REBATE+'/api/rebateuser/boundCash'
        },
        init: function () {
            // this.isSubmit = false;

            this.getBankList();
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
            // $.get(this.cgi.data, params, this.proxy(this.getDataBack));
        },
        getDataBack: function (result) {
            var o, $list;
            o = result.data;
            this.elCard.val(o.account);
            this.elTruename.val(o.userName);
            this.elBanklist.val(o.bankName);
            this.elPhone.val(o.phone);
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
        getBankList: function () {
            var params;

            params = {
                op: 2,
                _: new Date - 0
            }

            // $.get(this.cgi.bankList, params, this.proxy(this.getBankListBack));
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/bankList',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getBankListBack(result);
                    }
                }.bind(this)
            });
        },
        getBankListBack: function (result) {
            var list,
                $list;

            if (result && +result.code === 1000) {
                list = result.data;

                $list = this.elBanklist;

                $(list).each(function (m, n) {
                    $list.append('<option value="' + n.name + '">' + n.name + '</option>');
                });

                this.initEdit();
            } else {
                tip.show(result.desc);
            }
        },
        submit: function () {
            var can = true,
                params;

            // if (this.isSubmit) return;

            can = can && this.chkCard();

            can = can && this.chkTruename();

            can = can && this.chkBank();

            can = can && this.chkPhone();

            can = can && this.chkCode();

            if (can) {

                params = {
                    account: this.elCard.val(),
                    boundType: 'BANK',
                    bankName: this.elBanklist.val(),
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
                        }
                    }.bind(this)
                });

                // this.isSubmit = true;
            }
        },
        submitBack: function (result) {
            if (result && +result.code === 1000) {
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
                this.showErr('请输入银行卡号');
                return false;
            }

            return true;
        },
        chkTruename: function () {
            var $e = this.elTruename,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请输入持卡人姓名');
                return false;
            }

            return true;
        },
        chkBank: function () {
            var $e = this.elBanklist,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请选择银行');
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
            var $e = this.elCard,
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

    new Bindbank();

})(window.Zepto);