<template>
    <div class="slider swiper-container j-slider-container">
        <div class="swiper-wrapper j-list">
            <div v-for="item in list" class="swiper-slide">
                <div class="item j-item">
                    <a :href="item.actlink">
                        <img :src="item.acturl" style="min-height:150px;">
                    </a>
                </div>
            </div>
        </div>
        <div class="dotted"></div>
    </div>
</template>
<script>
    export default{
        props:['list'],
        ready(){
            this.swiper = new Swiper(this.$el, {
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
//                loop: true,
                calculateHeight: true,
                observer: true,
                observeParents: true,
                pagination: this.$el.querySelector(".dotted")
            });
        },
    }
</script>