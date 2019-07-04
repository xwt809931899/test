(function () {
    function getParamter(name, url) {
        if (url === undefined) {
            url = location.href;
        }
        var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
        var m = url.match(r);
        return (!m ? undefined : decodeURIComponent(m[2]));
    }

    function setCookie(opt) {
        var text = opt.name + '=' + opt.value;
        if (opt.expires) {
            text += '; expires=' + opt.expires.toUTCString();
        }
        if (opt.path) {
            text += '; path=' + opt.path;
        }
        document.cookie = text;
    }

    function setParamsterCookie(key) {
        var value = getParamter(key)
        var cookieExpires = new Date()
        cookieExpires.setDate(cookieExpires.getDate() + 365)
        if (value) {
            setCookie({
                name: key,
                value: value,
                path: '/',
                expires: cookieExpires, // 一年
            })
        }
    }

    setParamsterCookie('g_chan');
    setParamsterCookie('t_id');
    
    setCookie({
        name: 'a_cid',
        value: gConfig.ACID,
        path: '/'
    })

    // 不同渠道返回首页的跳转问题
    var indexUrl = location.origin + '/'
    var curUrl = location.href.replace(/#.*/g,'').replace(/\?.*/g,'')
    if(curUrl === indexUrl) {
        var channel = sessionStorage.getItem('channel')
        channel && location.replace(channel)
    }

})()

