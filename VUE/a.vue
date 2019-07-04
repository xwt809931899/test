<template>
  <view>
    <view class="scroll-content" v-for="(good, index) in goods" :key="index">
        <view class="good-desc">
            <view class="image">
                <image :src='good.img' />
            </view>
            <view class="good-name">
                <text>{{good.name}}</text>
            </view>
            <view class="good-nowPrice">
                <view class="symbol">￥</view>
                <view class="num">{{good.nowPrice}}</view>
            </view>
            <view class="good-oldPrice">
                <view class="symbol">￥</view>
                <view class="num">{{good.oldPrice}}</view>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods: [
          {
            img:'/images/a.jpg',
            name:'文文韬韬',
            nowPrice:1000,
            oldPrice:2000
          }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>

</style>