/**
 * user withdrawals
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
        isAmount: function (str) {
            return /^[0-9]*(\.[0-9]{1,2})?$/.test(str);
        }
    };

    var WithDrawals = Base.klass.create({
        elements: {
            '.j-text-balance': 'elBalance',
            '.j-input-amount': 'elAmount',
            '.j-text-card': 'elCard',
            '.j-text-trueName': 'elTruename',
            '.j-img-cardType': 'elCardtype',
            '.j-text-phone': 'elPhone',
            '.j-input-code': 'elCode',

            '.j-act-getcode': 'elGetcode'
        },
        events: {
            'click .j-act-getcode': 'clickGetcode',
            'click .j-act-submit': 'clickSubmit'
        },
        cgi: {
            data: gConfig.PROJECT_REBATE+'/api/rebateuser/auditCashDetail',
            code: gConfig.PROJECT_REBATE+'/api/rebateuser/userCashMsg',
            submit: gConfig.PROJECT_REBATE+'/api/rebateuser/auditCashSubmit'
        },
        init: function () {
            // this.isSubmit = false;

            this.phone = null;

            this.mincash = null;

            this.initBalance();

            this.getData();
        },
        initBalance: function () {
            // var balance = Base.url.param('balance');

            // if (balance) {
            //     this.elBalance.text('￥' + this.coverPrice(balance));
            // } else {
            //     tip.show('缺少余额参数');
            // }
        },
        clickSubmit: function (e) {
            this.submit();

            // e.preventDefault();
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
                url: gConfig.PROJECT_REBATE+'/api/rebateuser/auditCashDetail',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this.getDataBack(result);
                    }
                }.bind(this)
            });
        },
        account: '',
        getDataBack: function (result) {
            var o,
                $list;

            if (result && +result.code === 1000) {

                o = result.data;
                this.account = o.account;
                this.elBalance.text('￥' + o.usableMoney.toFixed(2));
                this.elAmount.attr('placeholder', '不得低于' + o.minCash.toFixed(2) + '元');

                this.elCard.text(function (card) {
                    return card.replace(/./g, function (j, k, x) {
                        return k > 2 ? '*' : j;
                    });
                }(o.account));

                this.elTruename.text(function (trueName) {
                    return trueName.replace(/./g, function (j, k, x) {
                        return k > 0 ? '*' : j;
                    });
                }(o.userName));

                this.elPhone.text(function (phone) {
                    return phone.replace(/\w/g, function (j, k, x) {
                        return k > 2 && k < x.length - 4 ? '*' : j;
                    });
                }(this.phone = o.phone));

                this.mincash = o.minCash;

                this.elCardtype.attr('src', function (boundType) {
                    switch (boundType) {
                        case 'BANK':
                            return '../img/app2/ic_bank_yl.png';
                        case 'ALIPAY':
                            return '../img/app2/ic_bank_zfb.png';
                        case 'WX':
                            return '../img/app2/ic_bank_wx.png';
                    }
                }(o.boundType));
            }
        },
        getCode: function () {
            var can = true,
                $item = this.elGetcode,
                params;

            if ($item.hasClass('disabled')) return;

            if (can) {

                // $.get(this.cgi.code, params, this.proxy(this.getCodeBack));
                $.ajax({
                    url: gConfig.PROJECT_REBATE+'/api/rebateuser/userCashMsg',
                    type: 'get',
                    headers: { 'A-CID': gConfig.ACID },
                    data: { phone: this.phone },
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

            can = can && this.chkAmount();

            can = can && this.chkCode();

            if (can) {
                params = {
                    account: this.account,
                    money: this.elAmount.val(),
                    phone: this.phone,
                    valiCode: this.elCode.val()
                }

                // $.post(this.cgi.submit, params, this.proxy(this.submitBack));
                $.ajax({
                    url: gConfig.PROJECT_REBATE+'/api/rebateuser/auditCashSubmit',
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
            if (result && +result.code === 1000) {
                tip.show('您已提交提现申请，预计3个工作日左右到账，请留意查收');
                setTimeout(function () {
                    window.location.href = 'user_income.html';
                }, 3000);
            } else {
                tip.show(result.desc);
            }

            // this.isSubmit = false;
        },
        chkAmount: function () {
            var $e = this.elAmount,
                val = $e.val();
            if (Tools.isEmpty(val)) {
                this.showErr('请输入提现金额');
                return false;
            } else if (!Tools.isAmount(val)) {
                this.showErr('提现金额格式错误');
                return false;
            } else if (+val < this.mincash) {
                this.showErr('提现金额不得低于' + this.mincash + '元');
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

    new WithDrawals();

})(window.Zepto);