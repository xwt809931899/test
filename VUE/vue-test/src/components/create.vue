<template>
    <div class="container">
        <div class="button">
            <el-button type="primary" @click="create">创建</el-button>
        </div>
        <div class="noplan-list" v-if="planLists.length === 0">
            <p><strong>还没有任何计划</strong></p>
        </div>
        <!-- <router-view></router-view> -->
        <div class="plan-list" v-for="(plan,index) in planLists" :key="index"></div>
    </div>
    
</template>

<script>
export default {
    data () {
        return {
            planLists:[]
        }
    }
}
</script>

<style lang="stylus" scoped>
.container
    position absolute
    top 64px
    left 420px
    .button
        width 850px
        height 50px
        border-bottom 1px solid #ccc
    
</style>
