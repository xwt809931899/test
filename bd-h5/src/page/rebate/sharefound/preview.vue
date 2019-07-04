<template>
    <div class="share_found">
        <header>
            <a href="javascript:window.history.go(-1);" class="goback"></a>
            <a class="godraft" @click="saveDraft">存草稿</a>
            <h1>
                <div id="j-act-title" class="title">预览文案</div>
            </h1>
        </header>

        <div class="container">
            <div class="topimg">
                <img :src="imgUrl"/>
            </div>

            <div class="textarea-wrap mb0">
                <p>{{text}}</p>
            </div>
            <div class="content">
                <template v-for="item in fields">
                    <pre v-if="item.type==='text'" class="textarea-wrap">{{item.text}}</pre>
                    <div v-if="item.type==='img'" class="textimg-warp">
                        <img :src="item.imgUrl">
                    </div>
                    <div v-if="item.type==='product'" class="textpropreview-warp">
                        <h5><span>{{item.proIndex}}</span>{{item.itemTitle}}</h5>
                        <p class="descword">{{item.sellingPoint}}</p>
                        <div class="border">
                            <img :src="item.mainIcon">
                            <div class="price display-flex">
                                <div>
                                    <strong>￥{{item.salePrice | toFixed}}</strong>
                                    <p>{{item.country}}</p>
                                </div>
                                <div>
                                    <a class="btn btn-lt" :href="item.itemCode | previewItemUrl">查看详情</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <footer class="foot-btn">
            <button @click="publish" class="btn fr">发布</button>

            <div class="preview-pri display-flex">
                <div @click="togglePri">
                    <img v-if="canQuote" src="btn_article_privacy_normal.png">
                    <img v-else src="btn_article_privacy_checked.png">
                </div>
                <div @click="togglePri">
                    <div class="tip-title">文案不可被引用</div>
                    <div class="tip-content">原创文案被引用每次奖励2金币</div>
                </div>
            </div>
        </footer>
    </div>

    <div v-show="succLayer" class="layer succLayer">
        <div class="layerback"></div>
        <div class="layermain">
            <img src="ic_article_dialog.png" class="ic_article_dialog">
            <p class="succ-tips">文案发表成功
                <template v-if="coinNum>0">
                    ，奖励{{coinNum}}金币
                </template>
            </p>
            <div class="display-flex succbtn j-share-control">

                <button @click="golist" class="btn btn-grey">查看列表</button>
                <button @click="share" data-img="{{imgUrl}}"
                        data-title="{{text}}" data-eid="{{eid}}"
                        data-des="{{shareDesc}}"
                        class="btn btn-yellow  j-share-btn">立即分享
                </button>

            </div>
        </div>
    </div>
</template>

<script>
    var tip = new Base.Widget.Tip();
    import localtore from '../../../common/local.store.js'
    import store from './store.js'
    export default{
        data(){
            return {
                eid: "",
                text: "",
                imgUrl: "",
                fields: [],
                canQuote: true,
                succLayer: false,
                coinNum: 0,
            }
        },
        computed: {
            shareDesc(){
                return JSON.stringify(this.fields)
            }
        },
        methods: {
            togglePri(){
                this.canQuote = !this.canQuote;
            },
            publish(){
                var url = '';
                var params = store.createParams({
                    text: this.text, // 文案title
                    imgUrl: this.imgUrl, // 文案titleImg
                    canQuote: this.canQuote ? 'Y' : 'N', // 是否可引用 Y/N
                    fields: this.fields, // 内容
                    status: 'ISSUE' //  发布
                });
                if (store.eid) { // 编辑文案
                    params.eid = store.eid;
                    url = gConfig.PROJECT_REBATE+'/api/essay/alterEssay'
                } else { // 新增文案
                    url = gConfig.PROJECT_REBATE+'/api/essay/releaseEssay'
                }
                this.$http.post(url, params).then(({ data:{ data, code } })=> {
                    if (code !== 1000) return;
                    localtore.remove("shareData");
                    this.eid = data.eid;
                    this.coinNum = data.coinNum;
                    this.succLayer = true;
                });
            },
            golist(){
                location.href = "myrebate.html?lt=atc";
            },
            share(event){
                window.onShareBtnClickHand.call(event.target)
            },
            saveDraft(){
                var url = '';
                var params = store.createParams({
                    text: this.text,
                    imgUrl: this.imgUrl,
                    canQuote: this.canQuote ? 'Y' : 'N', // 是否可引用 Y/N
                    fields: this.fields,
                    status: 'DRAFT' //  存草稿
                });
                if (store.eid) { // 编辑的文案存草稿
                    params.eid = store.eid;
                    url = gConfig.PROJECT_REBATE+'/api/essay/alterEssay'
                } else { // 新增的文案存草稿
                    url = gConfig.PROJECT_REBATE+'/api/essay/releaseEssay'
                }
                this.$http.post(url, params).then(({ data:{ data, code } })=> {
                    if (code !== 1000) return;
                    this.eid = data.eid;
                    tip.show("成功保存为草稿", { 'timeout': 1000 });
                });

            },
        },
        ready(){

        },
        route: {
            data ({ to }) {
                var shareData = localtore.get("shareData");
                if (!shareData) {
                    this.$route.router.go("/");
                    return;
                }
                this.text = shareData.text;
                this.fields = shareData.fields;
                this.imgUrl = shareData.imgUrl;

                var proIndex = 1;
                this.fields.forEach(function (item) {
                    if (item.type == "product") {
                        item.proIndex = proIndex++;
                    }
                });

            }
        }
    }
</script>

<style>
    html, body {
        background: #f4f4f4;
    }

    footer {
        max-width: none;
    }

    .mb0 {
        margin-bottom: 0;;
    }

    .textpropreview-warp {

    }

    .tip-title {
        color: #af1c40;
    }

    .tip-content {
        color: #666666;
    }

</style>