import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Main from '@/components/Main'
import MainDetail from '@/components/MainDetail'
import UserList from '@/components/UserList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/main',
      name:'Main',
      component:Main,
      children : [
        {
          path:'',   //这里的/和根目录的/有什么区别    对比view-router里的router的router里的index.js文件 ''等同于'/' '/main/user-list'等同于'user-list' 
          name:'MainDetail',
          component:MainDetail
        },
        {
          path:'user-list',
          name:'UserList',
          component:UserList
        }
      ]
    }
  ]
})