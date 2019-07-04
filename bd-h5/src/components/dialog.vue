<template>
  <div class="dialog-shade" @click="isShow = false" v-if="isShow">
    <div class="dialog-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>
<style scoped>
  .dialog-shade {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1;
  }

  .dialog-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>