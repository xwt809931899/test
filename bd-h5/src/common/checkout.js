/**
 * Created by lred on 2016/5/15.
 */
//module.exports = function (errCode, obj) {
//    switch (errCode) {
//        // 未登录
//        case 101:
//            location.href = `/login.html?sourceurl=${encodeURIComponent(location.href)}`
//            break
//        // 没有收货地址
//        case 601:
//            location.href = '/cart-pay.html#!/address-edit/' + obj
//            break
//        // 成功
//        case 0:
//            location.href = '/cart-pay.html#!/checkout/' + obj
//            break
//        default:
//            return true
//    }
//}
export function showFeePage(props, group) {
    window.sessionStorage.setItem('props', JSON.stringify(props));

    if (group && group.groupId) {
        window.sessionStorage.setItem('checkout-groupId', group && group.groupId)
    } else {
        window.sessionStorage.removeItem('checkout-groupId')
    }
    if (group && group.groupOpenId) {
        window.sessionStorage.setItem('checkout-groupOpenId', group && group.groupOpenId)
    } else {
        window.sessionStorage.removeItem('checkout-groupOpenId')
    }
    location.href = '/cart-pay.html#!/checkout'
}
