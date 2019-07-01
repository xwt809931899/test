<template>
  <div class="container">
    <div class="block">
    <span class="demonstration">日期</span>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="选择日期"
      size="large"
      class="input"
      >
    </el-date-picker>
  </div>
  <div class="input">
    <span>时间</span>
    <el-input v-model="time" placeholder="Hours" type="number" class="input1"></el-input>
  </div>
  <div class="remark">
    <div class="text">备注</div>
    <el-input v-model="remark" placeholder="comment" class="input2"></el-input>
  </div>
  <div class="button">
    <el-button class="save" @click="save" type="primary">保存</el-button>
    <el-button class="cancel" @click="cancel" type="danger">取消</el-button>
  </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name:'FormInformation',
  data () {
    return {
      date:'',
      time:'',
      remark:''
    }
  },
  computed:{
  },
  methods:{
    cancel () {
      this.$router.push({path:'/time-entries'})
    },
    save () {
      const planList = {
        date:this.date,
        time:this.time,
        remark:this.remark
      }
      this.$store.dispatch('createLists', planList)
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
  .remark
    .text
      position fixed
      top 33%
      left 27.9%
    .input2
      position fixed
      top 32%
      left 30.3%
      width 813px
  .button
    .save
      display inline-block
      position fixed
      top 40%
      left 27.9%
    .cancel
      display inline-block
      position fixed
      top 40%
      left 33%




</style>
