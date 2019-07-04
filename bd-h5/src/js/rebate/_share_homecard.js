(function ($) {
    var ShareHomecard = Base.klass.create({
        elements: {
            '.j-img': 'elImg',
            '.j-name': 'elName',
            '.j-share-btn': 'elShareBtn',
            '.j-tip': 'elTipText',
            '.j-text': 'elText'
        },
        cgi: {
            getTakeUserInfo: gConfig.PROJECT_REBATE + '/api/share/viewShopCard'
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
            this.setTakeUserInfo();
        },
        setTakeUserInfo: function () {
            $.ajax({
                url: gConfig.PROJECT_REBATE + '/api/share/viewShopCard',
                type: 'get',
                headers: { 'A-CID': gConfig.ACID },
                success: function (result) {
                    if (result && result.code === 1000) {
                        this._getTakeUserInfoCall(result);
                    }
                }.bind(this)
            });
        },
        _getTakeUserInfoCall: function (result) {
            (result.data.headimgurl != '') && (this.elImg[0].src = result.data.headimgurl);
//                this.elName[0].innerHTML = result.obj.nickname || '神秘返利用户';
            this.elText.html(result.data.rule + '<span class="prm">' + result.data.rate + '</span>');
//                this.elTipText.html(result.obj.tips);
            //从cookie里面获取g_chan
            var g_chan = Base.cookie('USER_UIN');

            var sh_title = '我在#' + gConfig.siteNameZH + '#发现了很多海外精品，一起来逛逛吧',
                sh_pic = location.origin + '/img/share/share_card.png',
                sh_des = '#' + gConfig.siteNameZH + '#美好生活供应商，跨境海淘新选择。',
                sh_link = window.location.origin + '/rebate/share_homepage.html?t_id=S_2000&g_chan=' + g_chan;

            // 分享
            if (g_chan > 0) {
                this.elShareBtn.attr({
                    'data-link': sh_link, // 链接
                    'data-title': sh_title, //标题
                    'data-des': sh_des, // 描述
                    'data-pic': sh_pic //  图片
                });
                this.elShareBtn.removeClass('hide');
            }

            // 微信内分享设置
            if (Base.Browser.type === 'weixin') {
                new Base.Widget.WXShare({
                    config: {
                        'title': sh_title,
                        'imgUrl': sh_pic,
                        'desc': sh_des,
                        'link': sh_link
                    }
                });
            }
        }
    });

    $(function () {
        new ShareHomecard();
    })

})(window.Zepto);