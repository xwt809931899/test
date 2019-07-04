<template>
    <div class="vertical_acts">
        <div v-if="item.title" class="title display-flex">
            <div class="titleContent">{{item.title}}</div>
            <a v-if="item.link" :href="item.link">{{item.linkName}}</a>
        </div>
        <a v-for="act in item.list" :href="act.actLink">
            <img :src="act.bannerImg" w="1" >
        </a>
    </div>
</template>

<script>
    export default{
        props: ['item'],
        ready(){

        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    .vertical_acts {
        background: #fff;
        .title {
            padding: 20px;
            border-top: 1px solid #eeeeee; /*no*/
            border-bottom: 1px solid #eeeeee; /*no*/
            .titleContent {
                flex: 1;
            }
            a {
                color: #b5b5b5;
                &:after {
                    content: ' ';
                    width: 14px;
                    height: 24px;
                    display: inline-block;
                    background: url("../img/index_icon_activity_more .png");
                    background-size: cover;;
                    margin-left: 10px;
                    position: relative;
                    top: 4px;
                }
            }
        }
        img {
            width: 100%;
            vertical-align: top;
        }
    }
</style>