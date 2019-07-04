<template>
    <div class="share_found">
        <header>
            <a href="javascript:window.history.go(-1);" class="goback"></a>
            <h1>
                <div id="j-act-title" class="title">文案详情</div>
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
                    <div v-if="item.type==='1'" class="textarea-wrap">
                        <p>{{item.text}}</p>
                    </div>
                    <div v-if="item.type==='2'" class="textimg-warp">
                        <img :src="item.imgUrl">
                    </div>
                    <div v-if="item.type==='3'" class="textpropreview-warp">
                        <h5>{{item.name}}</h5>
                        <div class="border">
                            <img :src="item.logourl">
                            <div class="price display-flex">
                                <div>
                                    <strong>￥{{item.price | toFixed}}</strong>
                                    <p>{{item.origin}}</p>
                                </div>
                                <div>
                                    <button class="btn btn-lt">查看详情</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <footer class="foot-btn">
            <button @click="publish" class="btn fr">引用</button>
        </footer>
    </div>

</template>

<script>
    import localtore from '../../../common/local.store.js'
    import store from './store.js'
    export default{
        data(){
            return {
                eid: "",
                text: "",
                imgUrl: "",
                fields: [],
                isPri: false,
                coinNum: 0,
            }
        },
        methods: {},
        ready(){

        },
        route: {
            data({to}){
                var eid = to.params.id;
                return this.$http.post("/api/essay/viewEssay.jsp", {
                    op: 2,
                    eid
                }).then(({ data :{ obj } })=> {
                    if (!obj) {
                        alert("没有该文案");
                        return;
                    }

                    this.serverData = obj;
                    this.text = obj.title;
                    this.imgUrl = obj.title_img;
                    this.fields = JSON.parse(obj.content);
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

    .mb0 {
        margin-bottom: 0;;
    }

    .textpropreview-warp {

    }

</style>