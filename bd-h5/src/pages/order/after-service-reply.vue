<template>
    <div class="root scroll">
        <div class="address">
            <div class="tips">请将退货商品邮寄至下方地址：</div>
            <div class="info">
                {{detail.returnAddress}}
                {{detail.returnCode}}
            </div>
        </div>
        <div class="agreement">
            <div class="title flex left-flex">
                <div><b class="require">*</b>我已阅读并同意退货须知</div>
                <div @click="checkedNotice=!checkedNotice" class="chekced">
                    <i class="iconfont" v-if="checkedNotice">&#xe605;</i>
                    <i class="iconfont" v-else>&#xe60e;</i>
                </div>
            </div>
            <div class="desc">
                1.请将退货商品、原包装、赠品（如有）等一并退回，并在退回包裹内放置纸张，注明具体的订单编号、退货原因、手机号码、姓名等信息；
                <br>
                2.请先行垫付运费寄回商品，暂不接受到付，相关运费将在后续一并退还
            </div>
        </div>
        <div class="choose-company">
            <div class="title">
                <div><b class="require">*</b>请填写快递公司</div>
            </div>
            <input type="text" placeholder="请输入快递公司名称" v-model="delivName">
        </div>
        <div class="waybill">
            <div class="title">
                <div><b class="require">*</b>填写运单号</div>
            </div>
            <div class="flex left-flex input-wrap">
                <div><input placeholder="请填入条形码下方数字或扫描条形码输入" v-model="delivCode"></div>
                <div class="scan" @click="scan" v-if="isCanScan">
                    <img src="./img/ic_qrcord.png">
                    <div>扫一扫</div>
                </div>
            </div>
            <div class="tips">
                请仔细检查，如填错运单号， 百大易购无法获取退货信息将导致退款异常
            </div>
        </div>

        <button class="apply-btn al-btn" @click="submit">提交</button>

    </div>
</template>

<script>
    import messBox from 'common/mess-box'
    import appSDK from 'common/app-SDK'
    import wxTool from 'common/wx.tool.js'

    export default{
        data(){
            return {
                checkedNotice: false,
                detail: null,
                afterSalesNo: null,
                delivCode: '',
                delivName: '',
                isCanScan: wxTool.is_weixin() || appSDK.isApp,
            }
        },
        methods: {
            getDetail(){
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/detail`, {
                    afterSalesNo: this.afterSalesNo,
                }).success(({ data }) => {
                    this.detail = data
                })
            },
            submit(){
                if (!this.checkedNotice) {
                    messBox.tips('请先勾选退货须知')
                    return
                }
                if (!this.delivName.length) {
                    messBox.tips('请输入快递公司名称')
                    return
                }
                if (!this.delivCode.length) {
                    messBox.tips('请输运单号')
                    return
                }
                http.get(`${gConfig.PROJECT_ORDER}/api/aftersales/modifyaddress`, {
                    params: JSON.stringify({
                        afterSalesNo: this.afterSalesNo,
                        delivCode: this.delivCode,
                        delivName: this.delivName,
                    })
                }).success(({ data, code }) => {
                    if (code === 1000) {
                        messBox.tips('提交成功')
                        history.back()
                    }
                })
            },
            scan(){
                if (appSDK.isApp) {
                    appSDK.scanBarCode().then(code => {
                        this.delivCode = code
                    })
                } else if (wxTool.is_weixin()) {
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: (res) => {
                            this.delivCode = res.resultStr.split(',')[1]
                        }
                    })
                }

            },
        },
        route: {
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

    .require {
        color: $BC8;
        margin-right: 10px;
    }

    .address {
        background: #fff url(./img/aftersale_address.png) left bottom no-repeat;
        background-size: 750px;
        padding: 0 30px;
        .tips {
            padding: 30px 0;
            font-size: $TH8;
            color: $BC3;
        }
        .info {
            padding-bottom: 40px;
            font-size: $TH6;
        }
    }

    .agreement {
        background: #fff;
        padding: 0 30px 30px 30px;
        font-size: $TH8;
        margin-top: 20px;
        .title {
            padding: 30px 0;
        }
        .chekced {
            font-size: 24px;
            color: $BC4;
        }
    }

    .choose-company {
        background: #fff;
        padding: 0 30px 30px 30px;
        margin-top: 20px;
        .title {
            padding: 30px 0;
        }
        input {
            width: 100%;
            outline: none;
            line-height: 80px;
            background: $BC7;
            border: 0;
            padding: 0 20px;
        }
    }

    .waybill {
        background: #fff;
        padding: 0 30px;
        margin-top: 20px;
        .title {
            padding: 30px 0;
        }
        .input-wrap {
            input {
                border: 0;
                background: $BC7;
                line-height: 80px;
                width: 560px;
                outline: none;
                padding: 0 20px;
            }
            .scan {
                text-align: center;
                color: $BC4;
                img {
                    width: 58px;
                    height: 50px;
                }
            }
        }
        .tips {
            color: $BC8;
            background: #fff;
            padding: 30px 0;
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