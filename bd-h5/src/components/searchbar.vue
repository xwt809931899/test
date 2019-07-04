<template>

    <div v-if="type===1" class="search-bar">
        <div v-el:searh-wrap class="sb-wrap searh-wrap display-flex" :class="classNameObj">
            <!-- <div v-if="isRebate" class="searp-webizicon display-flex">
                <a href="rebate/home.html"></a>
            </div> -->
            <div class="searp-messicon">
                <a :href="isLogin ? 'news.html':'login.html'">
                    <div class="searp-messicon-tips" v-if="notify_num>0"></div>
                </a>
            </div>
            <div @click="goSearch" v-if="isShowInput" class="input-wrap">
                <div class="searp-searchicon"></div>
                <form @submit.prevent="onSubmit" action="searchResult.html">
                    <input @focus="onFocus" @blur="onBlur" name="sword" type="search" :placeholder="hotsearch[curIndex]"
                           v-model="sword"/>
                    <a @click="sword=''" class="clear"></a>
                </form>
            </div>
            <div v-else class="logo">
            </div>
            <!--<div class="searp-messicon">-->
            <!--<a :href="isLogin ? 'news.html':'login.html'">-->
            <!--<div class="searp-messicon-tips" v-if="notify_num>0"></div>-->
            <!--</a>-->
            <!--</div>-->
            <div v-if="!isShowInput" class="search-img" onclick="location.href = '/search.html'">
            </div>
        </div>

        <search-history v-show="inputFocus" @select="search"></search-history>

    </div>
    <div v-if="type===2" class="search-bar">
        <div v-el:searh-wrap class="sb-wrap searh-wrap display-flex sw2">
            <!-- <div v-show="false" class="searp-webizicon"><a href="rebate/home.html"></a></div> -->
            <div @click="goSearch" style="padding: 0 5px;">
                <div class="searp-searchicon"></div>
                <form @submit.prevent="onSubmit" action="searchResult.html">
                    <input @focus="onFocus" @blur="onBlur" name="sword" type="search" placeholder="搜索类别，品牌，关键字"
                           v-model="sword"/>
                </form>
            </div>
            <div v-show="false" class="searp-messicon">
                <a :href="isLogin ? 'news.html':'login.html'">
                    <div class="searp-messicon-tips" v-if="notify_num>0"></div>
                </a>
            </div>
        </div>

        <search-history v-show="inputFocus" @select="search"></search-history>

    </div>


</template>
<style>
    input[type="search"]::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
</style>
<style scoped>
    .search-bar {
        position: absolute;
    }

    .input-wrap {
        position: relative;
    }

    .clear {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 10px;
        right: 10px;
        background: url('../img/clear.png') no-repeat;
        background-size: 16px;
        outline: none;
    }
</style>
<script type="es6">
    import serachHistory from './search-history-old.vue'
    export default{
        data(){
            return {
                sword: "",
                hisArr: [],
                hsKey: "searchHis",
                className: "",
                curIndex: 0,
                isShowInput: false,
            }
        },
        components: {
            'search-history': serachHistory
        },
        computed: {
            classNameObj: function () {
                if (!!this.className) {
                    let obj = {};
                    obj[this.className] = true;
                    return obj;
                }

                return { sw3: this.inputFocus };

            }
        },
        props: {
            notify_num: Number,
            isLogin: Boolean,
            isRebate: Boolean,
            inputFocus: Boolean,
            isFixed: {
                type: Boolean,
                default: true
            },
            type: {
                type: Number,
                default: 1
            },
            hotsearch: {
                type: Array,
                default: [],
            },
        },
        methods: {
            scrollFixed(){
                var searhWrap = $(this.$els.searhWrap);
                var maxHeight = 200;

                $('#wrapper').scroll(()=> {
                    var top = $('#wrapper').scrollTop();
                    var ratio = top / maxHeight;
                    if (ratio > 1) ratio = 1
                    if (ratio > .5) {
                        this.className = "sw3";
                        //searhWrap.addClass("sw3");
                        this.isShowInput = true;

                    } else {
                        this.className = "";
                        //searhWrap.removeClass("sw3");
                        this.isShowInput = false;
                    }
                    searhWrap.css({
                        background: "rgba(255,255,255," + ratio + ")"
                    });

                });
            },
            onSubmit(){
                if (this.sword.length < 1) return;

                this.$broadcast('insertSearchHis', this.sword)

                this.search(this.sword)
            },
            search(word){
                // 路由是如此设置
                location.href = `/search.html#!/result/-/-/${word}/1`;
            },
            onFocus(){
                this.inputFocus = true;
            },
            onBlur(){
                setTimeout(()=> {
                    this.inputFocus = false;
                }, 150);
            },

        },
        ready(){
            if (this.type === 1) {
                this.scrollFixed();
                //首页的搜索框隔5秒钟循环显示后台返回的热门商品数组里面的文字
                setInterval(() => {
                    if (this.curIndex === this.hotsearch.length - 1) {
                        this.curIndex = 0
                    } else {
                        this.curIndex++
                    }
                }, 5000);
            }
        }
    }


</script>
