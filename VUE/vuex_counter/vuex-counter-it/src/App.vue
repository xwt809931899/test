<template>
  <div id="app">
    clicked {{$store.state.count}} times,count is {{evenOrOdd}}
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>

    
  </div>
</template>

<script>
// 借
import { mapActions,mapGetters } from 'vuex'   

export default {
  name: 'App',
  computed:
    // 如果有多处要用到奇偶怎么办
    // evenOrOdd () {
    //   return this.$store.state.count % 2 === 0 ? 'even' : 'odd'
    // main.js里配置了store选项，指定为store对象，会自动将store对象注入到所有子组件中，在子组件中通过this.$store就可以访问store对象
    // }
    mapGetters([
      'evenOrOdd'
    ]),
  components: {

  },
  methods:mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
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
