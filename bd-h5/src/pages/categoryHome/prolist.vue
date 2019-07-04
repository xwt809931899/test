<template>
    <div>
        <pager :on-data="getData" :start-num="0" :model.sync="list">
            <prolist :list="list"></prolist>
            <div class="not-have-data" v-if="list.length<1">
                没有相关数据
            </div>
        </pager>
    </div>
</template>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .index {
        padding: 0 0 130px 0;
    }

</style>
<script>
    import prolist from 'components/prolist.vue'
    export default{
        data(){
            return {
                list: [],
            }
        },
        props: ['categId', 'secondCategId'],
        components: { prolist },
        watch: {
            secondCategId(){
                this.$broadcast("loadPage")
            }
        },
        methods: {
            getData({ startNum }){
                console.log('getData')
                var params = {
                    startNum,
                    sortType: 'DATE',
                    scope: 'ALL',
                    categId: this.categId,
                    secondCategId: this.secondCategId
                }
                return http.get(gConfig.PROJECT_PRODUCT + '/api/item/itemList', params)
            },
        },
        ready(){
            this.$nextTick(() => {
                if (!this.secondCategId) {
                    this.$broadcast("loadPage")
                }
            })
        }
    }
</script>