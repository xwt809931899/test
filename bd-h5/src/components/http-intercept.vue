<template>
    <div>
        <div v-show="loadingAm" class="loadingAm">
            <div class="spinner">
                <div class="spinner-container container1">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                </div>
            </div>
        </div>
        <div class="requesterror" v-show="requesterror">
            <error class="content"></error>
        </div>
    </div>
</template>
<script>
import messBox from 'common/mess-box'
import error from './error.vue'
export default {
    data() {
        return {
            loadingAm: false,
            requesterror: false
        }
    },
    components: {
        error,
    },
    ready() {
        var requestCount = 0
        var data = this.$data
        let requestTimeout = 100000
        let timeout = null
        document.cookie = `a_cid=${gConfig.ACID};path=/`
        this.$http.interceptors.push({
            request(request) {
                request.headers['A-CID'] = gConfig.ACID
                if (!request.data) {
                    request.data = {}
                }
                request.data['_t'] = +new Date

                requestCount++
                if (!request.noLoading) {
                    data.loadingAm = true
                }
                if(request.requestTimeout) {
                    timeout = setTimeout(() => {
                        request.cancel()
                        data.requesterror = true
                    }, request.requestTimeout)
                }
              

                return request
            },
            response(response) {
                clearTimeout(timeout)
                // if(response.status == 404) {
                //     data.requesterror = true
                // }
                if (response.data && response.data.code !== 1000 && !response.request.noTips) {
                    if (!response.data.desc || response.data.desc.length < 1) {
                        //                            messBox.tips('未知错误')
                        console.log('---')
                        console.error('【未知错误】', response)
                        console.log('---')
                    } else {
                        messBox.tips(response.data.desc)
                    }
                    if (response.data.code && response.request.showErrorTips && (response.data.code === 1011 || response.data.code === 1012 || response.data.code === 1013)) {
                        data.requesterror = true
                    }
                }
                if (!--requestCount) {
                    data.loadingAm = false
                }
                return response
            }
        })
    }
}
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    .loadingAm {
        position: fixed;
        left: 50%;
        top: 30%;
        margin-left: -40px;
        padding: 16px;
        background: rgba(0, 0, 0, 0.38);
        border-radius: 10px;
        z-index: 100;
    }

    .spinner {
        width: 30px;
        height: 30px;
        position: relative;;
    }

    .container1 > div, .container2 > div, .container3 > div {
        width: 9px;
        height: 9px;
        background-color: #FFF;

        border-radius: 100%;
        position: absolute;
        -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
        animation: bouncedelay 1.2s infinite ease-in-out;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .spinner .spinner-container {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .container2 {
        transform: rotateZ(45deg);
    }

    .container3 {
        transform: rotateZ(90deg);
    }

    .circle1 {
        top: 0;
        left: 0;
    }

    .circle2 {
        top: 0;
        right: 0;
    }

    .circle3 {
        right: 0;
        bottom: 0;
    }

    .circle4 {
        left: 0;
        bottom: 0;
    }

    .container2 .circle1 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .container3 .circle1 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    .container1 .circle2 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .container2 .circle2 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    .container3 .circle2 {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
    }

    .container1 .circle3 {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
    }

    .container2 .circle3 {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s;
    }

    .container3 .circle3 {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s;
    }

    .container1 .circle4 {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s;
    }

    .container2 .circle4 {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s;
    }

    .container3 .circle4 {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s;
    }

    @keyframes bouncedelay {
        0%, 80%, 100% {
            transform: scale(0.0);
        }
        40% {
            transform: scale(1.0);
        }
    }
    .requesterror{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: #F4F4F4;
        color: #666666;
        font-size:28px;
        border-radius: 10px;
        z-index: 102;
        display: flex;
        align-items: center;
        justify-content: center;
        .content{

        }
    }
</style>