<template>
    <div class="scroll">
        <header class="app-show-header">
            <a class="back" href="javascript:history.back()"><i class="iconfont">&#xe603;</i></a>
            <h1>{{title}}</h1>
        </header>

        <form @submit.prevent="sub" class="al-from">
            <div class="form-item">
                <input style="display: none" placeholder="解决自动填充">
                <input v-model="cardNo" type="text" placeholder="请输入预付费卡号" autocomplete="off">
            </div>
            <div class="form-item">
                <input v-model="passwd" type="password" placeholder="请输入卡密码">
            </div>

            <div class="btn">
                <button class="al-btn al-btn-clear al-btn-block al-btn-big al-btn-border-radius">立即绑定</button>
            </div>
        </form>

    </div>
</template>
<script>
    import messBox from 'common/mess-box'
    export default {
        data() {
            return {
                gConfig: gConfig,
                title: '',
                cardNo: '',
                passwd: '',
            }
        },
        methods: {
            sub(){
                if (this.cardNo.length < 1) {
                    messBox.tips('请输入预付费卡号');
                    return
                }
                if (this.passwd.length < 1) {
                    messBox.tips('请输入卡密码');
                    return
                }
                http.get(gConfig.PROJECT_USER + '/api/card/bindPreCard', {
                    cardNo: this.cardNo,
                    passwd: this.passwd
                }).then(({ data:{code, data} }) => {
                    if (code === 1000) {
                        messBox.tips('绑定成功');
                        if(this.$route.query.isafu == 1){
                            window.location.href = '/afu/index.html#/shopping/checkout'
                        }else{
                            window.history.back(-1)
                        }
                        
//                        this.$router.replace({ name: 'prepaid-index' })
                    }
                })
            }
        },
        route: {
            data({ to }){
                this.title = to.title
                this.cardNo = ''
                this.passwd = ''
                http.get(gConfig.PROJECT_USER + '/api/card/havePayPassword').then(({ data:{code, data} }) => {
                    if (code === 1000 && data.hasPwd === 'N') {
                        messBox.tips('您还没有设置支付密码，请先设置支付密码')
                        this.$router.replace({ name: 'prepaid-set-pwd' })
                    }
                })
            } 
        }
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";
    .app-show-header{
        display:block!important;
    }
    header {
        border-bottom: 1px solid $C8; /*no*/
    }
</style>
