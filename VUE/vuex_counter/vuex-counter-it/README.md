vue 开发，两部分
组件开发（协作）  vuex 数据管理（应用程序的数据流 难）

store 超市 new Vuex.Store({
    state
})
中央 组件 地方
读  this.$store.state.count

写  action,mutations getters,
vuex 不是什么时候都要，大项目离不开vuex
公司的概念
CEO 旅梦 state  100w
财务 mutations 唯一可以修改state的地方
审核一下，对状态的修改是否被允许

- Vue 实现核心mvvm 其他的通过 Vue.use() 插入进去
    this.$store
    this.$router
读
写? 

- data() 将会被 state 取代
  data 只是自身状态的数据
  methods 改变状态的方法， 会是actions 
