<template>
  <div class="header">
    <div class="logo">后台管理系统</div>
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    name:'header',
    data () {
        return {
            name:''
        }
    },
    computed : {
        userName () {
            return localStorage.getItem('userName')
        }
    },//类似生命周期  计算属性 在methods写的方法一定要人为去调用,而计算属性里的方法会根据数据的变化来实现,并且写在计算属性里的方法效果等同data数据源里的数据 
    methods : {
        handleCommand (command) {
            if(command === 'loginOut'){
                localStorage.removeItem('userName')
                this.$router.push('/')
            }
          
        }
    }
}
</script>

<style scoped>
/* 加上scoped后使得此css仅仅只在当前Header.vue里生效  不加这个的话此css也会作用在其他页面的相同类名里*/
.header{
    background-color: #409eff;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
}
.header .logo{
    float: left;
    width: 250px;
    text-align:center;
}
.user-info{
    float:right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
}
.el-dropdown-link{
    text-align: center;
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;

}


</style>

