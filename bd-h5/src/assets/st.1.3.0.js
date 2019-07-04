/**
 * Created by Liu.Jun on 2016/7/11.
 */
(function (window) {
    var curTimestamp = +new Date(),
        Base = {},
        class2type = {},
        core_toString = class2type.toString,
        core_hasOwn = class2type.hasOwnProperty,
        oproto = Object.prototype,
        serialize = oproto.toString,
        cookieConfig = {
            raw: false,
            json: false,
            splitStr: '###'
        },
        location = window.location,
        config = {
            reportedUrl: 'http://stat.allpyra.com',
            //img:'http://stat.allpyra.com/st.gif',
            img: window.G_REPORT_URL || '/data_report/api/pv/pv.jsp',
            hostName: location.hostname,
            sessionExpiration: 30 * 60 // session 存活时间(s)
        };

    // ---------------
    /**
     * Is function
     * @type {Function}
     */
    Base.isFunction = typeof alert === "object" ? function (fn) {
            try {
                return /^\s*\bfunction\b/.test(fn + "")
            } catch (e) {
                return false
            }
        } : function (fn) {
            return serialize.call(fn) === "[object Function]"
        };

    Base.isArray = function (arr) {
        return arr instanceof Array;
    };

    Base.isWindow = function (obj) {
        return obj != null && obj === obj.window;
    };

    Base.isNumeric = function (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    };

    /**
     * type
     * @param obj
     * @returns {*}
     */
    Base.type = function (obj) { //取得目标的类型
        if (obj == null) {
            return String(obj)
        }
        // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[serialize.call(obj)] || "object" :
            typeof obj
    };

    /**
     * jQuery 源码
     * 判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例
     */
    Base.isPlainObject = function (obj) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if (Base.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
            return false;
        }

        // Support: Firefox <20
        // The try/catch suppresses exceptions thrown when attempting to access
        // the "constructor" property of certain host objects, ie. |window.location|
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        try {
            if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    };

    /*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
    Base.isArrayLike = function (obj) {
        if (!obj) return false
        var n = obj.length
        if (n === (n >>> 0)) { //检测length属性是否为非负整数
            var type = serialize.call(obj).slice(8, -1)
            if (/(?:regexp|string|function|window|global)$/i.test(type))
                return false
            if (type === "Array")
                return true
            try {
                if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
                    return /^\s?function/.test(obj.item || obj.callee)
                }
                return true
            } catch (e) { //IE的NodeList直接抛错
                return !obj.window //IE6-8 window
            }
        }
        return false
    };

    /**
     * each
     * @param obj
     * @param fn
     */
    Base.each = function (obj, fn) {
        if (obj) { //排除null, undefined
            var i = 0
            if (Base.isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false)
                        break
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                        break
                    }
                }
            }
        }
    }

    /**
     * jQuery 源码
     * @returns {*|{}}
     */
    Base.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false

        // 如果第一个参数为布尔,判定是否深拷贝
        if (typeof target === "boolean") {
            deep = target
            target = arguments[1] || {}
            i++
        }

        //确保接受方为一个复杂的数据类型
        if (typeof target !== "object" && !Base.isFunction(target)) {
            target = {}
        }

        //如果只有一个参数，那么新成员添加于mix所在的对象上
        if (i === length) {
            target = this
            i--
        }

        for (; i < length; i++) {
            //只处理非空参数
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name]
                    try {
                        copy = options[name] //当options为VBS对象时报错
                    } catch (e) {
                        continue
                    }

                    // 防止环引用
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (Base.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false
                            clone = src && Array.isArray(src) ? src : []

                        } else {
                            clone = src && Base.isPlainObject(src) ? src : {}
                        }

                        target[name] = Base.extend(deep, clone, copy)
                    } else if (copy !== void 0) {
                        target[name] = copy
                    }
                }
            }
        }
        return target
    };

    // -------------------
    Base.extend({
        version: '0.01',

        /**
         * 设备信息
         */
        device: {
            ba: /msie (\d+\.\d+)/i.test(navigator.userAgent),
            cookieEnabled: navigator.cookieEnabled,
            javaEnabled: navigator.javaEnabled(),
            language: navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "",
            screen: (window.screen.width || 0) + "*" + (window.screen.height || 0),
            colorDepth: window.screen.colorDepth || 0,
            net: function () {
                // 返回当前网络类型
                try {
                    return navigator.connection.type
                } catch (e) {
                    return 'unknown'
                }
            }(),
            type: function () {
                function isPC() {
                    var userAgentInfo = navigator.userAgent;
                    var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
                    var flag = true;
                    for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                }

                // 返回当前 来源类型
                if (!isPC()) {
                    // App cookie会包含 ALLPYRA_TERMINAL
                    var returnType = 'WAP';
                    Base.each(Base.cookie(), function (i, v) {
                        if (i.indexOf('_TERMINAL') > -1) {
                            returnType = v.toUpperCase().indexOf('ANDROID') > -1 ? 'Android' : 'IOS';
                            return false;
                        }
                    });
                    return returnType;
                } else {
                    return 'PC'
                }
            },
            appVersion: function () {
                var version = '';
                Base.each(Base.cookie(), function (i, v) {
                    if (i.indexOf('_TERMINAL') > -1) {
                        version = v.split(',')[1]
                        return false;
                    }
                });
                return version;
            }
        },

        /**
         * 生成 sectionid
         * @param prefix
         * @returns {string}
         */

        getRandomStr: function () {
            return String(Math.random()).replace(/\d\.\d{4}/, '');
        },
        generateSectionId: function (prefix) {
            var a = this.getRandomStr;
            return (a() + a() + a()).substring(0, 32);
        },

        /**
         * 生成 随机字符串 uuid
         * @param prefix
         * @returns {string}
         */
        generateUUID: function () {
            return 'xyxyxxxyxyxxxxxyxxxyxxxxxxxxyxxxxxxyyxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        /**
         * 生成 section Str
         */
        generateSection: function () {
            var sectionArr = [];
            sectionArr.push(Base.generateSectionId());
            sectionArr.push(curTimestamp);
            sectionArr.push(curTimestamp);
            sectionArr.push('1');

            return sectionArr.join(cookieConfig.splitStr);
        },
        /**
         * 生成cookie 格式的 pprd
         */
        generatePprdByPtag: function (ptag) {
            // pprd cookie 设置
            var pprdCookie = Base.cookie('pprd'),
                tempCookie,
                pprdCookieOT = '',
                pprdCookieIN = '';

            ptag = ptag || Base.url.param('ptag');

            // 读取cookie
            pprdCookie && function (pprdCookieArr) {
                pprdCookieOT = pprdCookieArr[0] ? pprdCookieArr[0].replace('OT.', '') : '';
                pprdCookieIN = pprdCookieArr[1] ? pprdCookieArr[1].replace('IN.', '') : '';
            }(pprdCookie.split('-'));

            // 读取 ptag
            if (Base.checkPtag(ptag)) {
                if (Base.device.appVersion().length > 0) {
                    // 在APP里，将web的上报改为APP的
                    ptag = '1' + ptag.substr(1);
                }
                switch (+ptag.charAt(1)) {
                    case 2:
                        pprdCookieOT = ptag;
                        break;
                    case 3:
                        pprdCookieIN = ptag;
                        break;
                    default:
                        break;
                }
            } else {
                // 待确认 是否需要清空
                /*
                 pprdCookieOT = '';
                 pprdCookieIN = '';
                 */
            }

            tempCookie = 'OT.' + pprdCookieOT + '-' + 'IN.' + pprdCookieIN;
            return tempCookie;
        },

        /**
         * 设置 session cookie
         */
        setSessionCookie: function () {
            Base.cookie('session', Base.generateSection())
        },

        /**
         * 检测 session cookie 格式是否正确
         */
        checkSessionCookie: function (sessionArr) {
            return Base.isArray(sessionArr) && sessionArr.length === 4 && function (arr) {
                    return /^st[0-9]{12}$/.test(arr[0]) && /^[0-9]{13}$/.test(arr[1]) && /^[0-9]{13}$/.test(arr[2]) && /\d/.test(arr[3]);
                }(sessionArr);
        },

        checkPtag: function (ptag) {
            return ptag && /^[0-9]+\.[0-9]+\.[0-9]+$/.test(ptag);
        },

        /**
         * jquery cookie 源码 https://github.com/carhartl/jquery-cookie
         * @param name
         * @param value
         * @param options
         * @returns {*}
         */
        cookie: function (key, value, options) {
            var pluses = /\+/g;

            function encode(s) {
                return cookieConfig.raw ? s : encodeURIComponent(s);
            }

            function decode(s) {
                return cookieConfig.raw ? s : decodeURIComponent(s);
            }

            function stringifyCookieValue(value) {
                return encode(cookieConfig.json ? JSON.stringify(value) : String(value));
            }

            function parseCookieValue(s) {
                if (s.indexOf('"') === 0) {
                    // This is a quoted cookie as according to RFC2068, unescape...
                    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }

                try {
                    // Replace server-side written pluses with spaces.
                    // If we can't decode the cookie, ignore it, it's unusable.
                    // If we can't parse the cookie, ignore it, it's unusable.
                    s = decodeURIComponent(s.replace(pluses, ' '));
                    return cookieConfig.json ? JSON.parse(s) : s;
                } catch (e) {
                }
            }

            function read(s, converter) {
                var value = cookieConfig.raw ? s : parseCookieValue(s);
                return Base.isFunction(converter) ? converter(value) : value;
            }

            // 写入
            if (arguments.length > 1 && !Base.isFunction(value)) {
                options = Base.extend({}, {
                    // domain: location.hostname,
                    path: '/',
                    expires: 90 // 默认90天过期
                }, options);

                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
                }

                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    // options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }


            // 读取
            var result = key ? undefined : {},
                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all. Also prevents odd result when
                // calling Base.cookie().
                cookies = document.cookie ? document.cookie.split('; ') : [],
                i = 0,
                l = cookies.length;

            for (; i < l; i++) {
                var parts = cookies[i].split('='),
                    name = decode(parts.shift()),
                    cookie = parts.join('=');
                if (key === name) {
                    // If second argument (value) is a function it's a converter...
                    result = read(cookie, value);
                    break;
                }

                // Prevent storing a cookie that we couldn't decode.
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }

            return result;
        },

        removeCookie: function (key, options) {
            // Must not alter options, thus extending a fresh object...
            Base.cookie(key, '', Base.extend({}, options, { expires: -1 }));
            return !Base.cookie(key);
        },

        hasCookie: function (key) {
            var cookie;
            if (undefined === key) return false;
            cookie = Base.cookie(key);

            // 排除 cookie 为 undefined的情况
            return cookie && Base.cookie(key) != 'undefined';
        },

        url: {
            cache: null,

            param: function (key) {
                var ps = location.href.split('?')[1],
                    cache,
                    keys,
                    rtn;

                if (ps) {
                    ps = ps.replace(/#.*/, '');
                    if ((cache = this.cache) === null) {
                        keys = ps.split('&');

                        cache = this.cache = {};

                        Base.each(keys, function (m, n) {
                            var _flag = n.split('=');
                            cache[_flag[0]] = _flag[1];
                        });
                    }

                    if (key) {
                        return cache[key];
                    } else {
                        return cache;
                    }
                }
            },
            findPid: function () {
                var pidMap = ["item", "id-", "/product/"],
                    regArr, matchResult = '',
                    reg;
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
        }

    });

    var defaultParams = Base.extend({
        pId: Base.url.findPid() || '',
        uuid: function () {
            if (!Base.hasCookie('uuid')) {
                Base.cookie('uuid', Base.generateUUID())
            }
            return Base.cookie('uuid');
        }(),
        //url: location.href,
        //refer: document.referrer,
        pprd: Base.generatePprdByPtag(),
        screen: Base.device.screen,
        net: Base.device.net,
        type: Base.device.type(),
        version: Base.device.appVersion()
    }, function () {
        // session cookie 相关
        var session = Base.cookie('session'),
            sessionArr = [];
        if (!session || session == 'undefined') {
            Base.setSessionCookie();
        } else {
            sessionArr = session.split(cookieConfig.splitStr);
            if (Base.checkSessionCookie(sessionArr)) {
                if ((curTimestamp - sessionArr[2]) / 1000 >= config.sessionExpiration) {
                    // session 已过期，重新生成
                    Base.setSessionCookie();
                } else {
                    // 更新结束时间
                    sessionArr[2] = String(curTimestamp);

                    // sessionSeq + 1
                    sessionArr[3] = String(+sessionArr[3] + 1);

                    Base.cookie('session', sessionArr.join(cookieConfig.splitStr));
                }
            } else {
                Base.setSessionCookie();
            }
        }

        sessionArr = Base.cookie('session').split(cookieConfig.splitStr);
        return {
            sessionID: sessionArr[0],
            sessionStart: sessionArr[1],
            sessionEnd: sessionArr[2],
            sessionSeq: sessionArr[3]
        }
    }());

    var STT = {
        isReported: false,
        parseImgUrl: function (options) {
            var urlParamsArr = [];

            Base.each(options, function (i, v) {
                urlParamsArr.push(i + '=' + encodeURIComponent(v));
            });
            return config.img + '?' + urlParamsArr.join('&');
        },
        unique: (function () {
            var time = (new Date()).getTime() + '',
                i = 0;
            return function () {
                return time + (i++);
            }
        })(),

        setCookies: function (options) {
            // 设置 cookie pprd
            Base.cookie('pprd', options.pprd);
        },
        doReported: function (options) {
            var url = STT.parseImgUrl(options);
            // 全局变量防止gc回收
            var data = window['imgLogData'] || (window['imgLogData'] = {});
            data.uid = STT.unique();

            var img = new Image();
            img.onload = img.onerror = function () { //销毁一些对象
                img.onload = img.onerror = null;
                img = null;
                delete data.uid;
            };
            img.src = url + '&_=' + data.uid;
        },
        pvReported: function (options) {
            /* 允许被重置的参数，未做强制验证
             var d = {
             url: '',
             refer: '',
             pprd: '',
             screen: '',
             net: '',
             type: '',
             };
             */

            //
            STT.isReported = true;

            this.options = options = Base.extend({
                reportedType: 0, // pv上报
                url: location.href,
                refer: document.referrer
            }, defaultParams, options, window.G_REPORT_DEFAULT_PARAMS);

            STT.setCookies(options);
            STT.doReported(options);
        },
        clickReported: function (options) {
            var ptag = options.pprd;
            options = Base.extend({
                reportedType: 1, // 点击上报
                uuid: Base.cookie('uuid'),
                sessionID: function () {
                    var sessionArr = Base.cookie('session').split(cookieConfig.splitStr);
                    return Base.isArray(sessionArr) ? sessionArr[0] : '';
                }(),
                url: location.href,
                refer: document.referrer,
                pprd: ptag,
                type: defaultParams.type
            }, options, window.G_REPORT_DEFAULT_PARAMS);

            if (Base.device.appVersion().length > 0) {
                // 在APP里，将web的上报改为APP的
                options.pprd = '1' + options.pprd.substr(1);
            }

            STT.doReported(options);
        },
        generatePprdByPtag: function (ptag) {
            return Base.generatePprdByPtag(ptag);
        }
    };
    var whenReady = (function () { //这个函数返回whenReady()函数
        var funcs = []; //当获得事件时，要运行的函数
        var ready = false; //当触发事件处理程序时,切换为true

        //当文档就绪时,调用事件处理程序
        function handler(e) {
            if (ready) return; //确保事件处理程序只完整运行一次

            //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
            if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
                return;
            }

            //运行所有注册函数
            //注意每次都要计算funcs.length
            //以防这些函数的调用可能会导致注册更多的函数
            for (var i = 0; i < funcs.length; i++) {
                funcs[i].call(document);
            }
            //事件处理函数完整执行,切换ready状态, 并移除所有函数
            ready = true;
            funcs = null;
        }

        // Catch cases where $(document).ready() is called after the
        // browser event has already occurred.
        if (document.readyState === "complete") {
            // Handle it asynchronously to allow scripts the opportunity to delay ready
            ready = true;
        }

        //为接收到的任何事件注册处理程序
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', handler, false);
            document.addEventListener('readystatechange', handler, false); //IE9+
            window.addEventListener('load', handler, false);
        } else if (document.attachEvent) {
            document.attachEvent('onreadystatechange', handler);
            window.attachEvent('onload', handler);
        }
        //返回whenReady()函数
        return function whenReady(fn) {
            if (ready) {
                fn.call(document);
            } else {
                funcs.push(fn);
            }
        }
    })();

    whenReady(function () {
        // Do something......
        document.body.onclick = function (ev) {
            ev = ev || window.event;
            var target = ev.target || ev.srcElement,
                pprd;

            while (target && target !== document.body) {
                if (pprd = target.getAttribute('pprd')) {
                    STT.clickReported({
                        pprd: pprd
                    });

                    // 查找到之后不在继续往上查找
                    break;
                }
                target = target.parentNode;
            }
        };

        setTimeout(function () {
            // 500ms 自动执行上报
            if (!STT.isReported) {
                var input = document.getElementById('STT-input');
                if (!input || input.value == 0) {
                    STT.pvReported();
                    if (input) (input.value = window.location.href)
                } else {
                    console.log('[STT]:存在 STT-input 后退不进行上报')
                }
            }
        }, 500);
    });

    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = STT;
    } else {
        if (typeof define === "function" && define.amd) {
            define('STT', [], function () {
                return STT;
            });
        }
    }

    // 注册全局变量
    if (typeof window === "object" && typeof window.document === "object") {
        window.STT = STT;
    }
})(window);
