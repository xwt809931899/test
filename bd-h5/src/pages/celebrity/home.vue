<template>
    <section class="header">
        <img :src="info.headImg">
        <p>{{info.specialName}}</p>
    </section>
    <h4 class="title">他的体验</h4>
    <section class="swiper-container swiper-components" v-el:swiper>
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in info.comments.list">
                <img :src="item.logourl">
            </div>
        </div>
        <div class="pname">{{ info.comments.list[index].pname }}</div>
    </section>

    <ul class="comments">
        <li v-for="item in info.comments.list[index].comment">
            <p>{{item.content}}</p>
            <div class="display-flex">
                <div v-for="value in item.img" @click="bigImg(item.img, $index)" class="img"
                     style="background-image: url({{value}});"></div>
            </div>
        </li>
    </ul>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .header {
        background: #fff;
        margin: 86px 32px 0 32px;
        border-radius: 4px;
        padding-bottom: 30px;;
        position: relative;
        img {
            display: block;
            margin: auto;
            width: 120px;
            height: 120px;
            border: 2px solid #fff;
            border-radius: 50%;
            position: relative;
            top: -54px;
            margin-bottom: -44px;
        }
        p {
            padding: 0 32px;
            font-size: $H6;
            color: $C5;
        }

    }

    .title {
        font-size: $H4;
        color: $C5;
        margin: 0;
        text-align: center;
        line-height: 90px;
    }

    .swiper-components {
        background: #fff;

        .swiper-slide {
            opacity: 0.5;
            transition: opacity 0.5s;
            &.swiper-slide-active {
                opacity: 1;
            }
        }
        img {
            width: 260px;
            height: 260px;
        }
        .pname {
            color: $C6;
            font-size: $H7;;
            text-align: center;
            margin: 32px 0 24px 0;
        }
    }

    .comments {
        margin: 0;
        padding: 0 40px;
        > li {
            list-style: none;
            margin: 32px 0;
            border-bottom: 1px solid $C7; /*no*/
            > p {
                word-break: break-all;
            }
            .img {
                width: 120px;
                height: 120px;
                background-size: cover;
            }
        }
    }
</style>
<script type="text/babel">
    import wxTool from 'common/wx.tool'
    import store from './store'
    export default{
        data(){
            return {
                info: null,
                index: 0,
                store,
            }
        },
        ready(){
            new Swiper('.swiper-container', {
                slidesPerView: 3,
                centeredSlides: true,
                observer: true,
                observeParents: true,
                spaceBetween: 30,
                onTransitionEnd: swiper => {
                    this.index = swiper.activeIndex
                }
            })
        },
        methods: {
            bigImg(value, index){
                this.store.imgUrl = value;
                this.store.imgIndex = index
                this.$router.go({ name: 'bigImg' });
            },
        },
        route: {
            data({ to }){
                const uid = to.params.uid
                http.get('/api/comment/comment.jsp', {
                    op: 5,
                    uin: uid
                }).success(({ obj }) => {
                    this.info = obj
                    wxTool.setTitle(obj.specialName)
                })
            }
        }
    }
</script>