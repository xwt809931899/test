<template>
    <div class="root scroll">
        <header class="top-nav">
            <a class="back" @click="back" href="javascript:;"><i class="iconfont">&#xe603;</i></a>
            <h1>我的售后</h1>
        </header>
        <div class="flex left-flex service-status">
            <div>售后单编号：{{detail.afterSalesNo}}</div>
            <div>{{detail.statusDesc}}</div>
        </div>
        <div class="pro-detail flex">
            <div>
                <img v-src="detail.productImg">
            </div>
            <div class="flex top-flex">
                <div>{{detail.productName}}</div>
                <div class="num">x {{detail.productNum}}</div>
            </div>
        </div>
        <div class="flex left-flex num-price">
            <div>共{{detail.productNum}}件商品</div>
            <div v-if="detail.refundMoney">退款金额：￥{{detail.refundMoney | toFixed}}</div>
        </div>

        <div class="service-feedback"
             v-if="detail.status=='CLOSE'">
            <div>客服反馈：</div>
            <div>{{detail.feedback}}</div>
        </div>

        <div class="service-type" v-if="detail.status!='CLOSE' && detail.typeDesc">售后类型：<b>{{detail.typeDesc}}</b></div>
        <div class="refund-wrap">
            <div>原订单编号：{{detail.orderNo}}</div>
            <div>售后单编号：{{detail.afterSalesNo}}</div>
            <div>申请售后商品数量：{{detail.productNum}} 件</div>
            <template v-if="detail.status == 'REFUND_WAIT' || detail.status == 'SUCCESS'">
                <div>退款金额：￥{{detail.refundTotalMoney | toFixed}} {{otherMoney}}</div>
                <div>扣除积分：{{detail.returnPoints}}</div>
            </template>
        </div>

        <div class="progress">
            <div class="title display-flex" @click="showProgress=!showProgress">
                <span>查看售后进度</span>
                <i class="iconfont" v-if="showProgress">&#xe601;</i>
                <i class="iconfont" v-else>&#xe602;</i>
            </div>
            <div class="node" v-for="log in detail.aduitLogs" v-show="showProgress">
                <div class="status">{{log.statusDesc}}</div>
                <div>{{log.description}}</div>
                <div v-if="log.statusDesc == '售后关闭'" class="cellphone">客服电话：{{detail.serverPhone}}</div>
                <time>{{log.createDate}}</time>
            </div>
        </div>

        <div class="reply-wrap" v-if="detail.returnAddress">
            <div class="title" @click="showProgress1=!showProgress1">
                <span>商品回邮详情</span>
                <i class="iconfont" v-if="showProgress1">&#xe601;</i>
                <i class="iconfont" v-else>&#xe602;</i>
            </div>
            <div v-show="showProgress1">
                <div class="reply-info reply-info">
                    <div>收件地址：</div>
                    <div>{{detail.returnAddress}}&nbsp;&nbsp;
                        <span v-if="detail.returnCode"> 邮政编码：{{detail.returnCode}}</span>
                    </div>
                </div>
                <div class="flex reply-info" v-if="detail.delivName">
                    <div>快递公司：</div>
                    <div>{{detail.delivName}}</div>
                </div>
                <div class="flex reply-info" v-if="detail.delivCode">
                    <div>快递运单号：</div>
                    <div>{{detail.delivCode}}</div>
                </div>
            </div>
        </div>

        <div class="service-cause">
            <div>售后原因：</div>
            <div>{{detail.refundReasonDesc}}</div>
        </div>
        <div class="service-cause">
            <div class="left">详细说明：</div>
            <div>{{detail.description}}</div>
        </div>

        <div class="imgs">
            <div class="title">图片凭证</div>
            <div>
                <div class="img-wrap" v-if="picList.length<5 && isCanUpdate" @click="update">
                    <img class="add" src="./img/bt_comment_addphote.png">
                </div>
                <div class="img-wrap" v-for="img in picList">
                    <img v-src="img.img">
                    <span class="del" @click="delImg(img)" v-if="isCanUpdate"></span>
                </div>
            </div>
        </div>

        <button class="apply-btn al-btn"
                v-if="isDirtyByPiclist"
                @click="submitModify"
        >提交修改
        </button>

        <button class="apply-btn al-btn"
                v-if="detail.status=='RETURNING_WAIT'"
                v-link="{name:'after-service-reply',params:{afterSalesNo:detail.afterSalesNo}}">
            填写回邮信息
        </button>

    </div>
</template>

<script>
    import updateImg from 'common/update.img'
    import wxTool from 'common/wx.tool.js'
    import appSDK from 'common/app-SDK'
    import messBox from 'common/mess-box'
    export default{
        data(){
            return {
                picList: [],  // 图片信息列表 img:图片
                detail: null,
                afterSalesNo: null,
                showProgress: true,
                showProgress1: true,
            }
        },
        computed: {
            isDirtyByPiclist(){
                if (!this.detail) {
                    return false
                }
                if (this.detail.attachments.length != this.picList.length) {
                    return true
                }
                for (let i = 0; i < this.picList.length; i++) {
                    if (this.detail.attachments.indexOf(this.picList[i]) < 0) {
                        return true
                    }
                }
                return false
            },
            isCanUpdate(){
                return this.detail.status === 'ADUITING'
            },
            otherMoney(){
                if (this.detail.refundPreCardFee || this.detail.refundPointsFee) {
                    if (this.detail.refundPreCardFee && this.detail.refundPointsFee) {
                        return '(含VIP卡' + this.detail.refundPointsFee + '元，预付卡' + this.detail.refundPreCardFee + '元)'
                    } else if (this.detail.refundPreCardFee && !this.detail.refundPointsFee) {
                        return '(含预付卡' + this.detail.refundPreCardFee + '元)'
                    } else if (!this.detail.refundPreCardFee && this.detail.refundPointsFee) {
                        return '(含VIP卡' + this.detail.refundPointsFee + '元)'
                    }
                } else {
                    return ''
                }

            },
        },
        methods: {
            back() {
                if (!appSDK.isApp){
                    window.history.go(-1)
                }else{
                    const appJson = {
                        type: 909,
                    }
                    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
                }
                
            },
            getDetail(){
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/detail`, {
                    afterSalesNo: this.afterSalesNo,
                }).success(({ data }) => {
                    this.detail = data
                    this.picList = this.detail.attachments.slice()
                })
            },
            update(){
                const maxCount = 5 - this.picList.length
                if (maxCount < 1) {
                    messBox.tips('最多可上传5张')
                    return
                }
                const updateCB = (imgUrls) => {
                    imgUrls.forEach(item => {
                        this.picList.push({ img: item })
                    })
                }
                if (appSDK.isApp) {
                    appSDK.chooseImg({ count: maxCount }).then(updateCB)
                } else {
                    wxTool.chooseSingleImg(maxCount).then((data) => {
                        return updateImg(data)
                    }).then(updateCB)
                }
            },
            delImg(img){
                this.picList.$remove(img)
            },
            submitModify(){
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/modifypics`, {
                    params: JSON.stringify({
                        afterSalesNo: this.afterSalesNo,
                        picList: this.picList,
                    })
                }).success(({ code }) => {
                    if (code === 1000) {
                        messBox.tips('提交成功')
                        this.getDetail()
                    }
                })
            },
        },
        route: {
            activate(transition) {
                if (!appSDK.isApp){

                }else{
                    console.log("nicai")
                    const appJson = {
                        type: 904,
                    }
                    window.location.href = `/?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
                }
                transition.next()
            },
            data ({ to }) {
                this.afterSalesNo = to.params.afterSalesNo
                this.getDetail()
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";
    .top-nav{
        border-bottom: 1px solid $BC6; /*no*/
        position:fixed;
        left:0;
        top:0;
        display:block!important;
        width:100%;
        z-index: 1;
        h1{
            font-weight:normal;
            font-size:31px;
        }
     }
    .root {
        padding-bottom: 40px;
    }

    .service-status {
        margin-top:88px;
        background: #fff;
        padding: 30px;
        font-size: $TH7;
        color: $BC3;
        > :nth-child(2) {
            font-size: $TH6;
            color: $BC10;
        }
    }

    .pro-detail {
        background: #fff;
        color: $BC3;
        border-top: 1px solid $BC7; /*no*/
        font-size: $TH6;
        > *:nth-child(1) {
            padding: 10px;
            img {
                height: 180px;
                width: 180px;
            }
        }
        > *:nth-child(2) {
            flex: 1;
            padding-right: 30px;
            height: 130px;
            .num {
                color: $BC5;
            }
        }
    }

    .num-price {
        background: #fff;
        padding: 30px;
        border-top: 1px solid $BC7; /*no*/
    }

    .service-feedback {
        background: #fff;
        padding: 30px;
        margin: 20px 0;
        display: flex;
        > :nth-child(2) {
            flex: 1;
            color: $BC8;
        }
    }

    .service-type {
        background: #fff;
        padding: 30px;
        margin-top: 20px;
        font-size: $TH7;
    }

    .refund-wrap {
        background: #fff;
        padding: 30px;
        border-top: 1px solid $BC7; /*no*/
        margin-bottom: 20px;
        line-height: 50px;
        > div {
            font-size: $TH7;
        }
    }

    .progress {
        background: #fff;
        padding: 30px;
        border-top: 1px solid $BC7; /*no*/
        font-size: $TH7;
        .title {
            span {
                margin-right: 20px;
            }
        }
        .iconfont {
            font-size: 35px;
        }
        .node {
            border-left: 1px solid $BC5; /*no*/
            position: relative;
            padding: 0 30px 30px 40px;
            :first-child {
                margin-top: 30px;
            }
            &:last-child {
                padding-bottom: 0;
            }
            &:before {
                position: absolute;
                content: '';
                width: 18px;
                height: 18px;
                display: block;
                top: 0;
                left: -10px;
                background: $BC4;
                border-radius: 50%;
            }
            .status {
                font-weight: bold;
                position: relative;
                top: -5px;
            }
            .cellphone {
                color: #00d5ff;
            }
            time {
                display: block;
                color: $BC5;
                margin-top: 16px;
            }
        }
    }

    .reply-wrap {
        background: #fff;
        padding: 30px;
        border-top: 1px solid $BC7; /*no*/
        .title {
            font-size: $TH7;
            margin-bottom: 10px;
            span {
                margin-right: 20px;
            }
            .iconfont {
                font-size: 35px;
            }
        }
        .reply-info {
            color: $BC3;
            font-size: $TH7;
            font-weight: bold;
            display: flex;
            margin-bottom: 10px;
            > :nth-child(2) {
                flex: 1;
                word-break: break-all;
            }
        }
    }

    .service-cause {
        background: #fff;
        padding: 30px;
        color: $BC3;
        font-size: $TH7;
        display: flex;
        border-top: 1px solid $BC7; /*no*/
        align-items: baseline;
        .left {
            white-space: nowrap;
        }
        > :nth-child(2) {
            flex: 1;
            font-weight: bold;
            word-break: break-all;
        }
    }

    .imgs {
        background: #fff;
        padding: 0 30px 30px 30px;
        margin-top: 20px;
        .title {
            font-size: $TH7;
            color: $BC3;
            padding: 30px 0;
        }
        .img-wrap {
            margin-right: 40px;
            display: inline-block;
            position: relative;
            margin-bottom: 20px;
            img {
                width: 160px;
                height: 160px;
                border: 1px solid $BC7; /*no*/
            }
            .add {
                padding: 50px;
            }
            .del {
                background: url(./img/bt_comment_delete_default.png);
                background-size: cover;
                width: 40px;
                height: 40px;
                position: absolute;
                right: -20px;
                top: -20px;
            }
        }
    }

    .apply-btn {
        width: 690px;
        display: block;
        margin: 40px auto 0 auto;
        line-height: 98px;
        padding: 0;
        font-size: $TH4;
        background: $BC10;
        color: #fff;
    }

</style>