<template>
    <div class="header">
        <div class="header-icon" @click="leftEvent">
            <!-- 插槽 -->
            <slot name="left-icon"></slot>    <!-- 具名插槽 -->
        </div>
        <div class="header-cont">
            <slot name="content"></slot>
        </div>
        <div class="header-right">
            <slot name="right-icon"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'header',
    data () {
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/function"
.header
    height px2rem(88px)
    line-height px2rem(88px)
    text-align center
    display flex
    align-items center
    justify-content space-between
    color #746ca8
    font-size px2rem(30px)
    &-icon
        
</style>
