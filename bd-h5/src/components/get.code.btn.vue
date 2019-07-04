<template>
    <button @click="getCode" class="al-btn al-btn-primary al-btn-block" :class="{'al-btn-disabled':!isEnable}" type="button">{{btnText}}</button>
</template>
<script type="es6">
    export default{
        data(){
            return {
                isEnable: true,
                secs: 0,
            }
        },
        computed: {
            btnText(){
                if (this.isEnable) {
                    return "获取验证码";
                }


                return this.secs + "秒后重新获取";
            },
        },
        methods: {
            getCode(){
                if (!this.isEnable) return;
                this.$dispatch("get-code");
            },
        },
        events: {
            setGetCodeDisabled(secs = 60){
                this.isEnable = false;
                this.secs = secs;
                var curTime = +new Date;
                var timer = setInterval(()=> {
                    var t = curTime + secs * 1000 - new Date;
                    if (t < 1000) {
                        clearInterval(timer);
                        t = 0;
                        this.isEnable=true;
                    }
                    this.secs = parseInt(t / 1000);
                }, 1000);
            },
        },
        ready(){
        },

    }
</script>