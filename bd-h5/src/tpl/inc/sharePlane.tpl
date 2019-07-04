<!-- 此tpl含返利用户信息，只适合返利模块使用，普通分享请使用common_sharePlane.tpl -->
<style type="text/css">
    .-mob-share-ui.-mob-share-ui-theme-slide-bottom ul.-mob-share-list {
        font-size: 0;
        padding: 10px 10px 0;
    }

    .-mob-share-ui ul.-mob-share-list li p {
        font-size: 14px;
    }

    .-mob-share-ui ul.-mob-share-list li {
        width: 25%;
        margin: 0 0 35px;
        background-size: 60px auto;
    }

    .-mob-share-weibo {
        background-image: url('../img/rebate/ic_weibo.png') !important;
    }

    .-mob-share-qq {
        background-image: url('../img/rebate/ic_qq.png') !important;
    }

    .-mob-share-weixin {
        background-image: url('../img/rebate/ic_erwm.png') !important;
    }

    .-cus-share-weixin {
        background-image: url('../img/rebate/ic_weixin.png');
    }

    .-cus-share-copylink {
        background-image: url('../img/rebate/ic_fuzhilj.png');
    }

    .-cus-share-qrcode {
        background-image: url('../img/rebate/ic_erwm.png');
    }

    .-cus-share-sms {
        background-image: url('../img/rebate/ic_dx.png');
    }

    .share-des {
        white-space: initial;
        position: relative;
    }

    .icon-msg {
        position: absolute;
        top: 0;
        left: 0;
        background: url('../img/rebate/icon-sharePurse@2x.png') 50% 50% no-repeat;
        width: 35px;
        height: 35px;
        background-size: 25px auto;
    }

    .text-msg-wrap {
        white-space: initial;
        padding: 7px 10%;
        position: relative;
        border-bottom: 1px solid #E5E5E5;
    }

    .text-msg {
        position: relative;
        display: block;
        font-size: .24rem;
        height: 40px;
        text-align: left;
        line-height: 16px;
        padding: 4px 0 4px 45px;
        box-sizing: border-box;
    }

    .qrcode-mark {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999999999;
    }

    .qrcode-mark .qrcode-img {
        padding-top: 60px;
        width: 256px;
        height: 256px;
        margin: 0 50%;
    }

    .qrcode-mark .qrcode-img img {
        width: 100%;
        height: 100%;
        margin-left: -128px;
    }

    .-mob-share-ui.-mob-share-ui-theme {
        overflow: initial;
        box-shadow: 0 -10px 13px 0 rgba(0, 0, 0, 0.1);
    }

    .goods-msg {
        padding: 50px 8px 0 8px;
        text-align: left;
    }

    .goods-msg, .goods-msg p {
        font-size: 12px;
    }

    .goods-msg .money-wrap {
        position: absolute;
        left: 50%;
        width: 100px;
        margin-left: -50px;
        color: #af1c40;
        font-size: 18px;
        top: -26px;
        padding: 10px 0;
        height: 60px;
        z-index: 999;
        font-weight: bold;
        background: #FFFFFF;
        line-height: 30px;
        border-radius: 15px 15px 0 0;
        box-shadow: 0 -10px 13px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .goods-msg .money-wrap .money {
        font-size: 12px;
    }

    .goods-msg .money-wrap .money .money-num {
        font-size: 20px;
    }

    .goods-msg .text {
        padding: 12px 8px;
        color: #af1c40;
        text-align: center;
    }

    .goods-msg .text .rule-icon {
        width: 16px;
        vertical-align: middle;
    }

    .goods-msg .say {
        padding: 8px;
        background-color: #F8F8F8;
    }

    .goods-msg .say p {
        color: #999999;
    }

    .goods-msg .say .say-tt {
        font-size: 14px;
        color: #000000;
    }

    .goods-msg .say .say-tt span {
        float: right;
        font-size: 12px;
        color: #696969;
    }

    .goods-msg .say-txt {
        padding: 6px 0;

    }

    .share-des {
        user-select: initial !important;
        -moz-user-select: initial !important;;
        -webkit-user-select: initial !important;
    }

    .wxtips-mark {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        cursor: pointer;
        z-index: 99998;
    }

    .wxtips-mark .wxtips-img {
        width: 100%;
        height: 100%;
        background: url('/img/pic_yindao.png') left top no-repeat;
        background-size: 100%;
    }
</style>

<script id="-mob-share" src="//img.allpyra.com/mob-share.js?appkey=b606411e4080"></script>
<div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none" data-gchan="0">
    <div class="share-des @@displayMsg">
        <div class="text-msg-wrap j-shareText hide">
            <div class="text-msg"><i class="icon-msg"></i>小伙伴们在您的分享链接中成功购买后，您即可以获得指定佣金奖励！</div>
        </div>
        <div class="j-shareGoods goods-msg hide">
            <div class="money-wrap">
                <span>分享赚</span><br>
                <span class="money"><span class="money-num j-money-num">0.00</span>元</span>
            </div>
            <p class="text" onclick="location.href='/rebate/commission_rules.html'">
                <span>小伙伴通过您的链接成功购买，您即可获得佣金奖励哦</span>
                <img class="rule-icon" src="../img/rebate/ic_commission_rule.png">
            </p>
            <div class="say j-say hide">
                <p class="say-tt">_gConfig_.rebateName说 <span>长按复制再分享</span></p>
                <p class="j-sayTxt say-txt">
                </p>
            </div>
        </div>
    </div>
    <ul class="-mob-share-list">
        <li class="s-icon -cus-share-weixin j-wxshare-item hide" data-chid="1"><p>微信</p></li>
        <li class="s-icon -mob-share-weibo" data-chid="3"><p>新浪微博</p></li>
        <li class="s-icon -mob-share-qq hide" data-chid="5"><p>QQ好友</p></li>
        <li class="s-icon -mob-share-weixin" data-chid="1"><p>二维码</p></li>
        <li class="s-icon -cus-share-sms j-sms hide" data-sms-text="" data-chid="8"><p>短信</p></li>
    </ul>
    <div class="-mob-share-close">取消</div>
</div>
<div class="-mob-share-ui-bg"></div>
<div class="wxtips-mark j-wxtips-mark" style="display:none">
    <div class="wxtips-img"></div>
</div>
<script type="text/javascript">

    $(".share-des").on("click mousedown mousemove mouseup touchstart touchmove touchend selectstart drag", function (e) {
        e.stopPropagation();
    });

    $(function () {
        var mainEl = $('.-mob-share-ui');
        var isWeixin = false;
        var isPC = false;
        var Mb;
        var cacheElm = {};
        var wxIsRedirect = true;
        var getElm = function (selector) {
            if (undefined != cacheElm[selector]) {
                return cacheElm[selector];
            } else {
                cacheElm[selector] = mainEl.find(selector);
                return cacheElm[selector];
            }
        };

        var $shareText = getElm('.j-shareText'),
            $shareGoods = getElm('.j-shareGoods');

        var showShareBefore = function (type) {
            var isShowGoods = (type && type === 'p');
            $shareGoods[isShowGoods ? 'removeClass' : 'addClass']('hide');
            $shareText[!isShowGoods ? 'removeClass' : 'addClass']('hide');
        };

        // 获取浏览器信息
        if (Base && Base.Browser) {
            isPC = Base.Browser.isPC ? 1 : 0;
            isWeixin = Base.Browser.type === 'weixin' ? 1 : 0;
        }

        // 获取手机浏览器信息
        if (Base && Base.MobileBrowser) {
            Mb = Base.MobileBrowser();
        }

        // 短信分享按钮事件
        $('.-mob-share-ui .j-sms').on('click', function () {
            var txt = encodeURIComponent($(this).attr('data-sms-text'));
            var smstxt = 'sms:?body=' + txt;
            if (Mb.sys && Mb.ver) {
                if (Mb.sys === 'android') {
                    smstxt = 'sms:?body=' + txt;
                } else if (Mb.sys === 'ios') {
                    if (Mb.ver < 8) {
                        smstxt = 'sms:;body=' + txt;
                    } else {
                        smstxt = 'sms:&body=' + txt;
                    }
                }
            }
            window.location.href = smstxt;
        });

        // 微信分享按钮事件
        $('.-mob-share-ui .j-wxshare-item').on('click', function () {
            if (wxIsRedirect) {
                window.location.href = $(this).attr('data-link');
            } else {
                $('.-mob-share-ui-bg').trigger('click');
                $('.j-wxtips-mark').show();
            }
        });

        // 微信蒙板提示点击隐藏
        $('.j-wxtips-mark').on('click', function () {
            $(this).hide();
        });


        window.onShareBtnClickHand = function () {
            var pdt = $(this), option = { isPC: isPC, isWeixin: isWeixin };
            if (pdt.hasClass("disabled")) return false;

            option.pid = pdt.attr('data-pid') || '';
            option.eid = pdt.attr('data-eid') || '';
            option.title = pdt.attr('data-title') || '';
            option.pic = pdt.attr('data-img') || '';
            option.des = pdt.attr('data-des') || '';
            option.rebateMoney = +pdt.attr('data-rebate-money') || 0;
            option.say = pdt.attr('data-say') || '';
            option.link = pdt.attr('data-link') || '';
            option.sharetype = pdt.attr('data-sharetype') || '';
            if (gCommonShareBar) {
                gCommonShareBar(option);
            }
        };
        // 分享按钮控制
        $('.j-share-control').on('click', '.j-share-btn', onShareBtnClickHand);

        // 分享计数
        mainEl.on('click', '.s-icon', function () {
            var icon = $(this), option = {}, cgi = '';
            var elm = $('.-mob-share-ui').eq(0);
            var stype = elm.attr('data-curStype') || '';
            var cid = elm.attr('data-curCid') || '';

            if (stype === 'pdt' && cid) {
                cgi = gConfig.PROJECT_REBATE + '/api/share/shareProduct';
                option.itemCode = cid;
            } else if (stype === 'atc' && cid) {
                cgi = gConfig.PROJECT_REBATE + '/api/share/shareEssay';
                option.eid = cid;
            } else if (stype === 'homecard') {
                // 商城名片
                cgi = gConfig.PROJECT_REBATE + '/api/share/shareHomePage';
            } else {
                return false;
            }

            // 分享的平台标识：
            // 1：微信
            // 2：朋友圈
            // 3：新浪微博
            // 4：QQ空间
            // 5：QQ
            // 6：腾讯微博
            // 7：人人网
            // 8：发短信
            // 9：复制链接
            // 10：保存二维码
            option.channel = icon.attr('data-chid') || 0;

            $.ajax({
                type: 'get',
                url: cgi,
                data: option,
                timeout: 5000,
                success: function (data) {
                    return false;
                },
                error: function (xhr, type) {
                    return false;
                }
            });
        });

        // 分享主事件
        window.gCommonShareBar = function (option) {
            var elm = $('.-mob-share-ui').eq(0);
            var isPC = option.isPC;
            var isWeixin = option.isWeixin;
            var c_gchan = elm.attr('data-gchan');
            if (!c_gchan || (c_gchan + '').indexOf('-') === 0) {
                c_gchan = '0';
            }
            if (c_gchan == '0') {
                c_gchan = Base.cookie('USER_UIN');
            }

            if (mobShare && mobShare.ui && elm.length > 0) {

                var c_url = '', c_wx_url = '', c_des = '', c_stype = '', c_cid = '';
                var origin = location.origin;
                if (option.pid) {
                    c_des = (option.des || option.say) || '我在' + gConfig.siteNameZH + '商城发现了一个好东东，强力推荐给你哦';
                    c_url = origin + '/item.html?t_id=P_' + option.pid + '&g_chan=' + c_gchan + '#id-' + option.pid;
                    c_wx_url = origin + '/item.html?wxtips=1&t_id=P_' + option.pid + '&g_chan=' + c_gchan + '#id-' + option.pid;
                    c_sms_url = origin + '/item.html?g_chan=' + c_gchan + '#id-' + option.pid + '';
                    c_stype = 'pdt';
                    c_cid = option.pid;

                    var $sayTxt = getElm('.j-sayTxt'),
                        $moneyNum = getElm('.j-money-num');

                    $sayTxt.text(option.say);
                    $moneyNum.text(option.rebateMoney.toFixed(2));
                    showShareBefore('p');
                } else if (option.eid) {
                    var shareDesc = '我在' + gConfig.siteNameZH + '发现的这篇文章实在太给力了，没理由不分享！';
                    try {
                        var filds = JSON.parse(option.des);
                        $.each(filds, function (index, item) {
                            if (item.type === "1") {
                                shareDesc = item.text.substring(0, 50)
                                return false;
                            }
                        })
                    } catch (e) {
                    }
                    c_des = shareDesc;
                    c_url = origin + '/sharepage.html?t_id=E_' + option.eid + '&g_chan=' + c_gchan + '&head=no';
                    c_wx_url = origin + '/sharepage.html?wxtips=1&t_id=E_' + option.eid + '&g_chan=' + c_gchan + '&head=no';
                    c_sms_url = origin + '/sharepage.html?t_id=E_' + option.eid + '&g_chan=' + c_gchan;
                    //c_sms_url = origin+'/rebate/share_found.html?t_id=E_'+option.eid+'&g_chan='+c_gchan+"#!/details/"+option.eid;
                    c_stype = 'atc';
                    c_cid = option.eid;
                    showShareBefore('e');
                } else {
                    c_des = option.des;
                    c_url = option.link;
                    c_stype = option.sharetype;
                }

                elm.attr('data-curStype', c_stype).attr('data-curCid', c_cid);

                if (!isPC) {
//                    elm.find('.j-sms').removeClass('hide').attr('data-sms-text', c_des + ' ' + c_sms_url);
                    elm.find('.j-qq').addClass('hide');
                }
                if (isWeixin) {
                    elm.find('.-mob-share-weixin').addClass('hide');
                    elm.find('.-cus-share-weixin').removeClass('hide');
                    if (c_wx_url) {
                        wxIsRedirect = true
                        elm.find('.-cus-share-weixin').attr('data-link', c_wx_url);
                    } else {
                        wxIsRedirect = false
                    }
                }

                mobShare.config({
                    params: {
                        description: c_des,
                        pic: option.pic,
                        title: option.title,
                        url: c_url
                    }
                });
                mobShare.ui.init();
                mobShare.ui.open();
            }
        };
    });


</script>
<!--MOB SHARE END-->

