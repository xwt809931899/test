<template>
  <div class="container">
    <div class="block">
    <span class="demonstration">日期</span>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      size="large"
      class="input"
      >
    </el-date-picker>
  </div>
  <div class="input">
    <span>时间</span>
    <el-input v-model="input" placeholder="Hours" type="number" class="input1"></el-input>
  </div>
  </div>
</template>
<script>
export default {
  name:'FormInformation',
  data () {
    return {
      value1:''
    }
  }
}
</script>

<style lang='stylus' scoped>
.container
  position fixed
  top 165px
  left 427px
  .block
    .input
      width 360px
  .input
    position relative
    span 
      position fixed
      top 173px
      left 860px
    .input1
      position fixed
      top 165px
      left 897px
      width 380px



</style>
