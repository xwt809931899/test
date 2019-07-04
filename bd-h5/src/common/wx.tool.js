var wxTool = Object.create(null);
wxTool.is_weixin = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
wxTool.chooseSingleImg = (count = 1)=> {
    if (!wxTool.is_weixin()) {
        return new Promise((resolve, reject)=> {

            var inputFile = document.createElement("input")
            inputFile.setAttribute("type", "file");

            inputFile.addEventListener("change", function () {
                console.log("change", arguments)

                var file = this.files[0];
                //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
                if (!/image\/\w+/.test(file.type)) {
                    alert("请确保文件为图像类型");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    var baee64 = e.target.result;
                    resolve({
                        localId: baee64
                    });
                }

            });

            inputFile.click()
            document.body.appendChild(inputFile) // fix ios safari change event does't trigger

            console.log("noWX")

        });
    }


    return new Promise((resolve, reject)=> {
        wx.chooseImage({
            count, // 默认9
            sizeType: [/*'original',*/ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                const ids = res.localIds// res.localIds; 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                Promise.all(ids.map(item => wxTool.uploadImage(item))).then(values => {
                    if (ids.length > 1) {
                        resolve(values)
                    } else {
                        resolve(values[0])
                    }
                })
            }
        });
    });
};
wxTool.uploadImage = function (localId) {
    return new Promise(resolve => {
        wx.uploadImage({
            localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回图片的服务器端ID
                console.log(serverId)
                resolve({
                    localId,
                    serverId
                });
            }
        })
    })
}

var _fns = [],
    isReady = false;
wx.ready(()=> {
    console.log("wx.ready")
    _fns.forEach((item)=> {
        console.log("wx.ready", item)
        item();
    });
    isReady = true;
});

wxTool.setShare = (data)=> {

    var WXShareConfig = {
        imgUrl: window.location.origin + '/img/share/logo.jpg',
        link: window.location.href,
        desc: gConfig.shareDesc,
        title: gConfig.shareTitle,
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    }
    _.extend(WXShareConfig, data);

    var fn = function () {
        console.log("fn-WXShareConfig", WXShareConfig)
        wx.onMenuShareAppMessage(WXShareConfig);

        wx.onMenuShareTimeline(WXShareConfig);

        wx.onMenuShareQQ(WXShareConfig);

        wx.onMenuShareWeibo(WXShareConfig);
    }
    if (isReady) {
        fn();
    } else {
        _fns[0] = fn;
        // _fns.push(fn);
    }

};
wxTool.setTitle = (title)=> {
    var $body = $('body')
    document.title = title
// hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe class="hide" src="/favicon.ico"></iframe>').on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove()
        }, 0)
    }).appendTo($body)
};
wxTool.getLocation = function (fn) {

    wx.ready( () => {
        console.log("wx is Ready:")
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (res) => {

                console.log(res)
                console.log('-----------------')
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

                fn && fn(longitude, latitude);
            },
            fail: (res) => {
                console.log('------定位失败----------')
                fn && fn()
            }
        });
    })

};
wxTool.scan = (obj) => {
    wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: obj.needResult || 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            // 回调
            obj.success && obj.success(res)
        },
        error: function(res){
            if(res.errMsg.indexOf('function_not_exist') > 0){
                alert('版本过低请升级')
            }
        }
    });
};

export default wxTool;
