<template>
    <div class="share_found">
        <header>
            <a href="javascript:window.history.go(-1);" class="goback"></a>
            <a class="godraft" @click="saveDraft">存草稿</a>
            <h1>
                <div id="j-act-title" class="title">编辑文案</div>
            </h1>
        </header>
        <div class="container">
            <div class="topimg">
                <img :src="imgUrl"/>
                <div class="topimgctrl">
                    <img @click="reloadimg" src="btn_article_changebg_normal.png"/>
                    　　　　
                    <img @click="updateimg" src="btn_article_uploadbg_normal.png"/>
                </div>
            </div>


            <div class="title-wrap">
                <input v-model="text" type="text" placeholder="好的标题会吸引更多的眼球（20字以内）" maxlength="20">
            </div>

            <template v-for="item in fields">
                <slide-left-btns :show-del="true" @slide-del="delField(item)">
                    <div v-if="item.type==='text'" class="textarea-wrap mb5">
                        <textarea v-model="item.text" placeholder="用一段文字表述您的经验或观点" rows="3"></textarea>
                    </div>
                </slide-left-btns>
                <slide-left-btns :show-del="true" @slide-del="delField(item)">
                    <div v-if="item.type==='img'" class="textimg-warp mb5">
                        <img :src="item.imgUrl">
                    </div>
                </slide-left-btns>

                <slide-left-btns :show-del="true" @slide-del="delField(item)">
                    <div v-if="item.type==='product'" class="textpro-warp display-flex mb5">
                        <img :src="item.mainIcon">
                        <div>
                            <h5>{{item.itemTitle}}</h5>
                            <div class="price">￥{{item.salePrice | toFixed}}
                                <span>￥{{item.salePrice | rate item.rate | toFixed}}</span>
                            </div>
                        </div>
                    </div>
                </slide-left-btns>
            </template>


            <div class="add-pro-wrap">
                <buttonS @click="addPro" class="btn btn-red btn-block btn-radius">添加商品</buttonS>
            </div>
        </div>

        <footer class="foot-btn">
            <button @click="goPreview" class="btn fr btn-radius">预览发布</button>
            <div class="add-text-img">
                <div @click="addText">
                    <img src="btn_article_addtext_normal.png">
                </div>
                <div @click="addImg">
                    <img src="btn_article_addimage_normal.png">
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import updateImg from '../../../common/update.img.js'
    import wxTool from '../../../common/wx.tool.js'
    import localtore from '../../../common/local.store.js'
    import store from './store.js'
    var tip = new Base.Widget.Tip();
    export default{
        data(){
            var imgs = [
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793880024103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793763955103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793901636103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793911515103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793930263103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793967628103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453794219998103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453793994134103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453794002796103902.jpg',
                'http://allpyra.ufile.ucloud.com.cn/20160126/essay/1453794233117103902.jpg',
            ];
            return {
                serverData: undefined,
                defaultImgs: imgs,
                text: "",
                imgUrl: imgs[parseInt(Math.random() * 10)],
                fields: [{ type: "text", text: "" }],
            }
        },
        methods: {
            addText(){
                this.fields.push({ type: "text", text: "" })
            },

            addImg(){
                wxTool.chooseSingleImg().then((data)=> {
                    return updateImg(data, 'essay')
                }).then((imgUrl)=> {
                    const img =new Image()
                    img.src= imgUrl[0]
                    img.onload = () => {
                        var obj = {
                            type: "img",
                            imgUrl: imgUrl[0],
                            imagesize:`${img.width},${img.height}`
                        };
                        this.fields.push(obj);
                    }

                });

            },
            saveStore(){
                var shareData = {
                    eid: store.eid, // 文案id
                    text: this.text, //标题
                    fields: this.fields, // 文本框
                    imgUrl: this.imgUrl, //图片
                };
                localtore.set("shareData", shareData);
            },
            addPro(){
                this.saveStore();
                setTimeout(function () {
                    // location.href = "/rebate/search.html?sourceUrl=share_found";
                    location.href = "/search.html?sourceUrl=share_found#/share";
                })
            },
            reloadimg(){
                this.imgUrl = this.defaultImgs[parseInt(Math.random() * 10)];
            },
            updateimg(){
                wxTool.chooseSingleImg().then((data)=> {
                    return updateImg(data, 'essay')
                }).then((imgUrl)=> {
                    this.imgUrl = imgUrl[0];
                });

            },
            goPreview(){
                console.log({ content: JSON.stringify(this.fields) })
                if (!this.text.length) {
                    tip.show("请输入标题", { 'timeout': 1000 });
                    return;
                }
                if (!this.imgUrl.length) {
                    tip.show("请上传张封面图片", { 'timeout': 1000 });
                    return;
                }

                if (!this.imgUrl.length) {
                    tip.show("请上传张封面图片", { 'timeout': 1000 });
                    return;
                }
                var textCount = 0;
                var proCount = 0;
                this.fields.forEach(function (item) {
                    if (item.type === "text") {
                        textCount += item.text.length >= 10 ? 1 : 0;
                    }
                    else if (item.type === "product") {
                        proCount += 1;
                    }
                });
                if (textCount == 0) {
                    tip.show("请填写描述，不少于10字", { 'timeout': 1000 });
                    return;
                }
                if (proCount == 0) {
                    tip.show("请添加商品", { 'timeout': 1000 });
                    return;
                }

                this.saveStore();
                this.$route.router.go("preview");
            },
            delField(item){
                this.fields.$remove(item);
            },
            saveDraft(){
                var url = '';
                var params = store.createParams({
                    text: this.text,
                    imgUrl: this.imgUrl,
                    canQuote: this.canQuote ? 'Y' : 'N', // 是否可引用 Y/N
                    fields: this.fields,
                    status: 'DRAFT ' //  存草稿
                });
                if (store.eid) { // 编辑的文案存草稿
                    params.eid = store.eid;
                    url = gConfig.PROJECT_REBATE+'/api/essay/alterEssay'
                } else { // 新增的文案存草稿
                    url = gConfig.PROJECT_REBATE+'/api/essay/releaseEssay'
                }
                this.$http.get(url, params).then(({ data:{ data, code } })=> {
                    if (code !== 1000) return;
                    this.eid = data.eid;
                    tip.show("成功保存为草稿", { 'timeout': 1000 });
                });

            },
        },
        ready(){
            window.setInterval(() => {
                if (this._isAttached) {
                    console.log('auto save')
                    this.saveStore()
                }
            }, 2000)
        },
        route: {
            data({ to }){
                var eid = to.params.id;
                /* 新增文案*/
                if (eid === undefined) {
                    var shareData = localtore.get("shareData");
                    if (!shareData) return;

                    store.eid = shareData.eid;
                    this.text = shareData.text || this.text;
                    this.fields = shareData.fields;
                    this.imgUrl = shareData.imgUrl || this.imgUrl;

                    return;
                }

                if (store.id == eid) return; // 防止还没保存数据去点击预览发布按钮然后点击返回而重新渲染页面（那样会造成填写的数据丢失）
                /*编辑文案*/
                store.eid = eid;
                return this.$http.get(gConfig.PROJECT_REBATE+'/api/essay/viewEssay', {
                    eid
                }).then(({ data :{ data } })=> {
                    this.serverData = data;
                    this.text = data.title;
                    this.imgUrl = data.titleImg;
                    try {
                        this.fields = JSON.parse(data.content.replace(/\\r|\\n|\r|\n/g, "\\n"));
                        this.fields.forEach(function (item) {
                            if (item.type == "text") {
                                try {
                                    item.text = decodeURIComponent(item.text.replace(/\\r|\\n|\r|\n/g, "\n"));
                                } catch (e) {
                                    item.text = item.text.replace(/\\r|\\n|\r|\n/g, "\n");
                                }
                            }
                        });
                    } catch (e) {
                        this.fields = [];
                        console.error(e, data.content);
                    }

                });

            }
        },
    }
</script>

<style>
    html, body {
        background: #f4f4f4;
    }

    footer {
        max-width: none;
    }

    .price span {
        background-image: url("ic_article_fanlil.png");
    }
</style>