import api from '../../api'
import * as types from '../types'      //types有types.js里的所有东西

const state = {           //没有硬核规定vuex里的仓库数据源叫state
    showSidebar:false
}

const mutations = {      //要修改vuex数据源必须通过mutation 直接取仓库里的数据源 不能进行任何操作
    [types.COM_SHOW_SIDE_BAR] (state,status) {
        state.showSidebar = status
    }
}

const actions = {     //调用mutation里的方法
    setShowSidebar ({commit},status) {     //这个是action里自己定义的方法  去调用mutation里的方法
        commit(types.COM_SHOW_SIDE_BAR,status)
    }
}

const getters = {   //单纯的取用数据源 getters就够了
    showSidebar:state => state.showSidebar
}

export default {
    state,
    mutations,
    actions,
    getters
}
