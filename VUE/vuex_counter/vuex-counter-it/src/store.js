import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// CEO
const state = {
    count:0
}
//组件里的computed
const getters = {
    evenOrOdd:state => state.count % 2 === 0 ? 'even' : 'odd'
}
// 改变  唯一可以修改状态
//财务
const mutations = {
    increment (state) {        //规定一个increment方法 肯定可以得到一个state实参
        state.count++
    },
    decrement (state) {
        state.count--
    }
}

//动作 部门 
const actions = {              //提供相应的方法  action不能直接修改状态state 所以需要commit提交等待批准
    increment:({ commit }) => commit('increment'),
    decrement:({ commit }) => commit('decrement'),
    // actions不可以修改state,可以读
    incrementIfOdd ({ commit,state }) {           //es6 省略key value
        if((state.count +1) % 2 === 0){
            commit('increment')
        }
    },
    incrementAsync ({commit}) {
        // actions axios 异步取数据....
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                commit('increment')
                resolve()
            },2000)
        })
      
    }
}
export default new Vuex.Store({      //存贮者整个应用的状态
    state,
    mutations,
    actions,
    getters
})