import messBox from './mess-box'

const payOrigin = window.location.origin

/**
 * 扫码支付
 * */
export class scanPay {
    constructor({ lessonId, feeId, callback }) {
        this.callback = callback;
        // const generateRdFnName = (() => {
        //     let index = 0
        //     return function () {
        //         return `cbFunName_${index++}_${Date.now()}`
        //     }
        // })()

        http.post(`${gConfig.PROJECT_ACTIVITY}/api/lesson/apply`, {
            lessonId: lessonId,
            feeId: feeId,
        }).then(data => {
            const payType = data.data.data.payType;
            this.payType = payType;
            this.payNo = data.data.data.payNo;
            this.orderNo = data.data.data.orderNo;
            this.wxpay({
                content: data.data.data.sign.content
            })
        })
    }

    /**
     * 微信支付
     */
    wxpay(obj) {

        let checkCount = 0;
        const checkPaySuccess = () => {
            checkCount++
            http.get(`${gConfig.PROJECT_ACTIVITY}/api/lesson/payresults`, {
                payNo: this.payNo
            }, { noTips: true }).then(({ data:{code, data} }) => {
                if (code === 1000) {
                    if (data && data.payStatus === 'SUCCESS') {
                        this.callback({
                            status: data.payStatus
                        })
                    } else {
                        this.callback({
                            status: data.payStatus
                        })
                    }
                } else {
                    setTimeout(checkPaySuccess, 1000)
                    if (checkCount >= 4 && data) {
                        this.callback({
                            status: data.payStatus
                        })
                    } else if (!data) {
                        alert("支付失败")
                    }
                }
            })
        }


        const invokeWXPay = content => {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": content.appId, //公众号名称，由商户传入
                    "timeStamp": content.timeStamp, //时间戳，豪秒数
                    "nonceStr": content.nonceStr, //随机串
                    "package": content.package,
                    "signType": content.signType, //微信签名方式
                    "paySign": content.sign //微信签名
                }, res => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        checkPaySuccess()
                    } else if (/cancel/.test(res.err_msg)) {
                        messBox.tips('支付已取消');
                    } else if (/fail/.test(res.err_msg)) {
                        messBox.tips(`支付失败【${res.err_msg}】`);
                    } else {
                        messBox.tips(res.err_msg);
                    }
                }
            )
        }

        const doPay = () => {
            invokeWXPay(obj.content)
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', doPay, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', doPay);
                document.attachEvent('onWeixinJSBridgeReady', doPay);
            }
        } else {
            doPay()
        }

    }

    getOrder() {

    }
}

export class B2COrderPay {

    constructor({ payType, payNo }) {
        this.payType = payType
        this.payNo = payNo
        // this.needPay = needPay
        switch (payType) {
            case 'WX':
                this.wxpay()
                break
            case 'ALIPAY':
                this.goPay()
                break
            // case 'BALANCE':
            //     this.balancePay()
            //     break
        }
    }

    goPay() {
        return
        location.replace(`${gConfig.PROJECT_ORDER}/api/orderpay/wapAlipayPaySign?payNo=${this.payNo}&payType=${this.payType}`)
    }

    /**
     * 微信支付
     */
    wxpay() {
        if (!/^\/checkout\//.test(location.pathname)) {
            // 不在checkout目录下不能进行微信支付，所以进行跳转
            window.location.replace(`/checkout/scan-pay.html#!/index?wxpay=1&payNo=${this.payNo}`)
            return
        }

        let checkCount = 0;
        const checkPaySuccess = () => {
            checkCount++
            http.post(`/retail-user-app-acc/api/scan/orders/${this.payNo}/pay-result`, {},{ noTips: true }).then(({ data:{code, data} }) => {
                if (code === 1000 && data.status == 2) { // 支付成功
                    location.replace('/scan.html#!/pay-success?payNo=' + this.payNo)
                } else {
                    setTimeout(checkPaySuccess, 1500)
                    if (checkCount >= 4 && data) {
                        location.href = '/scan.html#!/order-detail/' + this.payNo
                    } else if (!data) {
                        alert('请到订单页查询支付情况')
                    }
                }
            })
        }


        const invokeWXPay = content => {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": content.appId, //公众号名称，由商户传入
                    "timeStamp": content.timeStamp, //时间戳，豪秒数
                    "nonceStr": content.nonceStr, //随机串
                    "package": content.package,
                    "signType": content.signType, //微信签名方式
                    "paySign": content.sign //微信签名
                }, res => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        checkPaySuccess()
                    } else if (/cancel/.test(res.err_msg)) {
                        messBox.tips('支付已取消');
                    } else if (/fail/.test(res.err_msg)) {
                        messBox.tips(`支付失败【${res.err_msg}】`);
                    } else {
                        messBox.tips(res.err_msg);
                    }
                }
            )
        }

        http.post(`/retail-user-app-acc/api/orders/${this.payNo}/payment/wx`, {
            clientType: 3,
            callBackUrl: payOrigin + '/scan.html#!/pay-success?payNo=' + this.payNo,
        },{
            emulateJSON: false
        }).success(({ code, data, desc }) => {
            if (code === 1000 && data && data.result_code === 'SUCCESS') {
                const doPay = () => {
                    console.log(data.content)
                    invokeWXPay(data.content)
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', doPay, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', doPay);
                        document.attachEvent('onWeixinJSBridgeReady', doPay);
                    }
                } else {
                    doPay()
                }
            } else {
                messBox.tips(`支付失败:【${data.result_msg}】`);
            }
        })

    }

    /**
     * 余额支付
     */
    balancePay() {
        messBox.confirm(`确认使用余额支付${this.needPay}元？`).then(() => {
            http.get(`${gConfig.PROJECT_ORDER}/api/order/balancePay`, {
                payNo: this.payNo
            }).success(({ code }) => {
                if (code === 1000) {
                    location.replace('/paysuccess.html?payNo=' + this.payNo)
                }
            })
        }).catch(() => {
            location.href = '/order.html#!/list/1'
        })
    }
}

/**
 * 调起微信支付
 * @param content 微信支付签名
 * @returns {Promise}
 */
function invokeWXPay(content) {
    return new Promise((resolve, reject) => {
        const doPay = () => {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": content.appId, //公众号名称，由商户传入
                    "timeStamp": content.timeStamp, //时间戳，豪秒数
                    "nonceStr": content.nonceStr, //随机串
                    "package": content.package,
                    "signType": content.signType, //微信签名方式
                    "paySign": content.sign //微信签名
                }, res => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        resolve()
                    } else if (/cancel/.test(res.err_msg)) {
                        reject('支付已取消')
                    } else if (/fail/.test(res.err_msg)) {
                        reject(`支付失败【${res.err_msg}】`)
                    } else {
                        reject(res.err_msg)
                    }
                }
            )
        }
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', doPay, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', doPay);
                document.attachEvent('onWeixinJSBridgeReady', doPay);
            }
        } else {
            doPay()
        }
    })
}

/**
 * 与后台验证是否支付成功
 * @param payNo 支付单号
 * @param businessType 业务渠道
 * @returns {Promise}
 */
export function verifySvipPayResult({ payNo, businessType }) {
    return new Promise((resolve, reject) => {
        let checkCount = 0;
        const checkPaySuccess = () => {
            checkCount++
            http.get(`${gConfig.PROJECT_USER}/api/svip/payResult`, {
                payNo,
                businessType,
            }, { noTips: true }).then(({ data:{code, data} }) => {
                if (code === 1000 && data.payStatus === 'PAYOVER') {
                    resolve()
                } else if (checkCount >= 4) {
                    reject()
                } else {
                    setTimeout(checkPaySuccess, 1000)
                }
            })
        }
        checkPaySuccess()
    })
}

