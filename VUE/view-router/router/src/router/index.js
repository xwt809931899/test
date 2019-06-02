import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import look from '@/components/look'
import lookOne from '@/components/lookOne'
import lookTwo from '@/components/lookTwo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/look',
      name:'look',
      component:look,
      children:[
        {
          path:'look-one',
          name:'lookOne',
          component:lookOne,
        },
        {
          path:'look-two',
          name:'lookTwo',
          component:lookTwo
        }
      ]
    },
    {
      path:'/go-back',
      redirect:'/'
    }
  ]
})
