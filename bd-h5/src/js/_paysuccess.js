/**
 * paysuccess
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
        isID: function () {
            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
            function IdCardValidate(idCard) {
                idCard = trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格
                if (idCard.length == 15) {
                    return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
                } else if (idCard.length == 18) {
                    var a_idCard = idCard.split(""); // 得到身份证数组
                    if (a_idCard[17] == 'x') {
                        return false;
                    }
                    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            /**
             * 判断身份证号码为18位时最后的验证位是否正确
             * @param a_idCard 身份证号码数组
             * @return
             */
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0; // 声明加权求和变量
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i]; // 加权求和
                }
                valCodePosition = sum % 11; // 得到验证码所位置
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            }

            /**
             * 验证18位数身份证号码中的生日是否是有效生日
             * @param idCard 18位书身份证字符串
             * @return
             */
            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题
                if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }

            /**
             * 验证15位数身份证号码中的生日是否是有效生日
             * @param idCard15 15位书身份证字符串
             * @return
             */
            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
                if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }

            //去掉字符串头尾空格
            function trim(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }


            /**
             * 通过身份证判断是男是女
             * @param idCard 15/18位身份证号码
             * @return 'female'-女、'male'-男
             */
            function maleOrFemalByIdCard(idCard) {
                idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。
                if (idCard.length == 15) {
                    if (idCard.substring(14, 15) % 2 == 0) {
                        return 'female';
                    } else {
                        return 'male';
                    }
                } else if (idCard.length == 18) {
                    if (idCard.substring(14, 17) % 2 == 0) {
                        return 'female';
                    } else {
                        return 'male';
                    }
                } else {
                    return null;
                }
            }

            return IdCardValidate;
        }()
    };
    new Vue({
        el: '#advert',
        data: {
            imageUrl: "",
            hrefUrl: "",
            isShow: false,
            type: 0
        },
        methods: {
           close: function() {
                var now = Date.now()
                this.isShow = false;
                localStorage.setItem('advertLocal' + this.type,JSON.stringify({ time: now,isOpen: true} ))
            }
        },
        ready: function() {
            var _this = this;
            $.ajax({
                url: gConfig.PROJECT_CONTENT + '/api/advertlocation/getAdvertLocal',
                data: {
                    showType: 0,
                },
                success: function(data) {
                    data = data.data;
                    if(data) {
                        _this.imageUrl = data.imageUrl || '';
                        _this.hrefUrl = data.hrefUrl;
                    }
                    var now = Date.now()
                    if(data && data.frequency != 2){
                        var advertLocal = "" //初始化
                        if (localStorage.getItem('advertLocal' + _this.type)) {
                            advertLocal = JSON.parse(localStorage.getItem('advertLocal' + _this.type))
                        }
                        if(!advertLocal){
                            _this.isShow = true;
                            localStorage.setItem('advertLocal' + _this.type,JSON.stringify({ time: now} ))
                        }
                        if(advertLocal && data.frequency === 2 && (now - advertLocal.time) > 24 * 60 * 60 * 1000){
                            _this.isShow = true;
                            localStorage.setItem('advertLocal' + _this.type,JSON.stringify({ time: now} ))
                        }
                        if(advertLocal && data.frequency === 0 && !advertLocal.isOpen){
                            _this.isShow = true;
                            localStorage.setItem('advertLocal' + _this.type,JSON.stringify({ time: now} ))
                        }
                    }else{
                        _this.isShow = true;
                    }
                    _this.isShow = _this.isShow && !sessionStorage.getItem('channel') // 非渠道才显示广告
                    console.log(_this.isShow)
                }
            })
        }
    })

    var Paysuccess = Base.klass.create({
        elements: {
            '.j-success-tip': 'elSuccessTip',
            '.j-recover-tip': 'elRecoverTip',

            '.j-input-name': 'elName',
            '.j-input-idcard': 'elIdcard',
            '.j-pre-money': 'preMoney',
            '.j-tip':'tip',
            '.j-coupon-desc': 'couponDesc',
            '.j-coupon-img': 'couponImg',
            '.j-redirect-button': 'redirectButton',
            '.lottery-mask': 'lotteryMask',
            '.lottery-mask-button': 'lotteryButton',
        },
        events: {
            'click .j-act-submit': 'clickSubmit',
            'click .j-confirm': 'clickConfirm',
            'click .j-close': 'clickClose',
        },
        cgi: {
            one: '/api/order/getOrderById.jsp',
            submit: '/api/order/updateOrder.jsp'
        },
        isDownPay: false, // 是否是支付定金成功页
        init: function () {

//            tip.show('确认收货后您将获得金豆和成长值')
            this.payNo = Base.url.param('payNo');
            this.cacheObj = null;

            this.loadlayer = new Base.Widget.Loadlayer({
                owner: 'body'
            });

            this.getOne();
            this.getPopup();

        },
        clickSubmit: function () {
            this.submit();
        },
        clickConfirm: function () {
            $('.j-mask').addClass("hide")
        },
        clickClose: function () {
            $('.j-mask').addClass("hide")
        },
        getShareCoupon: function () {
            $.ajax({
                type: 'get',
                url: gConfig.PROJECT_MARKETING + '/api/payActivity/shareCoupons',
                data: { payNo: this.payNo },
                success: function (result) {
                    if (result && result.code === 1000 && Base.cookie('act_chan') != 'MHAH' ) {
                        var coupon = result.data;
                        if (!coupon)  return
                        $('.share-coupon .desc').text(coupon.coupontips)
                        $('.share-coupon .img b').text(coupon.couponfree)
                        $('.share-coupon').removeClass('hide').show()
                        if (Base.Browser.type === 'weixin' && !this.isDownPay) { //非微信端支付成功后，隐藏分享红包的按钮
                            $('.share').removeClass('hide').show()
                        }
                        // setTimeout(function () { // 预付卡返现支付弹窗
                        //     if (this.cacheObj.preCardReduceMoney > 0) {
                        //         $('.j-pre-money').text(this.cacheObj.preCardReduceMoney)
                        //         $('.j-mask').removeClass('hide').show()
                        //     }
                        // }.bind(this), 1000)
                        wx.ready(function () {
                            var data = {
                                'title': coupon.title,
                                'imgUrl': coupon.imgUrl,
                                'desc': coupon.description,
                                'link': coupon.shareUrl
                            }

                            wx.onMenuShareAppMessage(data);

                            wx.onMenuShareTimeline(data);

                            wx.onMenuShareQQ(data);

                            wx.onMenuShareWeibo(data);
                        });
                    }
                }.bind(this)
            })

            $('.share').click(function () {
                $(".j-wxtips-mark").show()
            })
        },
        getOne: function () {
            var params;

            if (this.payNo) {
                params = {
                    payNo: this.payNo,
                }
                this.loadlayer.show();
                $.ajax({
                    type: 'get',
                    url: gConfig.PROJECT_ORDER + '/api/orderpay/payresults',
                    data: params,
                    success: function (result) {
                        this.loadlayer.hide();
                        if (result.data.payStatus === 'SUCCESS') {
                            this.cacheObj = result.data;
                            var isDownPay = this.isDownPay = result.data.prePeriod === 1 // 是否是支付定金成功页
                            if(isDownPay) {
                                this.couponDesc.hide()
                                this.couponImg.hide()
                                this.redirectButton.attr('onclick', "location.href='order.html#!/list/1'")
                            }
                            this.showSuccess();
                        }
                    }.bind(this)
                })
            } else {
                this.showSuccess();
            }
        },
        getPopup: function () {
            var params;

            if (this.payNo) {
                params = {
                    payNo: this.payNo,
                }
                this.loadlayer.show();
                $.ajax({
                    type: 'get',
                    url: '/bd-activity/api/treasure/queryPop',
                    data: params,
                    success: function (result) {
                        this.loadlayer.hide();
                        if(result.code == 1000 && result.data) {
                            $('.lottery-mask .title').text(result.data.popupDes || '')
                            $('.lottery-mask .imglink').attr('src', result.data.imagLink || '')
                            $('#lottery-mask').show()
                            $('#lotterybtn').click(function() {
                                location.href = result.data.popupLink
                            })
                            $('#cancelLottery').click(function() {
                                $('#lottery-mask').hide()
                            })
                        }
                        
                    }.bind(this)
                })
            } else {
                this.showSuccess();
            }
        },
        // getOneBack: function (result) {
        //     var o;
        //
        //     if (result && +result.code === 1000) {
        //         o = this.cacheObj = result.data;
        //         this.showSuccess();
        //
        //         // 如果是需要填写身份信息
        //         if (/(IDCARD_ERROR|IDCARD_NULL)/.test(o.waithandling)) {
        //             this.showRecover();
        //         } else {
        //         }
        //     } else {
        //         tip.show(result.errMsg);
        //     }
        //
        //     this.loadlayer.hide();
        // },
        chkName: function () {
            var $e = this.elName,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请填写收货人姓名');
                return false;
            }

            return true;
        },
        chkIdcard: function () {
            var $e = this.elIdcard,
                val = $e.val();

            if (Tools.isEmpty(val)) {
                this.showErr('请填写收货人身份证');
                return false;
            } else if (!Tools.isID(val)) {
                this.showErr('身份证号码格式错误');
                return false;
            }

            return true;
        },
        showErr: function (s) {
            tip.show(s);
        },
        showSuccess: function () {
            this.elSuccessTip.removeClass('hide');
            this.elRecoverTip.addClass('hide');
            if(this.cacheObj.memberScore){
                this.tip.text('签收后立获' + this.cacheObj.memberScore +'积分')
            }
            if (this.isGroupon()) {
                window.location.href = '/groupon.html#!/join-status/' + this.cacheObj.groupOpenId;
                return;
            }
            // if (Base.Browser.type === 'weixin') {
            this.getShareCoupon();
            // }

        },
        showRecover: function () {
            this.elName.val(this.cacheObj.rname);
            this.elSuccessTip.addClass('hide');
            this.elRecoverTip.removeClass('hide');
        },
        isGroupon: function () {
            return !!this.cacheObj.groupOpenId;
        }
    });

    tip = new Base.Widget.Tip();

    new Paysuccess();

})(window.Zepto);