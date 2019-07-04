<template>
    <slot></slot>
    <!--<div class="no-more" v-if="model.length && noMore">-->
    <!--没有更多数据-->
    <!--</div>-->
    <div class="loading" v-if="loading">
        加载中...
    </div>
</template>
<script>
    export default{
        props: {
            startNum: {
                type: Number,
                default: () => 0,
            },
            onData: null, // 获取数据
            model: {
                type: Array,
                twoWay: true,
            },
            pageSize: {
                type: Number,
                default: () => 10,
            },
            name:{
                type: String,
            },
            type: {
                type: String,
                default: ""
            },
            el: null
        },
        data(){
            return {
                loading: false,
                noMore: false, //有下一页
                initSort: 0,
            }
        },
        methods: {
            getData(startNum){
                this.loading = true
                var promise = this.onData({
                    startNum: startNum,
                    pageSize: this.pageSize
                })
                if (promise === undefined) return
                if (promise.then instanceof Function) {
                    promise.then(({ data:{data} }) => {
                        this.loading = false
                        if (!data) return
                        data.list = data.list || []
//                         this.model = this.model.concat(data.list)
// //                        if(this.initSort==0){//第一次加载的时候初始化PAGESIZE
// //                            this.pageSize=data.list.length+1;
// //                            this.initSort++
// //                        }
//                         //7 < 7
//                         if (data.list.length < this.pageSize) { // 最后一页
//                             this.noMore = true
//                         }
//                         this.startNum = data.startNum
                        if(this.type === 'daojia'){
                          this.model = this.model.concat(data.record)
                        }else{
                          this.model = this.model.concat(data.list)
                        }

//                        if(this.initSort==0){//第一次加载的时候初始化PAGESIZE
//                            this.pageSize=data.list.length+1;
//                            this.initSort++
//                        }
                        //7 < 7
                        if(this.type === 'daojia') {
                          if (data.record.length < this.pageSize) { // 最后一页
                              this.noMore = true
                          }
                          this.startNum++;
                        }else{
                          if (data.list.length < this.pageSize) { // 最后一页
                              this.noMore = true
                          }
                          this.startNum = data.startNum
                        }
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
                if (obj && obj.name && obj.name !== this.name) {
                    return
                }
                this.model = []
                this.startNum = 0
            /* 处理在同一个页面 切换tab选项 但是data的noMore只初始化了一次，
             切换tab的时候还需初始化一次，因为假如前一个tab没有数据，切换另外一个tab的时候之后拉取一页的数据*/
                this.noMore = false
                if (obj && obj.hasOwnProperty('startNum')) {
                    this.startNum = obj.startNum
                }
                this.getData(this.startNum)
            })
            const elScroll = this.el ||  document.querySelector("#wrapper>.scroll") || document.querySelector("#wrapper") || document.body;
            //判断window或div.overflow滚动条
            let el = elScroll;
            if (elScroll == document.body) el = window;
            el.addEventListener('scroll', () => {
                if (window.innerHeight + elScroll.scrollTop + 50 >= elScroll.scrollHeight) {
                    if (!this.loading) { // 加载完了，才请求下一页
//                        if (!this.noMore) return;
                        if (this.noMore) {  //  没有下一页
                            return
                        }
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
