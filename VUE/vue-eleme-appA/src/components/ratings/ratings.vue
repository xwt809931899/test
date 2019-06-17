<template>
    <div class="rating-content">
        <div class="rating-left">
            <div class="num">{{score}}</div>
            <div class="score"><span>综合评分</span></div>
            <div class="level"><span>高于周边商家{{rankRate}}%</span></div>
        </div>
        <div class="rating-right">
            <div class="attitude">
                <div class="textOfAttitude"><span>服务态度</span></div>
                <star :score='score'></star>
            </div>
            <div class="mark">
                <div class="markOfGoods"><span>商品评分</span></div>
                <star></star>
            </div>
            <div class="time">
                <span>送达时间  {{deliveryTime}}分钟</span>
            </div>


        </div>
    </div>
</template>

<script>
import star from '@/components/star/star'
export default {
    name:'Ratings',
    computed:{
        score () {
            return this.score
        }
    },
    data () {
        return {
            score:0,
            rankRate:0,
            deliveryTime:0
        }
    },
    components:{
        star
    },
    created () {
        this.$http.get('https://www.easy-mock.com/mock/5ca2c29464930718b239eb94/lm/vue-eleme-seller')
        .then(res => {
            console.log(res.data.data.score)
            if (res.data.errno === 0) {
          this.score = res.data.data.score
          this.rankRate = res.data.data.rankRate
          this.deliveryTime = res.data.data.deliveryTime

            }
        })
    }
}
</script>

<style lang='stylus' scoped>
.rating-content
    width 100%
    display flex
    height 100px
    .rating-left
        margin-top 20px
        margin-bottom 20px
        margin-right 10px 
        flex 1.5
        border-right 1px solid #ccc
        text-align center
        .num
            font-size 20px
            color #ff8d00
        .score
            font-size 10px
            padding-top 5px
            font-weight 50
        .level
            font-size 10px
            padding-top 5px
            color #999da3
            
    .rating-right
        flex:2
        margin 20px 10px
        font-size 10px
        font-weight 50
        .attitude
            margin-bottom 10px
        .mark
            margin-bottom 10px
        .time
            margin-bottom 10px
        
        


</style>
