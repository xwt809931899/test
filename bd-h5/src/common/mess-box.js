/**
 * Created by lred on 2016/3/23.
 */
var messBox = {};
var tips = function (mess, time = 3500, animateName = 'bounceInDown') {
    var tips = $('.al-tips')
    if (tips.length < 1) {
        tips = $('<div class="al-tips"></div>').appendTo('body')
    }

    var tip = $(`<div class="${animateName}"><span>${mess}</span></div>`).prependTo(tips)

    setTimeout(function () {
        tip.remove()
    }, time)

};
var confirm = function (content, title = '操作确认', opt) {
    var opt = _.extend({
            animateName: 'bounceInDown',
            cancel: '取消',
            isCancel: true,
            confirm: '确定'
        }, opt
    )
    var domStr = `<div class="al-confirm">
        <div class="main ${opt.animateName}">
            <h4>${title}</h4>
            <div class="content">${content}</div>
            <div class="btns flex">
                <a class="cancel">${opt.cancel}</a>
                <a class="confirm">${opt.confirm}</a>
            </div>
        </div>
    </div>
    `;
    if(!opt.isCancel){
        domStr = `<div class="al-confirm">
        <div class="main ${opt.animateName}">
            <h4>${title}</h4>
            <div class="content">${content}</div>
            <div class="btns flex">
                <a class="confirm">${opt.confirm}</a>
            </div>
        </div>
    </div>
    `;
    }
    var elConfirm = $(domStr).prependTo('body')

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

messBox.tips = tips
messBox.confirm = confirm

module.exports = messBox