<template>
    <div data-report></div>
</template>
<script type="text/babel">
    import Vue from 'vue'
    import util from '../common/util'
    const _readyCallBack = []
    window.STTReady = function (fn) {
        if ('STT' in window) {
            fn()
        } else {
            _readyCallBack.push(fn)
        }
    }
    export default{
        ready(){
            if ('STT' in window) {
                _readyCallBack.forEach(fn => {
                    fn()
                })
            }
        }
    }

    function checkPtag(ptag) {
        return ptag && /^[0-9]+\.[0-9]+\.[0-9]+$/.test(ptag)
    }
    Vue.directive('pv', {//pv为页面流量成交上报
        bind() {
            this.el.addEventListener('click', () => {
                const ptag = this.el.getAttribute('ptag')
                if (!checkPtag(ptag)) return
                //点击a标签为跳转链接加ptag参数，st.js会获取浏览器地址的ptag参数进行数据上报
                if (this.el.tagName === 'A' && (this.el.pathname !== location.pathname || this.el.getAttribute('reload') !== null)) {
                    this.el.setAttribute('href', util.addParam(this.el.href, 'ptag', ptag))
                }else if(this.el.getAttribute('has-router') === 'false'){ //  没有路由跳转的地址进行手动上报
                    const params = {}
                    params.pprd = window.STT.generatePprdByPtag(ptag)
                    window.STT.pvReported(params)
                } else { //不是a标签，有路由跳转的到router-before.js里面的report方法进行统一上报
                    window._pprd_ = ptag
                    console.log(this.el)
                }
            })
        }
    })
    Vue.directive('click-report', {
        bind() {
            this.el.addEventListener('click', () => {
                const ptag = this.el.getAttribute('ptag')
                if (!checkPtag(ptag)) return
                try {
                    STT.clickReported({
                        pprd: ptag,
                    })
                } catch (e) {
                    console.error(e)
                }
            })
        }
    })
</script>
