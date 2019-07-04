<template>
    <header>
        <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
        <h1>品牌主页</h1>
        <a class="right"><i @click="share" class="iconfont share">&#xe60f;</i></a>
    </header>
    <div class="head display-flex">
        <div class="brand display-flex">
            <div class="logo"><img v-src="details.brandLogo"/></div>
            <div class="word">
                <div class="name">{{details.brandNameCh}}{{details.brandNameEn}}</div>
                <div class="on-sale">在售商品<span>{{details.sellingProduct}}</span>个</div>
            </div>
        </div>
        <div class="care">
            <button class="al-btn" v-show="isFavoriteBrand" @click="care" pprd="21008.1.2">已关注</button>
            <button class="al-btn" v-show="!isFavoriteBrand" @click="care" pprd="21008.1.1">关注</button>
        </div>
    </div>
    <div class="display-flex intro">品牌介绍</div>
    <div class="detail-img">
        <img v-src="details.detailsImg"/>
    </div>
    <div class="display-flex hot">热门商品</div>
    <pager :on-data="getData" :start-num="0" :page-type="1" :model.sync="list">
        <ul class="list">
            <li v-for="pro in list">
                <a :href="pro.itemCode | proItemUrl" v-pv ptag="23008.1.{{$index+1}}">
                    <div class="img-wrap">
                        <div class="img-ratio-wrap">
                            <img v-src="pro.itemLogoUrl" w="0.5" h="0.5"/>
                            <div class="finished" v-if="pro.inventory === 0 || pro.maxBuyCount === 0"><img
                                    src="imgs/ic_list_soldout.png"></div>
                        </div>
                    </div>
                    <div class="name line-clamp2">{{pro.itemTitle}}</div>
                    <div class="display-flex price-origin">
                        <div class="price">￥{{pro.salePrice | toFixed}}</div>
                        <div class="origin">{{pro.country}}</div>
                    </div>
                </a>
            </li>
        </ul>
    </pager>
</template>
<script>
    import messBox from 'common/mess-box'
    import { confirm, confirmInput, tips, longTips } from 'common/msg-box'
    import util from 'common/util'
    export default{
        data(){
            return {
                details: {},
                list: [],
                isFavoriteBrand: false,
                brandId: undefined,
                startNum: 0,
            }
        },
        methods: {
            getData({ startNum, pageSize }){
                return http.get(gConfig.PROJECT_PRODUCT+'/api/brand/getProductsByBid', {
                    pageSize,
                    startNum,
                    brandid: this.brandId
                });
            },
            /*
             * 是否关注品牌
             */
            iscollectBrand(){
                this.$http.get(`${gConfig.PROJECT_USER}/api/userCollection/iscollectBrand`, {
                    brandid: this.brandId
                }, { noTips: true }).success(({ code, data })=> {
                    if (code === 1000 && data.result) {
                        this.isFavoriteBrand = true;
                    }
                })
            },
            /*
             * 关注品牌
             */
            care(){
                var url = "";
                if (this.isFavoriteBrand) {
                    url = `${gConfig.PROJECT_USER}/api/userCollection/removeCollectionBrand`
                } else {
                    url = `${gConfig.PROJECT_USER}/api/userCollection/collectBrand`
                }
                this.$http.get(url, {
                    brandid: this.brandId
                }, { noTips: true }).success(({ code, data, desc }) => {
                    if (code === 1000 && data.result) {
                        if (!this.isFavoriteBrand) {
                            messBox.tips('已关注');
                        } else {
                            messBox.tips('已取消关注');
                        }
                        this.isFavoriteBrand = !this.isFavoriteBrand;
                    } else if (code === 1003) {
                        messBox.confirm('您还未登录，是否登录？').then(() => {
                            util.goToLogin()
                        })
                    }
                    else {
                        messBox.tips(desc);
                    }

                });
            },
            share(){
                var name = this.details.brandNameCh + this.details.brandNameEn
                window.mobEvent.commonShare({
                    pic: this.details.brandLogo,
                    title: name,
                    description: `哎呦，我在${gConfig.siteNameZH}商城发现了${name}，不能放过！`,
                    url: location.href
                })
            },
            getDetail(){
                //拉取品牌详情
                http.get(gConfig.PROJECT_PRODUCT+'/api/brand/getBrandByid', {
                    brandId: this.brandId
                }).success(({ data, code }) => {
                    if (code === 1000) {
                        this.details = data;
//                    this.isFavoriteBrand = this.details.isFavoriteBrand;
                        var name = this.details.brandNameCh + this.details.brandNameEn
                        //  设置APP分享内容
                        window.mobEvent.setShare({
                            pic: this.details.brandLogo,
                            title: name,
                            desc: `哎呦，我在${gConfig.siteNameZH}商城发现了${name}，不能放过！`,
                            url: location.href
                        })
                    }
                });
            },
        },

        ready(){
            var option = {
//                type: 'tips',
//                type: 'longTips',
                type: 'confirm',
//                type: 'inputConfirm',
                imgIcon: '',
                title: '标题',
                subTitle: '副标题',
                content: '内容内容',
                cancel: '取消',
                confirm: '确定'
            };

            /*测试弹窗
             setTimeout(() => {
             this.messBox.tips(option).then(()=> {
             this.showAlert = false;
             });
             }, 200)
             confirm(option).then(()=> {
             });
             confirmInput(option).then(()=> {
             });
             tips('s收藏提示');
             longTips(' 没有网络哦！请检测网络设置，或者下拉刷新试试！');
             */
            window.onAppReload = () => {
                this.getDetail()
            }
        },
        route: {
            data ({ to }) {
                this.brandId = parseInt(to.params.brandId);
                setTimeout(() => {
                    this.$broadcast("loadPage");
                });
                this.getDetail()
                this.iscollectBrand();
            }
        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .head {
        height: 200px;
        background: #ffffff;
        border-top: 1px solid $C8; /*no*/
        .brand {
            flex: 1;
            .logo {
                width: 160px;
                height: 160px;
                margin: 20px 32px 20px 32px;
                border: 1px solid $C8; /*no*/
                img {
                    width: 156px;
                    height: 156px;
                    border-radius: 50%;
                }
            }
            .word {
                text-align: left;
                height: 200px;
                .name {
                    padding-top: 58px;
                    padding-bottom: 22px;
                    color: $C4;
                    font-size: $H4;
                }
                .on-sale {
                    color: $C7;
                    font-size: $H5;
                    span {
                        color: $C3;
                    }
                }
            }
        }
        .care {
            width: 120px;
            height: 68px;
            margin-right: 32px;
            button {
                width: 120px;
                height: 68px;
                border: 1px solid $C1; /*no*/
                border-radius: 4px; /*no*/
                color: $C1;
                background: #ffffff;
                padding: 2px;
            }
        }

    }

    .intro {
        color: $C4;
        font-size: $H4;
        text-align: center;
        margin-top: 48px;
        margin-bottom: 24px;
    }

    .intro:before, .hot:before {
        content: '';
        flex: 1;
        display: block;
        border-bottom: 1px solid #CCCCCC; /*no*/
        position: relative;
        top: -10px;
        margin-right: 20px;
        height: 20px;
    }

    .intro:after, .hot:after {
        content: '';
        flex: 1;
        display: block;
        border-bottom: 1px solid #CCCCCC; /*no*/
        position: relative;
        top: -10px;
        margin-left: 20px;
        height: 20px;
    }

    .detail-img {
        width: 100%;
        color: #ffffff;
        img {
            width: 100%;
        }
    }

    .hot {
        color: $C4;
        font-size: $H4;
        text-align: center;
        margin-top: 48px;
        margin-bottom: 24px;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    .list {
        list-style: none;
        margin: 0;
        padding: 0;
        position: relative;
        background-color: $BC7;
        width: 750px;
        display: flex;
        flex-flow: row wrap;
        -webkit-flex-flow: row wrap;

        li {
            display: inline-block;
            margin: 0;
            position: relative;
            background-color: #ffffff;
            width: 374px;
            a {
                text-decoration: none;
            }
            .img-wrap {
                width: 100%;
                padding: 40px 50px;
                .finished {
                    position: absolute;
                    top: 60px;
                    left: 56px;
                    img {
                        width: 160px;
                        height: 160px;
                    }
                }
            }
            &:nth-child(2n-1) {
                border-right: 2px solid $BC7; /*no*/
                border-top: 2px solid $BC7; /*no*/
            }
            &:nth-child(2n) {
                border-top: 2px solid $BC7; /*no*/
            }
            .pic {
                position: relative;
                padding-top: 40px;
                .mask {
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, .3);
                    width: 338px;
                    height: 338px;
                }
                .choosen {
                    position: absolute;
                    z-index: 3;
                    top: 137px;
                    left: 137px;
                    img {
                        width: 64px;
                        height: 64px;
                    }

                }
            }
            .name {
                margin: 0 40px 30px 40px;
                font-size: $TH8;
                color: $BC4;
            }
            .price-origin {
                margin-left: 30px;
                margin-bottom: 40px;
                .price {
                    font-size: $TH5;
                    color: $BC1;
                }
                .origin {
                    flex: 1;
                    font-size: $TH8;
                    color: $BC4;
                    margin-right: 40px;
                    text-align: right;
                }
            }
        }
    }
</style>
