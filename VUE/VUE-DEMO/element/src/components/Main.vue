<template>
    <div class="main-content">
        <Header></Header>
        <Sidebar></Sidebar>
        <router-view></router-view>
    </div>
</template>

<script>
// 驼峰式命名要用横杠隔开 列入 HeaderAbc = Header-abc
import Header from '@/components/common/Header'
import Sidebar from '@/components/common/Slide'

export default {
    name:'mainContent',
    data () {
    return {
        msg:'文文韬韬'
    }
    },
    // 组件引入进来一定要注册声明下
    components:{
        Header,
        Sidebar
    }
}
</script>

