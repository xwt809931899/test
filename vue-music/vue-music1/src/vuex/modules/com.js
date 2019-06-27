import api from '../../api'
import * as types from '../types'      //types有types.js里的所有东西

const state = {           //没有硬核规定vuex里的仓库数据源叫state
    showSidebar:false,
    fullScreen:false,
    searchHistory:[111]
}

const mutations = {      //要修改vuex数据源必须通过mutation 直接取仓库里的数据源 不能进行任何操作
    [types.COM_SHOW_SIDE_BAR] (state,status) {
        state.showSidebar = status
    },
    [types.SET_FULL_SCREEN] (state,status) {
        state.fullScreen = status
    },
    [types.COM_SAVE_SEARCH_HISTORY] (state) {
        state.searchHistory = state
    }
}

const actions = {     //调用mutation里的方法
    setShowSidebar ({commit},status) {     //这个是action里自己定义的方法  去调用mutation里的方法
        commit(types.COM_SHOW_SIDE_BAR,status)
    },
    selectPlaySong ({commit},status) {
        // let playlist = state.playlist.slice()
        commit(types.SET_FULL_SCREEN,status)
    },
    saveSearchHistory ({commit,state},query) {
        let searchHistory = [query,...state.searchHistory.slice(0,10)]
        searchHistory = [...new Set(searchHistory)]
        commit(types.COM_SAVE_SEARCH_HISTORY,searchHistory)
    }
}

const getters = {   //单纯的取用数据源 getters就够了
    showSidebar:state => state.showSidebar,
    fullScreen:state => state.fullScreen,
    searchHistory:state => state.searchHistory
}

export default {
    state,
    mutations,
    actions,
    getters
}
