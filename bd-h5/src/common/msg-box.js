export function confirm(option) {
    var option = _.extend({
            cancel: '取消',
            confirm: '确定'
        }, option
    )
    var elConfirm = `<div class="confirm-wrap">
<div class="main ${option.animateName}">`
    if (option.imgIcon) {
        elConfirm += `<img class="img" src="${option.imgIcon}">`
    }
    if (option.title) {
        elConfirm += `<H4>${option.title}</H4>`
    }
    if (option.subTitle) {
        elConfirm += `<div class="sub-title">${option.subTitle}</div>`
    }
    if (option.content) {
        elConfirm += `<div class="content">${option.content}</div>`
    }
    elConfirm += `
        <div class="btns flex">
            <a class="cancel">${option.cancel}</a>
            <a class="confirm">${option.confirm}</a>
        </div>
     </div>
</div>
`

    elConfirm = $(elConfirm).prependTo('body')

    return new Promise(function (resolve, reject) {
        elConfirm.on('click', '.confirm', function () {
            resolve()
            elConfirm.remove()
        })
        elConfirm.on('click', '.cancel', function () {
            reject();
            elConfirm.remove()
        })
    })
}
export function confirmInput(option) {
    var option = _.extend({
            cancel: '取消',
            confirm: '确定'
        }, option
    )
    var elConfirm = `<div class="input-confirm-wrap">
<div class="main ${option.animateName}">`
    if (option.imgIcon) {
        elConfirm += `<img src="${option.imgIcon}">`
    }
    if (option.title) {
        elConfirm += `<H4>${option.title}</H4>`
    }
    if (option.subTitle) {
        elConfirm += `<div class="sub-title">${option.subTitle}</div>`
    }
    elConfirm += `
        <div class="input-wrap"><input class="input"></div>
        <div class="btns flex">
            <a class="cancel">${option.cancel}</a>
            <a class="confirm">${option.confirm}</a>
        </div>
     </div>
</div>
`

    elConfirm = $(elConfirm).prependTo('body')

    return new Promise(function (resolve, reject) {
        elConfirm.on('click', '.confirm', function () {
            resolve()
            elConfirm.remove()
        })
        elConfirm.on('click', '.cancel', function () {
            reject();
            elConfirm.remove()
        })
    })
}
export function tips(mess, time = 3500, animateName = 'bounceInDown') {
    var tips = $('.tips-wrap')
    if (tips.length < 1) {
        tips = $('<div class="tips-wrap"></div>').appendTo('body')
    }

    var tip = $(`
<div class="${animateName} content display-flex">
    <div class="icon"><i class="iconfont">&#xe609;</i></div>
    <div class="text">${mess}</div>
</div>`).prependTo(tips)

    setTimeout(function () {
        tip.remove()
    }, time)

}

export function longTips(mess, time = 350000, animateName = 'bounceInDown') {
    var tips = $('.long-tips-wrap')
    if (tips.length < 1) {
        tips = $('<div class="long-tips-wrap"></div>').appendTo('body')
    }

    var tip = $(`
<div class="${animateName} content">
    <div class="icon"><i class="iconfont">&#xe609;</i></div>
    <div class="text"> ${mess}</div>
</div>`).prependTo(tips)

    setTimeout(function () {
        tip.remove()
    }, time)

}
