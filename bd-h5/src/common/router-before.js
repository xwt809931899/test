/**
 * Created by lred on 2016/5/12.
 */
import wxTool from './wx.tool'
import store from 'store'
import appSDK from 'common/app-SDK'


import { getRebaseUserInfo, getUserInfo } from 'store/actions/user'

const User = store.state.user

function getUserData(removePoint = false) {
    if (User.info && !removePoint) {
        return new Promise((resolve, reject) => {
            resolve(User.info)
        })
    }
    const params = {}
    if (removePoint) {
        params.removePoint = 1
    }

    return getUserInfo(store).then(() => {
        return User.info
    })
}

function toLogin() {
    if (appSDK.isApp) {
        appSDK.openLogin()
    } else {
        window.location.replace(`/login.html?sourceurl=${encodeURIComponent(window.location.href)}`)
    }
}

function hook(router) {

    // 是否需要登录
    router.beforeEach(transition => {
        switch (transition.to.auth) {
            case 'wx': {
                // 只支持微信登录方式

                getUserData(transition.to.removePoint).then(obj => {
                    if (obj.isLogin) {
                        transition.next()
                    } else {
                        window.location.replace(`${gConfig.PROJECT_USER}/api/users/h5WxLogin?sourceurl=${encodeURIComponent(window.location.href)}`)
                    }
                }, function () {
                    window.location.replace(`${gConfig.PROJECT_USER}/api/users/h5WxLogin?sourceurl=${encodeURIComponent(window.location.href)}`)
                })


                break
            }
            case 'rebate': {
                if (User.rebaseInfo) {
                    transition.next()
                } else {
                    getRebaseUserInfo(store).then(({ data }) => {
                        if (data.code === 1003) {
                            // 未登录
                            window.location.replace(`/rebate/login.html?sourceurl=${encodeURIComponent(window.location.href)}`)
                        } else if (User.rebaseInfo) {
                            transition.next()
                        } else {
                            // 已登录 但不是返利用户，跳转到注册页
                            window.location.replace(`/rebate/register.html?sourceurl=${encodeURIComponent(window.location.href)}`)
                        }
                    })
                }
                break
            }
            case 'all': {
                // 所有登录方式
                getUserData(transition.to.removePoint).then(obj => {
                    if (obj.isLogin) {
                        transition.next()
                    } else {
                        toLogin()
                    }
                }, function () {
                    toLogin()
                })

                break
            }
            default: {
                transition.next()
                break
            }
        }
    })

    // 设置title
    router.beforeEach(transition => {
        wxTool.setTitle(transition.to.title || '')
        transition.next()
    })

    // 滚动条
    router.beforeEach(transition => {
        window.scrollTo(0, 0)
        document.querySelector("#wrapper").scrollTop = 0
        transition.next()
    })

    // 清除 mess-box 的内容
    router.beforeEach(transition => {
        $('.al-confirm').remove()

        transition.next()
    })

    // 记录PV
    function report() {
        let _pprd_ = window._pprd_
        delete window._pprd_

        window.STTReady(() => {
            const params = {}
            if (_pprd_) {
                console.log('_pprd_', _pprd_)
                params.pprd = window.STT.generatePprdByPtag(_pprd_)
            }
            window.STT.pvReported(params)
        })
    }

    router.beforeEach(transition => {
        try {
            const input = document.getElementById('STT-input')
            const inputUrl = input.value.split('=') // [0] 当前页面  [1] 上一个页面
            if (inputUrl.indexOf(encodeURIComponent(window.location.href)) === -1) {
                report()
            } else {
                console.log('[STT]:存在 STT-input 后退前进不进行上报')
            }

            let refereUrl = decodeURIComponent(inputUrl[0]) // 来源
            if (input.value == 0) {
                refereUrl = window.location.href
            }
            inputUrl[0] = encodeURIComponent(window.location.href)
            inputUrl[1] = encodeURIComponent(refereUrl)
            input.value = inputUrl.join('=')
        } catch (e) {
            console.error('数据上报错误', e)
        }
        transition.next()
    })

}
module.exports = hook
