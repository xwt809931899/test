<template>
    <div class="slide-left-btns">
        <div>
            <slot></slot>
        </div>
        <div class="btns">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                width: 0,
                btns: undefined,
            }
        },
        methods: {
            del(){
                this.$dispatch('slide-del')
            },
            bindSlide(){
                var el = this.$el;


                var start,
                        end,
                        isCanDo = false,//是否移动滑块
                        offset = this.width,
                        fn = {
                            /*操作方法*/
                            //移动容器
                            translate: function (diff) {
                                diff = Math.abs(diff) > offset ? -offset : diff;

                                el.style["-webkit-transform"] = "translate3d(" + diff + "px,0,0)";
                                el.style["transform"] = "translate3d(" + diff + "px,0,0)";
                            },
                            //设置效果时间 秒
                            setTranslition: function (time) {

                                el.style["-webkit-transition"] = "all " + time + "s";
                                el.style["transition"] = "all " + time + "s";

                            },
                            //返回到初始位置
                            back: function () {
                                fn.setTranslition(0.2);
                                fn.translate(0);
                                //标识操作完成
                                start = undefined;
                                end = undefined;
                            }
                        };

                fn.back();
                //滑动开始
                el.addEventListener("touchstart", function (e) {
                    var even = typeof event === "undefined" ? e : event;
                    //标识操作进行中
                    isCanDo = true;
                    //保存当前鼠标Y坐标
                    start = even.touches[0].pageX;
                    //消除滑块动画时间
                    fn.setTranslition(0);
                });

                //滑动中
                el.addEventListener("touchmove", function (e) {
                    var even = typeof event === "undefined" ? e : event;
                    //保存当前鼠标Y坐标
                    end = even.touches[0].pageX;
                    if (isCanDo && start > end) {
                        even.preventDefault();
                        //消除滑块动画时间
                        fn.setTranslition(0);
                        //移动滑块
                        if (start-end > 10) {
                            fn.translate(end - start);
                        }
                    }

                });

                //滑动结束
                el.addEventListener("touchend", function (e) {
                    if (isCanDo) {
                        isCanDo = false;
                        //判断滑动距离是否大于等于指定值
                        if (start - end >= offset) {

                        } else {
                            //返回初始状态
                            fn.back();
                        }
                    }
                });

            }
        },
        ready(){

            var btbs = this.btns = this.$el.querySelector(".btns");
            var width = this.width = this.btns.offsetWidth;
            btbs.style.right = -width + "px";

            this.bindSlide();

        },
    }
</script>
<style rel="stylesheet/scss" lang="sass" scoped>
    @import "~scss/px2rem.scss";
    @import "~scss/vars.scss";

    .btn-border-radius-0 {
        border-radius: 0;;
    }

    .slide-left-btns {
        width: 100%;
        position: relative;
    }

    .slide-left-btns > :nth-child(1) {
        width: 100%;
    }

    .slide-left-btns > :nth-child(2) {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
    }

    .slide-left-btns > :nth-child(2) button {
        height: 100%;;

    }
</style>