/**
 * rebateBottomBar.js
 */
(function ($) {
    var RebaetBottomBar = Base.klass.create({
        elements: {
            '#j-layerTop': 'elLayerTop',
            '.j-shareLayer': 'elShareLayer',
            '.j-shareListLink': 'elShareListLink'
        },
        //cgi : {
        //    getUserInfo: '/api/user/getSimpleUserInfo.jsp'
        //},
        events: {
            'click .j-rebateMore': 'showMoreLayerEvent',
            'click .j-closeLayer': 'hideMoreLayerEvent',
            'click #j-layerTop': 'hideMoreLayerEvent'
        },
        pageParams: {
            bHeight: 385,
            windowHeight: 0
        },
        init: function () {
            // this.getUserInfo();
            //发现有无新的内容
            // $.get('/api/essay/queryEssayList.jsp?op=13', function (result) {
            //     if (result && result.errCode === 0) {
            //         if (result.obj.result === 1) {
            //             $('.icon-new').css('display', 'block');
            //         } else if (result.obj.result === 0) {
            //             $('.icon-new').css('display', 'none');
            //         }
            //     }
            // });
            $.ajax({
                url: gConfig.PROJECT_REBATE+'/api/essay/discoverCount',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result.code === 1000 && result.data.result > 0) {
                        $('.icon-new').css('display', 'block');
                    } else {
                        $('.icon-new').css('display', 'none');
                    }
                }.bind(this)
            });
        },
        //getUserInfo : function () {
        //    $.get(this.cgi.getUserInfo, {
        //        '_' : new Date() - 0
        //    }, this.proxy(this._getUserInfoBack));
        //},
        //_getUserInfoBack : function (result) {
        //    var o;
        //    if (result && result.errCode === 0) {
        //        o = result.obj;
        //        this.elShareListLink.attr({
        //            'href' : '/rebate/rebateuser.html?g_chan=' + o.g_chan
        //        })
        //    }
        //},
        hideMoreLayerEvent: function () {
            this.elShareLayer.addClass("hide");
            $("body").css('overflow', 'auto');
        },
        showMoreLayerEvent: function () {
            var curWindowHeight = $(window).height();
            if (curWindowHeight != this.pageParams) {
                this.pageParams.windowHeight = curWindowHeight;
                this.setStyle();
            }
            this.elShareLayer.removeClass("hide");

            $("body").css('overflow', 'hidden');
        },
        setStyle: function () {
            this.elLayerTop.height(this.pageParams.windowHeight - this.pageParams.bHeight);
        }
    });

    Base.Widget.RebaetBottomBar = RebaetBottomBar;

})(window.Zepto);