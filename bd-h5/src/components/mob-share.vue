<template>

    <div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" v-el:mob style="display: none">
        <div v-if="isShowCommissionTips" class="share-des">
            <span class="text-msg">
            <i class="icon-msg"></i>
            小伙伴们在您的分享链接中成功购买后，您既可以获得指定佣金奖励！</span>
        </div>

        <div v-if="isShowCommissionPrice">
            <div class="goods-msg">
                <div class="money-wrap">
                    <span>分享赚</span><br>
                    <span class="money"><span class="money-num">{{shareParams.rebateMoney | toFixed}}</span>元</span>
                </div>
                <p class="text" onclick="location.href='/rebate/commission_rules.html'">
                    <span>小伙伴通过您的链接成功购买，您即可获得佣金奖励哦</span>
                    <img class="rule-icon" src="../img/rebate/ic_commission_rule.png">
                </p>
            </div>
        </div>


        <ul class="-mob-share-list">
            <li class="-cus-share-weixin" v-if="isWeixin" @click="onShareWeixin(),counter(1)" pprd="21007.3.1"><p>微信</p></li>
            <li class="-mob-share-weibo" @click="counter(3)" pprd="21007.3.6"><p>新浪微博</p></li>
            <li v-if="isPC" class="-mob-share-qq j-qq" @click="counter(5)" pprd="21007.3.3"><p>QQ好友</p></li>
            <li v-if="!isWeixin" class="-cus-share-qrcode" @click="counter(10)" pprd="21007.3.5"><p>二维码</p></li>
            <li v-if="false" class="-cus-share-sms j-sms"
                data-sms-text="{{shareParams.desc+(shareParams.smsLink || shareParams.url)}}"
                @click="counter(8)" pprd="21007.3.7"><p>短信</p></li>
        </ul>

        <div class="-mob-share-close">取消</div>
    </div>

    <div class="-mob-share-ui-bg"></div>

    <div>

    </div>

    <div class="wxtips-mark" v-if="isWeixin && isShowWXShareTips" @click="isShowWXShareTips = false">
        <div class="wxtips-img"></div>
    </div>
</template>
<script type="text/babel">
    /*
     分享字段
     {
     pic: '',
     url: '',
     desc: '',
     title: '',
     }
     */
    import util from 'common/util'
    import wxTool from 'common/wx.tool'
    import appSDK from 'common/app-SDK'
    import cookie from '../common/cookie'
    var shareOpt = null
    export default{
        data(){
            return {
                isWeixin: util.isWeixin(),
                isPC: util.isPC(),
                isShowWXShareTips: false,
                shareParams: {},
                isShowCommissionTips: false,
                isShowCommissionPrice: false,
            }
        },
        methods: {
            counter(channel){
                // 分享统计
                let url
                let params = {
                    channel,
                }
                if (this.shareParams.shareType === 'sharelist') {
                    url = gConfig.PROJECT_REBATE + '/api/share/shareHomePage'
                }
                if (this.shareParams.shareType === 'product') {
                    params.itemCode = this.shareParams.pid
                    url = gConfig.PROJECT_REBATE + '/api/share/shareProduct'
                }
                if (this.shareParams.shareType === 'againShare') {
                    params.shareId = this.shareParams.shareId
                    url = gConfig.PROJECT_REBATE + '/api/share/againShare'
                }
                if (url) {
                    this.$http.get(url, params)
                }
            },
            share(){
                window.mobShare.ui.open()
            },
            onShareWeixin(){
                window.mobShare.ui.close()
                this.isShowWXShareTips = true
            },
            extentdParams(params){
                params = _.extend({
                    desc: '给你分享一个好东西',
                    title: document.title,
                    pic: gConfig.shareImg,
                    url: window.location.href,
                }, params)
                //设置微信分享
                wxTool.setShare({
                    imgUrl: params.pic,
                    link: params.WXLink || params.url,
                    desc: params.desc || params.description,
                    title: params.title
                })
                return params
            },
            mobShare(option){
                if (option === undefined) {
                    if (shareOpt === null) {
                        console.error('未传递分享参数')
                        return
                    }
                    this.shareParams = option = _.extend({}, shareOpt)
                }

                this.isShowCommissionTips = false
                this.isShowCommissionPrice = false
                // 记录分享内容
                var params = this.shareParams = this.extentdParams(option)
//                var params = this.extentdParams(option)
                window.mobShare.config({
                    params: {
                        description: params.desc || params.description,
                        title: params.title,
                        pic: params.pic,
                        url: params.url,
                    }
                })

                window.mobShare.ui.open()

            },
            proTakeShare(option){
                this.isShowCommissionPrice = true

                if (!option.g_chan) {
                    option.g_chan = cookie.get('USER_UIN')
                }
                var origin = window.location.origin
                option.url = `${origin}/item.html?t_id=P_${option.pid}&g_chan=${option.g_chan}#id-${option.pid}`
                option.WXLink = `${origin}/item.html?t_id=P_${option.pid}&g_chan=${option.g_chan}#id-${option.pid}`
                option.smsLink = `${origin}/item.html?g_chan=${option.g_chan}#id-${option.pid}`

                var params = this.shareParams = this.extentdParams(option)
                // 配置分享底部参数
                window.mobShare.config({
                    params
                })
                //显示底部分享弹窗
                window.mobShare.ui.open()
            },
            articleShare(option){
                if (!option.g_chan) {
                    option.g_chan = cookie.get('USER_UIN')
                }
                this.isShowCommissionPrice = true
                var origin = window.location.origin
                option.url = `${origin}/sharepage.html?t_id=E_${option.eid}&g_chan=${option.g_chan}&head=no`
                option.WXLink = `${origin}/sharepage.html?t_id=E_${option.eid}&g_chan=${option.g_chan}&head=no`
                option.smsLink = `${origin}/sharepage.html?t_id=E_${option.eid}&g_chan=${option.g_chan}`

                var params = this.shareParams = this.extentdParams(option)

                window.mobShare.config({
                    params
                })
                window.mobShare.ui.open()
            },
            appShare(option, type = 601){
                if (!appSDK.isApp) return
                var appJson = {
                    type: type,
                    obj: {
                        content: option.content,
                        title: option.title,
                        desc: option.desc,
                        image: option.image
                    }
                }

                window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`

            },
            wxShare(params){
                if (params === undefined) {
                    if (shareOpt === null) {
                        console.error('未传递分享参数')
                        return
                    }
                    params = _.extend({}, shareOpt)
                }

                var shareOption = {
                    imgUrl: params.imgUrl || params.pic,
                    link: params.link || params.url,
                    desc: params.desc || params.description,
                    title: params.title
                }

                if (appSDK.isApp) {
                    this.appShare({
                        title: shareOption.title,
                        content: shareOption.link,
                        desc: shareOption.desc,
                        image: shareOption.imgUrl,
                    }, 602)  // 602只有微信的分享方式
                    return
                }


                wxTool.setShare(shareOption)

//                wxTool.setShare(option)
                this.isShowWXShareTips = true
            },
            setShare(params){

                wxTool.setShare({
                    imgUrl: params.pic,
                    link: params.url,
                    desc: params.desc,
                    title: params.title
                })

                this.appShare({
                    title: params.title,
                    content: params.url,
                    desc: params.desc,
                    image: params.pic,
                }, 603)

                shareOpt = params
            }
        },
        events: {},
        ready(){
            if (!window.mobShare) {
                console.error('请检查是否引入了 mob-share.js ')
                return
            }
            window.mobShare.ui.init()


            window.mobEvent = {
                commonShare: this.mobShare, // 通用的分享
                proTakeShare: this.proTakeShare, // 分享返利商品
                wxShare: this.wxShare,
                setShare: this.setShare,
                articleShare: this.articleShare,
            }

            this.setShare({
                pic: gConfig.shareImg,
                url: location.href,
                desc: gConfig.shareDesc,
                title: gConfig.shareTitle,
            })

        },
    }

</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    .-cus-share-weixin {
        background-image: url(../img/rebate/ic_weixin.png);
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .-mob-share-ui{
        position:absolute;
    }

    .wxtips-mark {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        cursor: pointer;
        z-index: 100;
        .wxtips-img {
            width: 100%;
            height: 100%;
            background: url('../img/pic_yindao.png') left top no-repeat;
            background-size: 100%;
        }
    }

    .-mob-share-ui.-mob-share-ui-theme {
        overflow: visible;
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-bottom ul.-mob-share-list {
        font-size: 0;
        padding: 20px 0;
    }

    .-mob-share-ui ul.-mob-share-list li p {
        font-size: 28px;
    }

    .-mob-share-ui ul.-mob-share-list li {
        width: 25%;
        height: 90px;
        margin: 0 0 50px;
        background-position: center top;
        background-size: 90px;
    }

    .-mob-share-weibo {
        background-image: url(../img/rebate/ic_weibo.png) !important;
    }

    .-mob-share-list .-mob-share-qq {
        background-image: url(../img/rebate/ic_qq.png) !important;
    }

    .-mob-share-qa222 {

    }

    .-mob-share-qa {
        background-image: url(../img/rebate/ic_erwm.png) !important;
    }

    .-cus-share-copylink {
        background-image: url(../img/rebate/ic_fuzhilj.png);
    }

    .-cus-share-qrcode {
        background-image: url(../img/rebate/ic_erwm.png);
    }

    .-cus-share-sms {
        background-image: url(../img/rebate/ic_dx.png);
    }

    .share-des {
        white-space: initial;
        padding: 7px 10%;
        position: relative;
        border-bottom: 2px solid #E5E5E5;
    }

    .icon-msg {
        position: absolute;
        top: 0;
        left: 0;
        background: url('../img/rebate/icon-sharePurse@2x.png') 50% 50% no-repeat;
        width: 70px;
        height: 70px;
        background-size: 50px auto;
    }

    .text-msg {
        position: relative;
        display: block;
        font-size: 24px;
        height: 80px;
        text-align: left;
        line-height: 32px;
        padding: 8px 0 8px 90px;
        box-sizing: border-box;
    }

    .-mob-share-ui.-mob-share-ui-theme-slide-bottom {
        font-size: 28px;
    }

    .goods-msg {
        padding: 30px 8px 0 8px;
        text-align: left;
        .money-wrap {
            position: relative;
            top: -100px;
            margin: 0 auto -100px auto;
            width: 200px;
            font-weight: bold;
            color: $C3;
            font-size: 36px;
            line-height: 60px;
            background: #FFFFFF;
            border-radius: 30px 30px 0 0;
            box-shadow: 0 -5px 26px 0 rgba(0, 0, 0, 0.1);
            text-align: center;
            z-index: 101;
            padding: 10px;
            .money {
                font-size: 24px;
                .money-num {
                    font-size: 40px;
                }
            }
        }
        .rule-icon {
            width: 50px;
            height: 50px;
            margin: auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .text {
            font-size: .9em;
            padding: 24px 16px;
            margin: 0;
            color: $C3;
            text-align: center;
        }
        .rule-icon {
            width: 32px;
            height: 32px;
            vertical-align: middle;
        }
    }

</style>
