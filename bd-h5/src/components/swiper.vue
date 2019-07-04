<template>
    <div class="swiper-container swiper-components" v-el:swiper :style="{'margin-bottom': margin}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" track-by="$index" :key="item.actLink"><a :href="item.actLink || 'javascript:;'" v-pv ptag="{{pprd}}{{$index+1}}"><img v-src="item.src || item"><tag :tag-type="'proDetail'" :tag="tag" :index="$index"></tag></a>
            </div>
        </div>

        <div class="dotted" v-el:dotted></div>

        <slot></slot>
    </div>

</template>
<script>
    import util from 'common/util'
    import tag from '../components/tag.vue'
    export default{
        data(){
            return {
                swiper: null,
                margin: window.devicePixelRatio == 3 ? '-3px': '-1px',
            }
        },
        props: {
            list: {
                default: () => []
            },
            params: {
                type:[Object,Array],
                default:[{},[]]
            },
            pprd: "",
            curIndex: 0,
            tag: {
                type: String
            }
        },
        computed: {
            nowDate() {

            }
        },
        components: {
            tag,
        },
        methods: {
        },
        ready(){
            var params = _.extend({
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                calculateHeight: true,
                observer: true,
                observeParents: true,
                pagination: this.$els.dotted,
            }, this.params)
            this.$nextTick(() => {
                this.swiper = new Swiper(this.$els.swiper, params);
                this.swiper.slideTo(this.curIndex, 0, false);//默认切换到第一个个slide，速度为0秒
                this.$watch('curIndex', v => {
                    this.swiper.slideTo(v, 0, false);//切换到第curIndex个slide，速度为0秒
                })
            })
        },
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .swiper-components {
        .swiper-pagination-bullets.dotted {
            position: absolute;
            width: 100%;
            bottom: 20px;
            text-align: center;
            z-index: 9;
            span {
                display: inline-block;
                font-size: 0;
                line-height: 0;
                background-color: $H7;
                border-radius: 8px;
                width: 12px;
                height: 8px;
                margin: 0 8px;
            }
            .swiper-pagination-bullet-active {
                background-color: $C6;
                width: 30px;
            }

        }
        .swiper-slide {
            img {
                width: 100%;
                min-height: 200px;
                display: block;
                vertical-align:top;
            }
        }
    }
</style>
