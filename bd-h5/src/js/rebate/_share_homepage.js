/**
 * user income
 */
(function ($) {
    var ShareHomepage = Base.klass.create({
        elements: {
            '.j-homelink': 'elHomeLink',
            '.j-img': 'elImg',
            '.j-name': 'elName'
        },
        events: {
            //'touchstart' : 'touchStartEvent',
            //'touchend' : 'touchEndEvent',
            //'touchmove' : 'touchmoveEvent'
        },
        cgi: {
            getTakeUserInfo: '/api/user/queryUser.jsp?op=5'
        },
        touchEventParam: {
            startY: 0,
            endY: 0,
            distance: 50
        },
        pageParams: {
            '_': new Date() - 0
        },
        init: function () {
            this.gChan = Base.url.param('g_chan') || 0;
            this.pageParams.g_chan = this.gChan;
            this.setContent(this.gChan);
        },
        setContent: function () {
            // cookie
            Base.cookie('g_chan', this.gChan);
            this.elHomeLink.attr({
                href: window.location.origin + '?g_chan=' + this.gChan
            });
            this.setTakeUserInfo();
        },
        setTakeUserInfo: function () {
            // $.get(this.cgi.getTakeUserInfo, this.pageParams, this.proxy(this._getTakeUserInfoCall));
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/share/viewShopCardByChan',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                data: { g_chan: this.gChan },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this._getTakeUserInfoCall(result);
                    }
                }.bind(this)
            });
        },
        _getTakeUserInfoCall: function (result) {
            this.elImg[0].src = result.data.headimgurl;
            this.elName[0].innerHTML = result.data.nickname;
        },

        touchStartEvent: function (event) {
            this.touchEventParam.startY = event.touches[0].pageY;
        },
        touchmoveEvent: function (event) {
            event.preventDefault();
        },
        touchEndEvent: function (event) {
            (event.changedTouches[0].pageY - this.touchEventParam.startY <= (0 - this.touchEventParam.distance)) && this.elHomeLink.trigger("click");
            this.touchEventParam.startY = 0;
        }
    });

    new ShareHomepage();

})(window.Zepto);