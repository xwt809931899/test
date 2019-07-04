/**
 * _invite
 */
(function ($) {
    var isApp = Base.cookie(gConfig.appCookieKey);
    var g_chan = Base.cookie('USER_UIN');

    var Invite = Base.klass.create({
        elements: {
            '.j-rule-content': 'elRuleContent',
            '.j-invite-list': 'elInviteList',
            '.j-share-btn': 'elShareBtn',
            '.qr-vessel': 'elQrVessel',
            '#inviteNum': 'elInviteNum',
            '#reward': 'elReward',
            '#today_reward': 'elToday_reward',
        },
        cgi: {
            getInviteNum: gConfig.PROJECT_REBATE + '/api/rebateuser/inviteFriend'
        },
        tpl: {
            appJsonTpl: '{"type":"<%=type%>","obj":{"title":"<%=title%>","content":"<%=content%>","desc":"<%=desc%>","image":"<%=image%>"}}'
        },
        init: function () {
            this.getInviteNum();
        },
        getInviteNum: function () {
            $.ajax({
                type: 'GET',
                url: this.cgi.getInviteNum,
                headers: { 'A-CID': gConfig.ACID },
                dataType: 'json',
                success: this.proxy(this.setContent)
            })
        },
        setContent: function (result) {
            $('.loading-warp').hide()
            if (result && result.code === 1000) {
                var innerHTML = (result.data.invitationCount == 0) ? '你还没有邀请好友哦！' : '目前您已经成功邀请' + result.data.invitationCount + '位好友成为' + gConfig.rebateName + ' <a href="/rebate/my-team.html#!/team-list?' + encodeURIComponent("appJson={'type':600}") + '">详情>></a>';
                this.elInviteList.html(innerHTML);
                this.elRuleContent.forEach(function (item) {
                    item = $(item);
                    item.html(item.html() + result.data.desc);
                })

                $('.j-desc').html(result.data.desc)

                //  C代表以前的普通返利 用户
                if (['A', 'B'].indexOf(result.data.level) > -1) {
                    this.el.addClass("isMicro");
                    this.elInviteNum.html(result.data.invitationCount);
                    this.elReward.html(result.data.cumulativeIncome.toFixed(2));
                    this.elToday_reward.html(result.data.todayIncome.toFixed(2));
                }
                var sh_title = '【有人@我】' + result.data.nickName + '邀您来'+ gConfig.siteNameZH +'开启全球精品海淘之旅！',
                    sh_pic = location.origin + '/img/share/invite_share.png?1',
                    sh_des = '买正品，爱分享，尽在'+ gConfig.siteNameZH + 'app。',
                    sh_link = window.location.origin + '/rebate/invitation.html?g_chan=' + g_chan;
                var qr = new AraleQRCode({
                    text: sh_link,
                    image: result.data.headImg,
                    size: 150
                })
//                var img = new Image()
//                img.src = qr.toDataURL()
                this.elQrVessel.append(qr)
                // app分享
                if (isApp) {
                    this.elShareBtn.removeClass('hide');
                    this.elShareBtn.removeClass("j-share-btn");
                    this.elShareBtn.attr('href', window.location.origin + '/?appJson=' + encodeURIComponent(this.tmpl(this.tpl.appJsonTpl, {
                            type: 601,
                            title: sh_title,
                            content: window.location.origin + '/rebate/invitation.html?g_chan=' + g_chan,
                            desc: sh_des,
                            image: sh_pic
                        })));
                } else {
                    // touch分享
                    if (g_chan > 0) {
                        this.elShareBtn.attr({
                            'data-link': sh_link,
                            'data-title': sh_title,
                            'data-des': sh_des,
                            'data-pic': sh_pic
                        });
                        this.elShareBtn.removeClass('hide');
                    }
                }

                // 微信内分享设置
                if (Base.Browser.type === 'weixin') {
                    var data = {
                        'title': sh_title,
                        'imgUrl': sh_pic,
                        'desc': sh_des,
                        'link': sh_link
                    }

//                    new Base.Widget.WXShare({
//                        config: {
//                            'title': sh_title,
//                            'imgUrl': sh_pic,
//                            'desc': sh_des,
//                            'link': sh_link
//                        }
//                    });

                    wx.ready(function () {

                        wx.onMenuShareAppMessage(data);

                        wx.onMenuShareTimeline(data);

                        wx.onMenuShareQQ(data);

                        wx.onMenuShareWeibo(data);
                    });


                    // 微信分享提示
                    if (this.hasWXTips) {
                        $('.wxtips-mark').on('click', function () {
                            $(this).hide();
                        }).show();
                    }
                }
            }
            else {
                alert('出现错误:' + JSON.stringify(result))
            }
        }
    });

    var Header = Base.klass.create({});

    new Invite({
        el: '.j-invite-container'
    });

})(window.Zepto);