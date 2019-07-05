//为了便于后面在this.code 变化或组件销毁时移除动态创建的style标签，我们给每个style标签加上一个随机生成的 id 用于标识

//生成随机字符串
export default function randomStr (len = 32) {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    const maxPos = $chars.length
    let str = ''
    for (let i = 0; i < len; i++ ) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return str
}