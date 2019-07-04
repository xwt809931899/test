<template>
    <div class="rebate-user-info-wrap position-fixed">
        <a class="share-goods-user">
            <span class="avatar">
                <img :src="headImgUrl" alt="">
            </span>
            <span class="user-name">
                {{nickName}}
            </span>
            <span class="text">
                为你推荐了{{gConfig.siteNameZH}}商城
            </span>
        </a>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    @import "../less/common/_colors";

    .rebate-user-info-wrap {
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        height: auto;
    }

    .share-goods-user {
        display: table;
        width: 100%;
        box-sizing: border-box;
        padding: 5px;
        table-layout: fixed;
        height: 30px;
        line-height: 30px;
        background-color: @C1;
        max-width: 640px;
        margin: 0 auto;
        box-shadow: 0 0 1px 0 #FFF;
        & > span {
            display: table-cell;
            vertical-align: middle;
            color: #FFFFFF;
            font-size: @H5;
        }
        .avatar {
            width: 30px;
            img {
                vertical-align: top;
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
        }
        .user-name {
            padding: 0 8px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .text {
            text-align: right;
            width: 160px;
        }
    }

</style>
<script type="es6">

    export default{
        data(){
            return {
                headImgUrl: '',
                nickName: '',
                gConfig: gConfig,
            }
        },
        computed: {
            rebateUserLink(){
                return '/rebate/rebateuser.html?g_chan=' + this.rebateGchan
            }
        },
        props: ['rebateGchan'],
        ready(){
            this.$http.get('/api/user/queryUser.jsp', {
                op: 5,
                g_chan: this.rebateGchan
            }).then(({ data }) => {
                if (data.errCode === 0) {
                    var obj = data.obj;
                    this.headImgUrl = obj.headImgUrl;
                    this.nickName = obj.nickName;
                }
            })
        }
    }
</script>

