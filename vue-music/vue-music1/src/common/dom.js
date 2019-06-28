let elementStyle = document.createElement('div').style
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for(let key in transformNames) {   //in 遍历对象 of 遍历数组
        if(elementStyle[transformNames[key]] !== undefined){
            return key
        }
        return false
    }
})()

export function prefixStyle(style) {
    if(vendor === false) {
        return false
    }else if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)  //给transform 加上各种前缀
}