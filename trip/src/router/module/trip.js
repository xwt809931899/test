const tripRouters = [
  {
    path:'/trip',
    name:'Trip',
    component:() => import('@/views/trip/trip'),
    meta:{  // 窗口上面的东西
      title:'出行' 
    },
    children:[
      {
        path:'map',  //不能加/
        name:'Map',
        component:() => import('@/components/MapLocation/index'),
        meta:{
          title:'地图'
        }
      }
    ]
  }
]

export default tripRouters  