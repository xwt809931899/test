<template>
    <div>
        <div class="alert" v-if="messStore.showAlert"></div>
        <div class="layer confirm-wrap" v-if="messStore.confirmInfo.show">
            <div class="confirm">
                <h2 v-if="messStore.confirmInfo.title">{{ messStore.confirmInfo.title }}</h2>
                <p>{{{ messStore.confirmInfo.content }}}</p>
                <div class="flex btn-warp">
                    <button v-for="btn in messStore.confirmInfo.btns"
                            @click="confirmBtnClick(btn)" class="btn">
                        {{ btn.text }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    import Vue from 'vue'
    const messStore = {
        showAlert: false,
        showConfirm: false,
        confirmInfo: {
            show: false,
        },
    }
    Vue.mixin({
        created(){
            this.$set('messStore', messStore)
        },
        data() {
            return {
                messStore: {

                }
            }
        },
        methods: {
            confirmBtnClick(btn){
                if (!btn.fn) {
                    messStore.confirmInfo.show = false
                } else {
                    const result = btn.fn()
                    if (!result) {
                        messStore.confirmInfo.show = false
                    }
                }
            },
            messTips({ title = '操作确认', content, btns }){
                if (!btns) {
                    btns = [
                        {
                            text: '取消',
                            fn: () => {

                            }
                        },
                        {
                            text: '确定',
                            fn: () => {

                            }
                        }
                    ]
                }
                messStore.confirmInfo = {
                    title,
                    content,
                    btns,
                    show: true,
                }
                messStore.showConfirm = true
                return new Promise((resolve, reject) => {
                    messStore.boxBackCall = (success) => {
                        if (success) {
                            resolve()
                        } else {
                            reject()
                        }
                    }
                })
            }
        }
    })

    export default{}

</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .layer {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(0, 0, 0, .2);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn {
        border: 1px solid transparent; /*px*/
        outline: 0;
    }

    .confirm-wrap {
    }

    .confirm {
        background: #fff;
        width: 542px;
        border-radius: 8px;
        text-align: center;
        overflow: hidden;
        h2 {
            padding: 40px 20px 0 20px;
            margin: 0;
            color: $BC3;
            font-size: $TH4;
        }
        p {
            padding: 30px 50px 40px 50px;
            line-height: 40px;
            margin: 0;
            color: $BC4;
            font-size: $TH8;
        }
        .btn-warp {
            border-top: 1px solid $BC6;
            > * {
                flex: 1;
                line-height: 98px;
                background: #fff;
                border-left: 1px solid $BC6;
                color: $BC3;
                font-size: $TH4;
            }
        }
    }

</style>