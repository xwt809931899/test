import messBox from './mess-box'
import appSDK from './app-SDK'

const payOrigin = window.location.origin

export class B2COrderPay {

    constructor({ payType, payNo, needPay, instalNum = 0 }) {
        this.payType = payType
        this.payNo = payNo
        this.needPay = needPay
        this.instalNum = instalNum
        switch (payType) {
            case 'WX':
                this.wxpay()
                break
            case 'ALIPAY':
                this.goPay()
                break
            case 'BALANCE':
                this.balancePay()
                break
            case 'YZF':
                this.yzfPay()
                break
            case 'UNION':
                this.unionPay()
                break
            case 'HBPAY':
                this.hbPay()
                break
            case 'CCBPAY':
                this.ccbpay()
                break
        }
    }

    goPay() {
        location.replace(`${gConfig.PROJECT_ORDER}/api/orderpay/wapAlipayPaySign?payNo=${this.payNo}&payType=${this.payType}`)
    }

    /**
     * 微信支付
     */
    wxpay() {
        if (!/^\/checkout\//.test(location.pathname)) {
            // 不在checkout目录下不能进行微信支付，所以进行跳转
            window.location.replace(`/checkout/pay.html?wxpay=1&payNo=${this.payNo}&needPay=${this.needPay}`)
            return
        }

        let checkCount = 0;
        const checkPaySuccess = () => {
            checkCount++
            http.get(`${gConfig.PROJECT_ORDER}/api/orderpay/payresults`, {
                payNo: this.payNo
            }, { noTips: true }).then(({ data:{code, data} }) => {
                if (code === 1000) {
                    location.replace('/paysuccess.html?payNo=' + this.payNo)
                } else {
                    setTimeout(checkPaySuccess, 1000)
                    if (checkCount >= 4 && data) {
                        location.href = '/order.html#!/detail_pay/' + data.orderNo
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

        http.get(`${gConfig.PROJECT_ORDER}/api/orderpay/wapWxPaySign`, {
            payNo: this.payNo,
            payType: this.payType,
        }).success(({ code, data, desc }) => {
            if (code === 1000 && data && data.result_code === 'SUCCESS') {
                const doPay = () => {
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
                messBox.tips(`支付失败:【${desc}】`);
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

    /**
     * 翼支付
     */
    yzfPay() {
        // location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/orderPaySignByYzfPc?payNo=' +
        location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/wapOrderYZFPaySign?payNo=' +
            this.payNo +
            '&payType=' + this.payType
        )
    }

    /**
     * 银联支付
     */
    unionPay() {
        // location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/orderPaySignByUionPc?payNo=' +
        location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/wapUionPaySign?payNo=' +
            this.payNo +
            '&payType=' + this.payType
        )
    }

    /**
     * 和包支付
     */
    hbPay(){
        location.replace(gConfig.PROJECT_ORDER + '/api/orderpay/wapHBPaySign?payNo=' +
            this.payNo +
            '&payType=' + this.payType
        )
    }

    /**
     * 龙支付
     */
    ccbpay(){
        // location.replace(gConfig.PROJECT_ORDER + `/api/orderpay/ccbWapPaySign?payNo=${this.payNo}&payType=${this.payType}&instalNum=${this.instalNum}`)
        http.get(`${gConfig.PROJECT_ORDER}/api/orderpay/ccbAppPaySign2`, {
            payNo: this.payNo,
            payType: this.payType,
            instalNum: this.instalNum
        }).then(({ data:{code, data} }) => {
            if (code === 1000) {
                location.replace(data)
            } else {
                messBox.tips(`支付失败:【${desc}】`);
            }
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
export function verifyPayResult({ payNo, businessType }) {
    return new Promise((resolve, reject) => {
        let checkCount = 0;
        const checkPaySuccess = () => {
            checkCount++
            http.get(`${gConfig.PROJECT_MARKETING}/api/sellCoupon/queryOrderPayResult`, {
                payNo,
                businessType,
            }, { noTips: true }).then(({ data:{code, data} }) => {
                if (code === 1000 && data.payStatus === 'PAYOVER') {
                    resolve(data)
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

/**
 * 通用支付
 * @param payNo 支付单号
 * @param payType 支付方式
 * @param businessType 业务类型
 */
export function commonDoPay({ payNo, payType, businessType, instalNum }) {
    /**
     * 支付成功统一处理函数
     */
    function success() {
        location.replace(`/checkout/common-pay.html?payNo=${payNo}#!/pay-success`)
    }

    /**
     * 支付失败统一处理函数
     */
    function error() {
        messBox.tips('支付失败')
    }

    if (appSDK.isApp) {
        // 调起APP支付
        appSDK.goPay({ payNo, payType, businessType, instalNum }).then((data) => {
            return verifyPayResult({
                payNo,
                businessType,
            })
        }).then(() => {
            success()
        }).catch(() => {
            error()
        })
        return
    }
    if (payType === 'ALIPAY') {
        location.href = `${gConfig.PROJECT_MARKETING}/api/sellCoupon/wapAlipayPaySign?payNo=${payNo}&payType=${payType}&businessType=${businessType}`
    }
    if(payType ==='YZF'){
        // 翼支付
        location.href = `${gConfig.PROJECT_MARKETING}/api/sellCoupon/webYzfPaySign?payNo=${payNo}&payType=${payType}&businessType=${businessType}`
    }
    if(payType ==='UNION'){
        // 银联支付
        location.href = `${gConfig.PROJECT_MARKETING}/api/sellCoupon/wapUionPaySign?payNo=${payNo}&payType=${payType}&businessType=${businessType}`
    }
    if(payType === 'CCBPAY') {
        http.get(`${gConfig.PROJECT_MARKETING}/api/sellCoupon/ccbAppPaySign2`, {
            payNo: payNo,
            payType: payType,
            instalNum: instalNum
        }).then(({ data:{code, data} }) => {
            if (code === 1000) {
                location.replace(data)
            } else {
                messBox.tips(`支付失败:【${desc}】`);
            }
        })
    }
    if (payType === 'WX') {
        if (!/^\/checkout\//.test(location.pathname)) {
            // 不在checkout目录下不能进行微信支付，所以进行跳转
            window.location.href = `/checkout/common-pay.html?wxpay=1&payNo=${payNo}#!/index/${businessType}`
            return
        }
        http.get(`${gConfig.PROJECT_MARKETING}/api/sellCoupon/wapWxPaySign`, {
            payNo,
            payType,
            businessType,
        }).success(({ code, data, desc }) => {
            if (code === 1000 && data && data.result_code === 'SUCCESS') {
                invokeWXPay(data.content).then(() => {
                    return verifyPayResult({
                        payNo,
                        businessType,
                    })
                }).then(() => {
                    success()
                }).catch(() => {
                    error()
                })
            } else {
                error()
            }
        })
    }
}
