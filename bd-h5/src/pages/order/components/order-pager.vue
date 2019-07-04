<template>
    <slot></slot>
    <div class="no-more" v-if="model.length && noMore">
        没有更多数据
    </div>
    <div class="loading" v-if="loading">
        加载中...
    </div>
</template>
<script type="text/babel">
    export default{
        props: {
            startNum: {
                type: Number,
                default: ()=> 0,
            },
            startNum2: {
                type: Number,
                default: ()=> 0,
            },
            onData: null, // 获取数据
            onOldData: null, // 获取数据
            data1End: false,
            model: {
                type: Array,
                twoWay: true,
            },
            pageSize: {
                type: Number,
                default: ()=> 10,
            },
        },
        data(){
            return {
                loading: false,
                noMore: false,
            }
        },
        methods: {
            getData(startNum){
                this.loading = true //发送请求，显示加载中提示
                var promise
                if (this.data1End) {
                    promise = this.onOldData({
                        startNum: startNum,
                        pageSize: this.pageSize
                    })
                } else {
                    promise = this.onData({
                        startNum: startNum,
                        pageSize: this.pageSize
                    })
                }
                if (promise === undefined){ // 隐藏加载中提示
                    this.loading = false
                    return
                }
                if (promise.then instanceof Function) {
                    promise.success(({ data })=> {
                        console.log(data);
                        this.loading = false
                        if (!data) return
                        data.list = data.list || []
                        this.model = this.model.concat(data.list)
                        if (data.list.length < this.pageSize) {
                            if (this.data1End) {
                                this.noMore = true
                            } else {
                                this.data1End = true
                                this.getData(0)
                            }
                        }
                        this.startNum = data.startNum
                    })
                } else {
                    this.$router.go(promise)
                }
            },
            next(){
                this.getData(this.startNum)
            },
        },
        ready(){
            this.$on("loadPage", obj => {
                this.model = []
                this.startNum = 0
                this.data1End = false
                if (obj && obj.hasOwnProperty('startNum')) {
                    this.startNum = obj.startNum
                    this.getData(this.startNum)
                } else {
                    this.getData(this.startNum)
                }
            })
            const elScroll = document.querySelector("#wrapper>.scroll") || document.querySelector("#wrapper") || document.body
            elScroll.addEventListener('scroll', () => {
                if (window.innerHeight + elScroll.scrollTop + 50 >= elScroll.scrollHeight) {
                    if (!this.loading) { // 加载完了，才请求下一页
                        if (this.noMore) return;
                        this.getData(this.startNum)
                    }
                }
            })
        },
    }
</script>

<style scoped>
    .no-more, .loading {
        padding: 40px;
        text-align: center;
    }
</style>
