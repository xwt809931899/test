<template>
    <div class="container">
        <div class="button" v-if="$route.path !== '/time-entries/formInformation'">
            <el-button type="primary" @click="create">创建</el-button>
        </div>
        <div class="createInformation" v-if="$route.path === '/time-entries/formInformation'">
        <h3>创建</h3>
        </div>
        <router-view></router-view>
        <div class="noplan-list" v-if="planLists.length === 0" :class="$route.path === '/time-entries/formInformation' ? 'another' : ''">
            <p><strong>还没有任何计划</strong></p>
        </div>
        <div class="plan-list" v-for="(plan,index) in planLists" :key="index"></div>
    </div>
    
</template>

<script>
export default {
    data () {
        return {
            planLists:[]
        }
    },
    methods:{
        create () {
            this.$router.push({path:'/time-entries/formInformation'})
            console.log(this.$route.path)
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
    .createInformation
        border-bottom 1px solid #ccc
        width 850px
        height 50px
        margin-bottom 25px
    .noplan-list
        position fixed
        top 355px
        left 427px
        width 850px
        border-top 1px solid #ccc
</style>
