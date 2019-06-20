import Vue from 'vue'
import axios from 'axios'
const vue = new Vue()

//axios配置  请求时间在10s内
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:3000'

//返回状态判断
axios.interceptors.response.use((res) => {
    if (res.data.code !== 200) {
        vue.$toast('网络异常')    //$toast()是自己写的 之后挂载到vue原型链上
        vue.$hideLoading()      //$hideLoading()是自己写的 之后挂载到vue原型链上
        return Promise.reject(res)
    }
    return res
},(error) => {
    vue.$toast('网络异常')
    vue.$hideLoading()
    return Promise.reject(error)    


})

//封装请求
export function fetchGet (url,param) {
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:param
        })
        .then(res => {
            resolve(res.data)
        })
    },  err => {
            reject(err)
        })
        .catch(err => {
            reject(err)
    })
}

export default {
    //用户登录
    Login (params) {
        return fetchGet('/login',params)
    },
    //banners
    BannerList() {
        return fetchGet('/banner')
    },
    //歌单
    DiscLists(params) {
        return fetchGet('/top/playlist',params)
    },
    //歌单详情
    SongList(params) {
        return fetchGet('/playlist/detail',params)
    }
}
