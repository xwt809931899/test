<template>
    <div class="no-result">
        <img :src="icon" alt="" class="icon" />
        <p class="txt">{{text}}</p>
        <a href="javascript:window.location.reload()" class="btn" v-if="btn">点击重新加载</a>
        <slot></slot>
    </div>
</template>
<script>
    export default{
        props:{
            icon:{
                type:String,
                default:'https://img.allpyra.com/img3106dd7a536e474faa69999d49db3e84.png'
            },
            text:{
                type:String,
                default:'活动太火爆啦，正在努力为您打开中请稍后重新加载哦'
            },
            btn:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                
            }
        },
        methods: {
            
        },
        ready(){
            
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";
    .no-result{
        text-align:center;
        .icon{
            width:320px;
            margin:0 auto;
        }
        .txt{
            color:#6B6B6B;
            margin: 46px auto;
            width: 70%;
        }
        .btn{
            display:inline-block;
            width:360px;
            height:88px;
            line-height:75px;
            background:#F4F4F4;
            border-radius:8px;
            margin-top:58px;
            color:#333333;
            text-decoration:none;
            border:1px solid rgba(51,51,51,1);
        }
    }
</style>
