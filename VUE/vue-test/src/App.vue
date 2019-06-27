<template>
<div class="container">
<div class="nav">
<a class="planning-board" href="#">
    <div class="image">
      <img src="./images/time.png" alt="">
    </div>
    <div class="text"><span>计划版</span></div>
</a>
<ul class="navbar">
  <li>
    <router-link to="/home" class="text">首页</router-link>
  </li>
  <li>
    <router-link to="/time-entries" class="text">计划列表</router-link>
  </li>
</ul>
</div>
<sidebar></sidebar>
<router-view></router-view>
</div>
</template>

<script>
import sidebar from '@/components/sidebar'

export default {
  components:{
    sidebar,
  }
}
</script>

<style lang="stylus" scoped>
html,body
  margin 0px
  padding 0px
.container
  position relative
  .nav
    height 42px
    width 100%
    border-bottom 1px solid #ccc
    padding-left 103px
    position relative
    .planning-board
      position relative
      .image
        height 50px
        width 50px
        img
          height 40px
          width 40px
      .text
        display inline-block
        width 100px
        position absolute
        top -43px
        left 37px
        font-size 18px
        color #777777
    .navbar
      list-style none
      position absolute
      top -10px
      left 188px
      text-decoration none
      li 
        display inline-block
        margin-right  30px
        .text
          color #777777
          text-decoration none 
        



</style>
