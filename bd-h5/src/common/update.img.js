/**
 * 依赖vue-resource
 */
import Vue from 'vue'

export function update(params) {
    return Vue.http.post(`${gConfig.PROJECT_USER}/api/imgUpload/upload`, params).success(({ data }) => {
        return data.imgUrl
    })
}
function generateParams(data, directory) {
    const params = { directory }
    if (data.serverId) {
        params.mediaId = data.serverId
    } else {
        params.imgFile = data.localId
    }
    return params
}
export default function (data, directory = 'common') {
    if (Array.isArray(data)) {
        return Promise.all(
            data.map(item => update(generateParams(item, directory)))
        )
    } else {
        return update(generateParams(data, directory)).then(value => [value])
    }
}
