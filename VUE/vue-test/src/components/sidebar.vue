<template>
    <div class="container">
        <div class="time-text">
            <span>已有时长</span>
        </div>
        <div class="time-auto">
            <span>{{time}} 小时</span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            time:'0'
        }
    }
}
</script>

<style lang="stylus" scoped>
.container
    width 255px
    height 191px
    border 1px solid #ccc
    border-radius 3%
    margin 20px 130px
    display flex
    flex-direction column
    .time-text
        flex 1
        text-align center
        position relative
        border-bottom 1px solid #000000
        background #f5f5f5
        span
            width 100%
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            font-size 37px

    .time-auto
        flex 1
        text-align center
        position relative
        span 
            width 100%
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            font-size 37px 
        
</style>
