import appSDK  from './app-SDK'
module.exports = function (Vue) {

    var isNull = value => value === undefined || value === null

    Vue.filter('b2cProLink', function (value) {
        return `/item.html#id-${value}`
    })
    Vue.filter('groupProLink', function (gbpid, pid) {
        if (gbpid > 0) {
            return `/groupon.html#!/detail/${gbpid}`
        }
        return `/item.html#id-${pid}`
    })
    Vue.filter('proItemUrl', function (value) {
        return `/item.html#id-${value}`
    })

    Vue.filter('takeProLink', function (pid) {
        if (appSDK.isApp) {
            return '/?appJson=' + JSON.stringify({
                    type: 302,
                    obj: { pid }
                })
        } else {
            return `/rebate/item.html#id-${pid}`
        }
    })

    Vue.filter('categoryItemUrl', function (value, title) {
        if (+value === 0) {
            return '/search.html'
        }
        return `/categoryHome.html?pageSize=10&catid=${value}&cattitle=${title || ''}`
    });

    Vue.filter('coverPrice', function (s, index) {
        if (index === 0) {
            if (isNull(s)) return '0'
            return parseInt(s / 100)
        }
        if (isNull(s)) return '0.0'
        return +s > 99 ?
            String(s).replace(/(\d+)(\d{2})$/, '$1.$2') :
            +s > 9 ?
            '0.' + s :
            '0.0' + s
    })
    Vue.filter('discount', function (value, referance) {
        if (isNull(value) || isNull(referance)) return ''

        return Math.round((value / referance) * 100) / 10
    })

    Vue.filter("formatTime", (function () {
        var _format = function (date, fmt) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
            return fmt
        }
        return function (date, fmt = 'yyyy-MM-dd') {
            if (isNull(date)) return ''
            if (Object.prototype.toString.call(date) === "[object String]") {
                date = new Date(date.replace(/-/g, '/'))
            }
            if (Object.prototype.toString.call(date) === "[object Number]") {
                let newDate = new Date();
                newDate.setTime(date)
                date = newDate
            }
            return _format(date, fmt)
        }
    }()))


    Vue.filter('countdown', (function () {
        function fix(i) {
            return i < 10 ? '0' + i : i;
        }

        return function (time, curTime, errorHandler) {
            if (Object.prototype.toString.call(time) === "[object String]") {
                time = new Date(time).getTime()
            }
            if (time < curTime) {
                errorHandler && errorHandler()
                return errorHandler ? '' : 'error'
            }
            var remain = (time - curTime) / 1000,
                h = parseInt(remain / 3600),
                m = parseInt(remain / 60 % 60),
                s = parseInt(remain % 60)

            if (h >= 24) {
                let t_d = Math.abs(h / 24);
                let day = parseInt(h / 24)
                return `${fix(day)}天 ${fix(h % 24)}:${fix(m)}:${fix(s)}`
            }

            h = h % 24
            return `${fix(h)}:${fix(m)}:${fix(s)}`

        }
    })())

    Vue.filter('countdown2', (function () {
        function fix(i) {
            return i < 10 ? '0' + i : i;
        }

        return function (time, curTime, fmt = 'hh:mm:ss', noDay = false) {
            if (time < curTime) return '0'

            var remain = (time - curTime) / 1000,
                h = parseInt(remain / 3600),
                m = parseInt(remain / 60 % 60),
                s = parseInt(remain % 60),
                day = 0

            if (!noDay && h >= 24) {
                day = parseInt(h / 24)
                h = h % 24
            }

            const fmtData = {
                dd: fix(day),
                hh: fix(h),
                mm: fix(m),
                ss: fix(s),
            }

            let r = fmt
            for (const k in fmtData) {
                r = r.replace(new RegExp(k, 'g'), fmtData[k])
            }

            return r
        }
    })())

    var addParam = function (url, param, value) {
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
    Vue.filter('addParams', (v, key, ...vals) => {
        return addParam(v, key, vals.join(''))
    })

    /**
     * 格式化金钱
     * @param {Number} n 保留的小数位数
     * @param {Boolean} isBeautify 整数时是否显示小数
     * eg:
     * 1 -> 1
     * 1.1 -> 1.10
     */
    Vue.filter('toFixed', (v, n = 2, isBeautify = false) => {
        if (typeof v !== 'number') {
            return v
        }
        if (isBeautify && !/\./.test(String(v))) {
            return v
        }
        return v.toFixed(n)
    })

    Vue.filter('round', (v) => {
        if (typeof v !== 'number') {
            return v
        }
        return Math.round(v)
    })

    Vue.filter("subStringTime", function (time) {
        return time.substring(0, 10);
    });
    var compatibleDate = function(time){
        if (Object.prototype.toString.call(time) === "[object String]") {
            time = new Date(time.replace(/-/g, '/'))
        }
        if (Object.prototype.toString.call(time) === "[object Number]") {
            let newDate = new Date();
            newDate.setTime(time)
            time = newDate
        }
        return time
    }


}