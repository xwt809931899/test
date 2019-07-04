<template>
    <div class="index scroll" @scroll="onScroll" v-el:scroll>
        <header>
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
            <i class="iconfont text" @click="goSearch()">&#xe606;</i>
        </header>
        <div class="catetory-list">
            <div v-for="item in categoryList" @click="goResult(item)">
                <img v-src="item.logourl"/>
                <span>{{item.categName}}</span>
            </div>
        </div>
        <h4 class="header-title">超值精选</h4>
        <prolist v-if="catid>0" :categ-Id="catid"></prolist>
    </div>
    <go-to-top></go-to-top>
    <footer-nav :no-load-red="true"></footer-nav>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .index {
        padding: 0 0 130px 0;
    }

    header {
        border-bottom: 1px solid $BC6; /*no*/
        .iconfont {
            width: 70px;
            font-size: 40px;
        }
    }

    .catetory-list {
        overflow: auto;
        white-space: nowrap;
        width: 10rem;
        background: #fff;
        > div {
            display: inline-block;
            text-align: center;
            padding: 20px;
            img {
                width: 88px;
                height: 88px;
            }
            span {
                display: block;
                margin-top: 10px;
            }
        }
    }

    .header-title {
        border-left: 10px solid #c00;
        margin-left: 24px;
        padding-left: 24px;
        font-weight: 500;
    }
</style>
<script type="text/babel">
    import goToTop from 'components/go-to-top.vue'
    import prolist from './prolist.vue'
    import util from 'common/util'
    import wxTool from 'common/wx.tool'

    export default{
        data(){
            return {
                categoryList: [],
                hotSearch: null,
                catid: 0,
                title: "",
            }
        },
        components: {
            goToTop, prolist,
        },
        methods: {
            onScroll(){
                this.$broadcast("scroll", this.$els.scroll);
            },
            encodeURIComponent(str){
                return encodeURIComponent(str)
            },
            goSearch(){
                location.href = "/search.html"
            },
            goResult(item){
                location.href = `/search.html#!/result/${item.parentCategId}/${item.scid}/-`;
            }
        },
        ready(){
            this.catid = util.getParamter('catid')
            this.$http.get(gConfig.PROJECT_PRODUCT + '/api/categ/itemSecondCategList', {
                categId: this.catid
            }).success(({ data }) => {
                this.categoryList = data
        })
        },
        route: {
            data(){
                var title = window.decodeURIComponent(util.getParamter('cattitle'))
                this.title = title
                wxTool.setTitle(title)
            },
        },
    }
</script>
