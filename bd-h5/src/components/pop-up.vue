<template>
    <div class="mask display-flex" v-if="isShowBox">
        <div class="pop-wrap">
            <img v-src="adItem.adBanner" class="pop-img" @click="goActLink(adItem)"/>
            <div class="close" @click="close">
                <img src="../img/rebate/home/ic_close_drop_dialog.png"/>
            </div>
        </div>
    </div>
</template>
<script>
    import util from 'common/util'
    import cookie from 'common/cookie'
    export default {
        data() {
            return {
                gConfig, gConfig,
                adList: [], // 广告list
                adQueue: [], //需要弹窗的广告队列
                adItem: '', //当前展示的广告
                isShowBox: false
            }
        },
        props: {
            location: {
                type: String,
            }
        },
        methods: {
            close(){
                if (this.adQueue.length > 1) {
                    this.adQueue.shift()
                    this.adItem = this.adQueue[0]
                } else {
                    this.isShowBox = false
                }
            },
            goActLink(adItem){
                if (adItem.adLink) {
                    location.href = adItem.adLink
                }
            },
        },
        ready(){
            http.get(gConfig.PROJECT_CONTENT + '/api/popup/showPopupAd', {
                location: this.location
            }).then(({ data:{code, data} }) => {
                if (code === 1000) {
                    this.adList = data
                    let now = Date.now()
                    let popUpList = {} //初始化
                    if (localStorage.getItem('popUpList')) {
                        popUpList = JSON.parse(localStorage.getItem('popUpList'))
                    }
                    this.adList.forEach((item) => {
                        if (now > util.converDate(item.beginTime) && now < util.converDate(item.endTime)) {
                            if (item.trigg == 'EVERYTIME') { // 首页有一个特殊的新人弹窗
                                if (this.location == 'INDEX') {
                                    this.adQueue.push(item)
                                }
                            }
                            else if (item.trigg == 'JUSTONE') { //只弹一次，特殊标记上次弹窗的时间为0
                                if (!(item.adId in popUpList)) {
                                    popUpList[item.adId] = 0
                                    this.adQueue.push(item)
                                }
                            } else if (item.trigg == 'ONCEADAY') { //每天一次，记录上次弹窗的时间
                                if (!(item.adId in popUpList)) { //第一次打开需要弹窗，以后每天打开一次
                                    popUpList[item.adId] = now
                                    this.adQueue.push(item)
                                } else if ((now - popUpList[item.adId]) > 24 * 60 * 60 * 1000) {
                                    this.adQueue.push(item)
                                    popUpList[item.adId] = now  // 记录上一次打开的时间
                                }
                            }
                        }
                    })
                    localStorage.setItem('popUpList', JSON.stringify(popUpList))
                    this.adItem = this.adQueue[0]
                    if (this.adQueue.length > 0) {
                        this.isShowBox = true
                    }
                }
            })
        },
        route: {
            data({ to }){
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .mask {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        .pop-wrap {
            margin: auto;
        }
        .pop-img {
            width: 600px;
            height: 600px;
        }
        .close {
            width: 54px;
            height: 54px;
            margin: 20px auto;
        }
    }

</style>