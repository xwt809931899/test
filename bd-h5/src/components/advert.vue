<template>
    <div class="advert" v-if="isShow" :style="{ width: toRem(width),height: toRem(height)}">
        <a :href="hrefUrl">
            <img :src="imageUrl"   alt="">
        </a>
        <div class="close" @click="close()">
              <i class="iconfont closeBtn">
                &#xe607;
              </i>
        </div>
      
    </div>
</template>


<script>
    export default {
        props: {
            type: {
                type: Number,
                default: 0
            },
            width: {
                type: String,
                default: "750"
            },
            height: {
                type: String,
                default: "180"
            }
        },
        data() {
            return {
                imageUrl: "",
                hrefUrl: "",
                isShow: false
            }
        },
        methods: {
            toRem(px){
                return window.baseLib.flexible.px2rem(px) + 'rem'
            },
            close() {
                let now = Date.now()
                this.isShow = false;
                localStorage.setItem('advertLocal' + this.type,JSON.stringify({ time: now,isOpen: true} ))
            }
        },
        beforeCompile() {
            http.post(gConfig.PROJECT_CONTENT + '/api/advertlocation/getAdvertLocal',{
                 showType: this.type
            }).success(( { code,data}) => {
                    this.imageUrl = data.imageUrl;
                    this.hrefUrl = data.hrefUrl;
                    let now = Date.now()
                    if(data.frequency != 2){
                        let advertLocal = "" //初始化
                        if (localStorage.getItem('advertLocal' + this.type)) {
                            advertLocal = JSON.parse(localStorage.getItem('advertLocal' + this.type))
                        }
                        if(!advertLocal){
                            this.isShow = true;
                            localStorage.setItem('advertLocal' + this.type,JSON.stringify({ time: now} ))
                        }
                        if(advertLocal && data.frequency === 2 && (now - advertLocal.time) > 24 * 60 * 60 * 1000){
                            this.isShow = true;
                            localStorage.setItem('advertLocal' + this.type,JSON.stringify({ time: now} ))
                        }
                        if(advertLocal && data.frequency === 0 && !advertLocal.isOpen){
                            this.isShow = true;
                            localStorage.setItem('advertLocal' + this.type,JSON.stringify({ time: now} ))
                        }
                    }else{
                        this.isShow = true;
                    }
                   


            })
        }
    }
</script>

<style lang="sass" scoped>
    .advert{
        position:relative;
        overflow:hidden;
        margin:0 auto;
        img{
            width:100%;
            height:100%;
        }
        .close{
           position:absolute;
           top:0;
           right:0;
           background-color:rgba(0,0,0,.6);
           border-radius:100px;
           padding:20px 20px 10px 10px;
           transform: translate(15px,-15px);
           
           .closeBtn{
               color:white;
           }
        }
    }
</style>