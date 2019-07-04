<template>
  <div id="app">
    <router-view/>
    <v-menu></v-menu>
    <v-button size='small' @click.native="handleClick">按钮</v-button>
  </div>
</template>

<script>
import button from '@/components/com/button'
import menu from '@/components/com/menu'
export default {
  
  name: 'App',
  provide () {
    return {
      name:{
        name:'xwt'
      }
    }
  },
  data () {
    return {
      message:'aaaaaaa'
    }
  },
  components:{
    'v-button':button,
    'v-menu':menu
  },
  methods:{
    handleClick () {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
