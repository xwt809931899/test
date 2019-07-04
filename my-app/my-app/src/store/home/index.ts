import { State } from '@/store/interface'
import { Commit } from 'vuex'
import { getMovieList } from '@/api/movie'
 
const getters = {

}
const  a:Number = 1
const state: State = {
    movieList:[
        {
            name:'一路向北',
            title:'好看',
            id:'01'
        }
    ]
}
const mutations = {

}
const actions = {
    //api  前后端的分离点
    //commit mutations
    async movieList (context:{commit:Commit},cate:string) {
        const res = await getMovieList(cate)
        .then((response) => response)
        return res
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}

