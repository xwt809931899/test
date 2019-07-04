<template>
    <div class="searchCase">
        <div class="maxwidth">
            <h4>大家都在搜</h4>
            <ul class="hot-word-list">
                <li v-for="item in hotWordList" @click="selectItem(item)">{{item}}</li>
            </ul>

            <h4>搜索历史</h4>
            <div class="search-history">
                <div class="sh-list">
                    <p v-if="hisArr.length===0" class="no-history">暂无搜索历史</p>
                    <ul>
                        <li v-for="item in hisArr" @click="selectItem(item)">
                            {{item}}
                            <span @click.stop="remove(item)" class="remove"></span>
                        </li>
                    </ul>
                </div>
                <div class="sh-clear">
                    <button @click="clearHis" class="clearBtn j-sh-clear">清空搜索历史</button>
                </div>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .searchCase {
        height: 100%;
        overflow-y: auto;
    }
</style>
<script type="es6">
    import localStore  from '../common/local.store'
    var storeKey = 'searchHis'
    export default{
        data(){
            return {
                hisArr: [],
                hotWordList: [],
            }
        },
        methods: {
            selectItem(item){
                this.insert(item)
                this.$dispatch('select', item)
            },
            insert(item){
                // 如记录已经存在，则位置移到最前
                if (this.hisArr.indexOf(item) > -1) this.remove(item)
                this.hisArr.unshift(item)
                this.save()
            },
            remove(item){
                this.hisArr.$remove(item)
                this.save()
            },
            save(){
                localStore.set(storeKey, this.hisArr)
            },
            clearHis(){
                this.hisArr = []
                localStore.remove(storeKey)
            },
        },
        ready(){
            this.hisArr = localStore.get(storeKey, [])

            this.$on('insertSearchHis', item => {
                this.insert(item)
            })

            this.$http.get('/api/product/getHotSearch.jsp').success(({ obj })=> {
                this.hotWordList = obj

            })

        },
    }

</script>
