<template>
  <div class="container">
    <div class="button" v-if="$route.path !== '/time-entries/formInformation'">
      <el-button type="primary" @click="create">创建</el-button>
    </div>
    <div class="createInformation" v-if="$route.path === '/time-entries/formInformation'">
      <h3>创建</h3>
    </div>
    <router-view></router-view>
    <div
      class="noplan-list"
      v-if="planLists.length === 0"
      :class="$route.path === '/time-entries/formInformation' ? 'another' : ''"
    >
      <p>
        <strong>还没有任何计划</strong>
      </p>
    </div>
    <div class="plan-list" v-for="(plan,index) in planLists" :key="index" v-else :class="$route.path === '/time-entries/formInformation' ? 'another' : ''">
      <div class="imageAndName">
        <div class="image">
          <img src="../images/pikapika.jpg" alt>
        </div>
        <div class="name">韬韬</div>
      </div>
      <div class="dateAndTime">
        <div class="timeAndImage">
          <div class="image">
            <img src="../images/time.png" alt>
          </div>
          <div class="time">{{plan.time}}</div>
          <div class="date">{{plan.date}}</div>
        </div>
      </div>
        <div class="remark">{{plan.remark}}</div>
        <div class="delete">
          <img src="../images/delete.png" alt>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      planLists: [{}]
    };
  },
  methods: {
    create() {
      this.$router.push({ path: "/time-entries/formInformation" });
      console.log(this.$route.path);
    }
  }
};
</script>
<style lang="stylus" scoped>
.container 
  position absolute
  top: 64px
  left: 420px
  .button
    width 850px
    height 50px
    border-bottom 1px solid #ccc
    margin-bottom 25px
  .createInformation 
    border-bottom 1px solid #ccc
    width 850px
    height 50px
    margin-bottom 25px
  .noplan-list
    position fixed
    top 122px
    left 427px
  .noplan-list.another 
    position fixed
    top 355px
    left 427px
    width 850px
    border-top 1px solid #ccc
  .another
    margin-top 212px
    display flex
    width 850px
    height 130px
    border 1px solid #ccc
    position relative
  .plan-list
    display flex
    width 850px
    height 130px
    border 1px solid #ccc
    position relative
    .imageAndName 
      flex 1
      background #f6f6f6
      position relative
      .image
        width 50px
        height 50px
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        img
          width 50px
          height 50px
          border-radius 50%
      .name
        position absolute
        top 85%
        left 50%
        transform translate(-50%, -50%)
    .dateAndTime
      flex 5
      position relative
      .timeAndImage 
        .image
          width 50px
          height 50px
          position absolute
          top 33px
          left 40px
          img
            width 50px
            height 50px
        .time
          position absolute
          top 45px
          left 85px
          font-size 20px
        .date
          position absolute
          top 76px
          left 33px
    .remark
        position absolute
        left 145px
    .delete
        width 30px
        height 30px
        position absolute
        left 814px
        top 8px
        img 
          width 30px
          height 30px
</style>
