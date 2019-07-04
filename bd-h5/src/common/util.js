import appSDK from './app-SDK'
import cookie from './cookie'

function enumEach(obj) {
    _.forEach(obj, (value, key) => {
        obj[value] = key
    })
}

function getParamter(name, url) {
    if (url === undefined) {
        url = location.href;
    }
    var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
    var m = url.match(r);
    return (!m ? "" : m[2]);
}

function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
function isPC() {
    var sUserAgent = navigator.userAgent.toLowerCase()
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os"
    var bIsMidp = sUserAgent.match(/midp/i) == "midp"
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb"
    var bIsAndroid = sUserAgent.match(/android/i) == "android"
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce"
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile"

    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return true;
    }

    return false;
}

var check = {
    empty(val){
        return val.trim().length === 0
    },
    phone(val){
      return false
    },
    cellPhone(val){
       return false
    },
}

function scrollTo({ el, scroll }) {
    if (scroll.scrollTop > el.offsetTop) {
        scroll.scrollTop = el.offsetTop
    }
}
function goToTop() {
    window.scrollTo(0, 0)
    document.querySelector("#wrapper").scrollTop = 0

    var scroll = document.querySelector("#wrapper>.scroll")
    if (scroll) {
        scroll.scrollTop = 0
    }
}

function goToLogin() {
    if (appSDK.isApp) {
        //清除cookie的代码
        appSDK.openLogin()
    } else {
        window.location.href = `/login.html?sourceurl=${encodeURIComponent(window.location.href)}`
    }


}
//获取商品详情地址栏的id
function findUrlPid() {
    var pidMap = ["item", "id-"], regArr, matchResult = '', reg;
    for (var i = 0; i < pidMap.length; i++) {
        reg = new RegExp(pidMap[i] + "[a-zA-Z0-9]+");
        regArr = window.location.href.match(reg);
        if (regArr && regArr.length > 0) {
            matchResult = regArr[0].replace(pidMap[i], '');
        }
        if (matchResult) break;
    }
    return matchResult;
}


/*检测某值在数组中是否存在 并返回存在的索引值
 arr         数组集合（一维json数组）
 value       json的key值
 checkKey    检测的key值
 */
function isInArrayAndIndex(arr, value, checkKey) {
    var result = { isin: false, index: 0 };
    for (var i = 0, len = arr.length; i < len; i++) {
        if (value == arr[i][checkKey]) {
            result.isin = true;
            result.index = i;
        }
        ;
    }
    ;
    return result;
}

//秒数换算成时间函数 得到00:00:00 格式
function formatSeconds(value) {
    var second = parseInt(value);// 秒
    var minute = 0;// 分
    var hour = 0;// 小时
    if (second > 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute > 60) {
            hour = parseInt(minute / 60);
            minute = parseInt(minute % 60);
        }
    }
    var result = minute + '分' + parseInt(second) + '秒';
    if (minute > 0) {
        result = parseInt(minute) + "分" + parseInt(second) + '秒';
    }
    if (hour > 0) {
        result = parseInt(hour) + '小时' + parseInt(minute) + "分" + parseInt(second) + '秒';
    }
    return result;
}

/*判断时间前面是否加0*/
function getZero(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

function backSourceUrl(sourceurl) {
    if (isWeixin()) {
        // 微信需要获取openid,支付用
        window.location.href = `${gConfig.PROJECT_USER}/api/users/getOpenid?sourceurl=` +
            encodeURIComponent(sourceurl)
    } else {
        window.location.href = sourceurl
    }
}

function addParam(url, param, value) {
    var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/gi;
    var params = {}, match, str = [];
    a.href = url;
    while (match = regex.exec(a.search))
        if (encodeURIComponent(param) != match[1])
            str.push(match[1] + (match[2] ? "=" + match[2] : ""));
    str.push(encodeURIComponent(param) + (value ? "=" + encodeURIComponent(value) : ""));
    a.search = str.join("&");
    return a.href;
}

function getCurPprd() {
    return cookie.get('pprd')
}

function converDate(date) {
    if (Object.prototype.toString.call(date) === '[object String]') {
        return new Date(date.replace(/-/g, '/'))
    }
    if (Object.prototype.toString.call(date) === '[object Number]') {
        return new Date(date)
    }
    return date
}
function isAnOrIp() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return 'ios'
    } else if (/android/.test(ua)) {
        return 'android'
    }
}
function openProDetailInApp(pid) {
    if (!isWeixin() && getParamter('openApp') === 'Y') { //其他浏览器
        if (isAnOrIp() == 'ios') {
            var appJson = {
                type: 300,
                obj: {
                    pid: pid
                }
            }
            location.href = `app.bd-ego://?appJson=${encodeURIComponent(JSON.stringify(appJson))}`

        } else if (isAnOrIp() == 'android') {
           var ifr = document.createElement("iframe");
           var appJson = {
               type: 300,
               obj: {
                   pid: pid
               }
           }
           ifr.src = `bdego-app://hefei/android?appJson=${encodeURIComponent(JSON.stringify(appJson))}`
           ifr.style.display = "none";
           document.body.appendChild(ifr);
        }
    }
}
function isDateTime(datetime) {
   return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(datetime) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(datetime)
}
export default {
    enumEach,
    getParamter,
    isWeixin,
    isPC,
    check,
    scrollTo,
    goToTop,
    goToLogin,
    findUrlPid,
    isInArrayAndIndex,
    formatSeconds,
    backSourceUrl,
    addParam,
    getCurPprd,
    converDate,
    openProDetailInApp,
    isAnOrIp,
    isDateTime,
}

export function debounce(func, delay) {
    let timer

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}