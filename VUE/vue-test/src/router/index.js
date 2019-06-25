import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Create from '@/components/create'
import FormInformation from '@/components/formInformation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: Home,
      component: Home
    },
    {
      path: '/home',
      name: Home,
      component: Home
    },
    {
      path:'/time-entries',
      name:Create,
      component:Create,
      children:[{
        path:'/formInformation',
        name:FormInformation,
        component:FormInformation
      }]
    }

  ]
})
