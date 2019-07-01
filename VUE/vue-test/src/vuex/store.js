import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const state = {
    planLists:[],
}
const mutations = {
    CREATE_LISTS (state,planList) {
        state.planLists.push(planList)
    }
}
const actions = {
    createLists ({ commit },planList) {
        commit('CREATE_LISTS',planList)
    }
}
const getters = {    
    planLists:state => state.planLists,
    planList:state => state.planList
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})