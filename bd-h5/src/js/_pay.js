/**
 * pay.js
 */
(function ($) {

    var tip;

    var isWeixin = Base.Browser.type === 'weixin' && Base.Browser.version >= 5.0 && !Base.url.param('wxfail');

    var isTest = /^http(s)?:\/\/test/.test(window.location.href);
    var payOrigin = window.location.origin

    var Pay = Base.klass.create({
        elements: {
            '.j-paytype-item': 'elPaytypeItem',

            '.j-act-submit': 'elActSubmit'
        },
        events: {
            'click .j-paytype-item': 'clickPaytypeItem',

            'click .j-act-cancel': 'clickCancel',
            'click .j-act-submit': 'clickSubmit'
        },
        init: function () {
            this.orderNo = Base.url.param('orderNo');
            this.payNo = Base.url.param('payNo');

            if (!this.orderNo && !this.payNo) {
                tip.show('缺少订单参数');
                setTimeout(function () {
                    window.history.go(-1);
                }, 3000);
            }

            if (!this.payNo) {
                //this.initPayType();
                $.ajax({
                    url: gConfig.PROJECT_ORDER + '/api/orderpay/gopay',
                    type: 'get',
                    headers: { 'A-CID': gConfig.ACID },
                    data: {
                        orderNo: this.orderNo,
                    },
                    success: function (result) {
                        this.payNo = result.data.payNo
                    }.bind(this)
                })
                this.isSubmit = false;
            }
        },

        getPayType: function () {
            return this.el.find('.j-paytype-item').filter('.checked').attr('data-value');
        },
        clickCancel: function () {
            window.history.go(-1);
        },
        clickSubmit: function () {
            if (this.elActSubmit.hasClass('disabled')) return;
            this.payType = this.getPayType()
            this.do(this.payType, this.orderNo);
        },
        clickPaytypeItem: function (e) {
            var $e = $(e.currentTarget);
            $e.addClass('checked').siblings().removeClass('checked');
        },
        disable: function () {
            this.elActSubmit.addClass('disabled').text('提交中...');
        },
        enable: function () {
            this.elActSubmit.removeClass('disabled').text('确认');
        },
        do: function (type, orderNo) {
//			switch (+type) {
//				case 1:
//					this.alipaymobile();
//					break;
//				case 2:
//					this.wxpay();
//					break;
//				case 3:
//					this.alipaypc();
//					break;
//				case 4:
//					this.unionpay();
//					break;
//				case 5:
//					this.yjfpay();
//					break;
//				case 10:
//					this.alipayglobalmobile();
//					break;
//			}
//			return;


            //3.2
            switch (type) {
                case 'WX':
                    this.wxpay();
                    break;
                case 'ALIPAY':
                    this.goPay(type)
                    break;
                case 'YZF':
                    this.yzfPay(type)
                    break;
                case 'UNION':
                    this.unionPay(type)
                    break;
            }

        },
        goPay: function (payType) {
            location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/wapAlipayPaySign?payNo=' +
                this.payNo +
                '&payType=' + payType
            )
        },
        doWxPay: function () {
            this.do(2, this.orderNo);
        },
        yzfPay: function(payType){
            location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/wapOrderYZFPaySign?payNo=' +
                this.payNo +
                '&payType=' + payType
            )
        },
        unionPay: function(payType){
            location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/wapUionPaySign?payNo=' +
                this.payNo +
                '&payType=' + payType
            )
        },

        /**
         * 微信支付
         */
        wxpay: function () {
            var self = this,
                href,
                params,
                o;
            var payNo = this.payNo
            params = {
                orderNo: this.payNo,
                _: new Date - 0
            };
            var checkCount = 0;

            function checkPaySuccess() {
                checkCount++
                $.get(gConfig.PROJECT_ORDER + '/api/orderpay/payresults', {
                    payNo: payNo
                }, function (result) {
                    if (result.code === 1000) {
                        location.href = '/paysuccess.html?payNo=' + payNo;
                    } else {
                        setTimeout(checkPaySuccess, 1000)
                        if (checkCount >= 4 && result.data) {
                            location.href = '/order.html#!/detail_pay/' + result.data.orderNo
                        } else if (!result.data) {
                            alert('请到订单页查询支付情况')
                        }
                    }
                })
            }

            function doPay() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": o.appId, //公众号名称，由商户传入
                        "timeStamp": o.timeStamp, //时间戳，豪秒数
                        "nonceStr": o.nonceStr, //随机串
                        "package": o.package,
                        "signType": o.signType, //微信签名方式
                        "paySign": o.sign //微信签名
                    },
                    function (res) {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            checkPaySuccess()
//                            location.href = '/paysuccess.html?payNo=' + payNo;
                        } else if (/cancel/.test(res.err_msg)) {
                            tip.show('支付已取消');
                        } else if (/fail/.test(res.err_msg)) {
                            tip.show('支付失败【' + res.err_msg + '】');
                        } else {
                            tip.show(res.err_msg);
                        }
                        self.enable();
                    }
                );
            }

            $.get(gConfig.PROJECT_ORDER + '/api/orderpay/wapWxPaySign', {
                payNo: this.payNo,
                payType: this.payType,
            }, function (result) {
                if (result.code === 1000 && result.data && result.data.result_code === 'SUCCESS') {
                    o = result.data.content;

                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', doPay, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', doPay);
                            document.attachEvent('onWeixinJSBridgeReady', doPay);
                        }
                    } else {
                        doPay();
                    }
                } else {
                    tip.show('调用微信支付接口失败:【' + result.desc + '】');
                    self.enable();
                }
            });
        },

        /**
         * 余额支付
         */
        balancepay: function () {
            $.get('/api/order/balancePay.jsp', { orderNo: this.orderNo }, function (result) {
                if (result.errCode === 0) {
                    location.href = '/paysuccess.html?orderNo=' + this.orderNo;
                } else {
                    tip.show(result.errMsg);
                }
            });
        }

    });

    var PaymentMethod = Base.klass.create({
        tpl: '<li class="j-paytype-item <%=isDefault%>" data-value="<%=ptype%>">\
                <span class="checker"></span><%=ptname%>\
             </li>',
        init: function () {
            // var params = this.
            var otype = Base.url.param('orderType');
            var params = {
                _: +(new Date()),
                otype: otype,
                orderNo: Base.url.param('orderNo')
            };

            if (Base.url.param('wxpay') === '1') {
                this.wxpay = true
                setTimeout(function () {
                    pay.doWxPay()
                })
            }


            $.get(gConfig.PROJECT_ORDER + '/api/orderpay/payTypeList', params, this.proxy(this.render));
        },
        render: function (result) {
            var innerHtml = '';
            if (result.code === 1000) {
                result.data.forEach(function (item) {
                    var defaultpay = item.defaultpay
                    if (this.wxpay) {
                        defaultpay = item.ptype === 'WX'
                    }
                    innerHtml += this.tmpl(this.tpl, $.extend({}, item, {
                        isDefault: defaultpay ? 'checked' : ''
                    }))
                }.bind(this));
                this.el.html(innerHtml);
            } else {
                tip.show(result.desc);
            }
        }
    });

    tip = new Base.Widget.Tip();


    new PaymentMethod({
        el: '.j-paytype-list'
    });


    var pay = new Pay();

    Base.url.coverFrom();

})(window.Zepto);