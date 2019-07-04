<template>
    <div class="root scroll">
        <div class="pro-detail flex">
            <div>
                <img v-src="detail.productImg">
            </div>
            <div>
                {{detail.productName}}
            </div>
        </div>
        <div class="pro-num flex">
            <div><b class="require">*</b>申请件数</div>
            <div class="btn-group">
                <div @click="changeNum(-1)" class="reduce"></div>
                <div class="num">{{applyNum}}</div>
                <div @click="changeNum(1)" class="plus"></div>
            </div>
        </div>
        <div class="choose-type flex left-flex">
            <div><b class="require">*</b>售后原因</div>
            <div>
                <select v-model="refundReason">
                    <option value="">请选择退货原因</option>
                    <option v-for="(key,value) in refundReasonList" :value="key">{{value}}</option>
                </select>
            </div>
        </div>

        <div class="remark">
            <div class="title"><b class="require">*</b>详细说明</div>
            <textarea rows="4" v-model="description"></textarea>
            <div class="word-num">
                {{description.length}}/200
            </div>
        </div>

        <div class="imgs">
            <div class="title">
                <!--<b class="require">*</b>-->
                图片凭证（最多可上传3张）
            </div>
            <div>
                <div class="img-wrap" v-if="picList.length<3" @click="update">
                    <img class="add-img" src="./img/bt_comment_addphote.png">
                </div>
                <div class="img-wrap" v-for="img in picList">
                    <img v-src="img.img">
                    <span class="del" @click="delImg(img)"></span>
                </div>
            </div>
        </div>

        <button class="apply-btn al-btn" @click="submit">提交申请</button>
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
                applyNum: 1,  // 申请数量
                refundReason: '', // 售后原因
                description: '', // 详细描述
                picList: [],  // 图片信息列表 img:图片

                refundReasonList: {
                    QUALITY: '商品质量问题',
                    DAMAGED: '商品破损',
                    INMATCH: '实物与描述不符',
                    OTHER: '其他',
                },
                orderNo: null,
                itemCode: null,
                omsPackageCode: null,
                detail: null,
            }
        },
        methods: {
            changeNum(increment){
                if (this.applyNum + increment < 1) return
                if (this.applyNum + increment > this.detail.productNum) return
                this.applyNum += increment
            },
            getDetail(){
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/detail`, {
                    orderNo: this.orderNo,
                    itemCode: this.itemCode,
                    omsPackageCode: this.omsPackageCode,
                }).success(({ data }) => {
                    this.detail = data
                    this.applyNum = 1
                })
            },
            update(){
                const maxCount = 3 - this.picList.length
                if (maxCount < 1) {
                    messBox.tips('最多可上传3张')
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
            submit(){
                if (!this.refundReason.length) {
                    messBox.tips('请选择售后原因')
                    return
                }
                if (!this.description.length) {
                    messBox.tips('请输入详细说明')
                    return
                }
                if (this.description.length > 200) {
                    messBox.tips('详细说明最多输入200个字符')
                    return
                }
//                if (!this.picList.length) {
//                    messBox.tips('请上传图片凭证')
//                    return
//                }
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/savesales`, {
                    params: JSON.stringify({
                        orderNo: this.orderNo,
                        itemCode: this.itemCode,
                        omsPackageCode: this.omsPackageCode,
                        num: this.applyNum,
                        refundReason: this.refundReason,
                        description: this.description,
                        picList: this.picList,
                    })
                }).success(({ code }) => {
                    if (code === 1000) {
                        messBox.tips('提交成功')
                        this.$router.replace({
                            name: 'after-service-list',
                        })
                    }
                })
            },
        },
        route: {
            data ({ to }) {
                this.orderNo = to.query.orderNo
                this.itemCode = to.query.itemCode
                this.omsPackageCode = to.query.omsPackageCode
                this.getDetail()
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .root {
        padding-bottom: 40px;
    }

    .pro-detail {
        background: #fff;
        color: $BC3;
        font-size: $TH6;
        > *:nth-child(1) {
            padding: 10px;
            img {
                width: 180px;
                height: 180px;
            }
        }
        > *:nth-child(2) {
            flex: 1;
            padding-right: 30px;
        }
    }

    .require {
        color: $BC8;
        margin-right: 10px;
    }

    .pro-num {
        background: #fff;
        padding: 20px 30px;
        border-top: 1px solid $BC7; /*no*/
        .btn-group {
            width: 170px;
            height: 50px;
            align-items: center; //垂直居中
            border: 1px solid $BC5; /*no*/
            border-radius: 4px;
            text-align: center;
            display: flex;
            margin-left: 30px;
            .plus, .reduce {
                width: 80px;
                height: 50px;
                line-height: 25px;
            }
            .plus {
                background: url('./img/bt_cart_add_normal.png') no-repeat center center;
                height: 50px;
                background-size: 14px;
            }
            .reduce {
                background: url('./img/bt_cart_decrease_normal.png') no-repeat center center;
                height: 50px;
                background-size: 14px;
            }
            .num {
                width: 70px;
                line-height: 50px;
                font-size: $TH7;
                border-left: 1px solid $BC5; /*no*/
                border-right: 1px solid $BC5; /*no*/
            }
        }
    }

    .choose-type {
        height: 88px;
        background: #fff;
        padding: 0 30px;
        margin-top: 20px;
        font-size: $TH8;
        color: $BC3;
        select {
            height: 80px;
            border: 1px solid $BC7;
        }
    }

    .remark {
        background: #fff;
        padding: 0 30px;
        margin-top: 20px;
        .title {
            padding: 30px 0;
            font-size: $TH8;
            color: $BC3;
        }
        textarea {
            width: 100%;
            padding: 20px;
            line-height: 30px;
            background: $BC7;
            font-size: $TH6;
            border: 0;
        }
        .word-num {
            text-align: right;
            padding: 20px 0 30px 0;
            font-size: $TH8;
            color: $BC4;
        }
    }

    .imgs {
        background: #fff;
        padding: 0 30px 30px 30px;
        margin-top: 20px;
        .title {
            font-size: $TH8;
            color: $BC3;
            padding: 30px 0;
        }
        .img-wrap {
            margin-right: 40px;
            display: inline-block;
            position: relative;
            img {
                width: 160px;
                height: 160px;
                border: 1px solid $BC7; /*no*/
            }
            .add-img{
                padding: 40px;
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