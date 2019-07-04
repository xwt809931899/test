<template>
    <img @click="upTop" v-show="isShow" src="/img/ic_back_top.png">
</template>
<script type="es6">
    export default{
        data(){
            return {
                isShow: false
            }
        },
        methods: {
            upTop(){
                window.scrollTo(0, 0)
                $('#wrapper').scrollTop(0)
            }
        },
        ready(){
            window.addEventListener('scroll', () => {
                this.isShow = document.body.scrollTop >= window.screen.height * 2
            })

            const wrapper = $('#wrapper')
            wrapper.scroll(()=> {
                var top = wrapper.scrollTop();
                this.isShow = top >=  window.screen.height * 2
            })
        },
    }
</script>
<style scoped>
    img {
        position: fixed;
        bottom: 70px;
        right: 20px;

        width: 44px;
        height: 44px;
    }
</style>