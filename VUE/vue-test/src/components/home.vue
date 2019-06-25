<template>
  <div class="container">
    <h1>任务追踪</h1>
    <p>
      <strong>
        <router-link to="/time-entries" class="task">创建一个任务</router-link>
      </strong>
    </p>
  </div>
</template>

<script>
export default {
   
  
}
</script>

<style lang="stylus" scoped>
.container
    width 760px
    height 245px
    border 1px solid #f5f5f5
    margin-left 421px
    position absolute
    top 63px
    background #eeeeee
    border-radius 3px
    h1
        font-size 57px
        margin-left 65px
        margin-top 70px
    p
        strong
            .task
                position: fixed
                top 229px
                left 498px
                color #337ab7
                font-size 22px
                text-decoration none 






   
</style>
