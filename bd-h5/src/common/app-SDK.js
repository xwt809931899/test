/**
 * Created by lred on 2016/3/25.
 */
import cookie from './cookie'
var isApp = !!cookie.get(gConfig.appCookieKey)

/**
 * 生成随机方法名
 */
const generateRdFnName = (() => {
    let index = 0
    return function () {
        return `cbFunName_${index++}_${Date.now()}`
    }
})()

function openLogin() {
    var appJson = {
        type: 440,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    setInterval(() => {
        if (cookie.get('sid')) {
            location.reload()
        }
    }, 100)
}

function openRebateHome() {
    var appJson = {
        type: 140,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

function hideShareBtn() {
    var appJson = {
        type: 605,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}
/*悦客直接向我的团队成员转赠优惠券*/
function giveCoupon(coupon) {
    var appJson = {
        type: 564,
        obj: {
            uin: coupon.uin
        }
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

function goHome() {
    const appJson = {
        type: 100,
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

/**
 * 跳转到订单列表
 * @param index 0,1,2,3分别为（全部，待处理，待收货，已完成）
 * @param tab tab=0,1,2分别为（商城，到家，卡劵）
 */
function goOrderListByAll({ index = 0, tab = 0 }={}) {
    const appJson = {
        type: 400,
        obj: {
            index,
            tab,
        }
    }
    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
}

function goPay({ payNo, payType, businessType, instalNum }) {
    return new Promise((resolve, reject) => {
        const cbFunName = generateRdFnName() // 回调函数
        window[cbFunName] = function (data) {
            delete window[cbFunName]
            if (data === 'success') {
                resolve(data)
            } else {
                reject(data)
            }
        }
        const appJson = {
            type: 800,
            obj: {
                payNo,
                payType,
                businessType,
                cbFunName,
                instalNum,
            },
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    })
}

function chooseImg({ count = 1 }={}) {
    return new Promise((resolve, reject) => {
        const cbFunName = generateRdFnName() // 回调函数
        window[cbFunName] = function (data) {
            delete window[cbFunName]
            resolve(data)
        }
        const appJson = {
            type: 907,
            obj: {
                count,
                cbFunName,
            },
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    })
}

/**
 * 一维码
 */
function scanBarCode() {
    return new Promise((resolve, reject) => {
        const cbFunName = generateRdFnName() // 回调函数
        window[cbFunName] = function (data) {
            delete window[cbFunName]
            resolve(data)
        }
        const appJson = {
            type: 908,
            obj: {
                cbFunName,
            },
        }
        window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
    })
}

export default {
    isApp,
    openLogin,
    openRebateHome,
    hideShareBtn,
    giveCoupon,
    goPay,
    goHome,
    goOrderListByAll,
    chooseImg,
    scanBarCode
}
